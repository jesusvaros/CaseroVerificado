import { supabaseWrapper } from './client';
import { slugify } from '../../utils/slugify';
import { getCountryNameCandidates } from '../../utils/countryNames';

export type PublicReview = {
  id: string | number;
  full_address: string | null;
  lat: number | null;
  lng: number | null;
  owner_opinion: string | null;
  would_recommend: number | null;
  city: string | null;
  city_slug: string | null;
  country: string | null;
  state: string | null;
  postal_code: string | null;
  street: string | null;
  validated_at: string | null;
  is_synthetic: boolean;
  has_full_details: boolean;
  synthetic_batch: string | null;
};

type GetPublicReviewsOptions = {
  countryCode?: string | null;
  scope?: 'country' | 'all';
};

export async function getPublicReviews(options: GetPublicReviewsOptions = {}): Promise<PublicReview[]> {
  const { countryCode = null, scope = 'all' } = options;
  const client = supabaseWrapper.getClient();
  if (!client) return [];

  let query = client
    .from('public_reviews')
    .select('id, address_details, owner_opinion, would_recommend, validated_at')
    .eq('is_public', true)
    .order('validated_at', { ascending: false });

  if (scope === 'country' && countryCode) {
    const countryCandidates = getCountryNameCandidates(countryCode);
    if (countryCandidates.length > 0) {
      query = query.in('address_details->components->>country', countryCandidates);
    }
  }

  const { data, error } = await query;

  if (error || !data) return [];

  type AddressCoordinates = {
    lat?: number | string | null;
    lng?: number | string | null;
  } | null;

  type AddressComponents = {
    city?: string | null;
    state?: string | null;
    postcode?: string | null;
    road?: string | null;
    country?: string | null;
  } | null;

  type AddressDetails = {
    fullAddress?: string | null;
    coordinates?: AddressCoordinates;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    street?: string | null;
    number?: string | null;
    door?: string | null;
    floor?: string | null;
    components?: AddressComponents;
    meta?: {
      isSynthetic?: boolean | string | null;
      synthetic?: boolean | string | null;
      hasFullDetails?: boolean | string | null;
      fullDetails?: boolean | string | null;
      syntheticBatch?: string | null;
      [key: string]: unknown;
    } | null;
  } | null;

  type Row = {
    id: string | number;
    address_details?: AddressDetails;
    owner_opinion?: string | null;
    would_recommend?: number | string | null;
    validated_at?: string | null;
  };

  const rows = data as unknown as Row[];

  const parseBooleanFlag = (
    value: boolean | string | null | undefined,
    fallback: boolean
  ): boolean => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      if (normalized === 'true' || normalized === '1' || normalized === 'yes') return true;
      if (normalized === 'false' || normalized === '0' || normalized === 'no') return false;
    }
    return fallback;
  };

  const mapped = rows.map(review => {
    const details: AddressDetails = review.address_details ?? null;
    const coords = details?.coordinates ?? null;
    const lat = coords?.lat != null ? Number(coords.lat) : null;
    const lng = coords?.lng != null ? Number(coords.lng) : null;
    const fullAddress = (details?.fullAddress ?? null) as string | null;
    const city =
      typeof details?.city === 'string'
        ? details.city
        : typeof details?.components?.city === 'string'
          ? details.components.city
          : null;
    const state =
      typeof details?.state === 'string'
        ? details.state
        : typeof details?.components?.state === 'string'
          ? details.components.state
          : null;
    const country =
      typeof details?.components?.country === 'string' ? details.components.country : null;
    const postalCode =
      typeof details?.postalCode === 'string'
        ? details.postalCode
        : typeof details?.components?.postcode === 'string'
          ? details.components.postcode
          : null;
    const street =
      typeof details?.street === 'string'
        ? details.street
        : typeof details?.components?.road === 'string'
          ? details.components.road
          : null;
    const citySlug = city ? slugify(city) : null;
    const wouldRecommend =
      review.would_recommend != null ? Number(review.would_recommend) : null;
    const meta = details?.meta ?? null;
    const isSynthetic = parseBooleanFlag(meta?.isSynthetic ?? meta?.synthetic, false);
    const hasFullDetails = parseBooleanFlag(meta?.hasFullDetails ?? meta?.fullDetails, !isSynthetic);
    const syntheticBatch =
      typeof meta?.syntheticBatch === 'string' && meta.syntheticBatch.length > 0
        ? meta.syntheticBatch
        : null;

    return {
      id: review.id,
      full_address: fullAddress,
      lat,
      lng,
      owner_opinion: review.owner_opinion ?? null,
      would_recommend: wouldRecommend,
      city: city ?? null,
      city_slug: citySlug,
      country,
      state: state ?? null,
      postal_code: postalCode ?? null,
      street: street ?? null,
      validated_at: review.validated_at ?? null,
      is_synthetic: isSynthetic,
      has_full_details: hasFullDetails,
      synthetic_batch: syntheticBatch,
    } satisfies PublicReview;
  });

  // Keep only entries with valid numeric coordinates
  return mapped.filter(
    (r): r is PublicReview & { lat: number; lng: number } =>
      typeof r.lat === 'number' && typeof r.lng === 'number'
  );
}
