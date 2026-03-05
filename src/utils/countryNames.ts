const COUNTRY_NAME_CANDIDATES_BY_CODE: Record<string, string[]> = {
  ES: ['España', 'Espana', 'Spain', 'ES'],
  GB: ['United Kingdom', 'Reino Unido', 'Great Britain', 'Britain', 'UK', 'GB', 'England'],
  IE: ['Ireland', 'Irlanda', 'IE'],
  US: ['United States', 'USA', 'Estados Unidos', 'EEUU', 'US'],
  FR: ['France', 'Francia', 'FR'],
  DE: ['Germany', 'Deutschland', 'Alemania', 'DE'],
  IT: ['Italy', 'Italia', 'IT'],
  PT: ['Portugal', 'PT'],
  NL: ['Netherlands', 'Nederland', 'Países Bajos', 'NL'],
  PL: ['Poland', 'Polska', 'Polonia', 'PL'],
  SE: ['Sweden', 'Sverige', 'Suecia', 'SE'],
  RO: ['Romania', 'România', 'Rumanía', 'RO'],
};

function normalizeCountryCode(value: string | null | undefined): string | null {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(normalized) ? normalized : null;
}

function getIntlCountryNames(countryCode: string): string[] {
  const locales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'sv', 'ro'];
  const names = new Set<string>();

  locales.forEach(locale => {
    try {
      const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
      const value = displayNames.of(countryCode);
      if (typeof value === 'string' && value.length > 0) {
        names.add(value);
      }
    } catch {
      // Ignore unsupported locales.
    }
  });

  return Array.from(names);
}

export function getCountryNameCandidates(countryCode: string | null | undefined): string[] {
  const normalizedCode = normalizeCountryCode(countryCode);
  if (!normalizedCode) return [];

  const merged = new Set<string>();
  merged.add(normalizedCode);

  (COUNTRY_NAME_CANDIDATES_BY_CODE[normalizedCode] ?? []).forEach(name => merged.add(name));
  getIntlCountryNames(normalizedCode).forEach(name => merged.add(name));

  return Array.from(merged).filter(Boolean);
}
