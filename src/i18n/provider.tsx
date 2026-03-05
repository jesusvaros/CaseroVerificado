import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useLocation } from 'react-router-dom';
import {
  DATE_LOCALE_BY_LANGUAGE,
  DEFAULT_LOCALE,
  isSupportedLocale,
  resolveLocale,
  resolveLocaleFromBrowserLanguages,
  type Locale,
} from './config';
import { MESSAGES } from './messages';
import { getLocaleFromPath } from './routing';
import { getPreferredLocaleByCountry } from '../services/location/countryLanguage';
import { detectUserCountryCode } from '../services/location/userCountry';

const LOCALE_STORAGE_KEY = 'caserook:locale';
const LOCALE_MANUAL_KEY = 'caserook:locale:manual';

type TranslationParams = Record<string, string | number>;

type I18nContextValue = {
  locale: Locale;
  dateLocale: string;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: TranslationParams) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getNestedValue(source: unknown, key: string): string | null {
  const value = key.split('.').reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in acc) {
      return (acc as Record<string, unknown>)[segment];
    }
    return null;
  }, source);

  return typeof value === 'string' ? value : null;
}

function interpolate(template: string, params?: TranslationParams): string {
  if (!params) return template;

  return Object.entries(params).reduce((acc, [name, value]) => {
    return acc.replaceAll(`{{${name}}}`, String(value));
  }, template);
}

function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && stored in MESSAGES) return stored as Locale;

  return resolveLocaleFromBrowserLanguages(window.navigator?.languages);
}

function readManualLocaleFlag(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(LOCALE_MANUAL_KEY) === '1';
}

function hasForcedCountryOverride(): boolean {
  if (typeof window === 'undefined') return false;
  const queryValue = new URLSearchParams(window.location.search).get('forceCountry');
  const storageValue = window.localStorage.getItem('forceCountry');
  return Boolean(
    (queryValue && /^[a-zA-Z]{2}$/.test(queryValue.trim())) ||
    (storageValue && /^[a-zA-Z]{2}$/.test(storageValue.trim()))
  );
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const routeLocale = getLocaleFromPath(location.pathname);
  const [storedLocale, setStoredLocale] = useState<Locale>(() => readStoredLocale());
  const [manualLocaleLocked, setManualLocaleLocked] = useState<boolean>(() => readManualLocaleFlag());

  const locale = routeLocale ?? storedLocale;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, storedLocale);
  }, [storedLocale]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (manualLocaleLocked) {
      window.localStorage.setItem(LOCALE_MANUAL_KEY, '1');
    } else {
      window.localStorage.removeItem(LOCALE_MANUAL_KEY);
    }
  }, [manualLocaleLocked]);

  useEffect(() => {
    if (routeLocale) return;
    if (manualLocaleLocked && !hasForcedCountryOverride()) return;

    let cancelled = false;
    detectUserCountryCode()
      .then(countryCode => {
        if (cancelled) return;
        const preferredLocale = getPreferredLocaleByCountry(countryCode);
        if (!preferredLocale) return;
        if (!isSupportedLocale(preferredLocale)) return;
        const nextLocale = resolveLocale(preferredLocale);
        if (nextLocale !== storedLocale) {
          setStoredLocale(nextLocale);
        }
      })
      .catch(() => {
        // Keep existing locale fallback.
      });

    return () => {
      cancelled = true;
    };
  }, [manualLocaleLocked, routeLocale, storedLocale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setManualLocaleLocked(true);
    setStoredLocale(nextLocale);
  }, []);

  const t = useCallback(
    (key: string, params?: TranslationParams): string => {
      const localizedValue = getNestedValue(MESSAGES[locale], key);
      if (localizedValue) return interpolate(localizedValue, params);

      const fallbackValue = getNestedValue(MESSAGES[DEFAULT_LOCALE], key);
      if (fallbackValue) return interpolate(fallbackValue, params);

      return key;
    },
    [locale]
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dateLocale: DATE_LOCALE_BY_LANGUAGE[locale],
      setLocale,
      t,
    }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider');
  }
  return context;
}
