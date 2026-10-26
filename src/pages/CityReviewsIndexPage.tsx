import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '../seo/PageSEO';
import { useTranslations } from '../i18n/useTranslations';
import { getPublicReviews } from '../services/supabase/publicReviews';
import { canonicalCitySlug, topMunicipalities, type Municipality } from '../services/publicData/municipalities';
import { getReviewCitySlug } from '../utils/locationReviewRouting';
import CitySearch from '../components/city/CitySearch';

const TOP = 30;

// /opiniones: search any of the 2,601 municipalities with official rent data, or pick a big city.
export default function CityReviewsIndexPage() {
  const { t } = useTranslations();
  const [cities, setCities] = useState<Municipality[]>([]);
  const [reviewCounts, setReviewCounts] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    let active = true;
    topMunicipalities(TOP).then(list => active && setCities(list));
    getPublicReviews().then(async reviews => {
      const counts = new Map<string, number>();
      for (const review of reviews) {
        const slug = await canonicalCitySlug(getReviewCitySlug(review) ?? '');
        if (slug) counts.set(slug, (counts.get(slug) ?? 0) + 1);
      }
      if (active) setReviewCounts(counts);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="bg-white text-ink">
      <PageSEO title={t('cityIndex.seoTitle')} description={t('cityIndex.seoDescription')} canonicalPath="/opiniones" />
      <section className="bg-forest pt-[76px] text-white">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-5 px-5 pb-14 pt-12 md:px-[5%]">
          <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-none tracking-tight md:text-6xl">{t('cityIndex.title')}</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-[#CFE5C6]">{t('cityIndex.subtitle')}</p>
          <CitySearch dark />
        </div>
      </section>
      <section className="mx-auto max-w-[1320px] px-5 py-16 md:px-[5%]">
        <h2 className="mb-6 font-display text-3xl font-extrabold tracking-tight">{t('cityIndex.listTitle')}</h2>
        <ol className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map(city => {
            const reviews = reviewCounts.get(city.slug) ?? 0;
            return (
              <li key={city.cumun}>
                <Link to={`/opiniones/espana/${city.slug}`} className="group flex items-baseline justify-between gap-3 border-b border-line py-4">
                  <span className="font-semibold group-hover:text-brand">{city.name}</span>
                  <span className="shrink-0 text-sm text-ink-muted">
                    <strong className="font-display text-base text-ink">{city.p50.toLocaleString('es-ES')} €/m²</strong>
                    {reviews > 0 && <span className="ml-2 text-brand">· {t(reviews === 1 ? 'cityPage.oneReview' : 'cityPage.reviews', { count: reviews })}</span>}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 text-xs text-[#6B7465]">{t('cityIndex.source')}</p>
      </section>
    </div>
  );
}
