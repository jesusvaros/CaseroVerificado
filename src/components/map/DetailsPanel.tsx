import type { PublicReview } from '../../services/supabase/publicReviews';

type Props = {
  review: PublicReview | null;
  onClose?: () => void;
};

export default function DetailsPanel({ review, onClose }: Props) {
  const recommended = (review?.would_recommend ?? 0) >= 1;
  const headerClass = recommended ? 'bg-green-600' : 'bg-red-600';

  return (
    <div className="flex flex-col max-h-[70vh]">
      {/* Header colored based on recommendation */}
      <div
        className={`${headerClass} text-white px-4 py-3 flex items-center justify-between gap-2`}
      >
        <span className="flex items-center gap-2 truncate text-sm font-semibold">
          <span>{recommended ? '👍' : '👎'}</span>
          <span className="truncate">
            {review?.full_address ?? 'Detalles'}
          </span>
        </span>
        {review && (
          <button
            type="button"
            aria-label="Cerrar detalles"
            className="shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-md text-white/90 hover:text-white hover:bg-white/10"
            onClick={onClose}
          >
            ✕
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-4 overflow-auto bg-white">
        {review ? (
          review.owner_opinion ? (
            <p className="text-sm text-gray-800 whitespace-pre-line break-words">
              {review.owner_opinion}
            </p>
          ) : null
        ) : (
          <p className="text-sm text-gray-500">
            Selecciona un punto del mapa o un item de la lista.
          </p>
        )}
      </div>
    </div>
  );
}
