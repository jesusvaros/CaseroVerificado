export const SUPPORTED_LOCALES = ['es', 'en', 'fr', 'de', 'pt', 'it', 'nl', 'sv'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

export const DATE_LOCALE_BY_LANGUAGE: Record<Locale, string> = {
  es: 'es-ES',
  en: 'en-US',
  fr: 'fr-FR',
  de: 'de-DE',
  pt: 'pt-PT',
  it: 'it-IT',
  nl: 'nl-NL',
  sv: 'sv-SE',
};

export function isSupportedLocale(value: string | null | undefined): value is Locale {
  if (!value) return false;
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function resolveLocale(value: string | null | undefined): Locale {
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE;
}

export function resolveLocaleFromLanguageTag(value: string | null | undefined): Locale | null {
  if (!value) return null;

  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;

  const [language] = normalized.split('-');
  return isSupportedLocale(language) ? language : null;
}

export function resolveLocaleFromBrowserLanguages(
  languages: readonly string[] | null | undefined
): Locale {
  if (!languages || languages.length === 0) return DEFAULT_LOCALE;

  for (const language of languages) {
    const locale = resolveLocaleFromLanguageTag(language);
    if (locale) return locale;
  }

  return DEFAULT_LOCALE;
}
