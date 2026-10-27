import { useEffect, useState } from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import { getMarketHistory, type MarketHistory, type MarketPoint } from '../../services/publicData/marketHistory';
import HistoryChart, { type Series } from './HistoryChart';

// Same colours as the SERPAVI chart: green for the closest area, orange for the municipality
const POSTCODE = '#1F7A4D';
const MUNICIPALITY = '#C2742A';

// Rent in contracts signed each year, where the region publishes it: fresher than SERPAVI.
const NewContractsSection = ({ municipality, postalCode, place }: { municipality: string; postalCode?: string | null; place: string }) => {
  const { t } = useTranslations();
  const [data, setData] = useState<MarketHistory | null>(null);

  useEffect(() => {
    void getMarketHistory(municipality, postalCode).then(setData);
  }, [municipality, postalCode]);

  if (!data) return null;
  const years = [...new Set([...(data.municipality ?? []), ...(data.postcode ?? [])].map(p => p[0]))].sort();
  const partial = new Set([...(data.municipality ?? []), ...(data.postcode ?? [])].filter(p => p[3]).map(p => p[0]));
  const values = (points: MarketPoint[] | null) => years.map(y => points?.find(p => p[0] === y)?.[1] ?? null);
  const series: Series[] = [
    data.postcode && { key: 'cp', label: t('explorer.market.postcode', { cp: postalCode ?? '' }), color: POSTCODE, values: values(data.postcode) },
    data.municipality && { key: 'm', label: place, color: MUNICIPALITY, values: values(data.municipality) },
  ].filter(Boolean) as Series[];

  const main = data.postcode ?? data.municipality!;
  const last = main[main.length - 1];
  const prevFull = [...main].reverse().find(p => p[0] < last[0]);
  const change = prevFull ? ((last[1] - prevFull[1]) / prevFull[1]) * 100 : null;

  return (
    <section className="flex flex-col gap-2 rounded-2xl border-2 border-lime p-5">
      <h3 className="font-display text-xl font-extrabold">{t('explorer.market.title')}</h3>
      <p className="text-[17px]">
        {t('explorer.market.summary', { year: last[0], eur: last[1].toLocaleString('es-ES'), n: last[2].toLocaleString('es-ES') })}
        {change != null && (
          <strong className={change > 0 ? 'text-coral-ink' : 'text-forest'}>
            {' '}{t('explorer.market.change', { change: `${change > 0 ? '+' : ''}${Math.round(change)} %`, year: prevFull![0] })}
          </strong>
        )}
      </p>
      <HistoryChart labels={years.map(y => (partial.has(y) ? `${y}*` : y))} series={series} unit="€/mes" decimals={0} />
      <p className="text-sm text-ink-muted">{t(`explorer.market.note.${data.region}`)}</p>
    </section>
  );
};

export default NewContractsSection;
