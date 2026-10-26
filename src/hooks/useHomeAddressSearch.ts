import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../store/useFormContext';
import { useAuth } from '../store/auth/hooks';
import type { AddressResult } from '../components/ui/AddressAutocomplete';
import { showErrorToast } from '../components/ui/toast/toastUtils';
import { initializeSession } from '../services/sessionManager';
import { useTranslations } from '../i18n/useTranslations';

// Address search shared by the home hero: open the map at an address or start a review for it.
export function useHomeAddressSearch() {
  const navigate = useNavigate();
  const { t } = useTranslations();
  const { address, setAddress, updateFormData, formData } = useFormContext();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const hasSelection = Boolean(formData.addressDetails?.coordinates && address.trim());

  const selectAddress = (result: AddressResult) => {
    const fullAddress = result.formatted;
    setAddress(fullAddress);
    updateFormData({
      addressAutocompleteResult: result,
      addressDetails: {
        street: fullAddress,
        coordinates: { lat: result.geometry.lat, lng: result.geometry.lng },
        components: result.components,
      },
    });
  };

  const openMap = () => {
    if (!hasSelection || !formData.addressDetails?.coordinates) {
      showErrorToast(t('home.input.selectAddressError'));
      return;
    }
    const { lat, lng } = formData.addressDetails.coordinates;
    navigate(`/map?lat=${lat}&lng=${lng}&q=${encodeURIComponent(address)}`);
  };

  const startReview = async () => {
    if (!hasSelection) {
      showErrorToast(t('home.input.selectAddressError'));
      return;
    }
    setIsLoading(true);
    try {
      updateFormData({
        addressDetails: formData.addressDetails,
        addressAutocompleteResult: formData.addressAutocompleteResult,
      });
      const { sessionId } = await initializeSession(user?.id);
      if (sessionId) navigate('/add-review');
    } catch (error) {
      console.error('Error:', error);
      showErrorToast(t('home.input.genericError'));
    } finally {
      setIsLoading(false);
    }
  };

  return { address, isLoading, selectAddress, openMap, startReview };
}
