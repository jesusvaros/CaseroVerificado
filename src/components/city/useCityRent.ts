import { useEffect, useMemo, useState } from 'react';
import { getCityRent, type CityRent } from '../../services/publicData/cityRent';
import { containsPoint, type Geometry } from '../../services/publicData/rentZones';
import type { PublicReview } from '../../services/supabase/publicReviews';
import { rentBreaks } from './rentScale';

export function useCityRent(citySlug: string | undefined, reviews: PublicReview[]) {
  const [rent, setRent] = useState<CityRent | null>(null);
  const postalCodes = reviews.map(r => r.postal_code).join(',');

  useEffect(() => {
    if (!citySlug) return;
    let cancelled = false;
    getCityRent(citySlug, postalCodes.split(',')).then(result => !cancelled && setRent(result));
    return () => {
      cancelled = true;
    };
  }, [citySlug, postalCodes]);

  const breaks = useMemo(() => rentBreaks((rent?.areas ?? []).map(a => a.properties.p50).filter((v): v is number => v != null)), [rent]);

  // Reviews per area, counted in the browser so new reviews show up without rebuilding the data
  const reviewCounts = useMemo(() => {
    const counts = new Map<number, number>();
    for (const review of reviews) {
      if (review.lat == null || review.lng == null) continue;
      const area = rent?.areas.find(a => containsPoint(a.geometry as unknown as Geometry, review.lng!, review.lat!));
      if (area) counts.set(area.id, (counts.get(area.id) ?? 0) + 1);
    }
    return counts;
  }, [rent, reviews]);

  return { rent, breaks, reviewCounts };
}
