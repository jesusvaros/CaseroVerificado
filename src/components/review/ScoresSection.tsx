import React from 'react';
import { SCORE_LABELS, hasScores, type ReviewScores } from './reviewScores';

// Category scores from the one-page review form (reviews sent before it have none).
const ScoresSection: React.FC<{ scores?: ReviewScores | null }> = ({ scores }) => {
  if (!hasScores(scores)) return null;

  return (
    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {SCORE_LABELS.filter(([key]) => typeof scores?.[key] === 'number').map(([key, label]) => (
        <div key={key} className="flex flex-col gap-1">
          <dt className="text-sm font-semibold text-ink-muted">{label}</dt>
          <dd className="font-display text-3xl font-extrabold text-forest">
            {scores?.[key]}
            <span className="text-base font-semibold text-ink-muted">/5</span>
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default ScoresSection;
