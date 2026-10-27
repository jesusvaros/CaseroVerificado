import { useEffect, useState } from 'react';
import { supabaseWrapper } from '../../services/supabase/client';

export type MyReviewStatus = 'published' | 'pending' | 'rejected' | 'draft';

export interface MyReview {
  id: string;
  createdAt: string;
  status: MyReviewStatus;
  rejectionReason: string | null;
  street: string | null;
  number: string | null;
  city: string | null;
  postalCode: string | null;
  coordinates: { lat: number; lng: number } | null;
  startYear: number | null;
  endYear: number | null;
  price: number | null;
  scores: number[];
}

interface SessionRow {
  id: string;
  created_at: string;
  validated: boolean;
  status: string | null;
  rejection_reason: string | null;
  step5_completed: boolean;
}

type Address = { street?: string; number?: string; city?: string; postalCode?: string; coordinates?: { lat: number; lng: number }; components?: { road?: string; house_number?: string; city?: string } };

// The signed-in user's reviews with their address, stay and scores, newest first.
export function useMyReviews(userId: string | undefined) {
  const [reviews, setReviews] = useState<MyReview[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const client = supabaseWrapper.getClient();
    if (!client || !userId) return;
    let active = true;
    (async () => {
      const { data, error: sessionsError } = await client
        .from('review_sessions')
        .select('id, created_at, validated, status, rejection_reason, step5_completed')
        .eq('user_id', userId)
        .eq('step1_completed', true)
        .order('created_at', { ascending: false });
      if (sessionsError) {
        if (active) setError(true);
        return;
      }
      const rows = await Promise.all(
        (data as SessionRow[]).map(async session => {
          const [address, stay] = await Promise.all([
            client.rpc('get_address_step1_data', { p_review_session_id: session.id }),
            client.rpc('get_estancia_step2_data', { p_review_session_id: session.id }),
          ]);
          const a = ((Array.isArray(address.data) ? address.data[0] : address.data)?.address_details ?? {}) as Address;
          const s = (Array.isArray(stay.data) ? stay.data[0] : stay.data) ?? {};
          const status: MyReviewStatus =
            session.status === 'rejected' ? 'rejected' : session.validated ? 'published' : session.step5_completed ? 'pending' : 'draft';
          return {
            id: session.id,
            createdAt: session.created_at,
            status,
            rejectionReason: session.rejection_reason,
            street: a.street || a.components?.road || null,
            number: a.number || a.components?.house_number || null,
            city: a.city || a.components?.city || null,
            postalCode: a.postalCode || null,
            coordinates: a.coordinates ?? null,
            startYear: s.start_year ?? null,
            endYear: s.end_year ?? null,
            price: s.price != null ? Number(s.price) : null,
            scores: [s.owner_score, s.property_score, s.building_score, s.area_score].filter((v): v is number => typeof v === 'number'),
          } satisfies MyReview;
        })
      );
      if (active) setReviews(rows);
    })();
    return () => {
      active = false;
    };
  }, [userId]);

  return { reviews, error };
}
