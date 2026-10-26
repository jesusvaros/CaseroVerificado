import AddressAutocomplete from '../ui/AddressAutocomplete';
import { useTranslations } from '../../i18n/useTranslations';
import { useReviewAddress } from './useReviewAddress';
import { sectionTitle, smallLabel, underlineInput } from './fieldStyles';
import type { ReviewField } from './validateReview';

const AddressSection = ({ errors }: { errors: ReviewField[] }) => {
  const { t } = useTranslations();
  const { details, update, selectAddress, confirmNumber } = useReviewAddress();
  const addressError = errors.includes('address');
  const numberError = errors.includes('number');

  return (
    <div id="review-field-address" className="flex flex-col gap-3">
      <span className={sectionTitle}>{t('addReview.v2.address.title')}</span>
      <AddressAutocomplete
        value={details.street || ''}
        onSelect={selectAddress}
        placeholder={t('addReview.v2.address.placeholder')}
        hideLabel
        hasError={addressError}
        inputClassName={`[&_input]:h-14 [&_input]:rounded-none [&_input]:border-0 [&_input]:border-b-2 [&_input]:bg-transparent [&_input]:px-0 [&_input]:text-lg [&_input]:shadow-none [&_input]:focus:ring-0 ${
          addressError ? '[&_input]:border-coral' : '[&_input]:border-ink'
        }`}
      />
      {addressError && <p className="text-sm text-coral-ink">{t('addReview.v2.errors.address')}</p>}
      <div className="flex flex-wrap gap-4">
        <label id="review-field-number" className="flex w-24 flex-col gap-1.5">
          <span className={smallLabel}>{t('addReview.v2.address.number')}</span>
          <input
            type="text"
            value={details.number || ''}
            onChange={e => update({ number: e.target.value })}
            onBlur={confirmNumber}
            className={underlineInput(numberError)}
          />
        </label>
        <label className="flex w-24 flex-col gap-1.5">
          <span className={smallLabel}>{t('addReview.v2.address.floor')}</span>
          <input type="text" value={details.floor || ''} onChange={e => update({ floor: e.target.value })} className={underlineInput(false)} />
        </label>
        <label className="flex w-24 flex-col gap-1.5">
          <span className={smallLabel}>{t('addReview.v2.address.door')}</span>
          <input type="text" value={details.door || ''} onChange={e => update({ door: e.target.value })} className={underlineInput(false)} />
        </label>
      </div>
      {numberError && <p className="text-sm text-coral-ink">{t('addReview.v2.errors.number')}</p>}
    </div>
  );
};

export default AddressSection;
