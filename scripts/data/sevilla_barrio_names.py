"""Name the Sevilla barrios: the city layer writes them in capitals without accents ("NERVION").

    python3 -I scripts/data/sevilla_barrio_names.py barrios_raw.geojson barrios_named.geojson
"""

import sys
import json, re, unicodedata
d = json.load(open(sys.argv[1]))
plain = lambda s: unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode()
SMALL = {'de', 'del', 'la', 'las', 'los', 'el', 'y'}
ACCENTS = {plain(w.lower()): w.lower() for w in 'León Nervión Heliópolis Jerónimo Rocío Pío Polígono Árbol María Bartolomé José Julián Matías Marañón Letanías Pájaros Príncipes Jardín Consolación Policlínico Tardón Torrejón Cantábrico Atlántico Romería Línea Ordás Nicolás Guadaíra'.split()}
def word(w, first):
    if re.fullmatch(r'[ivxl]{2,}', w): return w.upper()
    if len(w) == 1 and w != 'y': return w.upper()
    if not first and w in SMALL: return w
    w = ACCENTS.get(plain(w), w)
    return w[:1].upper() + w[1:]
def title(s):
    return ' '.join('-'.join(word(p, i == 0 or j > 0) for j, p in enumerate(w.split('-'))) for i, w in enumerate(re.sub(r'\s+', ' ', s.strip()).lower().split(' ')))
for f in d['features']:
    p = f['properties']
    f['properties'] = {'name': title(p['Barrio']), 'district': p['DISTRITO_N']}
json.dump(d, open(sys.argv[2], 'w'), ensure_ascii=False)
