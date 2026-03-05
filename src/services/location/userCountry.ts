import { isCountryDebugLoggingEnabled } from '../../utils/countryDebugLogging';

export const FORCED_COUNTRY_STORAGE_KEY = 'forceCountry';
const COUNTRY_CHANGE_EVENT = 'caserook:country-change';

const DOMAIN_SUFFIX_TO_COUNTRY_CODE: Array<{ suffix: string; countryCode: string }> = [
  { suffix: '.co.uk', countryCode: 'GB' },
  { suffix: '.uk', countryCode: 'GB' },
  { suffix: '.es', countryCode: 'ES' },
  { suffix: '.fr', countryCode: 'FR' },
  { suffix: '.it', countryCode: 'IT' },
  { suffix: '.de', countryCode: 'DE' },
  { suffix: '.pt', countryCode: 'PT' },
  { suffix: '.ie', countryCode: 'IE' },
];

function normalizeCountryCode(value: string | null | undefined): string | null {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(normalized) ? normalized : null;
}

function readForcedCountryCode(): string | null {
  if (typeof window === 'undefined') return null;

  const searchParams = new URLSearchParams(window.location.search);
  const fromQuery = normalizeCountryCode(searchParams.get('forceCountry'));
  if (fromQuery) return fromQuery;

  const fromStorage = normalizeCountryCode(window.localStorage.getItem(FORCED_COUNTRY_STORAGE_KEY));
  if (fromStorage) return fromStorage;

  return null;
}

export function setForcedCountryCode(countryCode: string | null): void {
  if (typeof window === 'undefined') return;

  const normalizedCode = normalizeCountryCode(countryCode);
  if (normalizedCode) {
    window.localStorage.setItem(FORCED_COUNTRY_STORAGE_KEY, normalizedCode);
  } else {
    window.localStorage.removeItem(FORCED_COUNTRY_STORAGE_KEY);
  }

  window.dispatchEvent(
    new CustomEvent(COUNTRY_CHANGE_EVENT, {
      detail: { countryCode: normalizedCode },
    })
  );
}

export function onForcedCountryChange(handler: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  window.addEventListener(COUNTRY_CHANGE_EVENT, handler);
  return () => {
    window.removeEventListener(COUNTRY_CHANGE_EVENT, handler);
  };
}

type CountryDetectionSource = 'forced' | 'api' | 'domain' | 'browser' | 'none';

type UserCountryDetection = {
  countryCode: string | null;
  source: CountryDetectionSource;
};

let detectionPromise: Promise<UserCountryDetection> | null = null;

function logDetection(source: CountryDetectionSource, payload: Record<string, unknown>) {
  if (!isCountryDebugLoggingEnabled()) return;
  console.info('[country-detect]', { source, ...payload });
}

function detectFromHostname(hostname: string): string | null {
  const normalized = hostname.toLowerCase();
  const match = DOMAIN_SUFFIX_TO_COUNTRY_CODE.find(entry => normalized.endsWith(entry.suffix));
  return match?.countryCode ?? null;
}

function detectFromLanguages(languages: string[]): string | null {
  for (const languageTag of languages) {
    const segments = languageTag.split('-');
    if (segments.length < 2) continue;
    const region = segments[segments.length - 1];
    const code = normalizeCountryCode(region);
    if (code) return code;
  }
  return null;
}

export async function detectUserCountryCode(): Promise<string | null> {
  const result = await detectUserCountry();
  return result.countryCode;
}

export async function detectUserCountry(): Promise<UserCountryDetection> {
  if (typeof window === 'undefined') return { countryCode: null, source: 'none' };

  const forcedCountry = readForcedCountryCode();
  if (forcedCountry) {
    logDetection('forced', { countryCode: forcedCountry });
    return { countryCode: forcedCountry, source: 'forced' };
  }

  if (!detectionPromise) {
    detectionPromise = (async () => {
      try {
        const response = await fetch('/api/detect-country', {
          method: 'GET',
          cache: 'no-store',
        });
        if (response.ok) {
          const payload = (await response.json()) as {
            countryCode?: string | null;
            source?: string | null;
          };
          const code = normalizeCountryCode(payload.countryCode ?? null);
          if (code) {
            logDetection('api', { countryCode: code, headerSource: payload.source ?? 'unknown' });
            return { countryCode: code, source: 'api' };
          }
        }
      } catch {
        // Fallbacks below handle network or endpoint errors.
      }

      const fromDomain = detectFromHostname(window.location.hostname);
      if (fromDomain) {
        logDetection('domain', { countryCode: fromDomain, hostname: window.location.hostname });
        return { countryCode: fromDomain, source: 'domain' };
      }

      const languages = Array.isArray(window.navigator.languages)
        ? window.navigator.languages
        : [window.navigator.language];
      const fromLanguage = detectFromLanguages(
        languages.filter((value): value is string => typeof value === 'string')
      );

      logDetection('browser', { countryCode: fromLanguage, languages });
      return { countryCode: fromLanguage, source: fromLanguage ? 'browser' : 'none' };
    })();
  }

  return detectionPromise;
}
