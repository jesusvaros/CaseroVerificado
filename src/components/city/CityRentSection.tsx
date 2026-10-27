import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import type { CityRent } from '../../services/publicData/cityRent';
import type { PublicReview } from '../../services/supabase/publicReviews';
import CityRentMap from './CityRentMap';
import CityAreaCard from './CityAreaCard';
import CityAreaList from './CityAreaList';
import { RENT_COLORS, perM2, rentColor } from './rentScale';
import { TREND_COLORS, formatChange, trendColor, trendThresholds, type TrendPeriod } from './trendScale';
import { useCityTrends } from './useCityTrends';
import TrendList from './TrendList';
import TenantUnionLink from '../address/TenantUnionLink';

interface CityRentSectionProps {
  rent: CityRent;
  breaks: number[];
  reviewCounts: Map<number, number>;
  reviews: PublicReview[];
}

const CityRentSection = ({ rent, breaks, reviewCounts, reviews }: CityRentSectionProps) => {
  const { t } = useTranslations();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = rent.areas.find(a => a.id === selectedId) ?? null;
  const points = reviews.filter(r => r.lat != null && r.lng != null).map(r => [r.lng!, r.lat!] as [number, number]);
  const province = rent.cumun.slice(0, 2);
  const [mode, setMode] = useState<'price' | 'trend'>('price');
  const [period, setPeriod] = useState<TrendPeriod>(5);
  const trends = useCityTrends(rent, mode === 'trend', period);
  const showTrend = mode === 'trend' && trends.ready;
  const colors = useMemo(
    () => rent.areas.map(a => (showTrend ? trendColor(trends.changes.get(a.id) ?? null, period) : rentColor(a.properties.p50, breaks))),
    [rent, breaks, showTrend, trends, period]
  );
  const lastYear = trends.years[trends.years.length - 1];
  const chip = (active: boolean) => `rounded-full px-4 py-2 text-sm font-bold transition-colors ${active ? 'bg-forest text-white' : 'bg-mist text-ink-soft hover:text-ink'}`;

  return (
    <>
      <section className="mx-auto flex max-w-[1320px] flex-col gap-4 px-5 pt-12 md:px-[5%]">
        {breaks.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className={chip(mode === 'price')} onClick={() => setMode('price')}>{t('cityPage.trend.modePrice')}</button>
            <button type="button" className={chip(mode === 'trend')} onClick={() => setMode('trend')}>{t('cityPage.trend.modeTrend')}</button>
            {mode === 'trend' && (
              <span className="ml-2 flex gap-1 rounded-full border border-line p-1">
                {([1, 5] as TrendPeriod[]).map(p => (
                  <button key={p} type="button" onClick={() => setPeriod(p)} className={`rounded-full px-3 py-1 text-xs font-bold ${period === p ? 'bg-lime text-forest' : 'text-ink-muted'}`}>
                    {t(`cityPage.trend.period${p}`)}
                  </button>
                ))}
              </span>
            )}
            {mode === 'trend' && !trends.ready && <span className="text-sm text-ink-muted">{t('cityPage.trend.loading')}</span>}
          </div>
        )}
        <div className="relative">
          <CityRentMap areas={rent.areas} colors={colors} reviewPoints={points} selectedId={selectedId} onSelect={setSelectedId} />
          {selected && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80">
              <CityAreaCard
                area={selected}
                reviews={reviewCounts.get(selected.id) ?? 0}
                level={rent.level}
                cumun={rent.cumun}
                city={rent.name}
                trend={showTrend ? { change: trends.changes.get(selected.id) ?? null, from: lastYear - period, to: lastYear } : null}
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-ink-muted">
          {showTrend ? (
            <div className="flex items-center gap-2">
              <span>▼ {formatChange(-trendThresholds(period)[2])}</span>
              <span className="flex overflow-hidden rounded-full">
                {TREND_COLORS.map(color => (
                  <span key={color} className="h-3 w-6" style={{ background: color }} />
                ))}
              </span>
              <span>▲ {formatChange(trendThresholds(period)[2])}</span>
              <span className="ml-2">{t('cityPage.trend.legend', { from: lastYear - period, to: lastYear })}</span>
            </div>
          ) : breaks.length > 0 && (
          <div className="flex items-center gap-2">
            <span>{breaks.length ? perM2(breaks[0]) : t('cityPage.cheaper')}</span>
            <span className="flex overflow-hidden rounded-full">
              {RENT_COLORS.map(color => (
                <span key={color} className="h-3 w-8" style={{ background: color }} />
              ))}
            </span>
            <span>{breaks.length ? perM2(breaks[breaks.length - 1]) : t('cityPage.pricier')}</span>
          </div>
          )}
          {points.length > 0 && (
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border-2 border-white bg-forest ring-1 ring-forest" />
              {t('cityPage.reviewDot')}
            </span>
          )}
        </div>
        {breaks.length > 0 && (
          <p className="text-xs text-[#6B7465]">
            {t(rent.level === 'barrio' ? 'cityPage.sourceBarrio' : 'cityPage.sourceSection', { source: rent.source })}
          </p>
        )}
      </section>

      <section className="mx-auto flex max-w-[1320px] flex-wrap items-start gap-16 px-5 pt-16 md:px-[5%]">
        <div className="min-w-0 flex-[999_1_560px]">
          {showTrend && rent.level === 'section' ? (
            <p className="text-lg text-ink-soft">{t('cityPage.trend.sectionsHint')}</p>
          ) : showTrend ? (
            <TrendList areas={rent.areas} changes={trends.changes} period={period} selectedId={selectedId} onSelect={setSelectedId} />
          ) : rent.level === 'barrio' ? (
            <CityAreaList areas={rent.areas} breaks={breaks} reviewCounts={reviewCounts} selectedId={selectedId} onSelect={setSelectedId} />
          ) : (
            <div className="flex flex-col items-start gap-6">
              <p className="text-lg text-ink-soft">{t(breaks.length ? 'cityPage.sectionsHint' : 'cityPage.noOfficialRent', { city: rent.name })}</p>
              {reviews.length === 0 && (
                <div className="flex flex-col items-start gap-4 rounded-3xl bg-mist p-7">
                  <h2 className="font-display text-2xl font-extrabold tracking-tight">{t('cityPage.firstTitle', { city: rent.name })}</h2>
                  <p className="text-ink-soft">{t('cityPage.firstText')}</p>
                  <Link to="/add-review" className="rounded-full bg-forest px-6 py-3 font-bold text-white transition-colors hover:bg-brand">
                    {t('cityPage.firstCta')}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-8">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">{t('cityPage.asideTitle', { city: rent.name })}</h2>
          <div className="flex flex-col gap-1.5">
            <strong>{t('cityPage.depositTitle')}</strong>
            <span className="text-[15px] text-ink-soft">{t('cityPage.depositText')}</span>
            <Link to="/blog/devolucion-de-la-fianza-alquiler" className="font-bold hover:text-brand">{t('cityPage.readGuide')}</Link>
          </div>
          <div className="flex flex-col gap-1.5">
            <strong>{t('cityPage.aidTitle')}</strong>
            <span className="text-[15px] text-ink-soft">{t('cityPage.aidText')}</span>
            <Link to="/blog/ayudas-al-alquiler-bono-alquiler-joven-y-plan-estatal" className="font-bold hover:text-brand">{t('cityPage.readGuide')}</Link>
          </div>
          <TenantUnionLink province={province} />
        </aside>
      </section>
    </>
  );
};

export default CityRentSection;
