import { useEffect } from 'react';
import { useFormContext } from '../../store/useFormContext';
import type { AddressResult } from '../ui/AddressAutocomplete';
import { geocodingService } from '../ui/address/geocodingService';
import type { FormDataType } from '../../store/formTypes';

type AddressDetails = NonNullable<FormDataType['addressDetails']>;

function resultToAddressDetails(r: AddressResult, keep?: AddressDetails): AddressDetails {
  const c = r.components || {};
  return {
    street: c.road || '',
    number: c.house_number || keep?.number || '',
    city: c.city || c.town || c.village || '',
    postalCode: c.postcode || '',
    state: c.state || '',
    fullAddress: r.formatted || '',
    coordinates: { lat: r.geometry.lat, lng: r.geometry.lng },
    floor: keep?.floor || '',
    door: keep?.door || '',
    components: c,
  };
}

// Address state of the review form: autocomplete selection, number, floor and door.
export function useReviewAddress() {
  const { formData, updateFormData } = useFormContext();
  const details: AddressDetails = formData.addressDetails || {};

  // The home search stores the raw autocomplete result; turn it into street + number here. It is
  // cleared once applied, so a newly searched address replaces the one in a saved draft.
  const prefill = formData.addressAutocompleteResult;
  useEffect(() => {
    if (prefill) {
      updateFormData({ addressDetails: resultToAddressDetails(prefill), addressAutocompleteResult: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill]);

  const update = (patch: Partial<AddressDetails>) => updateFormData({ addressDetails: { ...details, ...patch } });

  const selectAddress = (result: AddressResult) =>
    updateFormData({ addressDetails: resultToAddressDetails(result, details), addressAutocompleteResult: undefined });

  // Re-geocode with the typed number so the pin lands on the right portal. The typed number is
  // kept as is: the geocoder often drops letters ("12A" comes back as "12").
  const confirmNumber = async () => {
    const number = details.number?.trim();
    if (!details.street || !number) return;
    const located = await geocodingService.getCoordinatesForAddress(details, number);
    if (located?.coordinates) {
      update({ coordinates: located.coordinates, fullAddress: located.fullAddress, components: located.components, number });
    }
  };

  return { details, update, selectAddress, confirmNumber };
}
