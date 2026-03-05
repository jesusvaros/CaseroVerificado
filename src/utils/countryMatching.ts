const COUNTRY_CODE_ALIASES: Record<string, string[]> = {
  ES: ['spain', 'espana', 'españa', 'reino de espana', 'reino de españa'],
  GB: ['united kingdom', 'uk', 'great britain', 'britain', 'reino unido', 'inglaterra'],
  US: ['united states', 'usa', 'estados unidos', 'eeuu'],
  FR: ['france', 'francia'],
  DE: ['germany', 'alemania'],
  IT: ['italy', 'italia'],
  PT: ['portugal'],
  IE: ['ireland', 'irlanda'],
  NL: ['netherlands', 'nederland', 'paises bajos', 'países bajos', 'holland'],
  SE: ['sweden', 'sverige', 'suecia'],
  PL: ['poland', 'polska', 'polonia'],
  RO: ['romania', 'românia', 'rumania', 'rumanía'],
  AT: ['austria', 'osterreich', 'österreich'],
  CH: ['switzerland', 'suisse', 'schweiz', 'svizzera', 'suiza'],
};

function normalizeName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function getIntlCountryNames(countryCode: string): string[] {
  const locales = ['en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'sv', 'pl', 'ro'];
  const names = new Set<string>();

  locales.forEach(locale => {
    try {
      const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
      const value = displayNames.of(countryCode);
      if (typeof value === 'string' && value.length > 0) {
        names.add(value);
      }
    } catch {
      // Ignore locale support errors.
    }
  });

  return Array.from(names);
}

export function countryNameMatchesCode(countryName: string | null | undefined, countryCode: string): boolean {
  if (!countryName) return false;

  const normalizedCode = countryCode.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalizedCode)) return false;

  const normalizedTarget = normalizeName(countryName);
  const variants = new Set<string>();
  variants.add(normalizedCode.toLowerCase());

  const aliasList = COUNTRY_CODE_ALIASES[normalizedCode] ?? [];
  aliasList.forEach(alias => variants.add(normalizeName(alias)));

  getIntlCountryNames(normalizedCode).forEach(name => variants.add(normalizeName(name)));

  return variants.has(normalizedTarget);
}
