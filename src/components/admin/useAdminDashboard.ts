import { useCallback, useEffect, useState } from 'react';
import { supabaseWrapper } from '../../services/supabase/client';

export type OutreachStatus = 'draft' | 'sent' | 'replied' | 'interested' | 'declined' | 'bounced';

export interface OutreachContact {
  id: string;
  ref: string;
  org: string;
  city: string | null;
  kind: string;
  channel: string;
  status: OutreachStatus;
  sent_at: string | null;
  replied_at: string | null;
  notes: string | null;
  visitors: number;
  sessions: number;
  forms: number;
  reviews: number;
  last_visit: string | null;
}

export interface Dashboard {
  days: number;
  totals: { sessions: number; visitors: number; forms_opened: number; reviews_submitted: number };
  reviews: { published: number; pending: number; rejected: number };
  daily: { day: string; sessions: number; reviews: number }[];
  sources: { source: string; sessions: number }[];
  pages: { path: string; sessions: number }[];
  outreach: OutreachContact[];
}

// Everything on the admin dashboard comes from one admin-only RPC (admin_dashboard).
export function useAdminDashboard(days: number) {
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const client = supabaseWrapper.getClient();
    if (!client) return;
    const { data: result, error: rpcError } = await client.rpc('admin_dashboard', { p_days: days });
    if (rpcError) setError(rpcError.message);
    else setData(result as Dashboard);
  }, [days]);

  useEffect(() => {
    void load();
  }, [load]);

  const updateContact = async (id: string, patch: Partial<Pick<OutreachContact, 'status' | 'notes' | 'sent_at' | 'replied_at'>>) => {
    const client = supabaseWrapper.getClient();
    if (!client) return;
    setData(prev => prev && { ...prev, outreach: prev.outreach.map(c => (c.id === id ? { ...c, ...patch } : c)) });
    const { error: updateError } = await client.from('outreach_contacts').update(patch).eq('id', id);
    if (updateError) {
      setError(updateError.message);
      void load();
    }
  };

  return { data, error, reload: load, updateContact };
}
