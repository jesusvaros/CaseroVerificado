"""Build public/data/irav.json from the INE rent update index (IRAV, table 72975).

The IRAV caps the yearly rent update (artículo 18.1 LAU). Values are the annual change in %, by month.

    curl -o irav.json 'https://servicios.ine.es/wstempus/js/ES/DATOS_TABLA/72975?nult=120'
    python3 -I scripts/data/build_irav.py irav.json public/data/irav.json
"""

import json
import sys


def main(source, target):
    series = json.load(open(source, encoding='utf-8'))
    # The table has a single series: national total, annual change
    data = series[0]['Data']
    values = {'%d-%02d' % (d['Anyo'], d['FK_Periodo']): d['Valor'] for d in data if d.get('Valor') is not None}
    months = sorted(values)
    out = {'source': 'INE, tabla 72975', 'latest': months[-1], 'values': {m: values[m] for m in months}}
    with open(target, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, separators=(',', ':'))
    print('IRAV', months[0], '->', months[-1], values[months[-1]])


if __name__ == '__main__':
    main(*sys.argv[1:3])
