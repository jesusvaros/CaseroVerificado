import { useState } from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import ZoneDataExplorer from '../data-explorer/ZoneDataExplorer';
import type { CityArea } from '../../services/publicData/cityRent';
import { perM2 } from './rentScale';

// What the map shows for the tapped area: rent per m², a 60 m² estimate and how many reviews it has.
const FEW_CONTRACTS = 50;

interface Props {
  area: CityArea;
  reviews: number;
  level: 'barrio' | 'section';
  cumun: string;
  city: string;
}

const CityAreaCard = ({ area, reviews, level, cumun, city }: Props) => {
  const { t } = useTranslations();
  const [exploring, setExploring] = useState(false);
  const { name, district, p25, p50, p75, n } = area.properties;

  return (
    <div className="flex flex-col gap-1 rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5">
      <strong className="font-display text-xl">{name ?? t('cityPage.section')}</strong>
      {district && <span className="text-sm text-ink-muted">{district}</span>}
      {p50 != null ? (
        <>
          <span className="font-display text-2xl font-extrabold text-forest">{perM2(p50)}</span>
          <span className="text-sm text-ink-muted">
            {t('cityPage.for60', { amount: Math.round(p50 * 60).toLocaleString('es-ES') })}
            {p25 != null && p75 != null && ` · ${t('cityPage.range', { low: Math.round(p25 * 60).toLocaleString('es-ES'), high: Math.round(p75 * 60).toLocaleString('es-ES') })}`}
          </span>
          {n > 0 && n < FEW_CONTRACTS && <span className="text-sm font-semibold text-coral-ink">{t('cityPage.fewContracts', { n })}</span>}
        </>
      ) : (
        <span className="text-sm text-ink-muted">{t('cityPage.noData')}</span>
      )}
      <span className="text-sm text-ink-muted">
        {reviews === 0 ? t('cityPage.noReviews') : t(reviews === 1 ? 'cityPage.oneReview' : 'cityPage.reviews', { count: reviews })}
        {level === 'barrio' && ' · ' + t('cityPage.barrioNote')}
      </span>
      {/* Barrios are our own aggregation, so their history is the municipality's */}
      <button type="button" onClick={() => setExploring(true)} className="mt-1 w-fit text-sm font-bold text-brand hover:text-forest">
        {t('explorer.open')} →
      </button>
      {exploring && (
        <ZoneDataExplorer municipality={cumun} section={level === 'section' ? area.properties.key : null} place={name ?? city} onClose={() => setExploring(false)} />
      )}
    </div>
  );
};

export default CityAreaCard;
