import { useEffect, useState } from 'react';
import { getPublicReviews, type PublicReview } from '../../services/supabase/publicReviews';
import { getBuildingFacts, type BuildingFacts } from '../../services/publicData/catastro';
import { addressPath, addressSlug } from '../../utils/addressPath';
import { summarise } from '../address/addressSummary';

export interface FeaturedAddress {
  title: string;
  city: string;
  path: string | null;
  reviews: number;
  score: number | null;
  deposit: { full: number; total: number } | null;
  building: BuildingFacts | null;
}

export interface HomeShowcase {
  reviews: PublicReview[];
  featured: FeaturedAddress | null;
  quote: PublicReview | null;
}

const MIN_QUOTE_LENGTH = 80;

// Real data for the home page illustrations: the address with most reviews (its score, deposit
// outcome and Catastro facts) and the latest review long enough to quote.
export function useHomeShowcase(): HomeShowcase {
  const [state, setState] = useState<HomeShowcase>({ reviews: [], featured: null, quote: null });

  useEffect(() => {
    let active = true;
    (async () => {
      const reviews = await getPublicReviews();
      const groups = new Map<string, PublicReview[]>();
      for (const review of reviews) {
        if (!review.street || !review.number || !review.city_slug) continue;
        const key = `${review.city_slug}/${addressSlug(review.street, review.number)}`;
        groups.set(key, [...(groups.get(key) ?? []), review]);
      }
      // Most reviewed first; getPublicReviews is newest first, so ties keep the most recent
      const top = [...groups.values()].sort((a, b) => b.length - a.length)[0];
      const quote = reviews.find(r => (r.owner_opinion ?? '').trim().length >= MIN_QUOTE_LENGTH) ?? null;
      if (!active) return;
      if (!top) {
        setState({ reviews, featured: null, quote });
        return;
      }

      const first = top[0];
      const summary = summarise(top);
      const featured: FeaturedAddress = {
        title: `${first.street} ${first.number}`,
        city: first.city ?? '',
        path: addressPath(first.city, first.street, first.number),
        reviews: top.length,
        score: summary.overall,
        deposit: summary.deposit,
        building: null,
      };
      setState({ reviews, featured, quote });

      if (first.lat != null && first.lng != null) {
        const building = await getBuildingFacts(first.lat, first.lng);
        if (active) setState(prev => (prev.featured ? { ...prev, featured: { ...prev.featured, building } } : prev));
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return state;
}
