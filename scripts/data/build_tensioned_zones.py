"""Build public/data/tensionadas.json from the Ministry's list of stressed rental markets.

The list has no INE codes, only municipality names, so they are matched against the names in
public/data/zonas/*.json. Anything that cannot be matched is printed so it can be added to MANUAL.

    curl -A 'Mozilla/5.0' -H 'Accept: text/html' \
      https://www.mivau.gob.es/vivienda/alquila-bien-es-tu-derecho/serpavi/consultar-zonas-de-mercado-residencial-tensionado \
      -o zonas.html
    python3 -I scripts/data/build_tensioned_zones.py zonas.html public/data/zonas public/data/tensionadas.json
"""

import html
import json
import os
import re
import sys
import unicodedata

MONTHS = {m: i + 1 for i, m in enumerate(
    'enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre'.split())}

# Names in the Ministry list that differ from the INE spelling.
MANUAL = {
    "Castell d'Aro": '17048',
    "Platja d'Aro i S'Agaró": '17048',  # one municipality (Castell-Platja d'Aro), split by the comma
    'Bigues i Riells del Fai': '08023',
    'la Ràpita': '43136',  # renamed from Sant Carles de la Ràpita in 2023
    'Valle de Elorz/Elortzibar': '31088',
}


def norm(name):
    name = unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode().lower()
    # INE writes "Ametlla de Mar, L'" / "Coruña, A"; the Ministry writes "l'Ametlla de Mar" / "A Coruña"
    m = re.match(r"^(.*), (el|la|los|las|els|les|l'|lo|o|a|os|as|s')$", name)
    if m:
        name = m.group(2) + ('' if m.group(2).endswith("'") else ' ') + m.group(1)
    return re.sub(r'[^a-z0-9]', '', name)


def date(text):
    d, month, y = re.search(r'(\d+) de (\w+) de (\d{4})', text).groups()
    return '%s-%02d-%02d' % (y, MONTHS[month], int(d))


def declarations(path):
    text = open(path, encoding='utf-8', errors='replace').read()
    text = re.sub(r'<script.*?</script>|<style.*?</style>', '', text, flags=re.S)
    text = re.sub(r'<(td|th|tr|p|br|li)[^>]*>', '\n', text)
    lines = [l.strip() for l in html.unescape(re.sub(r'<[^>]+>', '', text)).splitlines() if l.strip()]
    for i, line in enumerate(lines):
        if line == 'Comunidad autónoma':
            period = lines[i + 5]
            boe = re.search(r'BOE núm\. \d+, de [^.]+', lines[i + 7])
            yield {
                'region': lines[i + 1],
                'municipalities': lines[i + 3],
                'from': date(period.split('hasta')[0]),
                'to': date(period.split('hasta')[1]),
                'boe': boe.group(0) if boe else None,
            }


def split_names(text):
    """'A, B (barrio X y barrio Y), C' -> [('A', None), ('B', 'barrio X y barrio Y'), ('C', None)]"""
    text = text.rstrip('.')
    out, depth, current = [], 0, ''
    for ch in text:
        depth += ch == '('
        depth -= ch == ')'
        if ch == ',' and depth == 0:
            out.append(current)
            current = ''
        else:
            current += ch
    out.append(current)
    # "Vitoria-Gasteiz, excepto la zona rural..." is one entry, not two
    merged = []
    for part in (p.strip() for p in out if p.strip()):
        if part.startswith('excepto') and merged:
            merged[-1] += ', ' + part
        else:
            merged.append(re.sub(r'^(i|y) ', '', part))
    out = merged
    result = []
    for part in (p.strip() for p in out if p.strip()):
        m = re.match(r'^(.*?)\s*\((.*)\)\s*$', part)
        if m:
            result.append((m.group(1), m.group(2)))
        elif ', excepto' in part or ' excepto ' in part:
            name, note = part.split(' excepto ', 1) if ' excepto ' in part else part.split(', excepto', 1)
            result.append((name.rstrip(', '), 'excepto ' + note.strip()))
        else:
            result.append((part, None))
    return result


def main(html_path, zones_dir, out_path):
    index = {}
    for name in os.listdir(zones_dir):
        for code, muni in json.load(open(os.path.join(zones_dir, name)))['municipalities'].items():
            for variant in [muni['name']] + muni['name'].split('/'):
                index.setdefault(norm(variant), code)

    zones, unmatched = {}, []
    for decl in declarations(html_path):
        for name, note in split_names(decl['municipalities']):
            code = MANUAL.get(name)
            if not code:
                for variant in [name] + name.split('/'):
                    code = index.get(norm(variant))
                    if code:
                        break
            if not code:
                unmatched.append((decl['region'], name))
                continue
            previous = zones.get(code)
            if previous and previous['partial'] and note:
                # Same municipality declared twice for different areas (Llanes): keep both
                note = previous['partial'] + '; ' + note
            zones[code] = {
                'name': name,
                'partial': note,
                'from': decl['from'],
                'to': decl['to'],
                'boe': decl['boe'],
            }

    with open(out_path, 'w') as f:
        json.dump(zones, f, ensure_ascii=False, indent=1, sort_keys=True)
    print(len(zones), 'municipalities', file=sys.stderr)
    for region, name in unmatched:
        print('UNMATCHED', region, name, file=sys.stderr)


if __name__ == '__main__':
    main(*sys.argv[1:4])
