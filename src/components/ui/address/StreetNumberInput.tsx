import React from 'react';
import CustomInput from '../CustomInput';
import { useTranslations } from '../../../i18n/useTranslations';

interface StreetNumberInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
  disabled: boolean;
  hasError: boolean;
  placeholder?: string;
}

export const StreetNumberInput: React.FC<StreetNumberInputProps> = ({
  id,
  value,
  onChange,
  onBlur,
  disabled,
  hasError,
  placeholder,
}) => {
  const { t } = useTranslations();
  const handleInputChange = (inputValue: string) => {
    if (inputValue === '') {
      onChange(inputValue);
      return;
    }
    onChange(inputValue);
  };

  return (
    <div className="w-1/4">
      <label htmlFor={id} className="mb-2 block text-lg font-medium text-black">
        {t('addReview.step1.streetNumberLabel')}
      </label>
      <CustomInput
        id={id}
        type="text"
        placeholder={placeholder ?? t('addReview.step1.streetNumberPlaceholder')}
        value={value}
        disabled={disabled}
        onChange={e => handleInputChange(e.target.value)}
        onBlur={e => onBlur(e.target.value)}
        className={`${hasError ? 'border-red-500 bg-red-50' : 'border-gray-700'}`}
      />
    </div>
  );
};
