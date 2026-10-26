"""Build public/data/mercado/<province>.json: the most recent official market data per municipality.

Run monthly by .github/workflows/market-data.yml (needs `pip install xlrd==2.0.1` for the Ministry .xls files).

    python3 -I scripts/data/build_market.py DOWNLOAD_DIR public/data/zonas public/data/mercado

DOWNLOAD_DIR must contain (see scripts/data/README.md for the URLs):
  35103500.xls  Ministry of Housing, appraised value €/m² per municipality (>25,000 inhabitants), quarterly
  34010210.xls  Ministry of Housing, number of home sales per municipality, quarterly
  gva.csv       Generalitat Valenciana, every rental deposit lodged this year (postcode and amount)
  incasol.json  INCASÒL (Catalonia) average rent per municipality and period, from the SODA API
"""

import csv
import difflib
import json
import os
import re
import statistics
import sys
import unicodedata
from datetime import date

import xlrd

PROVINCES = {
    '01': 'Araba/Álava', '02': 'Albacete', '03': 'Alicante', '04': 'Almería', '05': 'Ávila', '06': 'Badajoz',
    '07': 'Illes Balears', '08': 'Barcelona', '09': 'Burgos', '10': 'Cáceres', '11': 'Cádiz', '12': 'Castellón',
    '13': 'Ciudad Real', '14': 'Córdoba', '15': 'A Coruña', '16': 'Cuenca', '17': 'Girona', '18': 'Granada',
    '19': 'Guadalajara', '20': 'Gipuzkoa', '21': 'Huelva', '22': 'Huesca', '23': 'Jaén', '24': 'León', '25': 'Lleida',
    '26': 'La Rioja', '27': 'Lugo', '28': 'Madrid', '29': 'Málaga', '30': 'Murcia', '31': 'Navarra', '32': 'Ourense',
    '33': 'Asturias', '34': 'Palencia', '35': 'Las Palmas', '36': 'Pontevedra', '37': 'Salamanca',
    '38': 'Santa Cruz de Tenerife', '39': 'Cantabria', '40': 'Segovia', '41': 'Sevilla', '42': 'Soria', '43': 'Tarragona',
    '44': 'Teruel', '45': 'Toledo', '46': 'Valencia', '47': 'Valladolid', '48': 'Bizkaia', '49': 'Zamora',
    '50': 'Zaragoza', '51': 'Ceuta', '52': 'Melilla',
}

MIN_DEPOSITS = 10  # postcodes or municipalities with fewer deposits are left out
MIN_COVERAGE = {'sale': 250, 'deals': 7000, 'rent': 300}


def norm(name):
    name = unicodedata.normalize('NFKD', str(name)).encode('ascii', 'ignore').decode().lower().strip()
    m = re.match(r"^(.*?)\s*[,(]\s*(el|la|los|las|els|les|l'|lo|o|a|os|as|es|sa|ses)\s*\)?$", name)
    if m:
        name = m.group(2) + ('' if m.group(2).endswith("'") else ' ') + m.group(1)
    return re.sub(r'[^a-z0-9]', '', name)


PROVINCE_KEYS = {norm(n): code for code, n in PROVINCES.items()}
PROVINCE_KEYS.update({norm(p): code for code, n in PROVINCES.items() for p in n.split('/')})


def province_code(name):
    # Bilingual headers ("Valencia/València") match on either form; typos ("Valladodid") are fuzzy-matched
    for part in [name] + str(name).split('/'):
        key = norm(part)
        if key in PROVINCE_KEYS:
            return PROVINCE_KEYS[key]
    close = difflib.get_close_matches(norm(name), PROVINCE_KEYS, n=1, cutoff=0.75)
    return PROVINCE_KEYS[close[0]] if close else None


SINGLE_PROVINCE_REGIONS = {
    'asturias': '33', 'balears': '07', 'cantabria': '39', 'madrid': '28', 'murcia': '30',
    'navarra': '31', 'rioja': '26', 'ceuta': '51', 'melilla': '52',
}

