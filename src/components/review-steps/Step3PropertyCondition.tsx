import React from 'react';
import { useFormContext } from '../../store/useFormContext';
import SelectableTag from '../ui/SelectableTag';
import CustomTextarea from '../ui/CustomTextarea';
import { useTranslations } from '../../i18n/useTranslations';

interface Step3Props {
  onNext: () => void;
  onPrevious: () => void;
  fieldErrors?: {
    [key: string]: boolean;
  };
  isSubmitting?: boolean;
}

const Step3PropertyCondition: React.FC<Step3Props> = ({
  onNext,
  onPrevious,
  fieldErrors,
  isSubmitting,
}) => {
  const { t } = useTranslations();
  const { formData, updateFormData } = useFormContext();
  const optionLabels: Record<string, string> = {
    'Bien aislado': t('addReview.step3.optionWellInsulated'),
    Correcto: t('addReview.step3.optionOkay'),
    Caluroso: t('addReview.step3.optionHot'),
    Frío: t('addReview.step3.optionCold'),
    Silencioso: t('addReview.step3.optionQuiet'),
    Tolerable: t('addReview.step3.optionTolerable'),
    Bastante: t('addReview.step3.optionQuiteNoisy'),
    'Se oye todo': t('addReview.step3.optionVeryNoisy'),
    'Nada de luz': t('addReview.step3.optionNoLight'),
    'Poca luz': t('addReview.step3.optionLowLight'),
    Luminoso: t('addReview.step3.optionBright'),
    'Muy luminoso': t('addReview.step3.optionVeryBright'),
    'Como nuevo': t('addReview.step3.optionLikeNew'),
    Bueno: t('addReview.step3.optionGood'),
    Aceptable: t('addReview.step3.optionAcceptable'),
    Poco: t('addReview.step3.optionPoor'),
    Malo: t('addReview.step3.optionBad'),
  };

  const titleAndError = (title: string, error?: boolean) => {
    return (
      <div className="mb-3 flex items-center gap-2">
        <h3 className="mb-3 text-lg font-medium text-black">{title}</h3>
        {error && <p className="mb-2 text-red-500 text-xs">{t('addReview.common.selectOneOption')}</p>}
      </div>
    );
  };

  return (
    <div>
      {/* Temperatura en verano */}
      <div className="mb-6">
        {titleAndError(t('addReview.step3.summerTemperatureLabel'), fieldErrors?.summerTemperature)}
        <div className="flex flex-wrap gap-3">
          {['Bien aislado', 'Correcto', 'Caluroso'].map(option => (
            <SelectableTag
              key={option}
              label={optionLabels[option] ?? option}
              selected={formData.summerTemperature === option}
              onClick={() =>
                updateFormData({
                  summerTemperature: option as 'Bien aislado' | 'Correcto' | 'Caluroso',
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Temperatura en invierno */}
      <div className="mb-6">
        {titleAndError(t('addReview.step3.winterTemperatureLabel'), fieldErrors?.winterTemperature)}
        <div className="flex flex-wrap gap-3">
          {['Bien aislado', 'Correcto', 'Frío'].map(option => (
            <SelectableTag
              key={option}
              label={optionLabels[option] ?? option}
              selected={formData.winterTemperature === option}
              onClick={() =>
                updateFormData({
                  winterTemperature: option as 'Bien aislado' | 'Correcto' | 'Frío',
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Nivel de ruido */}
      <div className="mb-6">
        {titleAndError(t('addReview.step3.noiseLevelLabel'), fieldErrors?.noiseLevel)}
        <div className="flex flex-wrap gap-3">
          {['Silencioso', 'Tolerable', 'Bastante', 'Se oye todo'].map(option => (
            <SelectableTag
              key={option}
              label={optionLabels[option] ?? option}
              selected={formData.noiseLevel === option}
              onClick={() =>
                updateFormData({
                  noiseLevel: option as 'Silencioso' | 'Tolerable' | 'Bastante' | 'Se oye todo',
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Nivel de luz */}
      <div className="mb-6">
        {titleAndError(t('addReview.step3.lightLevelLabel'), fieldErrors?.lightLevel)}
        <div className="flex flex-wrap gap-3">
          {['Nada de luz', 'Poca luz', 'Luminoso', 'Muy luminoso'].map(option => (
            <SelectableTag
              key={option}
              label={optionLabels[option] ?? option}
              selected={formData.lightLevel === option}
              onClick={() =>
                updateFormData({
                  lightLevel: option as 'Nada de luz' | 'Poca luz' | 'Luminoso' | 'Muy luminoso',
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Estado de mantenimiento */}
      <div className="mb-6">
        {titleAndError(t('addReview.step3.maintenanceStatusLabel'), fieldErrors?.maintenanceStatus)}
        <div className="flex flex-wrap gap-3">
          {['Como nuevo', 'Bueno', 'Aceptable', 'Poco', 'Malo'].map(option => (
            <SelectableTag
              key={option}
              label={optionLabels[option] ?? option}
              selected={formData.maintenanceStatus === option}
              onClick={() =>
                updateFormData({
                  maintenanceStatus: option as
                    | 'Como nuevo'
                    | 'Bueno'
                    | 'Aceptable'
                    | 'Poco'
                    | 'Malo',
                })
              }
            />
          ))}
        </div>
      </div>

      {/* Opinión sobre el piso */}
      <div className="mb-6">
        {titleAndError(t('addReview.step3.propertyOpinionLabel'), fieldErrors?.propertyOpinion)}
        <CustomTextarea
          id="propertyOpinion"
          value={formData.propertyOpinion || ''}
          onChange={e => updateFormData({ propertyOpinion: e.target.value })}
          placeholder={t('addReview.step3.propertyOpinionPlaceholder')}
          rows={5}
        />
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
          {isSubmitting ? t('addReview.common.sending') : t('addReview.common.next')}
        </button>
      </div>
    </div>
  );
};

export default Step3PropertyCondition;
