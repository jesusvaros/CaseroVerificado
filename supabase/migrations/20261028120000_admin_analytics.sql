-- First-party analytics for the admin dashboard: anonymous site events (no IP, no user agent,
-- a random id per visit that is never stored in the browser) and the outreach contacts we write to. Each outreach email links
-- with ?ref=<contact ref>, so visits and reviews can be traced back to it even without a reply.

create table public.site_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  event text not null check (event in ('session_start', 'review_form_opened', 'review_submitted')),
  visitor uuid not null,
  path text check (length(path) <= 300),
  referrer_host text check (length(referrer_host) <= 120),
  ref text check (ref ~ '^[a-z0-9-]{1,60}$'),
  utm_source text check (length(utm_source) <= 60),
  utm_campaign text check (length(utm_campaign) <= 60)
);
create index site_events_created_at_idx on public.site_events (created_at);
create index site_events_ref_idx on public.site_events (ref) where ref is not null;

alter table public.site_events enable row level security;
-- Anyone can log an event; only admins can read them
create policy site_events_insert on public.site_events for insert to anon, authenticated with check (true);
create policy site_events_admin_read on public.site_events for select to authenticated using (coalesce(public.is_admin(), false));

create table public.outreach_contacts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ref text not null unique check (ref ~ '^[a-z0-9-]{1,60}$'),
  org text not null,
  city text,
  kind text not null,
  channel text not null,
  status text not null default 'draft' check (status in ('draft', 'sent', 'replied', 'interested', 'declined', 'bounced')),
  sent_at timestamptz,
  replied_at timestamptz,
  notes text
);

alter table public.outreach_contacts enable row level security;
create policy outreach_admin_all on public.outreach_contacts for all to authenticated
  using (coalesce(public.is_admin(), false)) with check (coalesce(public.is_admin(), false));

-- Everything the dashboard shows, in one call
create function public.admin_dashboard(p_days integer default 30) returns jsonb
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
        'published', (select count(*) from public_reviews),
        'pending', count(*) filter (where not validated and status <> 'rejected' and step5_completed),
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
