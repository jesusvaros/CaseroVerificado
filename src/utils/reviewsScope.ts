export type ReviewsScope = 'country' | 'all';

function normalizeScope(value: string | null | undefined): ReviewsScope | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (normalized === 'all') return 'all';
  if (normalized === 'country') return 'country';
  return null;
}

export function getReviewsScopePreference(): ReviewsScope {
  if (typeof window === 'undefined') return 'country';

  const searchParams = new URLSearchParams(window.location.search);
  const fromQuery = normalizeScope(searchParams.get('reviewsScope'));
  if (fromQuery) return fromQuery;

  const fromStorage = normalizeScope(window.localStorage.getItem('reviewsScope'));
  if (fromStorage) return fromStorage;

  return 'country';
}
