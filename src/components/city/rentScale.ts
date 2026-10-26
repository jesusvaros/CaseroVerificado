// Six-step scale from cheapest to most expensive, as in the city design legend.
export const RENT_COLORS = ['#EAF8D2', '#C8F169', '#E3DC6F', '#FFB199', '#FF8A6B', '#FF6B4A'];
export const NO_DATA_COLOR = '#E6E9E1';

// Quantile breaks so each colour covers roughly the same number of areas.
export function rentBreaks(values: number[]): number[] {
  const sorted = [...values].sort((a, b) => a - b);
  if (sorted.length === 0) return [];
  return [1, 2, 3, 4, 5].map(i => sorted[Math.min(sorted.length - 1, Math.floor((sorted.length * i) / 6))]);
}

export function rentColor(value: number | null, breaks: number[]): string {
  if (value == null) return NO_DATA_COLOR;
  const step = breaks.findIndex(b => value < b);
  return RENT_COLORS[step === -1 ? RENT_COLORS.length - 1 : step];
}

export const perM2 = (value: number) => `${value.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} €/m²`;
