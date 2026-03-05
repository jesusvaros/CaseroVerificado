import type { PublicReview } from '../services/supabase/publicReviews';
import { slugify } from './slugify';

export function getReviewCitySlug(review: PublicReview): string | null {
  if (typeof review.city_slug === 'string' && review.city_slug.length > 0) {
    return review.city_slug;
  }

  if (typeof review.city === 'string' && review.city.length > 0) {
    return slugify(review.city);
  }

  return null;
}

export function getReviewCountrySlug(review: PublicReview): string | null {
  if (typeof review.country !== 'string' || review.country.length === 0) return null;
  return slugify(review.country);
}

export function buildCityReviewsPath(citySlug: string, countrySlug: string | null): string {
  if (countrySlug) {
    return `/opiniones/${countrySlug}/${citySlug}`;
  }
  return `/opiniones/${citySlug}`;
}
