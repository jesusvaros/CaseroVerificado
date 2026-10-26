"""Build public/data/municipios.json: every municipality with a SERPAVI reference rent.

Used by the city search and to open a city page for places that have no reviews yet.
Each entry is [slug, name, INE code, median €/m², contracts]; aliases cover INE spellings
("Coruña, A" is also "a-coruna", "Alacant/Alicante" is also "alicante").

    python3 -I scripts/data/build_municipality_index.py public/data/zonas public/data/municipios.json
"""

import json
import os
import re
import sys
import unicodedata


def slugify(value):
    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', value).strip('-')


def display_name(name):
    # "Coruña, A" -> "A Coruña"; keep bilingual names as INE writes them
    m = re.match(r"^(.*), (El|La|Los|Las|Els|Les|L'|Lo|O|A|Os|As|Es|Sa|Ses)$", name)
    if m:
        return m.group(2) + ('' if m.group(2).endswith("'") else ' ') + m.group(1)
    return name


def aliases(name):
    # Bilingual names use their first form as the URL ("Alicante/Alacant" -> alicante)
    out = [slugify(display_name(name.split('/')[0].strip()))] if '/' in name else []
    for part in [name] + name.split('/'):
        out.append(slugify(display_name(part.strip())))
        out.append(slugify(part))
    return list(dict.fromkeys(a for a in out if a))


def main(zones_dir, out_path):
    entries, alias_map = [], {}
    for file in sorted(os.listdir(zones_dir)):
        for code, muni in json.load(open(os.path.join(zones_dir, file)))['municipalities'].items():
            if not muni['r'] or not muni['name']:
                continue
            names = aliases(muni['name'])
            entries.append([names[0], display_name(muni['name']), code, muni['r'][2], muni['r'][4] or 0])
            for alias in names[1:]:
                alias_map.setdefault(alias, names[0])
    entries.sort(key=lambda e: -e[4])
    # an alias never overrides a municipality's own slug
    own = {e[0] for e in entries}
    alias_map = {a: s for a, s in alias_map.items() if a not in own}
    with open(out_path, 'w') as f:
        json.dump({'fields': ['slug', 'name', 'cumun', 'p50', 'contracts'], 'municipalities': entries, 'aliases': alias_map},
                  f, ensure_ascii=False, separators=(',', ':'))
    print(len(entries), 'municipalities,', len(alias_map), 'aliases', file=sys.stderr)


if __name__ == '__main__':
    main(*sys.argv[1:3])
