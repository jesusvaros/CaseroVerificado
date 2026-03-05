import { useEffect, useState } from 'react';
import { useFormContext } from '../../store/useFormContext';
import AddressAutocomplete, { type AddressResult } from '../ui/AddressAutocomplete';
import CustomInput from '../ui/CustomInput';
import LocationMap from '../ui/LocationMap';
import { useMapLocationHandler } from './location/mapLocationHandler';
import { geocodingService } from '../ui/address/geocodingService';
import type { FormDataType } from '../../store/formTypes';
import { useTranslations } from '../../i18n/useTranslations';

interface Step1Props {
  onNext: () => void;
  fieldErrors?: {
    street?: boolean;
    number?: boolean;
  };
  isSubmitting?: boolean;
}

const Step1ObjectiveData = ({ onNext, fieldErrors, isSubmitting = false }: Step1Props) => {
  const { t } = useTranslations();
  const { formData, updateFormData } = useFormContext();
  const [addressDetails, setAddressDetails] = useState<FormDataType['addressDetails']>(
    formData.addressDetails || {}
  );

  useEffect(() => {
    setAddressDetails(formData.addressDetails || {});
  }, [formData.addressDetails]);

  const handleNumberChange = (number: string) => {
    const updated = { ...addressDetails, number };
    setAddressDetails(updated);
    updateFormData({ addressDetails: updated });
  };

  const handleNumberBlur = async (number: string) => {
    if (addressDetails?.street && addressDetails.street.trim() !== '' && number.trim() !== '') {
      const updatedResult = await geocodingService.getCoordinatesForAddress(addressDetails, number);

      const updated: FormDataType['addressDetails'] = {
        ...addressDetails,
        number: updatedResult?.number,
        coordinates: updatedResult?.coordinates,
        fullAddress: updatedResult?.fullAddress,
        components: updatedResult?.components,
      };

      setAddressDetails(updated);
      updateFormData({
        addressDetails: updated,
      });
    }
  };

  function resultToAddressDetails(r: AddressResult): FormDataType['addressDetails'] {
    const c = r.components || {};
    return {
      street: c.road || '',
      number: c.house_number || '',
      city: c.city || c.town || c.village || '',
      postalCode: c.postcode || '',
      state: c.state || '',
      fullAddress: r.formatted || '',
      coordinates: {
        lat: r.geometry.lat,
        lng: r.geometry.lng,
      },
      floor: formData.addressDetails?.floor || '',
      door: formData.addressDetails?.door || '',
      components: c,
    };
  }

  const handleSelect = (result: AddressResult) => {
    const converted = resultToAddressDetails(result);
    setAddressDetails(converted);
    updateFormData({
      addressDetails: converted,
    });
  };

  const handleLocationSelect = useMapLocationHandler(result => {
    const converted = resultToAddressDetails(result);
    setAddressDetails(converted);
    updateFormData({
      addressDetails: converted,
    });
  });

  return (
    <div className="w-full">
      <AddressAutocomplete
        value={addressDetails?.street || ''}
        streetNumberValue={addressDetails?.number || ''}
        onNumberChange={handleNumberChange}
        onNumberBlur={handleNumberBlur}
        onSelect={handleSelect}
        showNumberField={true}
        placeholder={t('addReview.step1.addressPlaceholder')}
        hasError={fieldErrors?.street}
        numberHasError={fieldErrors?.number}
      />
      <LocationMap
        coordinates={
          addressDetails?.coordinates && addressDetails.coordinates.lat !== 0
            ? addressDetails.coordinates
            : undefined
        }
        onLocationSelect={handleLocationSelect}
        className="mt-8 "
      />
      <div className="-mx-2 mt-8 flex">
        <div className="w-1/2 px-2">
          <CustomInput
            label={t('addReview.step1.floorLabel')}
            id="floor"
            type="text"
            placeholder={t('addReview.step1.floorPlaceholder')}
            value={formData.addressDetails?.floor || ''}
            onChange={e => {
              updateFormData({
                addressDetails: {
                  ...formData.addressDetails,
                  floor: e.target.value,
                },
              });
            }}
          />
        </div>
        <div className="w-1/2 px-2">
          <CustomInput
            label={t('addReview.step1.doorLabel')}
            id="door"
            type="text"
            placeholder={t('addReview.step1.doorPlaceholder')}
            value={formData.addressDetails?.door || ''}
            onChange={e =>
              updateFormData({
                addressDetails: {
                  ...formData.addressDetails,
                  door: e.target.value,
                },
              })
            }
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className="rounded bg-[rgb(74,94,50)] px-6 py-2 text-white hover:bg-[rgb(60,76,40)] disabled:opacity-50"
        >
          {isSubmitting ? t('addReview.common.sending') : t('addReview.common.next')}
        </button>
      </div>
    </div>
  );
};

export default Step1ObjectiveData;
