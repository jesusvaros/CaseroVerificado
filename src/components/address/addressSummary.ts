import type { PublicReview } from '../../services/supabase/publicReviews';

export const CATEGORIES = ['owner_score', 'property_score', 'building_score', 'area_score'] as const;
export type Category = (typeof CATEGORIES)[number];

const mean = (values: number[]) => (values.length ? values.reduce((a, b) => a + b, 0) / values.length : null);

// One review's overall score: the mean of its category scores, or the older single 1-5 recommendation.
export function reviewScore(review: PublicReview): number | null {
  return mean(CATEGORIES.map(c => review[c]).filter((v): v is number => typeof v === 'number')) ?? review.would_recommend;
}

export function summarise(reviews: PublicReview[]) {
  const categories = Object.fromEntries(
    CATEGORIES.map(c => [c, mean(reviews.map(r => r[c]).filter((v): v is number => typeof v === 'number'))])
  ) as Record<Category, number | null>;
  const withDeposit = reviews.filter(r => r.deposit_returned && r.deposit_returned !== 'ongoing');
  const withRecommendation = reviews.filter(r => typeof r.would_recommend === 'number');

  return {
    overall: mean(reviews.map(reviewScore).filter((v): v is number => v != null)),
    categories,
    deposit: withDeposit.length ? { full: withDeposit.filter(r => r.deposit_returned === 'true').length, total: withDeposit.length } : null,
    recommend: withRecommendation.length
      ? { yes: withRecommendation.filter(r => (r.would_recommend ?? 0) >= 4).length, total: withRecommendation.length }
      : null,
    // Only reviews that gave both rent and size; the form allows 10-1000 m²
    rentPerM2: mean(reviews.filter(r => r.price && r.size_m2).map(r => r.price! / r.size_m2!)),
    averageRent: mean(reviews.map(r => r.price).filter((v): v is number => typeof v === 'number' && v > 0)),
  };
}

export const formatScore = (value: number) => value.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
