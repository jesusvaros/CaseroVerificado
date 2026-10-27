"""Build public/data/historico/<province>.json: SERPAVI rent history 2011-2024 per municipality,
district and census section, loaded only when a visitor opens "Ver los datos" on an address.

    python3 -I scripts/data/build_rent_history.py SERPAVI.xlsx public/data/historico

Each series is one entry per year (null when SERPAVI has no data that year):
  vc (flats in a building): [contracts, p25 €/m², median €/m², p75 €/m², median €/month, median m²]
  vu (houses): [contracts, median €/m², median €/month]
Census sections only carry vc as [contracts, median €/m², median €/month] to keep the files small.
"""

import importlib.util
import json
import os
import sys
import zipfile

spec = importlib.util.spec_from_file_location('zones', os.path.join(os.path.dirname(__file__), 'build_rent_zones.py'))
zones = importlib.util.module_from_spec(spec)
spec.loader.exec_module(zones)

YEARS = list(range(11, 25))


def r2(value):
    v = zones.num(value)
    return None if v is None else round(v, 2)


def r0(value):
    v = zones.num(value)
    return None if v is None else int(round(v))


def series(rec, kind, with_range):
    out = []
    for y in YEARS:
        median = r2(rec.get('ALQM2_LV_M_%s_%d' % (kind, y)))
        if median is None:
            out.append(None)
            continue
        n = r0(rec.get('BI_ALVHEPCO_T%s_%d' % (kind, y)))
        eur = r0(rec.get('ALQTBID12_M_%s_%d' % (kind, y)))
        if with_range:
            out.append([n, r2(rec.get('ALQM2_LV_25_%s_%d' % (kind, y))), median, r2(rec.get('ALQM2_LV_75_%s_%d' % (kind, y))), eur,
                        r0(rec.get('SLVM2_M_%s_%d' % (kind, y)))])
        else:
            out.append([n, median, eur])
    # Trailing years with no data at all are common for small places; keep the array aligned anyway
    return out if any(out) else None


def main(serpavi_path, out_dir):
    z = zipfile.ZipFile(serpavi_path)
    paths = zones.sheet_paths(z)
    strings = zones.shared_strings(z)
    provinces = {}
    for sheet, key, level in (('Municipios', 'CUMUN', 'm'), ('Distritos', 'CUDIS', 'd'), ('Secciones censales', 'CUSEC', 's')):
        for rec in zones.rows(z, paths[sheet], strings):
            code = rec.get(key)
            if not code:
                continue
            entry = {}
            vc = series(rec, 'VC', level != 's')
            if vc:
                entry['vc'] = vc
            if level != 's':
                vu = series(rec, 'VU', False)
                if vu:
                    entry['vu'] = vu
            if entry:
                provinces.setdefault(code[:2], {'m': {}, 'd': {}, 's': {}})[level][code] = entry
        print(sheet, 'done', file=sys.stderr)

    os.makedirs(out_dir, exist_ok=True)
    for province, levels in sorted(provinces.items()):
        doc = {
            'source': 'SERPAVI (Ministerio de Vivienda y Agenda Urbana), datos de las declaraciones de IRPF',
            'years': [2000 + y for y in YEARS],
            'fields': {
                'vc': ['contracts', 'p25', 'p50', 'p75', 'eur_month', 'm2'],
                'vu': ['contracts', 'p50', 'eur_month'],
                's.vc': ['contracts', 'p50', 'eur_month'],
            },
            **levels,
        }
        with open(os.path.join(out_dir, province + '.json'), 'w') as f:
            json.dump(doc, f, ensure_ascii=False, separators=(',', ':'))
    print(len(provinces), 'provinces', file=sys.stderr)


if __name__ == '__main__':
    main(*sys.argv[1:3])
