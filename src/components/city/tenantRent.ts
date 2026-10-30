import type { PublicReview } from '../../services/supabase/publicReviews';

// Below this many rents a median would point at a single tenant's flat
export const MIN_RENTS = 3;
// Only rents paid in the last few years say what a place costs today
const RECENT_YEARS = 2;

export const recentSince = () => new Date().getFullYear() - RECENT_YEARS;

const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

export interface TenantRent {
  count: number;
  // Both null until there are MIN_RENTS rents (with a size, for perM2)
  rent: number | null;
  perM2: number | null;
}

// What CaseroOk tenants pay for whole flats (a room's rent says nothing about the flat), recent and real reviews only.
export function tenantRent(reviews: PublicReview[]): TenantRent {
  const since = recentSince();
  const flats = reviews.filter(r => !r.is_synthetic && r.rental_type !== 'room' && (r.price ?? 0) > 0 && (r.end_year == null || r.end_year >= since));
  const perM2 = flats.filter(r => (r.size_m2 ?? 0) > 0).map(r => r.price! / r.size_m2!);
  return {
    count: flats.length,
    rent: flats.length >= MIN_RENTS ? median(flats.map(r => r.price!)) : null,
    perM2: perM2.length >= MIN_RENTS ? median(perM2) : null,
  };
}
