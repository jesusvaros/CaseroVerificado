import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageSEO from '../seo/PageSEO';
import MapView from '../components/MapView';
import { useTranslations } from '../i18n/useTranslations';
import { getPublicReviews, type PublicReview } from '../services/supabase/publicReviews';
import { countryNameMatchesCode } from '../utils/countryMatching';
import { getReviewsScopePreference } from '../utils/reviewsScope';
import { useDetectedCountryCode } from '../services/location/useDetectedCountryCode';
import {
  getReviewCitySlug,
  getReviewCountrySlug,
} from '../utils/locationReviewRouting';

type Status = 'loading' | 'ready' | 'not-found';

function humanizeSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function CityReviewsPage() {
  const { t } = useTranslations();
  const { citySlug, countrySlug } = useParams<{ citySlug: string; countrySlug?: string }>();
  const { countryCode: userCountryCode, countryResolved } = useDetectedCountryCode();
  const [status, setStatus] = useState<Status>('loading');
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [cityName, setCityName] = useState<string>('');
  const [stateName, setStateName] = useState<string | null>(null);
  const [countryName, setCountryName] = useState<string | null>(null);
  const [resolvedCountrySlug, setResolvedCountrySlug] = useState<string | null>(countrySlug ?? null);

  useEffect(() => {
    let cancelled = false;
    if (!citySlug) {
      setStatus('not-found');
      return () => {
        cancelled = true;
      };
    }

    if (!countryResolved) {
      setStatus('loading');
      return () => {
        cancelled = true;
      };
    }

    setStatus('loading');
    const reviewsScope = getReviewsScopePreference();
    const shouldScopeByCountry =
      !countrySlug && reviewsScope === 'country' && Boolean(userCountryCode);

    getPublicReviews({
      scope: shouldScopeByCountry ? 'country' : 'all',
      countryCode: shouldScopeByCountry ? userCountryCode : null,
    })
      .then(rows => {
        if (cancelled) return;

        const cityMatches = rows.filter(review => getReviewCitySlug(review) === citySlug);
        if (cityMatches.length === 0) {
          setReviews([]);
          setStatus('not-found');
          return;
        }

        let filtered = cityMatches;
        let matchedCountrySlug: string | null = countrySlug ?? null;

        if (countrySlug) {
          filtered = cityMatches.filter(review => getReviewCountrySlug(review) === countrySlug);
        } else if (userCountryCode) {
          const sameUserCountry = cityMatches.filter(review =>
            countryNameMatchesCode(review.country, userCountryCode)
          );
          if (sameUserCountry.length > 0) {
            filtered = sameUserCountry;
            matchedCountrySlug = getReviewCountrySlug(sameUserCountry[0]);
          }
        }

        if (filtered.length === 0) {
          setReviews([]);
          setStatus('not-found');
          return;
        }

        const preferred = filtered.find(r => r.city) ?? filtered[0];
        setReviews(filtered);
        setCityName(preferred.city ?? humanizeSlug(citySlug));
        setStateName(preferred.state ?? null);
        setCountryName(preferred.country ?? null);
        setResolvedCountrySlug(matchedCountrySlug ?? getReviewCountrySlug(preferred));
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) {
          setStatus('not-found');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [citySlug, countryResolved, countrySlug, userCountryCode]);

  const reviewCount = reviews.length;
  const fallbackCityName =
    cityName || (citySlug ? humanizeSlug(citySlug) : t('cityReviews.city.defaultCity'));

  const initialView = useMemo(() => {
    if (!reviews.length) return undefined;
    const coords = reviews
      .map(review =>
        typeof review.lat === 'number' && typeof review.lng === 'number'
          ? ([review.lat, review.lng] as [number, number])
          : null
      )
      .filter(Boolean) as [number, number][];

    if (coords.length === 0) return undefined;

    const avg = coords.reduce(
      (acc, value) => {
        acc[0] += value[0];
        acc[1] += value[1];
        return acc;
      },
      [0, 0]
    );
    const lat = avg[0] / coords.length;
    const lng = avg[1] / coords.length;
    const zoom = coords.length <= 1 ? 16 : 14;
    const searchLabel = formatLocation(fallbackCityName, stateName, countryName);

    return {
      center: [lat, lng] as [number, number],
      zoom,
      searchLabel,
    };
  }, [reviews, fallbackCityName, stateName, countryName]);

  const heroSubtitle =
    reviewCount === 1
      ? t('cityReviews.city.hero.subtitleSingular', {
          count: reviewCount,
          city: fallbackCityName,
        })
      : t('cityReviews.city.hero.subtitlePlural', {
          count: reviewCount,
          city: fallbackCityName,
        });

  const seoTitle = t('cityReviews.city.seo.title', { city: fallbackCityName });
  const seoLocationSuffix = formatSeoLocationSuffix(stateName, countryName);
  const seoDescription =
    reviewCount > 0
      ? reviewCount === 1
        ? t('cityReviews.city.seo.descriptionSingular', {
            city: fallbackCityName,
            state: seoLocationSuffix,
          })
        : t('cityReviews.city.seo.descriptionPlural', {
            count: reviewCount,
            city: fallbackCityName,
            state: seoLocationSuffix,
          })
      : t('cityReviews.city.seo.descriptionFallback', { city: fallbackCityName });

  return (
    <>
      <PageSEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={
          citySlug
            ? resolvedCountrySlug
              ? `/opiniones/${resolvedCountrySlug}/${citySlug}`
              : `/opiniones/${citySlug}`
            : undefined
        }
        noindex={status === 'not-found'}
      />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-24">
        {status === 'loading' ? (
          <section className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
              {t('cityReviews.city.badge')}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-gray-900">
              {t('cityReviews.city.loading.title', { city: fallbackCityName })}
            </h1>
            <p className="mt-4 text-gray-600">{t('cityReviews.city.loading.description')}</p>
          </section>
        ) : null}

        {status === 'not-found' ? (
          <section className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
              {t('cityReviews.city.badge')}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-gray-900">
              {t('cityReviews.city.notFound.title', { city: fallbackCityName })}
            </h1>
            <p className="mt-4 text-gray-600">
              {t('cityReviews.city.notFound.description')}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/map"
                className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                {t('cityReviews.city.notFound.mapCta')}
              </Link>
              <Link
                to="/opiniones"
                className="rounded-full border border-emerald-700 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                {t('cityReviews.city.notFound.citiesCta')}
              </Link>
            </div>
          </section>
        ) : null}

        {status === 'ready' ? (
          <>
            <header className="mb-12 text-center md:text-left">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                {t('cityReviews.city.badge')}
              </p>
              <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                {t('cityReviews.city.ready.title', {
                  city: formatLocation(fallbackCityName, stateName, countryName),
                })}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-600 md:mt-3">{heroSubtitle}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
                <Link
                  to="/map"
                  className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  {t('cityReviews.city.ready.mapCta')}
                </Link>
                <Link
                  to="/opiniones"
                  className="rounded-full border border-emerald-700 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                >
                  {t('cityReviews.city.ready.citiesCta')}
                </Link>
              </div>
            </header>

            <section className="mb-12">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('cityReviews.city.testimonials.title', { city: fallbackCityName })}
                </h2>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  {t('cityReviews.city.testimonials.description')}
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {reviews.slice(0, Math.min(4, reviews.length)).map(review => (
                    <blockquote
                      key={review.id}
                      className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-left"
                    >
                      <p className="text-sm text-gray-700">
                        {review.owner_opinion ?? t('cityReviews.city.testimonials.pending')}
                      </p>
                      <footer className="mt-4 text-xs font-medium uppercase tracking-wide text-gray-600">
                        {review.full_address ?? fallbackCityName}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </section>

            {initialView ? (
              <MapView
                title={t('cityReviews.city.map.title', {
                  city: formatLocation(fallbackCityName, stateName, countryName),
                })}
                subtitle={heroSubtitle}
                initialViewOverride={initialView}
                reviews={reviews}
                autoFetch={false}
              />
            ) : (
              <section className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900">
                  {t('cityReviews.city.mapUnavailable.title', { city: fallbackCityName })}
                </h2>
                <p className="mt-3 text-gray-600">
                  {t('cityReviews.city.mapUnavailable.description')}
                </p>
                <Link
                  to="/map"
                  className="mt-6 inline-flex items-center rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  {t('cityReviews.city.mapUnavailable.cta')}
                </Link>
              </section>
            )}
          </>
        ) : null}
      </main>
    </>
  );
}

function formatLocation(city: string, stateName: string | null, countryName: string | null) {
  if (stateName && countryName) return `${city}, ${stateName}, ${countryName}`;
  if (stateName) return `${city}, ${stateName}`;
  if (countryName) return `${city}, ${countryName}`;
  return city;
}

function formatSeoLocationSuffix(stateName: string | null, countryName: string | null) {
  if (stateName && countryName) return `, ${stateName}, ${countryName}`;
  if (stateName) return `, ${stateName}`;
  if (countryName) return `, ${countryName}`;
  return '';
}
