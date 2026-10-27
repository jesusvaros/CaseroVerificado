import { useEffect, useMemo, useState } from 'react';
import type { CityRent } from '../../services/publicData/cityRent';
import { getSectionSeries } from '../../services/publicData/rentHistory';
import { trendChange, type TrendPeriod } from './trendScale';

// Change of the median rent per area over the chosen period. Barrios carry their history; census
// sections load their province's history file the first time trends are shown.
export function useCityTrends(rent: CityRent, enabled: boolean, period: TrendPeriod) {
  const [sections, setSections] = useState<{ years: number[]; byCode: Map<string, (number | null)[]> } | null>(null);

  useEffect(() => {
    if (!enabled || rent.level !== 'section' || sections) return;
    let active = true;
    void getSectionSeries(rent.cumun).then(result => active && setSections(result));
    return () => {
      active = false;
    };
  }, [enabled, rent, sections]);

  return useMemo(() => {
    const years = rent.level === 'barrio' ? rent.years : sections?.years;
    const changes = new Map<number, number | null>();
    const series = new Map<number, (number | null)[]>();
    if (!enabled || !years) return { ready: false, years: [] as number[], changes, series };
    for (const area of rent.areas) {
      const s = rent.level === 'barrio' ? area.history : sections?.byCode.get(area.properties.key);
      if (s) series.set(area.id, s);
      changes.set(area.id, trendChange(s, years, period));
    }
    return { ready: true, years, changes, series };
  }, [enabled, rent, sections, period]);
}
