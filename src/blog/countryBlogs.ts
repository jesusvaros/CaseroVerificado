export const BLOG_COUNTRY_CODES = ['ES', 'GB', 'FR', 'DE', 'IT', 'NL', 'CH', 'SE', 'PT'] as const;

export type BlogCountryCode = (typeof BLOG_COUNTRY_CODES)[number];

const BLOG_COUNTRY_CODE_SET = new Set<string>(BLOG_COUNTRY_CODES);

function normalizeCountryCode(value: string | null | undefined): string | null {
  if (!value) return null;
  const normalized = value.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(normalized) ? normalized : null;
}

export function normalizeBlogCountryCode(value: string | null | undefined): BlogCountryCode | null {
  const normalized = normalizeCountryCode(value);
  if (!normalized) return null;
  return BLOG_COUNTRY_CODE_SET.has(normalized) ? (normalized as BlogCountryCode) : null;
}

export function resolvePostCountryCode(value: string | null | undefined): BlogCountryCode {
  return normalizeBlogCountryCode(value) ?? 'ES';
}

export function getCountryDisplayLabel(countryCode: BlogCountryCode, locale: string): string {
  try {
    const displayNames = new Intl.DisplayNames([locale, 'en'], { type: 'region' });
    return displayNames.of(countryCode) ?? countryCode;
  } catch {
    return countryCode;
  }
}
