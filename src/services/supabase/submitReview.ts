import { getSessionIdBack } from '../sessionManager';
import { supabaseWrapper } from './client';
import type { FormDataType } from '../../store/formTypes';

// Saves the whole one-page review in a single call (see submit_review_v2 in supabase/migrations).
export async function submitReview(formData: FormDataType): Promise<string> {
  const client = supabaseWrapper.getClient();
  if (!client) throw new Error('Supabase client not available');

  const sessionId = await getSessionIdBack();
  if (!sessionId) throw new Error('No review session');

  const { error } = await client.rpc('submit_review_v2', {
    p_review_session_id: sessionId,
    p_address_details: formData.addressDetails,
    p_start_year: formData.startYear,
    p_end_year: formData.endYear ?? null,
    p_price: formData.price,
    p_deposit_returned: formData.depositReturned,
    p_owner_score: formData.ownerScore,
    p_property_score: formData.propertyScore,
    p_building_score: formData.buildingScore ?? null,
    p_area_score: formData.areaScore ?? null,
    p_opinion: formData.opinion,
    p_tags: formData.tags?.length ? formData.tags : null,
    p_size_m2: formData.sizeM2 ?? null,
    p_rental_type: formData.rentalType ?? 'whole',
  });

  if (error) throw error;
  return sessionId;
}
