import { useCallback, useEffect, useState } from 'react';
import {
  detectUserCountryCode,
  FORCED_COUNTRY_STORAGE_KEY,
  onForcedCountryChange,
} from './userCountry';

export function useDetectedCountryCode() {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [countryResolved, setCountryResolved] = useState(false);

  const resolveCountryCode = useCallback(async (isMounted?: () => boolean) => {
    try {
      const code = await detectUserCountryCode();
      if (isMounted && !isMounted()) return;
      setCountryCode(code);
      setCountryResolved(true);
    } catch {
      if (isMounted && !isMounted()) return;
      setCountryResolved(true);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const isMounted = () => mounted;
    const resolveIfMounted = async () => {
      await resolveCountryCode(isMounted);
    };

    void resolveIfMounted();
    const unsubscribeCountryChange = onForcedCountryChange(() => {
      void resolveIfMounted();
    });

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== FORCED_COUNTRY_STORAGE_KEY) return;
      void resolveIfMounted();
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      mounted = false;
      unsubscribeCountryChange();
      window.removeEventListener('storage', handleStorage);
    };
  }, [resolveCountryCode]);

  return { countryCode, countryResolved };
}
