// Building facts from the Spanish cadastre (Dirección General del Catastro). Both services are
// public, need no key and send CORS headers, so they are called from the browser.

const BASE = 'https://ovc.catastro.meh.es/OVCServWeb/OVCWcfCallejero';

export interface BuildingFacts {
  cadastralReference: string;
  yearBuilt: number | null;
  dwellings: number;
  units: number;
  averageDwellingM2: number | null;
  mainUse: string | null;
}

interface Unit {
  debi?: { luso?: string; sfc?: string; ant?: string };
}

const cache = new Map<string, Promise<BuildingFacts | null>>();

async function parcelAt(lat: number, lng: number): Promise<string | null> {
  const res = await fetch(`${BASE}/COVCCoordenadas.svc/json/Consulta_RCCOOR?SRS=EPSG:4326&CoorX=${lng}&CoorY=${lat}`);
  if (!res.ok) return null;
  const data = await res.json();
  const pc = data?.Consulta_RCCOORResult?.coordenadas?.coord?.[0]?.pc;
  return pc?.pc1 && pc?.pc2 ? `${pc.pc1}${pc.pc2}` : null;
}

async function unitsOf(reference: string): Promise<Unit[]> {
  const res = await fetch(`${BASE}/COVCCallejero.svc/json/Consulta_DNPRC?RefCat=${reference}`);
  if (!res.ok) return [];
  const result = (await res.json())?.consulta_dnprcResult;
  // Buildings with several units come as a list; a single unit comes as "bico"
  if (result?.lrcdnp?.rcdnp) return result.lrcdnp.rcdnp;
  if (result?.bico?.bi) return [result.bico.bi];
  return [];
}

function summarise(reference: string, units: Unit[]): BuildingFacts | null {
  if (units.length === 0) return null;
  const residential = units.filter(u => u.debi?.luso === 'Residencial');
  const areas = residential.map(u => Number(u.debi?.sfc)).filter(n => n > 0);
  const years = units.map(u => Number(u.debi?.ant)).filter(n => n > 1000);
  const uses = units.map(u => u.debi?.luso).filter(Boolean) as string[];
  const mainUse = uses.sort((a, b) => uses.filter(u => u === b).length - uses.filter(u => u === a).length)[0] ?? null;

  return {
    cadastralReference: reference,
    yearBuilt: years.length ? Math.min(...years) : null,
    dwellings: residential.length,
    units: units.length,
    averageDwellingM2: areas.length ? Math.round(areas.reduce((a, b) => a + b, 0) / areas.length) : null,
    mainUse,
  };
}

export function getBuildingFacts(lat: number, lng: number): Promise<BuildingFacts | null> {
  const key = `${lat.toFixed(5)},${lng.toFixed(5)}`;
  if (!cache.has(key)) {
    cache.set(
      key,
      parcelAt(lat, lng)
        .then(async reference => (reference ? summarise(reference, await unitsOf(reference)) : null))
        .catch(() => null)
    );
  }
  return cache.get(key)!;
}
