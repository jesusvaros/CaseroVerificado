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
}

export interface FeaturedBuilding {
  title: string;
  city: string;
  path: string | null;
  facts: BuildingFacts;
}

export interface HomeShowcase {
  reviews: PublicReview[];
  featured: FeaturedAddress | null;
  // undefined while Catastro is being asked, null when no reviewed address has data
  building: FeaturedBuilding | null | undefined;
  quote: PublicReview | null;
}

const MAX_BUILDING_LOOKUPS = 5;

function toFeatured(group: PublicReview[]): FeaturedAddress {
  const first = group[0];
  const summary = summarise(group);
  return {
    title: `${first.street} ${first.number}`,
    city: first.city ?? '',
    path: addressPath(first.city, first.street, first.number),
    reviews: group.length,
    score: summary.overall,
    deposit: summary.deposit,
  };
}

const MIN_QUOTE_LENGTH = 80;

// Real data for the home page illustrations: the address with most reviews (its score, deposit
// outcome and Catastro facts) and the latest review long enough to quote.
export function useHomeShowcase(): HomeShowcase {
  const [state, setState] = useState<HomeShowcase>({ reviews: [], featured: null, building: undefined, quote: null });

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
      // Most reviewed first, then those that answer the deposit question, then the best rated
      const candidates = [...groups.values()]
        .map(group => ({ group, featured: toFeatured(group) }))
        .sort(
          (a, b) =>
            b.featured.reviews - a.featured.reviews ||
            Number(!!b.featured.deposit) - Number(!!a.featured.deposit) ||
            (b.featured.score ?? 0) - (a.featured.score ?? 0)
        );
      const quote = reviews.find(r => (r.owner_opinion ?? '').trim().length >= MIN_QUOTE_LENGTH) ?? null;
      if (!active) return;
      setState({ reviews, featured: candidates[0]?.featured ?? null, building: undefined, quote });

      // Catastro has no data for some addresses (foral territories, odd geocodes): try a few
      for (const { group, featured } of candidates.slice(0, MAX_BUILDING_LOOKUPS)) {
        const first = group.find(r => r.lat != null && r.lng != null);
        const facts = first ? await getBuildingFacts(first.lat!, first.lng!) : null;
        if (!active) return;
        if (facts?.yearBuilt && facts.dwellings > 1) {
          setState(prev => ({ ...prev, building: { title: featured.title, city: featured.city, path: featured.path, facts } }));
          return;
        }
      }
      setState(prev => ({ ...prev, building: null }));
    })();
    return () => {
      active = false;
    };
  }, []);

  return state;
}
