import React from 'react';

export type ReviewListItem = {
  id: string | number;
  lat?: number;
  lng?: number;
  rating?: number;
  would_recommend?: number;
  texto?: string;
  comment?: string;
  created_at?: string;
};

interface ReviewsPanelProps {
  reviews: ReviewListItem[];
  hoveredId: string | number | null;
  setHoveredId: (id: string | number | null) => void;
  onSelect: (r: ReviewListItem) => void;
}

const ReviewsPanel: React.FC<ReviewsPanelProps> = ({
  reviews,
  hoveredId,
  setHoveredId,
  onSelect,
}) => {
  return (
    <div className="rounded-2xl bg-white p-3 shadow-sm border h-full flex flex-col">
      {reviews.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-center px-4">
          <div>
            <div className="text-2xl">😞</div>
            <p className="mt-2 text-lg font-semibold text-gray-700">
              Aún no hay opiniones en esta zona
            </p>
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-2 overflow-auto pr-1 flex-1">
            {reviews.map(r => {
              const id = r.id ?? `${r.lat}-${r.lng}`;
              const address = r.texto ?? '—';
              const opinion = r.comment ?? 'Sin comentario';
              const createdAt = r.created_at
                ? new Date(r.created_at).toLocaleDateString()
                : '';
              const recommended = (r.would_recommend ?? 0) >= 1;
              const headerClass = recommended ? 'bg-green-600' : 'bg-red-600';
              return (
                <li
                  key={id}
                  onMouseEnter={() => setHoveredId(id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelect(r)}
                  className={`cursor-pointer rounded-xl overflow-hidden border transition ${hoveredId === id ? 'ring-1 ring-amber-200' : ''}`}
                >
                  {/* Header */}
                  <div
                    className={`${headerClass} text-white px-3 py-2 text-sm font-semibold flex items-center justify-between`}
                  >
                    <span className="flex items-center gap-1 truncate">
                      <span>{recommended ? '👍' : '👎'}</span>
                      <span className="truncate">{address}</span>
                    </span>
                    {createdAt && (
                      <span className="text-xs opacity-90 shrink-0 ml-2">
                        {createdAt}
                      </span>
                    )}
                  </div>
                  {/* Body */}
                  <div className="px-3 py-3 bg-white">
                    <p className="text-gray-700 text-sm whitespace-pre-line break-words">
                      {opinion}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default ReviewsPanel;
