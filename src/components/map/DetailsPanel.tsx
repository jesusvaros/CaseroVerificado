import type { PublicReview } from '../../services/supabase/publicReviews';
import { Link } from 'react-router-dom';
import OpinionSection from '../review/OpinionSection';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { umamiEventProps } from '../../utils/analytics';
import { getExperienceMeta, getHangarVisualMeta } from './reviewVisuals';

type Props = {
  review: PublicReview | null;
  onClose?: () => void;
};

export default function DetailsPanel({ review, onClose }: Props) {
  const hangarMeta = getHangarVisualMeta(review?.useHangar ?? null, review?.hangarStatus ?? null);
  const experienceMeta = getExperienceMeta(review?.would_recommend);

  // Trim very long opinions for compact panel; full text is in the review page
  const truncate = (text: string | null | undefined, max = 280) => {
    if (!text) return undefined;
    const t = text.trim();
    if (t.length <= max) return t;
    return t.slice(0, max - 1).trimEnd() + '…';
  };

  return (
    <div className="flex flex-col max-h-full bg-white">
      {/* Header with hangar status */}
      <div className={`${hangarMeta.headerClass} text-white px-4 py-3 flex items-start justify-between gap-3`}>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
            <hangarMeta.Icon className="h-6 w-6 text-white" aria-hidden />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-semibold leading-tight">{hangarMeta.label}</h3>
            <p className="text-xs text-white/80 leading-snug">{hangarMeta.description}</p>
          </div>
        </div>
        {review && (
          <button
            type="button"
            aria-label="Cerrar detalles"
            className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-md text-white/90 hover:text-white hover:bg-white/10"
            onClick={onClose}
            {...umamiEventProps('map:details-close')}
          >
            ✕
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-4 overflow-auto space-y-4">
        {review ? (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${experienceMeta.badgeClass}`}>
                <experienceMeta.Icon className="h-4 w-4" aria-hidden />
                {experienceMeta.label}
              </span>
              <span className="text-xs text-gray-500">
                {experienceMeta.description}
              </span>
            </div>

            {/* Dirección */}
            {review.full_address && (
              <section>
                <div className="flex items-start gap-2">
                  <MapPinIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p
                    className="text-sm text-gray-800 break-words"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                    title={review.full_address}
                  >
                    {review.full_address}
                  </p>
                </div>
              </section>
            )}

            {/* Opiniones (reutiliza estilo de la página de review) */}
            {/* On mobile, cap the visible opinion height to keep the footer link visible */}
            <div className="max-h-[26vh] overflow-auto md:max-h-none md:overflow-visible">
              <OpinionSection
                propertyOpinion={undefined}
                communityOpinion={undefined}
                ownerOpinion={truncate(review.owner_opinion, 200)}
                wouldRecommend={undefined}
                showHeader={false}
              />
            </div>

            {/* Enlace a la ficha completa (sticky en mobile para que siempre se vea) */}
            {review?.id && (
              <div className="sticky bottom-0 left-0 right-0 -mx-4 border-t bg-white/95 px-4 py-3 backdrop-blur md:static md:m-0 md:border-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-0">
                <Link
                  to={`/review/${review.id}`}
                  className="inline-flex items-center gap-1 text-sky-700 hover:text-sky-800 hover:underline"
                  {...umamiEventProps('map:details-view-review', { hasOpinion: Boolean(review.owner_opinion) })}
                >
                  Ver detalles completos
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500">
            Selecciona un punto del mapa o un item de la lista.
          </p>
        )}
      </div>
    </div>
  );
}
