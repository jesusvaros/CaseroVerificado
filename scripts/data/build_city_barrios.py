"""Build public/data/ciudades/<city>.json: official neighbourhoods with an aggregated reference rent.

SERPAVI publishes rents per census section, not per neighbourhood. Each section is assigned to the
neighbourhood that contains its centroid, and the neighbourhood gets the contract-weighted mean of its
sections' percentiles. That is an approximation (the Ministry does not publish neighbourhood medians),
and the page says so.

    python3 -I scripts/data/build_city_barrios.py BARRIOS.geojson CUMUN public/data/zonas OUT.json "Attribution"

BARRIOS.geojson must be WGS84 with id, name and district properties (see scripts/data/README.md).
"""

import json
import sys


def ring_centroid(ring):
    area = cx = cy = 0.0
    for (x0, y0), (x1, y1) in zip(ring, ring[1:] + ring[:1]):
        cross = x0 * y1 - x1 * y0
        area += cross
        cx += (x0 + x1) * cross
        cy += (y0 + y1) * cross
    if abs(area) < 1e-14:
        return sum(p[0] for p in ring) / len(ring), sum(p[1] for p in ring) / len(ring), 0.0
    return cx / (3 * area), cy / (3 * area), abs(area) / 2


def polygons(geometry):
    return [geometry['coordinates']] if geometry['type'] == 'Polygon' else geometry['coordinates']


def in_ring(x, y, ring):
    inside = False
    j = len(ring) - 1
    for i in range(len(ring)):
        xi, yi = ring[i]
        xj, yj = ring[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            inside = not inside
        j = i
    return inside


def contains(geometry, x, y):
    return any(in_ring(x, y, p[0]) and not any(in_ring(x, y, h) for h in p[1:]) for p in polygons(geometry))


def representative_point(geometry):
    # Centroid of the largest outer ring; falls back to a vertex average when the centroid lands outside
    x, y, _ = max((ring_centroid(p[0]) for p in polygons(geometry)), key=lambda c: c[2])
    if contains(geometry, x, y):
        return x, y
    ring = max((p[0] for p in polygons(geometry)), key=len)
    return sum(p[0] for p in ring) / len(ring), sum(p[1] for p in ring) / len(ring)


def weighted(values, weights):
    total = sum(weights)
    return round(sum(v * w for v, w in zip(values, weights)) / total, 2) if total else None


def main(barrios_path, cumun, zones_dir, out_path, attribution):
    barrios = json.load(open(barrios_path))
    zones = json.load(open('%s/%s.json' % (zones_dir, cumun[:2])))
    sections = [f for f in zones['features'] if f['properties']['s'].startswith(cumun)]

    assigned = {b['properties']['id']: [] for b in barrios['features']}
    unassigned = 0
    for section in sections:
        x, y = representative_point(section['geometry'])
        barrio = next((b for b in barrios['features'] if contains(b['geometry'], x, y)), None)
        if barrio is None:
            unassigned += 1
        elif section['properties']['r']:
            assigned[barrio['properties']['id']].append(section['properties']['r'])

    for barrio in barrios['features']:
        rents = [r for r in assigned[barrio['properties']['id']] if r[1] is not None and r[3] is not None]
        weights = [r[4] or 1 for r in rents]
        barrio['properties'].update({
            'p25': weighted([r[1] for r in rents], weights),
            'p50': weighted([r[2] for r in rents], weights),
            'p75': weighted([r[3] for r in rents], weights),
            'n': sum(weights) if rents else 0,
            'sections': len(rents),
        })

    municipality = zones['municipalities'][cumun]
    doc = {
        'type': 'FeatureCollection',
        'cumun': cumun,
        'name': municipality['name'],
        'municipality': municipality,
        'source': 'SERPAVI (Ministerio de Vivienda y Agenda Urbana), %s' % attribution,
        'features': barrios['features'],
    }
    with open(out_path, 'w') as f:
        json.dump(doc, f, ensure_ascii=False, separators=(',', ':'))
    with_rent = sum(1 for b in barrios['features'] if b['properties']['p50'] is not None)
    print('%s: %d neighbourhoods, %d with rent, %d sections, %d outside every neighbourhood'
          % (municipality['name'], len(barrios['features']), with_rent, len(sections), unassigned), file=sys.stderr)


if __name__ == '__main__':
    main(*sys.argv[1:6])
