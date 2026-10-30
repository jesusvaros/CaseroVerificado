import { useEffect, useMemo, useState } from 'react';
import { getCityRent, type CityRent } from '../../services/publicData/cityRent';
import { containsPoint, type Geometry } from '../../services/publicData/rentZones';
import type { PublicReview } from '../../services/supabase/publicReviews';
import { rentBreaks } from './rentScale';
import { getMarket, type MarketData } from '../../services/publicData/market';

export function useCityRent(citySlug: string | undefined, reviews: PublicReview[]) {
  const [rent, setRent] = useState<CityRent | null>(null);
  const [market, setMarket] = useState<MarketData | null>(null);
  useEffect(() => {
    if (!citySlug) return;
    let cancelled = false;
    setRent(null);
    setMarket(null);
    getCityRent(citySlug).then(async result => {
      if (cancelled) return;
      setRent(result);
      const current = result ? await getMarket(result.cumun) : null;
      if (!cancelled) setMarket(current);
    });
    return () => {
      cancelled = true;
    };
  }, [citySlug]);

  const breaks = useMemo(() => rentBreaks((rent?.areas ?? []).map(a => a.properties.p50).filter((v): v is number => v != null)), [rent]);

  // Reviews per area, grouped in the browser so new reviews show up without rebuilding the data
  const areaReviews = useMemo(() => {
    const byArea = new Map<number, PublicReview[]>();
    for (const review of reviews) {
      if (review.lat == null || review.lng == null) continue;
      const area = rent?.areas.find(a => containsPoint(a.geometry as unknown as Geometry, review.lng!, review.lat!));
      if (area) byArea.set(area.id, [...(byArea.get(area.id) ?? []), review]);
    }
    return byArea;
  }, [rent, reviews]);
  const reviewCounts = useMemo(() => new Map([...areaReviews].map(([id, list]) => [id, list.length])), [areaReviews]);

  return { rent, market, breaks, reviewCounts, areaReviews };
}
