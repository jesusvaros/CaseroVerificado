import { getSessionIdBack } from '../sessionManager';
import { supabaseWrapper } from './client';

interface SubmitStep5Payload {
  owner_type?: 'Particular' | 'Agencia';
  owner_name_hash?: string;
  owner_phone_hash?: string;
  owner_email_hash?: string;
  owner_opinion?: string;
}

export async function getSessionStep5Data(id?: string): Promise<SubmitStep5Payload | null> {
  try {
    const client = supabaseWrapper.getClient();
    if (!client) throw new Error('Supabase client not available');

    const sessionId = await getSessionIdBack();

    // Using RPC call to match the insert pattern
    const { data, error } = await client.rpc('get_gestion_step5_data', {
      p_review_session_id: id || sessionId,
    });

    if (error) throw error;

    // If no data found, return null
    if (!data || data.length === 0) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.error('Error fetching address data:', error);
    return null;
  }
}
