import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '../seo/PageSEO';
import { useTranslations } from '../i18n/useTranslations';
import { getPublicReviews, type PublicReview } from '../services/supabase/publicReviews';
import { resolveLanguageTagForCountry } from '../services/location/countryLanguage';
import { countryNameMatchesCode } from '../utils/countryMatching';
import { isCountryDebugLoggingEnabled } from '../utils/countryDebugLogging';
import { getReviewsScopePreference } from '../utils/reviewsScope';
import { useDetectedCountryCode } from '../services/location/useDetectedCountryCode';
import {
  buildCityReviewsPath,
  getReviewCitySlug,
  getReviewCountrySlug,
} from '../utils/locationReviewRouting';

type CitySummary = {
  slug: string;
  name: string;
  state: string | null;
  country: string | null;
  countrySlug: string | null;
  count: number;
};

function humanizeSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function CityReviewsIndexPage() {
  const { locale, t } = useTranslations();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const { countryCode: userCountryCode, countryResolved } = useDetectedCountryCode();
  const reviewsScope = getReviewsScopePreference();

  useEffect(() => {
    let cancelled = false;
    if (!countryResolved) return () => {
      cancelled = true;
    };

    setLoading(true);
    const shouldScopeByCountry = reviewsScope === 'country' && Boolean(userCountryCode);
    getPublicReviews({
      scope: shouldScopeByCountry ? 'country' : 'all',
      countryCode: shouldScopeByCountry ? userCountryCode : null,
    })
      .then(rows => {
        if (cancelled) return;
        setReviews(rows);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setReviews([]);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [countryResolved, reviewsScope, userCountryCode]);

  const scopedReviews = useMemo(() => {
    if (reviewsScope !== 'country') return reviews;
    if (!userCountryCode) return reviews;

    return reviews.filter(review => countryNameMatchesCode(review.country, userCountryCode));
  }, [reviews, reviewsScope, userCountryCode]);

  const citySummaries = useMemo(() => {
    const grouped = new Map<string, CitySummary>();
    scopedReviews.forEach(review => {
      const slug = getReviewCitySlug(review);
      if (!slug) return;

      const country = review.country ?? null;
      const countrySlug = getReviewCountrySlug(review);
      const groupKey = `${countrySlug ?? 'unknown'}::${slug}`;
      const name = review.city ?? humanizeSlug(slug);
      const state = review.state ?? null;
      const existing = grouped.get(groupKey);
      if (existing) {
        existing.count += 1;
        if (!existing.state && state) existing.state = state;
      } else {
        grouped.set(groupKey, { slug, name, state, country, countrySlug, count: 1 });
      }
    });

    return Array.from(grouped.values()).sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.name.localeCompare(b.name);
    });
  }, [scopedReviews]);

  const totalCities = citySummaries.length;
  const totalReviews = scopedReviews.length;
  const citiesSummary =
    totalCities === 1
      ? t('cityReviews.index.stats.citySingular', { count: totalCities })
      : t('cityReviews.index.stats.cityPlural', { count: totalCities });
  const reviewsSummary =
    totalReviews === 1
      ? t('cityReviews.index.stats.reviewSingular', { count: totalReviews })
      : t('cityReviews.index.stats.reviewPlural', { count: totalReviews });

  const userCountryLabel = useMemo(() => {
    if (!userCountryCode) return null;

    try {
      const display = new Intl.DisplayNames([locale, 'en'], { type: 'region' });
      return display.of(userCountryCode) ?? userCountryCode;
    } catch {
      return userCountryCode;
    }
  }, [locale, userCountryCode]);

  const userLanguageLabel = useMemo(() => {
    if (!userCountryCode) return null;

    const fallbackLanguageTag = locale === 'es' ? 'es-ES' : 'en-US';
    const preferredLanguageTag = resolveLanguageTagForCountry(userCountryCode, fallbackLanguageTag);
    const languageCode = preferredLanguageTag.split('-')[0] ?? preferredLanguageTag;

    try {
      const display = new Intl.DisplayNames([locale, 'en'], { type: 'language' });
      return display.of(languageCode) ?? languageCode;
    } catch {
      return languageCode;
    }
  }, [locale, userCountryCode]);

  const isLoading = loading || !countryResolved;

  useEffect(() => {
    if (!isCountryDebugLoggingEnabled()) return;
    if (!countryResolved) return;

    console.info('[opiniones-country-scope]', {
      reviewsScope,
      detectedCountryCode: userCountryCode,
      rawReviews: reviews.length,
      reviewsWithCountry: reviews.filter(review => Boolean(review.country)).length,
      scopedReviews: scopedReviews.length,
      totalCities,
      userCountryLabel,
      userLanguageLabel,
    });
  }, [
    countryResolved,
    reviewsScope,
    reviews,
    scopedReviews.length,
    totalCities,
    userCountryCode,
    userCountryLabel,
    userLanguageLabel,
  ]);

  return (
    <>
      <PageSEO
        title={t('cityReviews.index.seo.title')}
        description={t('cityReviews.index.seo.description')}
        canonicalPath="/opiniones"
      />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-24">
        <header className="mb-12 text-center md:text-left">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            {t('cityReviews.index.hero.badge')}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            {t('cityReviews.index.hero.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600 md:mt-3">
            {t('cityReviews.index.hero.description')}
          </p>
          {userCountryLabel ? (
            <p className="mt-3 text-sm font-medium text-gray-600">
              {userLanguageLabel
                ? t('cityReviews.index.countryLanguageScope', {
                    country: userCountryLabel,
                    language: userLanguageLabel,
                  })
                : t('cityReviews.index.countryScope', { country: userCountryLabel })}
            </p>
          ) : null}
        </header>

        {isLoading ? (
          <section className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <p className="text-gray-600">{t('cityReviews.index.loading')}</p>
          </section>
        ) : null}

        {!isLoading && totalCities === 0 ? (
          <section className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              {userCountryLabel
                ? t('cityReviews.index.empty.countryTitle', { country: userCountryLabel })
                : t('cityReviews.index.empty.title')}
            </h2>
            <p className="mt-3 text-gray-600">
              {userCountryLabel
                ? t('cityReviews.index.empty.countryDescription', { country: userCountryLabel })
                : t('cityReviews.index.empty.description')}
            </p>
            <Link
              to="/map"
              className="mt-6 inline-flex items-center rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              {t('cityReviews.index.empty.mapCta')}
            </Link>
          </section>
        ) : null}

        {!isLoading && totalCities > 0 ? (
          <section>
            <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span>
                {citiesSummary}
              </span>
              <span>•</span>
              <span>
                {reviewsSummary}
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {citySummaries.map(city => (
                <Link
                  key={`${city.countrySlug ?? 'unknown'}-${city.slug}`}
                  to={buildCityReviewsPath(city.slug, city.countrySlug)}
                  className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="font-semibold uppercase tracking-wide text-emerald-700">
                      {city.count === 1
                        ? t('cityReviews.index.card.reviewSingular', { count: city.count })
                        : t('cityReviews.index.card.reviewPlural', { count: city.count })}
                    </span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-gray-900 transition-colors group-hover:text-emerald-700">
                    {city.name}
                    {city.state ? <span className="text-gray-600">, {city.state}</span> : null}
                    {!city.state && city.country ? <span className="text-gray-600">, {city.country}</span> : null}
                  </h2>
                  <p className="mt-3 text-sm text-gray-600">
                    {t('cityReviews.index.card.description', { city: city.name })}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    {t('cityReviews.index.card.cta')}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
