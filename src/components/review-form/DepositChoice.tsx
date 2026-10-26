import type { DepositReturned } from '../../store/formTypes';
import { useTranslations } from '../../i18n/useTranslations';

const OPTIONS: DepositReturned[] = ['true', 'partial', 'false', 'ongoing'];

interface DepositChoiceProps {
  value?: DepositReturned;
  onChange: (value: DepositReturned) => void;
  hasError?: boolean;
}

const DepositChoice = ({ value, onChange, hasError = false }: DepositChoiceProps) => {
  const { t } = useTranslations();

  return (
    <div role="radiogroup" aria-label={t('addReview.v2.deposit.title')} className="flex flex-wrap gap-2.5">
      {OPTIONS.map(option => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option)}
            className={`rounded-full px-5 py-3 font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
              selected
                ? 'bg-lime text-forest'
                : `border-[1.5px] bg-white text-ink hover:border-brand ${hasError ? 'border-coral' : 'border-[#C9D2BC]'}`
            }`}
          >
            {t(`addReview.v2.deposit.options.${option}`)}
          </button>
        );
      })}
    </div>
  );
};

export default DepositChoice;
