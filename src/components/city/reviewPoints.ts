import type { PublicReview } from '../../services/supabase/publicReviews';

export interface ReviewPoint {
  id: number;
  lng: number;
  lat: number;
  reviews: PublicReview[];
}

// One dot per address: reviews of the same building share a point.
export function groupReviewPoints(reviews: PublicReview[]): ReviewPoint[] {
  const groups = new Map<string, PublicReview[]>();
  for (const r of reviews) {
    if (r.lat == null || r.lng == null) continue;
    const key = r.street && r.number ? `${r.city_slug}|${r.street}|${r.number}` : `${r.lat.toFixed(5)},${r.lng.toFixed(5)}`;
    groups.set(key, [...(groups.get(key) ?? []), r]);
  }
  return [...groups.values()].map((group, id) => ({ id, lng: group[0].lng!, lat: group[0].lat!, reviews: group }));
}
