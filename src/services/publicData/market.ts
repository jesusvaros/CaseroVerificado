// The most recent official market figures per municipality (public/data/mercado/<province>.json,
// rebuilt monthly by scripts/data/build_market.py): appraised sale €/m², number of sales and,
// where a region publishes its rental deposits, the current monthly rent.

export interface MarketData {
  sale: [number, number, string] | null; // €/m², appraisals, period
  deals: [number, number, string] | null; // sales last quarter, last four quarters, period
  rent: [number, number, string, 'gva' | 'incasol'] | null; // €/month, contracts, period, source
  postcodeRent: [number, number, string] | null; // median deposit (≈ one month's rent), deposits, period
}

interface MarketFile {
  updated: string;
  municipalities: Record<string, { sale?: MarketData['sale']; deals?: MarketData['deals']; rent?: MarketData['rent'] }>;
  postcodes: Record<string, [number, number, string]>;
}

const files = new Map<string, Promise<MarketFile | null>>();

function loadProvince(province: string) {
  if (!files.has(province)) {
    files.set(
      province,
      fetch(`/data/mercado/${province}.json`)
        .then(res => (res.ok ? (res.json() as Promise<MarketFile>) : null))
        .catch(() => null)
    );
  }
  return files.get(province)!;
}

export async function getMarket(cumun: string, postalCode?: string | null): Promise<MarketData | null> {
  const file = await loadProvince(cumun.slice(0, 2));
  const muni = file?.municipalities[cumun];
  const postcodeRent = postalCode ? file?.postcodes[postalCode] ?? null : null;
  if (!muni && !postcodeRent) return null;
  return { sale: muni?.sale ?? null, deals: muni?.deals ?? null, rent: muni?.rent ?? null, postcodeRent };
}
