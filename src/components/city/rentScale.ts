// Seven steps from the cheapest (deep green) to the most expensive (deep red) area of the city.
export const RENT_COLORS = ['#1A9850', '#66BD63', '#A6D96A', '#FEE08B', '#FDAE61', '#F46D43', '#D73027'];
export const NO_DATA_COLOR = '#E6E9E1';

const quantile = (sorted: number[], q: number) => sorted[Math.min(sorted.length - 1, Math.max(0, Math.round((sorted.length - 1) * q)))];

// The city's range, trimmed to the 2nd–98th percentile so one extreme area does not squash the rest.
export function rentRange(values: number[]): [number, number] | null {
  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length === 0) return null;
  return sorted.length < 10 ? [sorted[0], sorted[sorted.length - 1]] : [quantile(sorted, 0.02), quantile(sorted, 0.98)];
}

// Equal-width bands across that range, so the colour jump between areas matches the price gap.
export function rentBreaks(values: number[]): number[] {
  const range = rentRange(values);
  if (!range) return [];
  const [lo, hi] = range;
  const step = (hi - lo) / RENT_COLORS.length || 1;
  return Array.from({ length: RENT_COLORS.length - 1 }, (_, i) => lo + step * (i + 1));
}

export function rentColor(value: number | null, breaks: number[]): string {
  if (value == null) return NO_DATA_COLOR;
  const step = breaks.findIndex(b => value < b);
  return RENT_COLORS[step === -1 ? RENT_COLORS.length - 1 : step];
}

export const perM2 = (value: number) => `${value.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} €/m²`;
