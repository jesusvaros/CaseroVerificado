import type { FormDataType } from '../store/formTypes';
import { submitAddressStep1 } from '../services/supabase';
import { tRuntime } from '../i18n/runtime';

export interface ValidationResult {
  isValid: boolean;
  message: string | null;
  fieldErrors?: {
    [key: string]: boolean;
  };
}

export interface FormContext {
  addressDetails?: FormDataType['addressDetails'];
}

export const validateStep1 = (context: FormContext): ValidationResult => {
  const { addressDetails } = context;
  const fieldErrors = { street: false, number: false };

  if (!addressDetails) {
    return {
      isValid: false,
      message: tRuntime('addReview.validation.step1.missingAddressInfo'),
      fieldErrors,
    };
  }

  if (!addressDetails.street || !addressDetails.street.trim()) {
    return {
      isValid: false,
      message: tRuntime('addReview.validation.step1.addressRequired'),
      fieldErrors: { ...fieldErrors, street: true },
    };
  }

  if (
    !addressDetails.number &&
    (!addressDetails.components?.house_number || addressDetails.components.house_number === '')
  ) {
    return {
      isValid: false,
      message: tRuntime('addReview.validation.step1.addressNumberRequired'),
      fieldErrors: { ...fieldErrors, number: true },
    };
  }
  if (addressDetails.components?.house_number !== addressDetails.number) {
    return {
      isValid: false,
      message: tRuntime('addReview.validation.step1.addressNumberReview'),
      fieldErrors: { ...fieldErrors, number: true },
    };
  }

  // Validate coordinates
  if (
    !addressDetails.coordinates ||
    !addressDetails.coordinates.lat ||
    !addressDetails.coordinates.lng
  ) {
    return {
      isValid: false,
      message: tRuntime('addReview.validation.step1.addressCoordinatesMissing'),
      fieldErrors: { ...fieldErrors, street: true },
    };
  }

  return {
    isValid: true,
    message: null,
    fieldErrors,
  };
};

export const submitStep1 = async (
  context: FormContext
): Promise<{ success: boolean; message: string | null }> => {
  try {
    const { addressDetails } = context;

    // Basic check - validation should have already happened
    if (!addressDetails?.coordinates) {
      return { success: false, message: tRuntime('addReview.validation.common.incompleteAddressData') };
    }

    // Get the reviewSessionId from localStorage
    const sessionId = localStorage.getItem('reviewSessionId');

    // If no sessionId exists, we can't proceed with submission
    if (!sessionId || sessionId === 'PENDING') {
      console.error('No valid review session ID found');
      return { success: false, message: tRuntime('addReview.validation.common.noValidSession') };
    }

    // Submit data using our Supabase client function with simplified payload
    const success = await submitAddressStep1({
      addressDetails,
    });

    return {
      success,
      message: success ? null : tRuntime('addReview.validation.common.databaseSaveError'),
    };
  } catch (error) {
    console.error('Error submitting address data:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : tRuntime('addReview.validation.common.dataSaveError'),
    };
  }
};
