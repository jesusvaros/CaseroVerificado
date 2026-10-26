import { getSessionIdBack } from '../sessionManager';
import { supabaseWrapper } from './client';

// Define types for the address data returned from the database
interface AddressStepData {
  address_details: {
    street?: string;
    number?: string;
    floor?: string;
    door?: string;
    city?: string;
    postalCode?: string;
    coordinates?: { lat: number; lng: number };
  };
}

export async function getAddressStep1Data(sessionIdExternal?: string): Promise<AddressStepData | null> {
  try {
    const client = supabaseWrapper.getClient();
    if (!client) throw new Error('Supabase client not available');

    const sessionId = await getSessionIdBack();

    // Using RPC call to match the insert pattern
    const { data, error } = await client.rpc('get_address_step1_data', {
      p_review_session_id: sessionIdExternal || sessionId,
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
