export function isCountryDebugLoggingEnabled(): boolean {
  if (typeof window === 'undefined') return false;

  const searchParams = new URLSearchParams(window.location.search);
  const queryFlag = searchParams.get('debugCountry') === '1';
  const storageFlag = window.localStorage.getItem('debugCountry') === '1';

  return Boolean(import.meta.env.DEV || queryFlag || storageFlag);
}
