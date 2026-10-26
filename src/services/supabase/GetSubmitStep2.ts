import { getSessionIdBack } from '../sessionManager';
import { supabaseWrapper } from './client';

interface EstanciaStep2Payload {
  start_year: number;
  end_year: number | null;
  price: number;
  included_services: string[];
  would_recommend: '1'|'2'|'3'|'4'|'5'|undefined;
  deposit_returned: string|undefined;
}

export async function getSessionStep2Data(id?: string): Promise<EstanciaStep2Payload | null> {
  try {
    const client = supabaseWrapper.getClient();
    if (!client) throw new Error('Supabase client not available');

    const sessionId = await getSessionIdBack();

    // Using RPC call to match the insert pattern
    const { data, error } = await client.rpc('get_estancia_step2_data', {
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
