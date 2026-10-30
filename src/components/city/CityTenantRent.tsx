import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';
import type { PublicReview } from '../../services/supabase/publicReviews';

// Below this many rents a median would point at a single tenant's flat
const MIN_RENTS = 3;
// Only rents paid in the last few years say what the city costs today
const RECENT_YEARS = 2;

const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

const euros = (value: number, digits = 0) => `${value.toLocaleString('es-ES', { maximumFractionDigits: digits })} €`;

// What CaseroOk tenants pay in the city, next to the official reference; until there are enough, an invitation to share.
const CityTenantRent = ({ city, reviews, officialPerM2, officialYear }: { city: string; reviews: PublicReview[]; officialPerM2: number | null; officialYear: number | null }) => {
  const { t } = useTranslations();
  const since = new Date().getFullYear() - RECENT_YEARS;
  // Whole flats only: a room's rent says nothing about the flat's price
  const flats = reviews.filter(r => !r.is_synthetic && r.rental_type !== 'room' && (r.price ?? 0) > 0 && (r.end_year == null || r.end_year >= since));
  const perM2 = flats.filter(r => (r.size_m2 ?? 0) > 0).map(r => r.price! / r.size_m2!);
  const enough = flats.length >= MIN_RENTS;
  const tenantPerM2 = perM2.length >= MIN_RENTS ? median(perM2) : null;
  const gap = tenantPerM2 && officialPerM2 ? Math.round(((tenantPerM2 - officialPerM2) / officialPerM2) * 100) : null;

  return (
    <section className="mx-auto max-w-[1320px] px-5 pt-20 md:px-[5%]">
      <div className="flex flex-col gap-4 rounded-3xl bg-lime-soft p-6 md:p-10">
        <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-[34px]">{t('cityPage.tenantRent.title', { city })}</h2>
        {enough ? (
          <>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              <Stat value={euros(median(flats.map(r => r.price!)))} label={t('cityPage.tenantRent.median', { count: flats.length })} />
              {tenantPerM2 && <Stat value={euros(tenantPerM2, 1)} label={t('cityPage.tenantRent.perM2')} />}
            </div>
            {gap != null && gap !== 0 && (
              <p className="text-[17px] font-semibold">
                {t(gap > 0 ? 'cityPage.tenantRent.above' : 'cityPage.tenantRent.below', { pct: Math.abs(gap), year: officialYear ?? '' })}
              </p>
            )}
            <p className="text-sm text-ink-muted">{t('cityPage.tenantRent.note', { year: since })}</p>
          </>
        ) : (
          <p className="max-w-2xl text-[17px] leading-relaxed text-ink-soft">{t('cityPage.tenantRent.few', { count: flats.length, min: MIN_RENTS })}</p>
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
