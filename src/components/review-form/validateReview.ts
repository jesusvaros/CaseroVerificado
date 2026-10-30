import type { FormDataType } from '../../store/formTypes';

export type ReviewField = 'address' | 'number' | 'startYear' | 'price' | 'ownerScore' | 'propertyScore' | 'deposit' | 'opinion' | 'terms';

export const MIN_OPINION_LENGTH = 30;

// Returns the fields that block sending, in the order they appear on the page.
export function validateReview(data: FormDataType): ReviewField[] {
  const errors: ReviewField[] = [];
  const address = data.addressDetails;

  if (!address?.street?.trim() || !address.coordinates?.lat || !address.coordinates?.lng) errors.push('address');
  if (!address?.number?.trim()) errors.push('number');
  if (!data.startYear) errors.push('startYear');
  if (!data.price || data.price <= 0) errors.push('price');
  if (!data.ownerScore) errors.push('ownerScore');
  if (!data.propertyScore) errors.push('propertyScore');
  if (!data.depositReturned) errors.push('deposit');
  // The opinion is optional, but a written one needs some detail
  const opinionLength = data.opinion?.trim().length ?? 0;
  if (opinionLength > 0 && opinionLength < MIN_OPINION_LENGTH) errors.push('opinion');
  if (!data.acceptTerms) errors.push('terms');

  return errors;
}
