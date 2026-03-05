import { useCallback } from 'react';
import type { AddressResult } from '../../ui/AddressAutocomplete';
import { geocodingService } from '../../ui/address/geocodingService';

/**
 * A hook that returns a function to handle location selection from the map.
 * This function performs reverse geocoding using the HERE API.
 *
 * @param handleAddressSelect - Function to handle address selection after reverse geocoding
 * @returns A function that handles location selection from the map
 */
export const useMapLocationHandler = (handleAddressSelect: (result: AddressResult) => void) => {
  return useCallback(
    async (lat: number, lng: number) => {
      try {
        const addressResult = await geocodingService.reverseGeocode(lat, lng);
        if (!addressResult) return;

        console.log('Reverse geocoded address:', addressResult);
        handleAddressSelect(addressResult);
      } catch (error) {
        console.error('Error in reverse geocoding:', error);
      }
    },
    [handleAddressSelect]
  );
};
