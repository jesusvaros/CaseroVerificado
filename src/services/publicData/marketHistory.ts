// Rent in new contracts year by year where a region publishes it openly: Catalonia (INCASÒL, since
// 2007) and the Comunitat Valenciana (deposits, since 2020, also per postcode). Built monthly by
// scripts/data/build_market_history.py into public/data/mercado-historico.

// [year, €/month, contracts, partial year]
export type MarketPoint = [number, number, number, boolean];

interface MarketHistoryFile {
  municipalities: Record<string, MarketPoint[]>;
  postcodes: Record<string, MarketPoint[]>;
}

export interface MarketHistory {
  region: 'catalonia' | 'valencia';
  municipality: MarketPoint[] | null;
  postcode: MarketPoint[] | null;
}

const CATALONIA = new Set(['08', '17', '25', '43']);
const files = new Map<string, Promise<MarketHistoryFile | null>>();

export async function getMarketHistory(municipality: string, postalCode?: string | null): Promise<MarketHistory | null> {
  const province = municipality.slice(0, 2);
  if (!files.has(province)) {
    files.set(
      province,
      fetch(`/data/mercado-historico/${province}.json`)
        .then(res => (res.ok ? (res.json() as Promise<MarketHistoryFile>) : null))
        .catch(() => null)
    );
  }
  const file = await files.get(province)!;
  if (!file) return null;
  const result: MarketHistory = {
    region: CATALONIA.has(province) ? 'catalonia' : 'valencia',
    municipality: file.municipalities[municipality] ?? null,
    postcode: postalCode ? file.postcodes[postalCode] ?? null : null,
  };
  return result.municipality || result.postcode ? result : null;
}
