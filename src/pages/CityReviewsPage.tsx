import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageSEO from '../seo/PageSEO';
import MapView from '../components/MapView';
import { getPublicReviews, type PublicReview } from '../services/supabase/publicReviews';
import { slugify } from '../utils/slugify';

type Status = 'loading' | 'ready' | 'not-found';

function humanizeSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function CityReviewsPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const [status, setStatus] = useState<Status>('loading');
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [cityName, setCityName] = useState<string>('');
  const [stateName, setStateName] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (citySlug) {
      setStatus('loading');
      getPublicReviews()
        .then(rows => {
          if (cancelled) return;

          const filtered = rows.filter(review => {
            const slug =
              review.city_slug ??
              (typeof review.city === 'string' && review.city.length > 0
                ? slugify(review.city)
                : null);
            return slug === citySlug;
          });

          if (filtered.length === 0) {
            setReviews([]);
            setStatus('not-found');
            return;
          }

          const preferred = filtered.find(r => r.city) ?? filtered[0];
          setReviews(filtered);
          setCityName(preferred.city ?? humanizeSlug(citySlug));
          setStateName(preferred.state ?? null);
          setStatus('ready');
        })
        .catch(() => {
          if (!cancelled) {
            setStatus('not-found');
          }
        });
    } else {
      setStatus('not-found');
    }

    return () => {
      cancelled = true;
    };
  }, [citySlug]);

  const reviewCount = reviews.length;
  const fallbackCityName = cityName || (citySlug ? humanizeSlug(citySlug) : 'Ciudad');

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
    const searchLabel = stateName ? `${fallbackCityName}, ${stateName}` : fallbackCityName;

    return {
      center: [lat, lng] as [number, number],
      zoom,
      searchLabel,
    };
  }, [reviews, fallbackCityName, stateName]);

  const heroSubtitle =
    reviewCount === 1
      ? `Tenemos 1 opinión publicada sobre alquilar en ${fallbackCityName}.`
      : `Tenemos ${reviewCount} opiniones publicadas sobre alquilar en ${fallbackCityName}.`;

  const seoTitle = `Opiniones de alquiler en ${fallbackCityName} | CaseroOk`;
  const seoDescription =
    reviewCount > 0
      ? `Descubre ${reviewCount === 1 ? 'la opinión' : `las ${reviewCount} opiniones`} de inquilinos sobre caseros y pisos en ${fallbackCityName}${
          stateName ? `, ${stateName}` : ''
        }.`
      : `Descubre opiniones de inquilinos sobre caseros y pisos en ${fallbackCityName}.`;

  return (
    <>
      <PageSEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={citySlug ? `/opiniones/${citySlug}` : undefined}
        noindex={status === 'not-found'}
      />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-24">
        {status === 'loading' ? (
          <section className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
              Opiniones por ciudad
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-gray-900">
              Opiniones sobre alquiler en {fallbackCityName}
            </h1>
            <p className="mt-4 text-gray-600">Cargando detalles y mapa…</p>
          </section>
        ) : null}

        {status === 'not-found' ? (
          <section className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
              Opiniones por ciudad
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-gray-900">
              No encontramos reseñas en {fallbackCityName}
            </h1>
            <p className="mt-4 text-gray-600">
              Aún no tenemos opiniones públicas para esta ubicación. Puedes explorar todas las reseñas
              en el mapa general o volver al listado de ciudades disponibles.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/map"
                className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Ver mapa completo
              </Link>
              <Link
                to="/opiniones"
                className="rounded-full border border-emerald-700 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Ver ciudades con opiniones
              </Link>
            </div>
          </section>
        ) : null}

        {status === 'ready' ? (
          <>
            <header className="mb-12 text-center md:text-left">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Opiniones por ciudad
              </p>
              <h1 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                Opiniones sobre alquiler en {formatCityWithState(fallbackCityName, stateName)}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-600 md:mt-3">{heroSubtitle}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
                <Link
                  to="/map"
                  className="rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  Ver mapa completo
                </Link>
                <Link
                  to="/opiniones"
                  className="rounded-full border border-emerald-700 px-5 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                >
                  Ver todas las ciudades
                </Link>
              </div>
            </header>

            <section className="mb-12">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                  Qué opinan los inquilinos de {fallbackCityName}
                </h2>
                <p className="mt-3 text-sm text-gray-600">
                  Seleccionamos testimonios reales para que puedas evaluar mejor el alquiler en esta zona.
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {reviews.slice(0, Math.min(4, reviews.length)).map(review => (
                    <blockquote
                      key={review.id}
                      className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-left"
                    >
                      <p className="text-sm text-gray-700">
                        {review.owner_opinion ?? 'Opinión pendiente de completar.'}
                      </p>
                      <footer className="mt-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                        {review.full_address ?? fallbackCityName}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </section>

            {initialView ? (
              <MapView
                title={`Mapa de opiniones en ${formatCityWithState(fallbackCityName, stateName)}`}
                subtitle={heroSubtitle}
                initialViewOverride={initialView}
                reviews={reviews}
                autoFetch={false}
              />
            ) : (
              <section className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900">
                  Aún no podemos mostrar el mapa de {fallbackCityName}
                </h2>
                <p className="mt-3 text-gray-600">
                  Las opiniones disponibles todavía no incluyen coordenadas precisas. Consulta el mapa
                  general para ver todas las reseñas.
                </p>
                <Link
                  to="/map"
                  className="mt-6 inline-flex items-center rounded-full bg-emerald-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  Abrir mapa general
                </Link>
              </section>
            )}
          </>
        ) : null}
      </main>
    </>
  );
}

function formatCityWithState(city: string, stateName: string | null) {
  return stateName ? `${city}, ${stateName}` : city;
}
