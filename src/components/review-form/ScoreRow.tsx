import type { Score } from '../../store/formTypes';
import { useTranslations } from '../../i18n/useTranslations';

const SCORES: Score[] = [1, 2, 3, 4, 5];

interface ScoreRowProps {
  label: string;
  value?: Score;
  onChange: (value: Score) => void;
  optional?: boolean;
  hasError?: boolean;
}

const ScoreRow = ({ label, value, onChange, optional = false, hasError = false }: ScoreRowProps) => {
  const { t } = useTranslations();

  return (
    <div role="radiogroup" aria-label={label} className="flex items-center gap-3">
      <span className="flex w-24 shrink-0 flex-col">
        <span className={`font-semibold leading-tight ${hasError ? 'text-coral-ink' : ''}`}>{label}</span>
        {optional && <span className="text-xs leading-tight text-[#8A9384]">{t('addReview.v2.optional')}</span>}
      </span>
      {/* The five numbers always share one line: on narrow phones they shrink instead of wrapping */}
      <div className="flex min-w-0 flex-1 gap-2 sm:flex-none sm:gap-3">
        {SCORES.map(score => {
          const selected = value === score;
          return (
            <button
              key={score}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={t('addReview.v2.scores.aria', { label, score })}
              onClick={() => onChange(score)}
              className={`aspect-square min-w-0 max-w-11 flex-1 rounded-full sm:w-11 sm:flex-none font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                selected
                  ? 'bg-brand text-white'
                  : `border-[1.5px] bg-white text-ink hover:border-brand ${hasError ? 'border-coral' : 'border-[#C9D2BC]'}`
              }`}
            >
              {score}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreRow;
