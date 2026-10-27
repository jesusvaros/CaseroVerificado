import { Link } from 'react-router-dom';
import { useTranslations } from '../../i18n/useTranslations';

interface TermsConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  hasError?: boolean;
}

// How reviews are moderated, and the required acceptance of the terms of use and good practices.
const TermsConsent = ({ checked, onChange, hasError = false }: TermsConsentProps) => {
  const { t } = useTranslations();
  const link = 'font-semibold text-brand underline underline-offset-4 hover:text-forest';

  return (
    <div id="review-field-terms" className="flex flex-col gap-4 rounded-2xl bg-mist p-5">
      <p className="text-[15px] leading-relaxed text-ink-soft">{t('addReview.v2.terms.moderation')}</p>
      <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          className={`mt-1 h-5 w-5 shrink-0 rounded border-[1.5px] text-forest focus:ring-brand ${hasError ? 'border-coral' : 'border-[#C9D2BC]'}`}
        />
        <span>
          {t('addReview.v2.terms.acceptStart')}{' '}
          <Link to="/condiciones-uso" target="_blank" className={link}>{t('addReview.v2.terms.termsLink')}</Link>{' '}
          {t('addReview.v2.terms.and')}{' '}
          <Link to="/buenas-practicas" target="_blank" className={link}>{t('addReview.v2.terms.practicesLink')}</Link>
          {t('addReview.v2.terms.acceptEnd')}
        </span>
      </label>
      {hasError && <p className="text-sm text-coral-ink">{t('addReview.v2.errors.terms')}</p>}
    </div>
  );
};

export default TermsConsent;
