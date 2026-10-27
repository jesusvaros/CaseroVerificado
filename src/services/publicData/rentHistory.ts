// SERPAVI rent history 2011-2024 per municipality, district and census section, one static file
// per province (public/data/historico, built by scripts/data/build_rent_history.py). Loaded only
// when a visitor opens the data explorer.

// Municipalities and districts: [contracts, p25, p50, p75, €/month, m²]; sections: [contracts, p50, €/month]
export type FullPoint = [number | null, number | null, number, number | null, number | null, number | null];
export type SectionPoint = [number | null, number, number | null];
export type HousePoint = [number | null, number, number | null];

interface Entry<P> {
  vc?: (P | null)[];
  vu?: (HousePoint | null)[];
}

interface HistoryFile {
  years: number[];
  m: Record<string, Entry<FullPoint>>;
  d: Record<string, Entry<FullPoint>>;
  s: Record<string, Entry<SectionPoint>>;
}

export interface RentHistory {
  years: number[];
  section: Entry<SectionPoint> | null;
  district: Entry<FullPoint> | null;
  municipality: Entry<FullPoint> | null;
}

const files = new Map<string, Promise<HistoryFile | null>>();

export async function getRentHistory(municipality: string, section?: string | null): Promise<RentHistory | null> {
  const province = municipality.slice(0, 2);
  if (!files.has(province)) {
    files.set(
      province,
      fetch(`/data/historico/${province}.json`)
        .then(res => (res.ok ? (res.json() as Promise<HistoryFile>) : null))
        .catch(() => null)
    );
  }
  const file = await files.get(province)!;
  if (!file) return null;
  return {
    years: file.years,
    section: section ? file.s[section] ?? null : null,
    district: section ? file.d[section.slice(0, 7)] ?? null : null,
    municipality: file.m[municipality] ?? null,
  };
}
