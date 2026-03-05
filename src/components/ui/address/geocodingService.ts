import type { FormDataType } from '../../../store/formTypes';
import type { AddressResult, HereGeocodeItem } from './types';
import { detectUserCountryCode } from '../../../services/location/userCountry';
import { resolveLanguageTagForCountry } from '../../../services/location/countryLanguage';
import { isCountryDebugLoggingEnabled } from '../../../utils/countryDebugLogging';

type GeocodingContext = {
  countryCode: string | null;
  languageTag: string;
};

let geocodingContextPromise: Promise<GeocodingContext> | null = null;

function normalizeLanguageTag(value: string | null | undefined): string | null {
  if (!value || typeof value !== 'string') return null;
  const normalized = value.trim();
  if (normalized.length < 2) return null;
  return normalized;
}

function pickNavigatorLanguage(): string {
  if (typeof window === 'undefined') return 'en-US';

  const candidates = [
    ...(Array.isArray(window.navigator.languages) ? window.navigator.languages : []),
    window.navigator.language,
  ];

  for (const candidate of candidates) {
    const valid = normalizeLanguageTag(candidate);
    if (valid) return valid;
  }

  return 'en-US';
}

function getCountryNameFromCode(countryCode: string | null): string | null {
  if (!countryCode) return null;

  try {
    const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return displayNames.of(countryCode) ?? null;
  } catch {
    return null;
  }
}

async function getGeocodingContext(): Promise<GeocodingContext> {
  if (!geocodingContextPromise) {
    geocodingContextPromise = (async () => {
      const countryCode = await detectUserCountryCode();
      const languageTag = resolveLanguageTagForCountry(countryCode, pickNavigatorLanguage());
      if (isCountryDebugLoggingEnabled()) {
        console.info('[geocoding-context] resolved', { countryCode, languageTag });
      }
      return { countryCode, languageTag };
    })();
  }

  return geocodingContextPromise;
}

/**
 * Service for handling geocoding operations with the HERE API
 */
