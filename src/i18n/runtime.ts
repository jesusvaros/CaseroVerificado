import {
  DEFAULT_LOCALE,
  resolveLocale,
  resolveLocaleFromBrowserLanguages,
  type Locale,
} from './config';
import { MESSAGES } from './messages';
import { getLocaleFromPath } from './routing';

type Params = Record<string, string | number>;

function getNestedValue(source: unknown, key: string): string | null {
  const value = key.split('.').reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in acc) {
      return (acc as Record<string, unknown>)[segment];
    }
    return null;
  }, source);

  return typeof value === 'string' ? value : null;
}

function interpolate(template: string, params?: Params): string {
  if (!params) return template;

  return Object.entries(params).reduce((acc, [name, value]) => {
    return acc.replaceAll(`{{${name}}}`, String(value));
  }, template);
}

export function getRuntimeLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  const localeFromPath = getLocaleFromPath(window.location.pathname);
  if (localeFromPath) return localeFromPath;

  const storedLocale = window.localStorage.getItem('caserook:locale');
  if (storedLocale) return resolveLocale(storedLocale);

  return resolveLocaleFromBrowserLanguages(window.navigator?.languages);
}

export function tRuntime(key: string, params?: Params): string {
  const locale = getRuntimeLocale();
  const localizedValue = getNestedValue(MESSAGES[locale], key);
  if (localizedValue) return interpolate(localizedValue, params);

  const fallbackValue = getNestedValue(MESSAGES[DEFAULT_LOCALE], key);
  if (fallbackValue) return interpolate(fallbackValue, params);

  return key;
}
