import { useEffect, useState } from 'react';
import { getZoneData, type ZoneData } from '../../services/publicData/rentZones';
import { getTensionedZone, type TensionedZone } from '../../services/publicData/tensionedZones';
import { getBuildingFacts, type BuildingFacts } from '../../services/publicData/catastro';
import { getMarket, type MarketData } from '../../services/publicData/market';

export interface AddressPublicData {
  zone: ZoneData | null;
  tensioned: TensionedZone | null;
  building: BuildingFacts | null;
  market: MarketData | null;
  loading: boolean;
}

export function useAddressPublicData(lat?: number, lng?: number, postalCode?: string | null): AddressPublicData {
  const [data, setData] = useState<AddressPublicData>({ zone: null, tensioned: null, building: null, market: null, loading: true });

  useEffect(() => {
    if (lat == null || lng == null) {
      setData({ zone: null, tensioned: null, building: null, market: null, loading: false });
      return;
    }
    let cancelled = false;
    setData(prev => ({ ...prev, loading: true }));
    Promise.all([
      getZoneData(lat, lng, postalCode).then(async zone => ({
        zone,
        tensioned: zone ? await getTensionedZone(zone.municipalityCode) : null,
        market: zone ? await getMarket(zone.municipalityCode, postalCode) : null,
      })),
      getBuildingFacts(lat, lng),
    ]).then(([{ zone, tensioned, market }, building]) => {
      if (!cancelled) setData({ zone, tensioned, building, market, loading: false });
    });
    return () => {
      cancelled = true;
    };
  }, [lat, lng, postalCode]);

  return data;
}
