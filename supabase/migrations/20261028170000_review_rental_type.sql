-- Whole flat or a single room: room rents are per room, so they must not mix with flat rents
-- in the averages or the rent per m². Missing means a whole flat (every review before this).

alter table public.estancia_step2 add column rental_type text not null default 'whole' check (rental_type in ('whole', 'room'));
alter table public.public_reviews add column rental_type text not null default 'whole' check (rental_type in ('whole', 'room'));

drop function public.submit_review_v2(uuid, jsonb, integer, integer, numeric, text, smallint, smallint, smallint, smallint, text, text[], smallint);
create function public.submit_review_v2(
  p_review_session_id uuid,
  p_address_details jsonb,
  p_start_year integer,
  p_end_year integer,
  p_price numeric,
  p_deposit_returned text,
  p_owner_score smallint,
  p_property_score smallint,
  p_building_score smallint,
  p_area_score smallint,
  p_opinion text,
  p_tags text[] default null,
  p_size_m2 smallint default null,
  p_rental_type text default null
) returns void
  language plpgsql security definer
  set search_path = public
  as $$
begin
  if not exists (select 1 from review_sessions where id = p_review_session_id) then
    raise exception 'review session not found';
  end if;
  if exists (select 1 from review_sessions where id = p_review_session_id and validated) then
    raise exception 'review already published';
  end if;
  if p_owner_score is null or p_property_score is null then
    raise exception 'owner and property scores are required';
  end if;
  if length(coalesce(trim(p_opinion), '')) < 30 then
    raise exception 'opinion too short';
  end if;

  insert into address_step1 (review_session_id, address_details)
  values (p_review_session_id, p_address_details)
  on conflict (review_session_id) do update set address_details = excluded.address_details;

  insert into estancia_step2 (
    review_session_id, start_year, end_year, price, deposit_returned, would_recommend,
    owner_score, property_score, building_score, area_score, tags, size_m2, rental_type
  ) values (
    p_review_session_id, p_start_year, p_end_year, p_price, p_deposit_returned,
    round((p_owner_score + p_property_score) / 2.0)::int::text,
    p_owner_score, p_property_score, p_building_score, p_area_score, nullif(p_tags, '{}'), p_size_m2, coalesce(p_rental_type, 'whole')
  )
  on conflict (review_session_id) do update set
    start_year = excluded.start_year,
    end_year = excluded.end_year,
    price = excluded.price,
    deposit_returned = excluded.deposit_returned,
    would_recommend = excluded.would_recommend,
    owner_score = excluded.owner_score,
    property_score = excluded.property_score,
    building_score = excluded.building_score,
    area_score = excluded.area_score,
    tags = excluded.tags,
    size_m2 = excluded.size_m2,
    rental_type = excluded.rental_type,
    created_at = now();

  insert into gestion_step5 (review_session_id, owner_opinion)
  values (p_review_session_id, trim(p_opinion))
  on conflict (review_session_id) do update set owner_opinion = excluded.owner_opinion, created_at = now();

  update review_sessions
  set step1_completed = true, step2_completed = true, step3_completed = true,
      step4_completed = true, step5_completed = true
  where id = p_review_session_id;
end;
$$;

drop function public.get_estancia_step2_data(uuid);
create function public.get_estancia_step2_data(p_review_session_id uuid)
  returns table(
    start_year integer, end_year integer, price numeric, included_services jsonb,
    would_recommend text, deposit_returned text,
    owner_score smallint, property_score smallint, building_score smallint, area_score smallint, tags text[], size_m2 smallint, rental_type text
  )
  language sql security definer
  as $$
  select start_year, end_year, price, included_services, would_recommend, deposit_returned,
         owner_score, property_score, building_score, area_score, tags, size_m2, rental_type
  from estancia_step2
  where review_session_id = p_review_session_id;
$$;

create or replace view public.review_sessions_with_steps with (security_invoker = 'true') as
 select rs.id as review_session_id,
    rs.created_at, rs.user_id, rs.validated, rs.status, rs.rejection_reason,
    rs.step1_completed, rs.step2_completed, rs.step3_completed, rs.step4_completed, rs.step5_completed,
    a.address_details,
    e.start_year, e.end_year, e.price, e.included_services, e.would_recommend, e.deposit_returned,
    p.summer_temperature, p.winter_temperature, p.noise_level, p.light_level, p.maintenance_status, p.property_opinion,
    c.neighbor_types, c.community_environment, c.tourist_apartments, c.building_cleanliness, c.community_security, c.community_opinion,
    g.owner_type, g.owner_name_hash, g.owner_phone_hash, g.owner_email_hash, g.owner_opinion,
    e.owner_score, e.property_score, e.building_score, e.area_score, e.tags, e.size_m2, e.rental_type
   from public.review_sessions rs
     left join public.address_step1 a on a.review_session_id = rs.id
     left join public.estancia_step2 e on e.review_session_id = rs.id
     left join public.piso_step3 p on p.review_session_id = rs.id
     left join public.comunidad_step4 c on c.review_session_id = rs.id
     left join public.gestion_step5 g on g.review_session_id = rs.id;

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