# Names the Ministry writes differently from INE
ALIASES = {
    'puertodesantamaria': '11027', 'mahon': '07032', 'mao': '07032', 'palmademallorca': '07040',
    'santaeulaliadelrio': '07054', 'sancristoballaguna': '38023', 'santacolomagramanet': '08245',
    'calpecalp': '03047', 'almazoraalmassora': '12009', 'castellondelaplana': '12040',
    'villarrealvilareal': '12135', 'vitoria': '01059', 'sansebastiandonostia': '20069', 'sopelana': '48085',
    'puig': '46204', 'sanvicentedelraspeigsantvicentdel': '03122', 'villafrancadelcidvilafranca': '12129',
}


def municipality_index(zones_dir):
    """normalised name -> {province: cumun}, over every spelling INE uses."""
    index = {}
    for file in os.listdir(zones_dir):
        for code, muni in json.load(open(os.path.join(zones_dir, file)))['municipalities'].items():
            for variant in [muni['name']] + (muni['name'] or '').split('/'):
                index.setdefault(norm(variant), {})[code[:2]] = code
    return index


def resolve(index, name, province):
    if norm(name) in ALIASES:
        return ALIASES[norm(name)]
    found = {}
    for variant in [name] + str(name).split('/'):
        found = found or index.get(norm(variant), {})
    if province in found:
        return found[province]
    return next(iter(found.values())) if len(found) == 1 else None


def number(value):
    return value if isinstance(value, float) else None


def appraised_values(path, index, out, unmatched):
    book = xlrd.open_workbook(path)
    sheet = book.sheet_by_index(book.nsheets - 1)  # one sheet per quarter, latest last ("T2A2026")
    m = re.match(r'T(\d)A(\d{4})', sheet.name.strip())
    period = '%sT %s' % m.groups()
    province = None
    pending = ''
    for r in range(sheet.nrows):
        row = sheet.row_values(r)
        if len(row) < 10 or not str(row[2]).strip():
            continue
        if str(row[1]).strip():
            # "Santa Cruz de" + "Tenerife" come on two rows
            label = str(row[1]).strip()
            code = province_code(label) or (province_code(pending + ' ' + label) if pending else None)
            if code:
                province, pending = code, ''
            else:
                pending = label
        total, appraisals = number(row[5]), number(row[9])
        if province is None or total is None:
            continue
        cumun = resolve(index, row[2], province)
        if not cumun:
            unmatched.append(('valor tasado', row[2]))
            continue
        out.setdefault(cumun, {})['sale'] = [round(total), int(appraisals or 0), period]


def sales_counts(path, index, out, unmatched):
    sheet = xlrd.open_workbook(path).sheet_by_index(0)
    years, quarters = sheet.row_values(10), sheet.row_values(12)
    last = max(c for c in range(sheet.ncols) for r in range(13, min(sheet.nrows, 300)) if number(sheet.cell_value(r, c)) is not None)
    year = next(str(years[c]).replace('Año', '').strip() for c in range(last, 0, -1) if str(years[c]).strip())
    period = '%sT %s' % (re.match(r'\d', str(quarters[last])).group(0), year)
    province = None
    for r in range(13, sheet.nrows):
        row = sheet.row_values(r)
        name = str(row[1]).strip()
        values = [number(v) for v in row[last - 3:last + 1]]
        if not name:
            continue
        if all(v is None for v in values):
            if name.isupper():
                # Region header: only single-province regions ("MADRID (COMUNIDAD DE)") name a province
                province = SINGLE_PROVINCE_REGIONS.get(norm(name.split('(')[0]))
            else:
                province = province_code(name) or province
            continue
        if province is None:
            continue
        cumun = resolve(index, name, province)
        if not cumun:
            unmatched.append(('compraventas', name))
            continue
        out.setdefault(cumun, {})['deals'] = [int(values[-1] or 0), int(sum(v or 0 for v in values)), period]


