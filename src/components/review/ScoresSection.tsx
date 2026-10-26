import React from 'react';
import { SCORE_LABELS, hasScores, type ReviewScores } from './reviewScores';

const BAR_COLORS = ['#1F7A4D', '#45B06A', '#8FD46B', '#C8F169'];

// Category scores as the bars from the address design.
const ScoresSection: React.FC<{ scores?: ReviewScores | null }> = ({ scores }) => {
  if (!hasScores(scores)) return null;

  return (
    <div className="flex flex-col gap-4">
      {SCORE_LABELS.map(([key, label], i) => {
        const value = scores?.[key];
        if (typeof value !== 'number') return null;
        return (
          <div key={key} className="flex items-center gap-4">
            <span className="w-24 font-semibold">{label}</span>
            <span className="h-3 flex-1 overflow-hidden rounded-md bg-[#EEF3E8]">
              <span className="block h-full rounded-md" style={{ width: `${(value / 5) * 100}%`, background: BAR_COLORS[i] }} />
            </span>
            <strong className="w-8 font-display text-xl">{value}</strong>
          </div>
        );
      })}
    </div>
  );
};

export default ScoresSection;
