const COUNTRY_LANGUAGE_TAG_BY_CODE: Record<string, string> = {
  ES: 'es-ES',
  GB: 'en-GB',
  IE: 'en-IE',
  US: 'en-US',
  FR: 'fr-FR',
  DE: 'de-DE',
  IT: 'it-IT',
  NL: 'nl-NL',
  CH: 'de-CH',
  SE: 'sv-SE',
  PT: 'pt-PT',
};

const COUNTRY_APP_LOCALE_BY_CODE: Record<string, string> = {
  ES: 'es',
  GB: 'en',
  IE: 'en',
  US: 'en',
  FR: 'fr',
  DE: 'de',
  IT: 'it',
  NL: 'nl',
  CH: 'de',
  SE: 'sv',
  PT: 'pt',
};

function normalizeCountryCode(value: string | null | undefined): string | null {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(normalized) ? normalized : null;
}

function normalizeLanguageTag(value: string | null | undefined): string | null {
  if (!value || typeof value !== 'string') return null;
  const normalized = value.trim();
  if (normalized.length < 2) return null;
  return normalized;
}

export function getPreferredLanguageTagByCountry(countryCode: string | null | undefined): string | null {
  const normalizedCode = normalizeCountryCode(countryCode);
  if (!normalizedCode) return null;
  return COUNTRY_LANGUAGE_TAG_BY_CODE[normalizedCode] ?? null;
}

export function resolveLanguageTagForCountry(
  countryCode: string | null | undefined,
  fallbackLanguageTag: string
): string {
  return (
    getPreferredLanguageTagByCountry(countryCode) ??
    normalizeLanguageTag(fallbackLanguageTag) ??
    'en-US'
  );
}

export function getPreferredLocaleByCountry(countryCode: string | null | undefined): string | null {
  const normalizedCode = normalizeCountryCode(countryCode);
  if (!normalizedCode) return null;
  return COUNTRY_APP_LOCALE_BY_CODE[normalizedCode] ?? null;
}
