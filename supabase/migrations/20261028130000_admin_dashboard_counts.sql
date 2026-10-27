-- admin_dashboard: count reviews the way the site and the moderation queue do.

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
