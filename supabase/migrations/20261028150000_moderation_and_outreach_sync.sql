-- 1) Moderation without the reject-review edge function (it had no caller check): admin-only RPCs.
-- 2) Outreach sync: a Google Apps Script in the outreach mailbox reports sends, replies and
--    bounces every 15 minutes. It authenticates with a shared secret that lives only in the
--    private schema (never exposed through the API) and in the script's properties.

create or replace function public.reject_review(p_session_id uuid, p_reason text default null) returns void
  language plpgsql security definer
  set search_path = public
  as $$
begin
  if not coalesce(public.is_admin(), false) then
    raise exception 'not allowed';
  end if;
  update review_sessions
  set status = 'rejected', rejection_reason = nullif(trim(p_reason), '')
  where id = p_session_id;
end;
$$;

-- For tests and spam: removes the review and everything it saved (step tables cascade).
create or replace function public.delete_review(p_session_id uuid) returns void
  language plpgsql security definer
  set search_path = public
  as $$
begin
  if not coalesce(public.is_admin(), false) then
    raise exception 'not allowed';
  end if;
  delete from public_reviews where review_session_id = p_session_id;
  delete from review_sessions where id = p_session_id;
end;
$$;

revoke execute on function public.reject_review(uuid, text) from anon;
revoke execute on function public.delete_review(uuid) from anon;

alter table public.outreach_contacts
  add column email text,
  add column last_message text,
  add column thread_url text,
  add column synced_at timestamptz;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
create table if not exists private.settings (name text primary key, value text not null);
insert into private.settings (name, value)
values ('outreach_sync_secret', encode(extensions.gen_random_bytes(24), 'hex'))
on conflict (name) do nothing;

create or replace function public.outreach_sync_targets(p_secret text) returns table(ref text, email text)
  language plpgsql security definer
  set search_path = public
  as $$
begin
  if p_secret is distinct from (select value from private.settings where name = 'outreach_sync_secret') then
    raise exception 'not allowed';
  end if;
  return query select c.ref, c.email from outreach_contacts c where c.channel = 'email' and c.email is not null;
end;
$$;

-- p_updates: [{ref, sent_at, replied_at, bounced, message, thread_url}]. Only moves a contact
-- forward (draft -> sent -> replied/bounced); "interested" and "declined" are set by hand and kept.
create or replace function public.outreach_sync(p_secret text, p_updates jsonb) returns integer
  language plpgsql security definer
  set search_path = public
  as $$
declare
  u jsonb;
  changed integer := 0;
begin
  if p_secret is distinct from (select value from private.settings where name = 'outreach_sync_secret') then
    raise exception 'not allowed';
  end if;

  for u in select * from jsonb_array_elements(p_updates) loop
    update outreach_contacts c set
      sent_at = coalesce(c.sent_at, (u->>'sent_at')::timestamptz),
      replied_at = coalesce((u->>'replied_at')::timestamptz, c.replied_at),
      last_message = coalesce(left(u->>'message', 400), c.last_message),
      thread_url = coalesce(u->>'thread_url', c.thread_url),
      status = case
        when c.status in ('interested', 'declined') then c.status
        when (u->>'replied_at') is not null then 'replied'
        when coalesce((u->>'bounced')::boolean, false) then 'bounced'
        when c.status = 'draft' and (u->>'sent_at') is not null then 'sent'
        else c.status
      end,
      synced_at = now()
    where c.ref = u->>'ref';
    changed := changed + 1;
  end loop;
  return changed;
end;
$$;

grant execute on function public.outreach_sync_targets(text) to anon;
grant execute on function public.outreach_sync(text, jsonb) to anon;

-- admin_dashboard also returns what the sync found
create or replace function public.admin_dashboard(p_days integer default 30) returns jsonb
  language plpgsql stable security definer
  set search_path = public
  as $$
declare
  since timestamptz := now() - make_interval(days => greatest(p_days, 1));
begin
  if not coalesce(public.is_admin(), false) then
    raise exception 'not allowed';
  end if;

  return jsonb_build_object(
    'days', p_days,
    'totals', (
      select jsonb_build_object(
        'sessions', count(*) filter (where event = 'session_start'),
        'visitors', count(distinct visitor) filter (where event = 'session_start'),
        'forms_opened', count(distinct visitor) filter (where event = 'review_form_opened'),
        'reviews_submitted', count(*) filter (where event = 'review_submitted')
      )
      from site_events where created_at >= since
    ),
    'reviews', (
      select jsonb_build_object(
        -- Same rules as the site (is_public) and the moderation queue (completed, with an author)
        'published', (select count(*) from public_reviews where is_public),
        'hidden', (select count(*) from public_reviews where not is_public),
        'pending', count(*) filter (where not validated and status <> 'rejected' and step5_completed and user_id is not null),
        'rejected', count(*) filter (where status = 'rejected')
      )
      from review_sessions
    ),
    'daily', (
      select coalesce(jsonb_agg(jsonb_build_object('day', day, 'sessions', sessions, 'reviews', reviews) order by day), '[]')
      from (
        select date_trunc('day', created_at)::date as day,
               count(*) filter (where event = 'session_start') as sessions,
               count(*) filter (where event = 'review_submitted') as reviews
        from site_events where created_at >= since group by 1
      ) d
    ),
    'sources', (
      select coalesce(jsonb_agg(jsonb_build_object('source', source, 'sessions', n) order by n desc), '[]')
      from (
        select coalesce(case when ref is not null then 'Correo: ' || ref end, utm_source, referrer_host, 'Directo') as source, count(*) as n
        from site_events where event = 'session_start' and created_at >= since
        group by 1 order by 2 desc limit 12
      ) s
    ),
    'pages', (
      select coalesce(jsonb_agg(jsonb_build_object('path', path, 'sessions', n) order by n desc), '[]')
      from (
        select path, count(*) as n from site_events
        where event = 'session_start' and created_at >= since group by 1 order by 2 desc limit 10
      ) p
    ),
    -- Outreach is measured over all time: a reply or a visit can come weeks later
    'outreach', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'id', c.id, 'ref', c.ref, 'org', c.org, 'city', c.city, 'kind', c.kind, 'channel', c.channel,
        'status', c.status, 'sent_at', c.sent_at, 'replied_at', c.replied_at, 'notes', c.notes,
        'last_message', c.last_message, 'thread_url', c.thread_url, 'synced_at', c.synced_at,
        'visitors', coalesce(e.visitors, 0), 'sessions', coalesce(e.sessions, 0),
        'forms', coalesce(e.forms, 0), 'reviews', coalesce(e.reviews, 0), 'last_visit', e.last_visit
      ) order by c.kind, c.org), '[]')
      from outreach_contacts c
      left join (
        select ref,
               count(distinct visitor) as visitors,
               count(*) filter (where event = 'session_start') as sessions,
               count(distinct visitor) filter (where event = 'review_form_opened') as forms,
               count(*) filter (where event = 'review_submitted') as reviews,
               max(created_at) as last_visit
        from site_events where ref is not null group by ref
      ) e on e.ref = c.ref
    )
  );
end;
$$;
