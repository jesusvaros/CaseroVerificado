import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPublicReviews, type PublicReview } from '../../services/supabase/publicReviews';
import { geocodingService } from '../ui/address/geocodingService';
import { addressSlug } from '../../utils/addressPath';
import { slugify } from '../../utils/slugify';

export interface AddressLocation {
  lat: number;
  lng: number;
  postalCode: string | null;
  street: string;
  number: string;
  city: string;
}

const fromSlug = (slug: string) => slug.replace(/-/g, ' ');

// Reviews and location of /direccion/:citySlug/:addressSlug. The location comes from a review,
// from the search that linked here (?lat&lng&cp&street&number&city), or from geocoding the slug.
export function useAddressPage(citySlug: string, slug: string) {
  const [searchParams] = useSearchParams();
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [location, setLocation] = useState<AddressLocation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    (async () => {
      const all = await getPublicReviews();
      const matching = all.filter(r => r.city_slug === citySlug && addressSlug(r.street, r.number) === slug);
      const first = matching.find(r => r.lat != null && r.lng != null);
      let found: AddressLocation | null = null;

      if (first) {
        found = {
          lat: first.lat!,
          lng: first.lng!,
          postalCode: first.postal_code,
          street: first.street ?? '',
          number: first.number ?? '',
          city: first.city ?? fromSlug(citySlug),
        };
      } else if (searchParams.get('lat') && searchParams.get('lng')) {
        found = {
          lat: Number(searchParams.get('lat')),
          lng: Number(searchParams.get('lng')),
          postalCode: searchParams.get('cp'),
          street: searchParams.get('street') ?? fromSlug(slug),
          number: searchParams.get('number') ?? '',
          city: searchParams.get('city') ?? fromSlug(citySlug),
        };
      } else {
        const [result] = await geocodingService.searchAddresses(`${fromSlug(slug)}, ${fromSlug(citySlug)}`);
        const c = result?.components;
        const city = c?.city || c?.town || c?.village || '';
        if (result && c?.house_number && slugify(city) === citySlug) {
          found = {
            lat: result.geometry.lat,
            lng: result.geometry.lng,
            postalCode: c.postcode ?? null,
            street: c.road ?? fromSlug(slug),
            number: c.house_number,
            city,
          };
        }
      }

      if (!cancelled) {
        setReviews(matching);
        setLocation(found);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citySlug, slug]);

  return { reviews, location, loading };
}
