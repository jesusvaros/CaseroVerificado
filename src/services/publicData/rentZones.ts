// Official reference rents (SERPAVI) per census section, served as one static file per province
// from public/data/zonas (built by scripts/data/build_rent_zones.py).

// [year, p25, p50, p75, n, m2, p50 previous year], €/m² per month for collective housing
export type RentValues = [number, number | null, number, number | null, number | null, number | null, number | null];

type Ring = [number, number][];
export type Geometry = { type: 'Polygon'; coordinates: Ring[] } | { type: 'MultiPolygon'; coordinates: Ring[][] };

interface ZoneFile {
  districts: Record<string, RentValues | null>;
  municipalities: Record<string, { name: string; r: RentValues | null; ipva: [number, number] | null }>;
  features: { geometry: Geometry; properties: { s: string; r: RentValues | null } }[];
}

export type RentLevel = 'section' | 'district' | 'municipality';

export interface ZoneData {
  section: string;
  municipalityCode: string;
  municipalityName: string;
  rent: RentValues | null;
  rentLevel: RentLevel | null;
  // INE rental price index, annual change (%) for the municipality
  ipva: [number, number] | null;
}

const files = new Map<string, Promise<ZoneFile | null>>();

function loadProvince(province: string): Promise<ZoneFile | null> {
  if (!files.has(province)) {
    files.set(
      province,
      fetch(`/data/zonas/${province}.json`)
        .then(res => (res.ok ? (res.json() as Promise<ZoneFile>) : null))
        .catch(() => null)
    );
  }
  return files.get(province)!;
}

function inRing(lng: number, lat: number, ring: Ring): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function inPolygon(lng: number, lat: number, rings: Ring[]): boolean {
  return inRing(lng, lat, rings[0]) && !rings.slice(1).some(hole => inRing(lng, lat, hole));
}

export function containsPoint(geometry: Geometry, lng: number, lat: number): boolean {
  return geometry.type === 'Polygon'
    ? inPolygon(lng, lat, geometry.coordinates)
    : geometry.coordinates.some(polygon => inPolygon(lng, lat, polygon));
}

// Spanish postal codes start with the INE province code (28xxx is Madrid).
export function provinceFromPostalCode(postalCode?: string | null): string | null {
  const match = postalCode?.trim().match(/^(\d{2})\d{3}$/);
  return match && Number(match[1]) >= 1 && Number(match[1]) <= 52 ? match[1] : null;
}

// Falls back to the district and then the municipality when the section has too few contracts.
export async function getZoneData(lat: number, lng: number, postalCode?: string | null): Promise<ZoneData | null> {
  const province = provinceFromPostalCode(postalCode);
  if (!province) return null;
  const file = await loadProvince(province);
  const feature = file?.features.find(f => containsPoint(f.geometry, lng, lat));
  if (!file || !feature) return null;

  const section = feature.properties.s;
  const municipalityCode = section.slice(0, 5);
  const municipality = file.municipalities[municipalityCode];
  const district = file.districts[section.slice(0, 7)];
  const [rent, rentLevel]: [RentValues | null, RentLevel | null] = feature.properties.r
    ? [feature.properties.r, 'section']
    : district
      ? [district, 'district']
      : municipality?.r
        ? [municipality.r, 'municipality']
        : [null, null];

  return {
    section,
    municipalityCode,
    municipalityName: municipality?.name ?? '',
    rent,
    rentLevel,
    ipva: municipality?.ipva ?? null,
  };
}