export const geocodingService = {
  /**
   * Search for addresses using the HERE API
   * @param searchText The text to search for
   * @returns Promise with the search results
   */
  async searchAddresses(searchText: string): Promise<AddressResult[]> {
    if (searchText.length < 3) {
      return [];
    }

    try {
      const { countryCode, languageTag } = await getGeocodingContext();
      const params: Record<string, string> = {
        q: searchText,
        lang: languageTag,
        limit: '10',
      };
      if (countryCode) {
        params.in = `countryCode:${countryCode}`;
      }
      if (isCountryDebugLoggingEnabled()) {
        console.info('[geocoding-search] request', {
          countryCode,
          languageTag,
          query: searchText,
          in: params.in ?? null,
        });
      }

      // Use server-side proxy for cost control
      const response = await fetch('/api/geocode-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: 'geocode',
          params,
        })
      });

      const data = await response.json();

      // Handle usage limits or errors
      if (!response.ok) {
        if (data.fallback) {
          console.warn('HERE API limit reached, using fallback behavior');
          return []; // Return empty results as fallback
        }
        throw new Error(data.error || 'Geocoding request failed');
      }

      if (!data.items) {
        console.error('HERE API error or empty response', data);
        return [];
      }

      // Map HERE items to AddressResult shape expected by the component
      const processedResults: AddressResult[] = (data.items as HereGeocodeItem[]).map(item => {
        const addr = item.address || {};
        return {
          formatted: addr.label,
          geometry: {
            lat: item.position.lat,
            lng: item.position.lng,
          },
          components: {
            road: addr.street,
            house_number: addr.houseNumber,
            postcode: addr.postalCode,
            city: addr.city,
            state: addr.state,
            country: addr.countryName,
          },
          annotations: {
            geohash: '', // HERE API doesn't provide geohash; left empty
          },
        } as AddressResult;
      });

      return processedResults;
    } catch (err) {
      console.error('Error fetching addresses:', err);
      return [];
    }
  },

  /**
   * Get coordinates for a specific address with house number
   * @param street Street name
   * @param houseNumber House number
   * @param city City name
   * @returns Promise with the updated address result including coordinates
   */
  async getCoordinatesForAddress(
    currentDetails: FormDataType['addressDetails'],
    newNumber: string
  ): Promise<FormDataType['addressDetails']> {
    const street = currentDetails?.street;
    const city = currentDetails?.city || '';
    if (!street || !newNumber.trim()) {
      return {
        ...currentDetails,
        number: newNumber,
      };
    }

    const { countryCode, languageTag } = await getGeocodingContext();
    const countryLabel =
      (typeof currentDetails?.components?.country === 'string'
        ? currentDetails.components.country
        : null) ?? getCountryNameFromCode(countryCode);

    const fullAddressQuery = [`${street} ${newNumber}`.trim(), city.trim(), countryLabel]
      .filter(Boolean)
      .join(', ');
    const params: Record<string, string> = {
      q: fullAddressQuery,
      lang: languageTag,
      limit: '1',
    };
    if (countryCode) {
      params.in = `countryCode:${countryCode}`;
    }
    if (isCountryDebugLoggingEnabled()) {
      console.info('[geocoding-address] request', {
        countryCode,
        languageTag,
        query: fullAddressQuery,
        in: params.in ?? null,
      });
    }

    // Use server-side proxy for cost control
    const response = await fetch('/api/geocode-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint: 'geocode',
        params,
      })
    });

    const data = await response.json();

    // Handle usage limits or errors
    if (!response.ok) {
      if (data.fallback) {
        console.warn('HERE API limit reached for address coordinates');
        return {
          ...currentDetails,
          number: newNumber,
        };
      }
      throw new Error(data.error || 'Geocoding request failed');
    }

    if (data.items && data.items.length > 0) {
      const item = data.items[0];
      const addr = item.address;

      return {
        street: addr.street,
        number: addr.houseNumber || newNumber,
        city: addr.city,
        postalCode: addr.postalCode,
        state: addr.state,
        fullAddress: addr.label,
        coordinates: {
          lat: item.position.lat,
          lng: item.position.lng,
        },
        components: {
          road: addr.street,
          house_number: addr.houseNumber,
          postcode: addr.postalCode,
          city: addr.city,
          state: addr.state,
          country: addr.countryName,
        },
      };
    }

    return {
      ...currentDetails,
      number: newNumber,
    };
  },

  /**
   * Reverse geocode coordinates to a formatted address (HERE API)
   */
  async reverseGeocode(lat: number, lng: number): Promise<AddressResult | null> {
    try {
      const { countryCode, languageTag } = await getGeocodingContext();
      if (isCountryDebugLoggingEnabled()) {
        console.info('[geocoding-reverse] request', {
          countryCode,
          languageTag,
          at: `${lat},${lng}`,
        });
      }

      // Use server-side proxy for cost control
      const response = await fetch('/api/geocode-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: 'revgeocode',
          params: {
            at: `${lat},${lng}`,
            lang: languageTag,
            limit: '1'
          }
        })
      });

      const data = await response.json();

      // Handle usage limits or errors
      if (!response.ok) {
        if (data.fallback) {
          console.warn('HERE API reverse geocode limit reached');
          return null;
        }
        throw new Error(data.error || 'Reverse geocoding request failed');
      }
      const item: HereGeocodeItem | undefined = data.items?.[0];
      if (!item) return null;
      const addr: Partial<HereGeocodeItem['address']> = item.address ?? {};
      const result: AddressResult = {
        formatted: addr.label,
        geometry: { lat: item.position.lat, lng: item.position.lng },
        components: {
          road: addr.street,
          house_number: addr.houseNumber,
          postcode: addr.postalCode,
          city: addr.city,
          state: addr.state,
          country: addr.countryName,
        },
        annotations: { geohash: '' },
      } as AddressResult;
      return result;
    } catch (e) {
      console.error('Reverse geocode failed', e);
      return null;
    }
  },
};
