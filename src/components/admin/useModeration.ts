import { useCallback, useEffect, useState } from 'react';
import { supabaseWrapper } from '../../services/supabase/client';

export interface PendingReview {
  review_session_id: string;
  created_at: string;
  address_details: { fullAddress?: string; street?: string; number?: string; city?: string } | null;
  start_year: number | null;
  end_year: number | null;
  price: number | null;
  size_m2: number | null;
  deposit_returned: string | null;
  owner_score: number | null;
  property_score: number | null;
  building_score: number | null;
  area_score: number | null;
  tags: string[] | null;
  owner_opinion: string | null;
  status: string | null;
}

// Completed reviews waiting for a decision (get_review_sessions_for_moderation is admin-only).
export function useModeration() {
  const [reviews, setReviews] = useState<PendingReview[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const client = supabaseWrapper.getClient();
    if (!client) return;
    const { data, error: rpcError } = await client.rpc('get_review_sessions_for_moderation');
    if (rpcError) setError(rpcError.message);
    else setReviews((data as PendingReview[]).filter(r => r.status !== 'rejected'));
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const approve = async (id: string) => {
    const client = supabaseWrapper.getClient();
    const { error: rpcError } = await client!.rpc('validate_review', { p_session_id: id });
    if (rpcError) throw new Error(rpcError.message);
    setReviews(prev => prev?.filter(r => r.review_session_id !== id) ?? null);
  };

  // Rejection goes through the reject-review edge function, which also emails the author.
  const reject = async (id: string, reason: string) => {
    const client = supabaseWrapper.getClient();
    const { data } = await client!.auth.getSession();
    const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/reject-review`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${data.session?.access_token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ review_session_id: id, rejection_reason: reason }),
    });
    if (!resp.ok) throw new Error((await resp.text()) || 'No se pudo rechazar');
    setReviews(prev => prev?.filter(r => r.review_session_id !== id) ?? null);
  };

  return { reviews, error, approve, reject };
}
