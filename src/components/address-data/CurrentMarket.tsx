import type { MarketData } from '../../services/publicData/market';
import { useTranslations } from '../../i18n/useTranslations';

const euros = (v: number) => `${Math.round(v).toLocaleString('es-ES')} €`;

// Fresher than SERPAVI: this year's rental deposits (Valencia, Catalonia) and this quarter's sales.
const CurrentMarket = ({ market, place }: { market: MarketData; place: string }) => {
  const { t } = useTranslations();
  const rows = [
    market.postcodeRent && {
      label: t('market.postcodeRent'),
      value: `${euros(market.postcodeRent[0])}${t('market.perMonth')}`,
      note: t('market.depositsNote', { n: market.postcodeRent[1], period: market.postcodeRent[2] }),
    },
    !market.postcodeRent && market.rent && {
      label: t('market.cityRent', { place }),
      value: `${euros(market.rent[0])}${t('market.perMonth')}`,
      note: t(market.rent[3] === 'incasol' ? 'market.incasolNote' : 'market.depositsNote', { n: market.rent[1], period: market.rent[2] }),
    },
    market.sale && {
      label: t('market.sale', { place }),
      value: `${euros(market.sale[0])}/m²`,
      note: t('market.saleNote', { period: market.sale[2] }),
    },
    market.deals && {
      label: t('market.deals'),
      value: market.deals[1].toLocaleString('es-ES'),
      note: t('market.dealsNote', { period: market.deals[2] }),
    },
  ].filter(Boolean) as { label: string; value: string; note: string }[];
  if (rows.length === 0) return null;

  return (
    <section className="flex flex-col gap-3.5">
      <h2 className="font-display text-2xl font-extrabold tracking-tight">{t('market.title')}</h2>
      <dl className="flex flex-col">
        {rows.map((row, i) => (
          <div key={row.label} className={`flex flex-col gap-0.5 py-3 ${i < rows.length - 1 ? 'border-b border-line' : ''}`}>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-ink-muted">{row.label}</dt>
              <dd className="shrink-0 font-bold">{row.value}</dd>
            </div>
            <span className="text-xs text-[#6B7465]">{row.note}</span>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default CurrentMarket;
