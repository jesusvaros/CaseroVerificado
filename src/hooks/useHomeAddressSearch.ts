import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../store/useFormContext';
import { useAuth } from '../store/auth/hooks';
import type { AddressResult } from '../components/ui/AddressAutocomplete';
import { showErrorToast } from '../components/ui/toast/toastUtils';
import { initializeSession } from '../services/sessionManager';
import { useTranslations } from '../i18n/useTranslations';
import { addressPath } from '../utils/addressPath';
import { slugify } from '../utils/slugify';

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

  // A full address (street and number) opens its page; a street or a city opens that city's page.
  // `hash` jumps to a section of the address page, e.g. '#precio' for the rent calculator.
  const search = (hash = '') => {
    if (!hasSelection || !formData.addressDetails?.coordinates) {
      showErrorToast(t('home.input.selectAddressError'));
      return;
    }
    const { lat, lng } = formData.addressDetails.coordinates;
    const c = formData.addressAutocompleteResult?.components;
    const city = c?.city || c?.town || c?.village;
    const path = addressPath(city, c?.road, c?.house_number);
    if (path && c) {
      const params = new URLSearchParams({ lat: String(lat), lng: String(lng), street: c.road ?? '', number: c.house_number ?? '', city: city ?? '' });
      if (c.postcode) params.set('cp', c.postcode);
      navigate(`${path}?${params}${hash}`);
      return;
    }
    if (city) {
      navigate(`/opiniones/espana/${slugify(city)}`);
      return;
    }
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

  return { address, isLoading, selectAddress, search, startReview };
}
