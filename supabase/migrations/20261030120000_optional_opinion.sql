-- The written opinion is optional: a review with only the rent, the scores and the deposit still helps.
-- A written one still needs at least 30 characters. Same signature, so create or replace keeps the grants.

create or replace function public.submit_review_v2(
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
  if length(coalesce(trim(p_opinion), '')) between 1 and 29 then
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
  values (p_review_session_id, nullif(trim(p_opinion), ''))
  on conflict (review_session_id) do update set owner_opinion = excluded.owner_opinion, created_at = now();

  update review_sessions
  set step1_completed = true, step2_completed = true, step3_completed = true,
      step4_completed = true, step5_completed = true
  where id = p_review_session_id;
end;
$$;
