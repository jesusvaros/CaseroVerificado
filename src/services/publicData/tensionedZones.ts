// Municipalities declared as stressed rental markets (Ley 12/2023), from public/data/tensionadas.json
// (built by scripts/data/build_tensioned_zones.py from the Ministry of Housing list).

export interface TensionedZone {
  name: string;
  // Set when only some neighbourhoods or towns of the municipality are included
  partial: string | null;
  from: string;
  to: string;
  boe: string | null;
}

let zones: Promise<Record<string, TensionedZone>> | null = null;

export async function getTensionedZone(municipalityCode: string): Promise<TensionedZone | null> {
  zones ??= fetch('/data/tensionadas.json')
    .then(res => (res.ok ? res.json() : {}))
    .catch(() => ({}));
  const zone = (await zones)[municipalityCode];
  return zone && zone.to >= new Date().toISOString().slice(0, 10) ? zone : null;
}
