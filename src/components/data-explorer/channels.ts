import type { RentHistory } from '../../services/publicData/rentHistory';
import type { MarketHistory, MarketPoint } from '../../services/publicData/marketHistory';

// A "channel" is one line of data the explorer can show: an area of the SERPAVI history (€/m²)
// or a series of rents in new contracts (€/month).
export interface Channel {
  key: string;
  label: string;
  short: string;
  color: string;
  dashed: boolean;
  unit: '€/m²' | '€/mes';
  years: number[];
  values: (number | null)[];
  partial: Set<number>;
}

// Checked with the dataviz palette validator; new-contract channels are also dashed
export const CHANNEL_COLORS = {
  area: '#1F7A4D',
  district: '#3B6FD4',
  municipality: '#C2742A',
  marketPostcode: '#8B5CC7',
  marketMunicipality: '#B8860B',
} as const;

type T = (key: string, params?: Record<string, string | number>) => string;

export function buildChannels(
  t: T,
  history: RentHistory | null,
  market: MarketHistory | null,
  area: { label: string; values: (number | null)[] } | null,
  postalCode?: string | null
): Channel[] {
  const out: Channel[] = [];
  const none = new Set<number>();
  if (history) {
    const serpavi = (key: keyof typeof CHANNEL_COLORS, label: string, values: (number | null)[]) =>
      values.some(v => v != null) && out.push({ key, label, short: label, color: CHANNEL_COLORS[key], dashed: false, unit: '€/m²', years: history.years, values, partial: none });
    if (area) serpavi('area', area.label, area.values);
    else if (history.section?.vc) serpavi('area', t('explorer.series.section'), history.section.vc.map(p => (p ? p[1] : null)));
    if (history.district?.vc) serpavi('district', t('explorer.series.district'), history.district.vc.map(p => (p ? p[2] : null)));
    if (history.municipality?.vc) serpavi('municipality', t('explorer.series.municipality'), history.municipality.vc.map(p => (p ? p[2] : null)));
  }
  const fromMarket = (key: 'marketPostcode' | 'marketMunicipality', label: string, short: string, points: MarketPoint[] | null) => {
    if (!points?.length) return;
    out.push({
      key,
      label,
      short,
      color: CHANNEL_COLORS[key],
      dashed: true,
      unit: '€/mes',
      years: points.map(p => p[0]),
      values: points.map(p => p[1]),
      partial: new Set(points.filter(p => p[3]).map(p => p[0])),
    });
  };
  if (market) {
    fromMarket('marketPostcode', t('explorer.channels.marketPostcode', { cp: postalCode ?? '' }), t('explorer.channels.shortPostcode'), market.postcode);
    fromMarket('marketMunicipality', t('explorer.channels.marketMunicipality'), t('explorer.channels.shortMunicipality'), market.municipality);
  }
  return out;
}

// All visible channels on one axis. Same unit: the values as they are. Mixed units: each line as
// an index (base year = 100), the base being the latest first year so every line has a value there.
export function together(channels: Channel[]) {
  const years = [...new Set(channels.flatMap(c => c.years))].sort((a, b) => a - b);
  const sameUnit = new Set(channels.map(c => c.unit)).size === 1;
  const at = (c: Channel, y: number) => {
    const i = c.years.indexOf(y);
    return i < 0 ? null : c.values[i];
  };
  const base = sameUnit ? null : Math.max(...channels.map(c => c.years[c.values.findIndex(v => v != null)]));
  const series = channels.map(c => {
    const b = base != null ? at(c, base) : null;
    return {
      key: c.key,
      label: c.label,
      short: c.short,
      color: c.color,
      dashed: c.dashed,
      values: years.map(y => {
        const v = at(c, y);
        return v == null ? null : b ? (v / b) * 100 : v;
      }),
    };
  });
  const partial = new Set(channels.flatMap(c => [...c.partial]));
  return { years, labels: years.map(y => (partial.has(y) ? `${y}*` : y)), series, unit: sameUnit ? channels[0]?.unit ?? '' : '', base };
}
