-- Review form funnel: anonymous step events (no form content), plus the fields that block a
-- submit, so the admin sees where people drop out. Reviews sent without confirming an email
-- ("unclaimed") are listed in moderation too, marked as such; they still cannot be published.

alter table public.site_events drop constraint site_events_event_check;
alter table public.site_events add constraint site_events_event_check check (event in (
  'session_start', 'review_form_opened', 'review_address_set', 'review_scores_set', 'review_opinion_started',
  'review_submit_clicked', 'review_submit_invalid', 'review_saved', 'review_login_shown', 'review_submitted'
));
-- Only for review_submit_invalid: the field ids that failed (e.g. "address,opinion")
alter table public.site_events add column detail text check (detail ~ '^[a-zA-Z,]{1,200}$');

create or replace function public.get_review_sessions_for_moderation() returns setof public.review_sessions_with_steps
  language plpgsql security definer
  set search_path to 'public'
  as $$
begin
  if not public.is_admin() then
    raise exception 'not_authorized' using errcode = '42501';
  end if;

  return query
    select *
    from public.review_sessions_with_steps
    where step1_completed and step2_completed and step3_completed and step4_completed and step5_completed
      and validated = false
    order by user_id is null, created_at desc;
end;
$$;

-- validate_review must not publish a review nobody confirmed
create or replace function public.validate_review(p_session_id uuid) returns void
  language plpgsql security definer
  as $$
declare
  addr jsonb;
  est estancia_step2;
  pis piso_step3;
  com comunidad_step4;
  ges gestion_step5;
begin
  -- is_admin() is null for anonymous callers, so coalesce before negating
  if not coalesce(public.is_admin(), false) then
    raise exception 'not allowed';
  end if;
  if (select user_id from review_sessions where id = p_session_id) is null then
    raise exception 'review not confirmed by email';
  end if;

  select address_details into addr from address_step1 where review_session_id = p_session_id;
  select * into est from estancia_step2 where review_session_id = p_session_id;
  select * into pis from piso_step3 where review_session_id = p_session_id;
  select * into com from comunidad_step4 where review_session_id = p_session_id;
  select * into ges from gestion_step5 where review_session_id = p_session_id;

  insert into public_reviews (
    review_session_id, address_details, start_year, end_year, price, included_services,
    summer_temperature, winter_temperature, noise_level, light_level, maintenance_status, property_opinion,
    neighbor_types, community_environment, tourist_apartments, building_cleanliness, community_security, community_opinion,
    owner_type, owner_opinion, would_recommend, deposit_returned,
    owner_score, property_score, building_score, area_score, tags, size_m2, rental_type, validated_at
  ) values (
    p_session_id, addr, est.start_year, est.end_year, est.price, est.included_services,
    pis.summer_temperature, pis.winter_temperature, pis.noise_level, pis.light_level, pis.maintenance_status, pis.property_opinion,
    to_jsonb(com.neighbor_types), to_jsonb(com.community_environment), com.tourist_apartments, com.building_cleanliness, com.community_security, com.community_opinion,
    ges.owner_type, ges.owner_opinion, est.would_recommend, est.deposit_returned,
    est.owner_score, est.property_score, est.building_score, est.area_score, est.tags, est.size_m2, est.rental_type, now()
  );

  update review_sessions set validated = true where id = p_session_id;
end;
$$;

-- admin_dashboard: adds the form funnel, the blocking fields and the unclaimed count
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
        -- Sent but the email was never confirmed: kept for the admin, never published
        'unclaimed', count(*) filter (where not validated and status <> 'rejected' and step5_completed and user_id is null),
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
    -- How far people get in the review form: visitors who reached each step at least once
    'funnel', (
      select coalesce(jsonb_object_agg(event, n), '{}')
      from (
        select event, count(distinct visitor) as n from site_events
        where created_at >= since and event <> 'session_start' group by 1
      ) f
    ),
    -- Which fields stop people when they press "Enviar"
    'blocking_fields', (
      select coalesce(jsonb_agg(jsonb_build_object('field', field, 'visitors', n) order by n desc), '[]')
      from (
        select field, count(distinct visitor) as n
        from site_events, unnest(string_to_array(detail, ',')) as field
        where event = 'review_submit_invalid' and created_at >= since
        group by 1
      ) b
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
