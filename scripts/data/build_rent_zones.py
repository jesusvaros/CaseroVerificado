"""Build public/data/zonas/<province>.json: census sections with official reference rents.

Run once a year when SERPAVI publishes a new edition (see scripts/data/README.md).
Only the Python standard library is used; the xlsx is streamed because it is 330 MB unzipped.

    python3 -I scripts/data/build_rent_zones.py SERPAVI.xlsx SECTIONS_DIR IPVA.json public/data/zonas

SECTIONS_DIR holds one GeoJSON per province (01.json ... 52.json) produced by mapshaper from the
INE 2021 census sections, with the CUSEC, CUDIS, CUMUN, CPRO and NMUN fields.
"""

import json
import os
import re
import sys
import zipfile
import xml.etree.ElementTree as ET

NS = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'
REL = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id'
YEARS = (24, 23, 22, 21)  # latest first; older years only fill gaps


def sheet_paths(z):
    wb = ET.fromstring(z.read('xl/workbook.xml'))
    rels = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
    targets = {r.get('Id'): r.get('Target') for r in rels}
    return {s.get('name'): 'xl/' + targets[s.get(REL)].lstrip('/').replace('xl/', '') for s in wb.iter(NS + 'sheet')}


def shared_strings(z):
    out = []
    with z.open('xl/sharedStrings.xml') as f:
        for _, el in ET.iterparse(f):
            if el.tag == NS + 'si':
                out.append(''.join(t.text or '' for t in el.iter(NS + 't')))
                el.clear()
    return out


def rows(z, path, strings):
    header = None
    with z.open(path) as f:
        for _, el in ET.iterparse(f):
            if el.tag != NS + 'row':
                continue
            cells = {}
            for c in el.findall(NS + 'c'):
                v = c.find(NS + 'v')
                value = None if v is None else (strings[int(v.text)] if c.get('t') == 's' else v.text)
                cells[re.match(r'[A-Z]+', c.get('r')).group(0)] = value
            el.clear()
            if header is None:
                header = cells
                continue
            yield {header[k]: v for k, v in cells.items() if k in header}


def num(value):
    try:
        return round(float(value), 2)
    except (TypeError, ValueError):
        return None


def rent(rec):
    """[year, p25, p50, p75, n, m2, p50 previous year] for collective housing, or None."""
    for year in YEARS:
        p50 = num(rec.get('ALQM2_LV_M_VC_%d' % year))
        if p50 is None:
            continue
        prev = num(rec.get('ALQM2_LV_M_VC_%d' % (year - 1)))
        n = num(rec.get('BI_ALVHEPCO_TVC_%d' % year))
        return [
            2000 + year,
            num(rec.get('ALQM2_LV_25_VC_%d' % year)),
            p50,
            num(rec.get('ALQM2_LV_75_VC_%d' % year)),
            int(n) if n is not None else None,
            num(rec.get('SLVM2_M_VC_%d' % year)),
            prev,
        ]
    return None


def load_serpavi(path):
    z = zipfile.ZipFile(path)
    paths = sheet_paths(z)
    strings = shared_strings(z)
    out = {}
    for sheet, key in (('Secciones censales', 'CUSEC'), ('Distritos', 'CUDIS'), ('Municipios', 'CUMUN')):
        table = {}
        for rec in rows(z, paths[sheet], strings):
            value = rent(rec)
            if rec.get(key) and value:
                table[rec[key]] = value
        out[key] = table
        print(sheet, len(table), 'with rent', file=sys.stderr)
    return out


def load_ipva(path):
    """Municipality code -> latest annual change (%) of the INE rental price index."""
    out = {}
    for serie in json.load(open(path)):
        meta = serie.get('MetaData') or []
        names = [m.get('Nombre') for m in meta]
        code = meta[0].get('Codigo') if meta else ''
        if len(code) != 5 or 'Variación anual' not in names or 'Total' not in names:
            continue
        latest = max(serie['Data'], key=lambda d: d['Anyo'], default=None)
        if latest and latest.get('Valor') is not None:
            out[code] = [latest['Anyo'], latest['Valor']]
    return out


def main(serpavi_path, sections_dir, ipva_path, out_dir):
    serpavi = load_serpavi(serpavi_path)
    ipva = load_ipva(ipva_path)
    os.makedirs(out_dir, exist_ok=True)

    for name in sorted(os.listdir(sections_dir)):
        if not name.endswith('.json'):
            continue
        geo = json.load(open(os.path.join(sections_dir, name)))
        districts, municipalities = {}, {}
        for feature in geo['features']:
            p = feature['properties']
            feature['properties'] = {'s': p['CUSEC'], 'r': serpavi['CUSEC'].get(p['CUSEC'])}
            districts[p['CUDIS']] = serpavi['CUDIS'].get(p['CUDIS'])
            municipalities[p['CUMUN']] = {
                'name': p.get('NMUN'),
                'r': serpavi['CUMUN'].get(p['CUMUN']),
                'ipva': ipva.get(p['CUMUN']),
            }
        doc = {
            'type': 'FeatureCollection',
            'source': 'SERPAVI (Ministerio de Vivienda y Agenda Urbana); secciones censales INE 2021; IPVA (INE)',
            'fields': {'r': ['year', 'p25', 'p50', 'p75', 'n', 'm2', 'p50_prev_year']},
            'districts': districts,
            'municipalities': municipalities,
            'features': geo['features'],
        }
        with open(os.path.join(out_dir, name), 'w') as f:
            json.dump(doc, f, ensure_ascii=False, separators=(',', ':'))
        print(name, len(geo['features']), 'sections', file=sys.stderr)


if __name__ == '__main__':
    main(*sys.argv[1:5])
