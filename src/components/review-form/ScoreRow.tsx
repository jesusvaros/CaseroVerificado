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
    <div role="radiogroup" aria-label={label} className="flex flex-wrap items-center gap-3">
      <span className={`w-24 font-semibold ${hasError ? 'text-coral-ink' : ''}`}>{label}</span>
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
            className={`h-11 w-11 rounded-full font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
              selected
                ? 'bg-brand text-white'
                : `border-[1.5px] bg-white text-ink hover:border-brand ${hasError ? 'border-coral' : 'border-[#C9D2BC]'}`
            }`}
          >
            {score}
          </button>
        );
      })}
      {optional && <span className="text-sm text-[#8A9384]">{t('addReview.v2.optional')}</span>}
    </div>
  );
};

export default ScoreRow;
