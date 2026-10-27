import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import type { CityRent } from '../../services/publicData/cityRent';
import type { PublicReview } from '../../services/supabase/publicReviews';
import CityRentMap from './CityRentMap';
import CityAreaCard from './CityAreaCard';
import CityAreaList from './CityAreaList';
import { RENT_COLORS, perM2 } from './rentScale';
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

  return (
    <>
      <section className="mx-auto flex max-w-[1320px] flex-col gap-4 px-5 pt-12 md:px-[5%]">
        <div className="relative">
          <CityRentMap areas={rent.areas} breaks={breaks} reviewPoints={points} selectedId={selectedId} onSelect={setSelectedId} />
          {selected && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80">
              <CityAreaCard area={selected} reviews={reviewCounts.get(selected.id) ?? 0} level={rent.level} />
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-ink-muted">
          {breaks.length > 0 && (
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
        <p className="text-xs text-[#6B7465]">
          {t(rent.level === 'barrio' ? 'cityPage.sourceBarrio' : 'cityPage.sourceSection', { source: rent.source })}
        </p>
      </section>

      <section className="mx-auto flex max-w-[1320px] flex-wrap items-start gap-16 px-5 pt-16 md:px-[5%]">
        <div className="min-w-0 flex-[999_1_560px]">
          {rent.level === 'barrio' ? (
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
