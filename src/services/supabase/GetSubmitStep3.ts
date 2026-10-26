import { getSessionIdBack } from '../sessionManager';
import { supabaseWrapper } from './client';

interface EstanciaStep2Payload {
  summer_temperature: 'Bien aislado' | 'Correcto' | 'Caluroso';
  winter_temperature: 'Bien aislado' | 'Correcto' | 'Frío';
  noise_level: 'Silencioso' | 'Tolerable' | 'Bastante' | 'Se oye todo';
  light_level: 'Nada de luz' | 'Poca luz' | 'Luminoso' | 'Muy luminoso';
  maintenance_status: 'Como nuevo' | 'Bueno' | 'Aceptable' | 'Poco' | 'Malo';
  property_opinion?: string;
}

export async function getSessionStep3Data(id?: string): Promise<EstanciaStep2Payload | null> {
  try {
    const client = supabaseWrapper.getClient();
    if (!client) throw new Error('Supabase client not available');

    const sessionId = await getSessionIdBack();

    // Using RPC call to match the insert pattern
    const { data, error } = await client.rpc('get_piso_step3_data', {
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