def valencia_deposits(path, out, postcodes):
    by_muni, by_cp, year = {}, {}, None
    with open(path, encoding='utf-8-sig') as f:
        for row in csv.DictReader(f, delimiter=';'):
            try:
                amount = float(row['importe_fianza'])
            except ValueError:
                continue
            # the legal deposit is one month's rent; drop obvious typos
            if not 150 <= amount <= 6000:
                continue
            year = row['anyo_datos']
            by_muni.setdefault(row['cod_provincia'].zfill(2) + row['cod_municipio'].zfill(3), []).append(amount)
            by_cp.setdefault(row['cp'].zfill(5), []).append(amount)
    period = '%s (fianzas hasta %s)' % (year, date.today().strftime('%m/%Y')) if year else None
    for cumun, amounts in by_muni.items():
        if len(amounts) >= MIN_DEPOSITS:
            out.setdefault(cumun, {})['rent'] = [round(statistics.median(amounts)), len(amounts), period, 'gva']
    for cp, amounts in by_cp.items():
        if len(amounts) >= MIN_DEPOSITS:
            postcodes[cp] = [round(statistics.median(amounts)), len(amounts), period]


QUARTERS = {'gener-març': '1T', 'abril-juny': '2T', 'juliol-setembre': '3T', 'octubre-desembre': '4T'}


def catalonia_rents(path, out):
    latest = {}
    for row in json.load(open(path)):
        if row.get('ambit_territorial') != 'Municipi' or row.get('periode') not in QUARTERS:
            continue
        key = (int(row['any']), QUARTERS[row['periode']])
        code = row['codi_territorial'].zfill(5)
        if code not in latest or key > latest[code][0]:
            latest[code] = (key, row)
    for code, ((year, quarter), row) in latest.items():
        homes = int(float(row.get('habitatges') or 0))
        if homes >= MIN_DEPOSITS and row.get('renda'):
            out.setdefault(code, {})['rent'] = [round(float(row['renda'])), homes, '%s %d' % (quarter, year), 'incasol']


def main(download_dir, zones_dir, out_dir):
    index = municipality_index(zones_dir)
    data, postcodes, unmatched = {}, {}, []
    appraised_values(os.path.join(download_dir, '35103500.xls'), index, data, unmatched)
    sales_counts(os.path.join(download_dir, '34010210.xls'), index, data, unmatched)
    valencia_deposits(os.path.join(download_dir, 'gva.csv'), data, postcodes)
    catalonia_rents(os.path.join(download_dir, 'incasol.json'), data)

    os.makedirs(out_dir, exist_ok=True)
    for province in PROVINCES:
        doc = {
            'updated': date.today().isoformat(),
            'fields': {
                'sale': ['eur_m2', 'appraisals', 'period'],
                'deals': ['last_quarter', 'last_four_quarters', 'period'],
                'rent': ['eur_month', 'contracts', 'period', 'source'],
                'postcodes': ['median_deposit_eur', 'deposits', 'period'],
            },
            'municipalities': {k: v for k, v in sorted(data.items()) if k.startswith(province)},
            'postcodes': {k: v for k, v in sorted(postcodes.items()) if k.startswith(province)},
        }
        with open(os.path.join(out_dir, province + '.json'), 'w') as f:
            json.dump(doc, f, ensure_ascii=False, separators=(',', ':'))

    counts = {kind: sum(1 for v in data.values() if kind in v) for kind in ('sale', 'deals', 'rent')}
    print('municipalities with', counts, '| postcodes', len(postcodes), file=sys.stderr)
    for source, name in unmatched:
        print('UNMATCHED', source, name, file=sys.stderr)
    # A source that changes its layout shows up as a coverage drop: fail instead of publishing it
    for kind, minimum in MIN_COVERAGE.items():
        if counts[kind] < minimum:
            sys.exit('coverage check failed: %s municipalities with %s (expected at least %s)' % (counts[kind], kind, minimum))


if __name__ == '__main__':
    main(*sys.argv[1:4])
