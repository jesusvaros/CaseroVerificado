import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import { getExperienceMeta, getHangarVisualMeta } from './reviewVisuals';

export type ReviewListItem = {
  id: string | number;
  lat?: number;
  lng?: number;
  would_recommend?: number;
  texto?: string;
  comment?: string;
  useHangar?: boolean | null;
  hangarStatus?: 'active' | 'waitlist' | 'unknown' | null;
};

interface ReviewsPanelProps {
  reviews: ReviewListItem[];
  hoveredId: string | number | null;
  setHoveredId: (id: string | number | null) => void;
  onSelect: (r: ReviewListItem) => void;
  selectedId?: string | number | null;
}

const ReviewsPanel: React.FC<ReviewsPanelProps> = ({
  reviews,
  hoveredId,
  setHoveredId,
  onSelect,
  selectedId,
}) => {

  return (
    <div className="h-full min-h-0 flex flex-col p-1">
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
          <ul className="space-y-2 flex-1 overflow-auto p-1 ">
            {reviews.map(r => {
              const id = r.id ?? `${r.lat}-${r.lng}`;
              const address = r.texto ?? '—';
              const opinion = r.comment ?? 'Sin comentario';
              const isSelected = String(selectedId ?? '') === String(id);
              const hangarMeta = getHangarVisualMeta(r.useHangar, r.hangarStatus ?? null);
              const experienceMeta = getExperienceMeta(r.would_recommend);
              return (
                <li
                  key={id}
                  onMouseEnter={() => setHoveredId(id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelect(r)}
                  className={`relative cursor-pointer rounded-2xl overflow-hidden border border-gray-200 bg-white transition shadow-sm hover:shadow-md ${hoveredId === id ? 'ring-1 ring-amber-200' : ''} ${isSelected ? 'ring-2 ring-offset-2 ring-sky-500' : ''}`}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-1 ${hangarMeta.accentBarClass}`}
                    aria-hidden
                  />
                  <div className="px-4 py-3 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-xl ${hangarMeta.iconContainerClass}`}>
                        <hangarMeta.Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2 justify-between">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${hangarMeta.badgeClass}`}>
                            {hangarMeta.label}
                          </span>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${experienceMeta.badgeClass}`}>
                            <experienceMeta.Icon className="h-4 w-4" aria-hidden />
                            {experienceMeta.label}
                          </span>
                        </div>
                        <p className="text-[13px] leading-5 text-gray-500">
                          {hangarMeta.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-900 text-sm md:text-base font-medium leading-5">
                        {address}
                      </p>
                      <p className="text-gray-700 text-sm whitespace-pre-line break-words max-h-[120px] overflow-y-auto leading-relaxed">
                        {opinion}
                      </p>
                    </div>
                    <div className="flex items-center justify-end text-xs font-medium text-sky-700">
                      <span className="inline-flex items-center gap-1">
                        Ver detalles
                        <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    </div>
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
