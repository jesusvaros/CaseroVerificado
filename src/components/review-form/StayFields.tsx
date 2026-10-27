import { useFormContext } from '../../store/useFormContext';
import { useTranslations } from '../../i18n/useTranslations';
import { smallLabel, underlineInput } from './fieldStyles';
import type { ReviewField } from './validateReview';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1999 }, (_, i) => CURRENT_YEAR - i);
const STILL_LIVING = 'now';

// Whole flat or a room, since, until (or still living there), monthly rent and optional size.
const StayFields = ({ errors }: { errors: ReviewField[] }) => {
  const { t } = useTranslations();
  const { formData, updateFormData } = useFormContext();
  const { startYear, endYear, price, sizeM2, rentalType = 'whole' } = formData;

  const changeEnd = (value: string) => {
    if (value === STILL_LIVING) {
      updateFormData({ endYear: null, depositReturned: 'ongoing' });
      return;
    }
    updateFormData({
      endYear: value ? Number(value) : undefined,
      // "Still living there" only makes sense while the tenancy is ongoing
      depositReturned: formData.depositReturned === 'ongoing' ? undefined : formData.depositReturned,
    });
  };

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-6">
      {/* Own row, styled like the deposit choice, so the year, rent and size fields keep lining up */}
      <div className="flex w-full flex-col gap-2.5">
        <span className={smallLabel}>{t('addReview.v2.stay.typeLabel')}</span>
        <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label={t('addReview.v2.stay.typeLabel')}>
          {(['whole', 'room'] as const).map(type => (
            <button
              key={type}
              type="button"
              role="radio"
              aria-checked={rentalType === type}
              onClick={() => updateFormData({ rentalType: type })}
              className={`rounded-full border-[1.5px] px-5 py-2.5 font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                rentalType === type ? 'border-lime bg-lime text-forest' : 'border-[#C9D2BC] bg-white text-ink hover:border-brand'
              }`}
            >
              {t(`addReview.v2.stay.${type}`)}
            </button>
          ))}
        </div>
      </div>
      <label id="review-field-startYear" className="flex w-28 flex-col gap-1.5">
        <span className={smallLabel}>{t('addReview.v2.stay.from')}</span>
        <select
          value={startYear ?? ''}
          onChange={e => updateFormData({ startYear: e.target.value ? Number(e.target.value) : undefined })}
          className={underlineInput(errors.includes('startYear'))}
        >
          <option value="">{t('addReview.v2.stay.year')}</option>
          {YEARS.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </label>
      <label className="flex w-48 flex-col gap-1.5">
        <span className={smallLabel}>{t('addReview.v2.stay.until')}</span>
        <select
          value={endYear === null ? STILL_LIVING : endYear ?? ''}
          onChange={e => changeEnd(e.target.value)}
          className={underlineInput(false)}
        >
          <option value="">{t('addReview.v2.stay.year')}</option>
          <option value={STILL_LIVING}>{t('addReview.v2.stay.stillLiving')}</option>
          {YEARS.filter(year => !startYear || year >= startYear).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </label>
      <label id="review-field-price" className="flex w-36 flex-col gap-1.5">
        <span className={smallLabel}>{t('addReview.v2.stay.rent')}</span>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          placeholder={t('addReview.v2.stay.rentPlaceholder')}
          value={price ?? ''}
          onChange={e => updateFormData({ price: e.target.value ? Number(e.target.value) : undefined })}
          className={underlineInput(errors.includes('price'))}
        />
      </label>
      <label className="flex w-36 flex-col gap-1.5">
        <span className={smallLabel}>{t('addReview.v2.stay.size')}</span>
        <input
          type="number"
          inputMode="numeric"
          min={10}
          max={1000}
          placeholder={t('addReview.v2.stay.sizePlaceholder')}
          value={sizeM2 ?? ''}
          onChange={e => updateFormData({ sizeM2: e.target.value ? Number(e.target.value) : undefined })}
          className={underlineInput(false)}
        />
      </label>
      {(errors.includes('startYear') || errors.includes('price')) && (
        <p className="w-full text-sm text-coral-ink">{t('addReview.v2.errors.stay')}</p>
      )}
    </div>
  );
};

export default StayFields;
