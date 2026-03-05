import React from 'react';
import { useFormContext } from '../../store/useFormContext';
import CustomTextarea from '../ui/CustomTextarea';
import SelectableTagGroup from '../ui/SelectableTagGroup';
import CustomCheckbox from '../ui/CustomCheckbox';
import HashedContactInput from '../ui/HashedContactInput';
import { useTranslations } from '../../i18n/useTranslations';

interface Step5OwnerProps {
  onNext: () => void;
  onPrevious: () => void;
  fieldErrors?: {
    [key: string]: boolean;
  };
  isSubmitting?: boolean;
}

const Step5Owner: React.FC<Step5OwnerProps> = ({
  onNext,
  onPrevious,
  fieldErrors,
  isSubmitting,
}) => {
  const { t } = useTranslations();
  const { formData, updateFormData } = useFormContext();

  const isOwnerTypeParticular = formData.ownerType === 'Particular';

  return (
    <div>
      {/* Sección: Tipo de propietario */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-medium text-black">{t('addReview.step5.ownerTypeLabel')}</h3>
        {fieldErrors?.ownerType && (
          <p className="text-red-500">{t('addReview.step5.ownerTypeError')}</p>
        )}

        <SelectableTagGroup
          options={['Propietario', 'Agencia']}
          selectedOptions={[isOwnerTypeParticular ? 'Propietario' : 'Agencia']}
          optionLabels={{
            Propietario: t('addReview.step5.ownerTypeOwner'),
            Agencia: t('addReview.step5.ownerTypeAgency'),
          }}
          onChange={selected => {
            if (selected.length > 0) {
              updateFormData({
                ownerType: selected[0] === 'Propietario' ? 'Particular' : 'Agencia',
              });
            }
          }}
          multiSelect={false}
        />
      </div>

      {/* Sección: Datos del propietario/agencia */}
      <div className="mb-8 ">
        <div className="flex items-end mb-4">
          <h3 className="text-lg font-medium text-black">
            {isOwnerTypeParticular ? t('addReview.step5.ownerDataLabel') : t('addReview.step5.agencyDataLabel')}
          </h3>
          {isOwnerTypeParticular && (
            <span className="ml-2 text-gray-600 text-sm mb-0.5">{t('addReview.common.optional')}</span>
          )}
        </div>
        <HashedContactInput
          id="ownerName"
          label={t('addReview.step5.fullNameLabel')}
          type="text"
          value={formData.ownerName || ''}
          hashValue={formData.ownerNameHash || ''}
          onChange={(value: string) => updateFormData({ ownerName: value })}
          placeholder={t('addReview.step5.fullNamePlaceholder')}
        />
      </div>

      {/* Sección: Información de contacto */}
      <div className="relative mb-8">
        <div className="flex items-end mb-4">
          <h3 className=" text-lg font-medium text-black">{t('addReview.step5.contactInfoLabel')}</h3>
          {isOwnerTypeParticular && (
            <span className="ml-2 text-gray-600 text-sm mb-0.5">{t('addReview.common.optional')}</span>
          )}
        </div>

        <HashedContactInput
          id="ownerPhone"
          label={t('addReview.step5.phoneLabel')}
          type="tel"
          value={formData.ownerPhone || ''}
          hashValue={formData.ownerPhoneHash || ''}
          onChange={(value: string) => updateFormData({ ownerPhone: value })}
          placeholder={t('addReview.step5.phonePlaceholder')}
        />

        <div className="mt-4">
          <HashedContactInput
            id="ownerEmail"
            label={t('addReview.step5.emailLabel')}
            type="email"
            value={formData.ownerEmail || ''}
            hashValue={formData.ownerEmailHash || ''}
            onChange={(value: string) => updateFormData({ ownerEmail: value })}
            placeholder={t('addReview.step5.emailPlaceholder')}
          />
        </div>
      </div>

      {/* Opinión sobre el propietario/agencia */}
      <div className="relative mb-8">
        <h3 className="mb-4 text-lg font-medium text-black">
          {isOwnerTypeParticular ? t('addReview.step5.ownerOpinionLabel') : t('addReview.step5.agencyOpinionLabel')}
        </h3>
        <CustomTextarea
          id="ownerOpinion"
          value={formData.ownerOpinion || ''}
          onChange={e => updateFormData({ ownerOpinion: e.target.value })}
          placeholder={t('addReview.step5.opinionPlaceholder')}
          rows={5}
        />

        <div className="mt-4">
          <CustomCheckbox
            id="checkboxReadTerms"
            label={
              <>
                {t('addReview.step5.acceptTermsPrefix')}{' '}
                <a
                  href="/terminosCondiciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline hover:text-[rgb(60,76,40)] ${fieldErrors?.checkboxReadTerms ? 'text-red-500' : 'text-[rgb(74,94,50)]'}`}
                >
                  {t('addReview.step5.termsAndConditions')}
                </a>
              </>
            }
            checked={Boolean(formData.checkboxReadTerms)}
            onChange={e => updateFormData({ checkboxReadTerms: e.target.checked })}
            error={fieldErrors?.checkboxReadTerms}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={onPrevious}
          className="text-black hover:text-gray-800"
        >
          {t('addReview.common.previous')}
        </button>
        <button
          onClick={onNext}
          disabled={isSubmitting}
          className="rounded bg-[rgb(74,94,50)] px-6 py-2 text-white hover:bg-[rgb(60,76,40)]"
        >
          {isSubmitting ? t('addReview.common.sending') : t('addReview.common.finish')}
        </button>
      </div>
    </div>
  );
};

export default Step5Owner;
