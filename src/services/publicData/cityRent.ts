import { slugify } from '../../utils/slugify';
import { provinceFromPostalCode, type RentValues } from './rentZones';

// Areas of a city with their reference rent (€/m² per month): official neighbourhoods where we have
// them (public/data/ciudades, built by scripts/data/build_city_barrios.py), census sections otherwise.

export interface CityArea {
  type: 'Feature';
  id: number;
  geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon;
  properties: { key: string; name: string | null; district: string | null; p25: number | null; p50: number | null; p75: number | null; n: number };
}

export interface CityRent {
  name: string;
  level: 'barrio' | 'section';
  rent: RentValues | null;
  ipva: [number, number] | null;
  source: string;
  areas: CityArea[];
}

const CITY_FILES = new Set(['madrid', 'barcelona']);

interface Municipality {
  name: string;
  r: RentValues | null;
  ipva: [number, number] | null;
}

async function fetchJson<T>(path: string): Promise<T | null> {
  const res = await fetch(path).catch(() => null);
  return res?.ok ? ((await res.json()) as T) : null;
}

// INE writes "Coruña, A"; cities in our URLs are "a-coruna" or "coruna"
const nameSlugs = (name: string) => {
  const m = name.match(/^(.*), (\S+)$/);
  return [name, m ? `${m[2]} ${m[1]}` : name, ...name.split('/')].map(slugify);
};

export async function getCityRent(citySlug: string, postalCodes: (string | null)[]): Promise<CityRent | null> {
  if (CITY_FILES.has(citySlug)) {
    const file = await fetchJson<{ name: string; municipality: Municipality; source: string; features: { geometry: CityArea['geometry']; properties: { id: string; name: string; district: string; p25: number | null; p50: number | null; p75: number | null; n: number } }[] }>(
      `/data/ciudades/${citySlug}.json`
    );
    if (file) {
      return {
        name: file.name,
        level: 'barrio',
        rent: file.municipality.r,
        ipva: file.municipality.ipva,
        source: file.source,
        areas: file.features.map((f, i) => ({
          type: 'Feature',
          id: i,
          geometry: f.geometry,
          properties: { key: f.properties.id, name: f.properties.name, district: f.properties.district, p25: f.properties.p25, p50: f.properties.p50, p75: f.properties.p75, n: f.properties.n },
        })),
      };
    }
  }

  const province = postalCodes.map(provinceFromPostalCode).find(Boolean);
  if (!province) return null;
  const zones = await fetchJson<{ municipalities: Record<string, Municipality>; features: { geometry: CityArea['geometry']; properties: { s: string; r: RentValues | null } }[] }>(
    `/data/zonas/${province}.json`
  );
  const entry = zones && Object.entries(zones.municipalities).find(([, m]) => m.name && nameSlugs(m.name).includes(citySlug));
  if (!zones || !entry) return null;
  const [cumun, municipality] = entry;

  return {
    name: municipality.name,
    level: 'section',
    rent: municipality.r,
    ipva: municipality.ipva,
    source: 'SERPAVI (Ministerio de Vivienda y Agenda Urbana)',
    areas: zones.features
      .filter(f => f.properties.s.startsWith(cumun))
      .map((f, i) => {
        const r = f.properties.r;
        return {
          type: 'Feature',
          id: i,
          geometry: f.geometry,
          properties: { key: f.properties.s, name: null, district: null, p25: r?.[1] ?? null, p50: r?.[2] ?? null, p75: r?.[3] ?? null, n: r?.[4] ?? 0 },
        };
      }),
  };
}
