import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import type { PublicReview } from '../../services/supabase/publicReviews';
import { MIN_RENTS, recentSince, tenantRent } from './tenantRent';

const euros = (value: number, digits = 0) => `${value.toLocaleString('es-ES', { maximumFractionDigits: digits })} €`;

// What CaseroOk tenants pay in the city, next to the official reference; until there are enough, an invitation to share.
const CityTenantRent = ({ city, reviews, officialPerM2, officialYear }: { city: string; reviews: PublicReview[]; officialPerM2: number | null; officialYear: number | null }) => {
  const { t } = useTranslations();
  const stats = tenantRent(reviews);
  const gap = stats.perM2 && officialPerM2 ? Math.round(((stats.perM2 - officialPerM2) / officialPerM2) * 100) : null;

  return (
    <section className="mx-auto max-w-[1320px] px-5 pt-20 md:px-[5%]">
      <div className="flex flex-col gap-4 rounded-3xl bg-lime-soft p-6 md:p-10">
        <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-[34px]">{t('cityPage.tenantRent.title', { city })}</h2>
        {stats.rent != null ? (
          <>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              <Stat value={euros(stats.rent)} label={t('cityPage.tenantRent.median', { count: stats.count })} />
              {stats.perM2 != null && <Stat value={euros(stats.perM2, 1)} label={t('cityPage.tenantRent.perM2')} />}
            </div>
            {gap != null && gap !== 0 && (
              <p className="text-[17px] font-semibold">
                {t(gap > 0 ? 'cityPage.tenantRent.above' : 'cityPage.tenantRent.below', { pct: Math.abs(gap), year: officialYear ?? '' })}
              </p>
            )}
            <p className="text-sm text-ink-muted">{t('cityPage.tenantRent.note', { year: recentSince() })}</p>
          </>
        ) : (
          <p className="max-w-2xl text-[17px] leading-relaxed text-ink-soft">{t('cityPage.tenantRent.few', { count: stats.count, min: MIN_RENTS })}</p>
        )}
        <Link to="/add-review" className="w-fit rounded-full bg-forest px-6 py-3 font-bold text-white transition-colors hover:bg-brand">
          {t('cityPage.tenantRent.cta')}
        </Link>
      </div>
    </section>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div className="font-display text-[44px] font-extrabold leading-none text-brand">{value}</div>
    <div className="mt-1 text-[15px] text-ink-muted">{label}</div>
  </div>
);

export default CityTenantRent;
