// Diverging scale for "how it changed": three blues for falls, a neutral grey for flat, three corals
// for rises. Thresholds grow with the period so five years of normal inflation is not all deep red.
export const TREND_COLORS = ['#2F5FC4', '#6E93DD', '#B4C9EF', '#E6E9E1', '#FFC9B8', '#FF8A6B', '#D9472A'];
export const TREND_NO_DATA = '#F3F5F0';

export type TrendPeriod = 1 | 5;

export const trendThresholds = (period: TrendPeriod) => (period === 1 ? [1, 3, 8] : [3, 10, 25]);

export function trendColor(change: number | null, period: TrendPeriod): string {
  if (change == null) return TREND_NO_DATA;
  const [a, b, c] = trendThresholds(period);
  const abs = Math.abs(change);
  const step = abs < a ? 0 : abs < b ? 1 : abs < c ? 2 : 3;
  return step === 0 ? TREND_COLORS[3] : change > 0 ? TREND_COLORS[3 + step] : TREND_COLORS[3 - step];
}

// % change of the median between the last year with data and `period` years earlier.
export function trendChange(series: (number | null)[] | undefined, years: number[], period: TrendPeriod): number | null {
  if (!series) return null;
  const last = series.length - 1;
  const from = years.indexOf(years[last] - period);
  const a = from >= 0 ? series[from] : null;
  const b = series[last];
  return a && b ? ((b - a) / a) * 100 : null;
}

export const formatChange = (change: number) => `${change > 0 ? '+' : ''}${change.toLocaleString('es-ES', { maximumFractionDigits: 1 })} %`;
