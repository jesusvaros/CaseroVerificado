"""Build public/data/mercado-historico/<province>.json: how rents in new contracts moved over time,
where a region publishes it openly. Used by the data explorer next to the SERPAVI history.

    python3 -I scripts/data/build_market_history.py DOWNLOAD_DIR public/data/mercado-historico

DOWNLOAD_DIR must contain:
  incasol_all.json   INCASÒL (Catalonia), every quarter since 2007 per municipality (SODA API)
  gva_<year>.csv     Generalitat Valenciana, every rental deposit lodged that year (2020 onwards)

Each series is a list of [year, €/month, contracts, partial] per year: INCASÒL's yearly average rent
(2007 onwards) and the Valencian median deposit (2020 onwards). The current year is partial: the latest
cumulative quarter for Catalonia, the deposits lodged so far for Valencia.
"""

import csv
import glob
import json
import os
import re
import statistics
import sys

# Cumulative periods INCASÒL publishes within a year, from the whole year down to the first quarter
CUMULATIVE = ['gener-desembre', 'gener-setembre', 'gener-juny', 'gener-març']
MIN_CONTRACTS = 10


def catalonia(path, out):
    best = {}
    for row in json.load(open(path)):
        if row.get('ambit_territorial') != 'Municipi' or row.get('periode') not in CUMULATIVE or not row.get('renda'):
            continue
        n = int(float(row.get('habitatges') or 0))
        if n < MIN_CONTRACTS:
            continue
        key = (row['codi_territorial'].zfill(5), int(row['any']))
        rank = CUMULATIVE.index(row['periode'])
        if key not in best or rank < best[key][0]:
            best[key] = (rank, round(float(row['renda'])), n)
    for (code, year), (rank, rent, n) in best.items():
        out.setdefault(code, []).append([year, rent, n, rank > 0])


def valencia(download_dir, municipalities, postcodes):
    paths = sorted(glob.glob(os.path.join(download_dir, 'gva_*.csv')))
    # The newest file is the year in progress
    latest = max(int(re.search(r'gva_(\d{4})', p).group(1)) for p in paths)
    for path in paths:
        year = int(re.search(r'gva_(\d{4})', path).group(1))
        by_muni, by_cp = {}, {}
        with open(path, encoding='utf-8-sig') as f:
            for row in csv.DictReader(f, delimiter=';'):
                try:
                    amount = float(row['importe_fianza'])
                except ValueError:
                    continue
                # The legal deposit is one month of rent; drop obvious typos (same rule as build_market.py)
                if not 150 <= amount <= 6000:
                    continue
                by_muni.setdefault(row['cod_provincia'].zfill(2) + row['cod_municipio'].zfill(3), []).append(amount)
                by_cp.setdefault(row['cp'].zfill(5), []).append(amount)
        for target, groups in ((municipalities, by_muni), (postcodes, by_cp)):
            for code, amounts in groups.items():
                if len(amounts) >= MIN_CONTRACTS:
                    target.setdefault(code, []).append([year, round(statistics.median(amounts)), len(amounts), year == latest])


def main(download_dir, out_dir):
    municipalities, postcodes = {}, {}
    catalonia(os.path.join(download_dir, 'incasol_all.json'), municipalities)
    valencia(download_dir, municipalities, postcodes)
    for series in list(municipalities.values()) + list(postcodes.values()):
        series.sort(key=lambda p: p[0])

    os.makedirs(out_dir, exist_ok=True)
    # Postcode 00000 and similar are typos in the deposit register
    postcodes = {k: v for k, v in postcodes.items() if k[:2] != '00'}
    provinces = sorted({c[:2] for c in municipalities} | {c[:2] for c in postcodes})
    for province in provinces:
        doc = {
            'fields': ['year', 'eur_month', 'contracts', 'partial'],
            'sources': {
                'catalonia': 'INCASÒL, fianzas de alquiler depositadas (renta media por trimestre)',
                'valencia': 'Generalitat Valenciana, fianzas de alquiler depositadas (mediana por año)',
            },
            'municipalities': {k: v for k, v in sorted(municipalities.items()) if k.startswith(province)},
            'postcodes': {k: v for k, v in sorted(postcodes.items()) if k.startswith(province)},
        }
        with open(os.path.join(out_dir, province + '.json'), 'w') as f:
            json.dump(doc, f, ensure_ascii=False, separators=(',', ':'))
    print(len(municipalities), 'municipalities,', len(postcodes), 'postcodes,', len(provinces), 'provinces', file=sys.stderr)


if __name__ == '__main__':
    main(*sys.argv[1:3])
