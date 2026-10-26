import { getSessionIdBack } from '../sessionManager';
import { supabaseWrapper } from './client';

interface EstanciaStep2Payload {
  neighbor_types?: string[];
  tourist_apartments?: 'Sí, tolerable' | 'Sí, molestos' | 'No hay';
  building_cleanliness?: 'Muy limpio' | 'Buena' | 'Poca' | 'Sin limpieza';
  community_environment?: string[];
  community_security?: 'Muy segura' | 'Sin problemas' | 'Mejorable' | 'Poco segura';
  community_opinion?: string;
}

export async function getSessionStep4Data(id?: string): Promise<EstanciaStep2Payload | null> {
  try {
    const client = supabaseWrapper.getClient();
    if (!client) throw new Error('Supabase client not available');

    const sessionId = await getSessionIdBack();

    // Using RPC call to match the insert pattern
    const { data, error } = await client.rpc('get_comunidad_step4_data', {
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
