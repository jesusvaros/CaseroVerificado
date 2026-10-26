--
-- PostgreSQL database dump
--


-- Dumped from database version 17.4
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: get_address_step1_data(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_address_step1_data(p_review_session_id uuid) RETURNS TABLE(review_session_id uuid, address_details jsonb, created_at timestamp with time zone)
    LANGUAGE sql SECURITY DEFINER
    AS $$
  select
    review_session_id,
    address_details,
    created_at
  from
    address_step1
  where
    review_session_id = p_review_session_id;
$$;


--
-- Name: get_comunidad_step4_data(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_comunidad_step4_data(p_review_session_id uuid) RETURNS TABLE(neighbor_types text[], tourist_apartments text, building_cleanliness text, community_environment text[], community_security text, community_opinion text, created_at timestamp with time zone)
    LANGUAGE sql SECURITY DEFINER
    AS $$
select
  neighbor_types,
  tourist_apartments,
  building_cleanliness,
  community_environment,
  community_security,
  community_opinion,
  created_at
from public.comunidad_step4
where review_session_id = p_review_session_id;
$$;


--
-- Name: get_estancia_step2_data(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_estancia_step2_data(p_review_session_id uuid) RETURNS TABLE(start_year integer, end_year integer, price numeric, included_services jsonb, would_recommend text, deposit_returned text)
    LANGUAGE sql SECURITY DEFINER
    AS $$
  select
    start_year,
    end_year,
    price,
    included_services,
    would_recommend,
    deposit_returned
  from estancia_step2
  where review_session_id = p_review_session_id;
$$;


--
-- Name: get_gestion_step5_data(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_gestion_step5_data(p_review_session_id uuid) RETURNS TABLE(owner_type text, owner_name_hash text, owner_phone_hash text, owner_email_hash text, owner_opinion text, created_at timestamp with time zone)
    LANGUAGE sql SECURITY DEFINER
    AS $$
select
  owner_type,
  owner_name_hash,
  owner_phone_hash,
  owner_email_hash,
  owner_opinion,
  created_at
from public.gestion_step5
where review_session_id = p_review_session_id;
$$;


--
-- Name: get_piso_step3_data(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_piso_step3_data(p_review_session_id uuid) RETURNS TABLE(summer_temperature text, winter_temperature text, noise_level text, light_level text, maintenance_status text, property_opinion text, created_at timestamp with time zone)
    LANGUAGE sql SECURITY DEFINER
    AS $$select
  summer_temperature,
  winter_temperature,
  noise_level,
  light_level,
  maintenance_status,
  property_opinion,
  created_at
from public.piso_step3
where review_session_id = p_review_session_id;$$;


--
-- Name: get_review_session(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_review_session(p_session_id uuid) RETURNS TABLE(id uuid, session_id uuid, created_at timestamp with time zone, step1_completed boolean, step2_completed boolean, step3_completed boolean, step4_completed boolean, step5_completed boolean)
    LANGUAGE sql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$select
    rs.id,
    rs.session_id,
    rs.created_at,
    rs.step1_completed,
    rs.step2_completed,
    rs.step3_completed,
    rs.step4_completed,
    rs.step5_completed
  from public.review_sessions rs
  where rs.session_id = p_session_id
    and (rs.user_id is null or rs.user_id = auth.uid())
  limit 1$$;


--
-- Name: get_review_session_admin(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_review_session_admin(p_id uuid) RETURNS TABLE(user_id uuid, email text, status text, rejection_reason text)
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public', 'auth'
    AS $$
begin
  if not public.is_admin() then
    raise exception 'insufficient_privilege';
  end if;

  return query
    select
      rs.user_id,
      (u.email)::text as email,          -- <= cast a text
      (rs.status)::text as status,       -- opcional (ya era text)
      (rs.rejection_reason)::text        -- opcional (ya era text)
    from public.review_sessions rs
    left join auth.users u on u.id = rs.user_id
    where rs.id = p_id;
end;
$$;


--
-- Name: get_review_session_by_id(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_review_session_by_id(p_id uuid) RETURNS TABLE(id uuid, session_id text, created_at timestamp with time zone, step1_completed boolean, step2_completed boolean, step3_completed boolean, step4_completed boolean, step5_completed boolean)
    LANGUAGE sql SECURITY DEFINER
    SET search_path TO 'public', 'auth'
    AS $$
  select
    rs.id,
    rs.session_id,
    rs.created_at,
    rs.step1_completed,
    rs.step2_completed,
    rs.step3_completed,
    rs.step4_completed,
    rs.step5_completed
  from public.review_sessions rs
  where rs.id = p_id
  limit 1
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address_step1; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.address_step1 (
    review_session_id uuid NOT NULL,
    address_details jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: comunidad_step4; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comunidad_step4 (
    review_session_id uuid NOT NULL,
    neighbor_types text[],
    tourist_apartments text,
    building_cleanliness text,
    community_environment text[],
    community_security text,
    community_opinion text,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT estancia_step4_building_cleanliness_check CHECK ((building_cleanliness = ANY (ARRAY['Muy limpio'::text, 'Buena'::text, 'Poca'::text, 'Sin limpieza'::text]))),
    CONSTRAINT estancia_step4_community_security_check CHECK ((community_security = ANY (ARRAY['Muy segura'::text, 'Sin problemas'::text, 'Mejorable'::text, 'Poco segura'::text]))),
    CONSTRAINT estancia_step4_tourist_apartments_check CHECK ((tourist_apartments = ANY (ARRAY['Sí, tolerable'::text, 'Sí, molestos'::text, 'No hay'::text])))
);


--
-- Name: estancia_step2; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.estancia_step2 (
    review_session_id uuid NOT NULL,
    start_year integer,
    end_year integer,
    price numeric,
    included_services jsonb,
    created_at timestamp with time zone DEFAULT now(),
    would_recommend text,
    deposit_returned text,
    CONSTRAINT estancia_step2_would_recommend_check CHECK ((would_recommend = ANY (ARRAY['1'::text, '2'::text, '3'::text, '4'::text, '5'::text])))
);


--
-- Name: gestion_step5; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.gestion_step5 (
    review_session_id uuid NOT NULL,
    owner_type text,
    owner_name_hash text,
    owner_phone_hash text,
    owner_email_hash text,
    owner_opinion text,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT gestion_step5_owner_type_check CHECK ((owner_type = ANY (ARRAY['Particular'::text, 'Agencia'::text])))
);


--
-- Name: piso_step3; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.piso_step3 (
    review_session_id uuid NOT NULL,
    summer_temperature text,
    winter_temperature text,
    noise_level text,
    light_level text,
    maintenance_status text,
    property_opinion text,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT estancia_step3_light_level_check CHECK ((light_level = ANY (ARRAY['Nada de luz'::text, 'Poca luz'::text, 'Luminoso'::text, 'Muy luminoso'::text]))),
    CONSTRAINT estancia_step3_maintenance_status_check CHECK ((maintenance_status = ANY (ARRAY['Como nuevo'::text, 'Bueno'::text, 'Aceptable'::text, 'Poco'::text, 'Malo'::text]))),
    CONSTRAINT estancia_step3_noise_level_check CHECK ((noise_level = ANY (ARRAY['Silencioso'::text, 'Tolerable'::text, 'Bastante'::text, 'Se oye todo'::text]))),
    CONSTRAINT estancia_step3_summer_temperature_check CHECK ((summer_temperature = ANY (ARRAY['Bien aislado'::text, 'Correcto'::text, 'Caluroso'::text]))),
    CONSTRAINT estancia_step3_winter_temperature_check CHECK ((winter_temperature = ANY (ARRAY['Bien aislado'::text, 'Correcto'::text, 'Frío'::text])))
);


--
-- Name: review_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.review_sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    step1_completed boolean DEFAULT false NOT NULL,
    step2_completed boolean DEFAULT false NOT NULL,
    step3_completed boolean DEFAULT false NOT NULL,
    step4_completed boolean DEFAULT false NOT NULL,
    step5_completed boolean DEFAULT false NOT NULL,
    session_id uuid NOT NULL,
    user_id uuid,
    validated boolean DEFAULT false NOT NULL,
    status text DEFAULT 'pending'::text,
    rejection_reason text,
    CONSTRAINT review_sessions_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'validated'::text, 'rejected'::text])))
);


--
-- Name: COLUMN review_sessions.session_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.review_sessions.session_id IS 'id generated on the front to identify user';


--
-- Name: COLUMN review_sessions.validated; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.review_sessions.validated IS 'when this set to true create a into public table';


--
-- Name: review_sessions_with_steps; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.review_sessions_with_steps WITH (security_invoker='true') AS
 SELECT rs.id AS review_session_id,
    rs.created_at,
    rs.user_id,
    rs.validated,
    rs.status,
    rs.rejection_reason,
    rs.step1_completed,
    rs.step2_completed,
    rs.step3_completed,
    rs.step4_completed,
    rs.step5_completed,
    a.address_details,
    e.start_year,
    e.end_year,
    e.price,
    e.included_services,
    e.would_recommend,
    e.deposit_returned,
    p.summer_temperature,
    p.winter_temperature,
    p.noise_level,
    p.light_level,
    p.maintenance_status,
    p.property_opinion,
    c.neighbor_types,
    c.community_environment,
    c.tourist_apartments,
    c.building_cleanliness,
    c.community_security,
    c.community_opinion,
    g.owner_type,
    g.owner_name_hash,
    g.owner_phone_hash,
    g.owner_email_hash,
    g.owner_opinion
   FROM (((((public.review_sessions rs
     LEFT JOIN public.address_step1 a ON ((a.review_session_id = rs.id)))
     LEFT JOIN public.estancia_step2 e ON ((e.review_session_id = rs.id)))
     LEFT JOIN public.piso_step3 p ON ((p.review_session_id = rs.id)))
     LEFT JOIN public.comunidad_step4 c ON ((c.review_session_id = rs.id)))
     LEFT JOIN public.gestion_step5 g ON ((g.review_session_id = rs.id)));


--
-- Name: get_review_sessions_for_moderation(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.get_review_sessions_for_moderation() RETURNS SETOF public.review_sessions_with_steps
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
begin
  if not public.is_admin() then
    raise exception 'not_authorized' using errcode = '42501';
  end if;

  return query
    select *
    from public.review_sessions_with_steps
    where step1_completed
      and step2_completed
      and step3_completed
      and step4_completed
      and step5_completed
      and validated = false
      and user_id is not null
    order by created_at desc;
end;
$$;


--
-- Name: is_admin(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_admin() RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
  select auth.uid() = any(ARRAY[
    '7ecc8d09-7446-4f8c-8db6-d8bdf23cd974'::uuid,  -- tu UUID de admin
    '01e73f5a-cb21-4d43-93ca-72ea616ccdad'::uuid   -- otro admin si quieres
  ]);
$$;


--
-- Name: upsert_address_step1_and_mark_review_session(uuid, jsonb); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.upsert_address_step1_and_mark_review_session(p_review_session_id uuid, p_address_details jsonb) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  -- 1. Upsert into address_step1
  insert into address_step1 (
    review_session_id,
    address_details
  )
  values (
    p_review_session_id,
    p_address_details
  )
  on conflict (review_session_id) do update
  set address_details = excluded.address_details;

  -- 2. Mark step1_completed in review_sessions
  update review_sessions
  set step1_completed = true
  where id = p_review_session_id;
end;
$$;


--
-- Name: upsert_comunidad_step4_and_mark_review_session(uuid, text[], text, text, text[], text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.upsert_comunidad_step4_and_mark_review_session(p_review_session_id uuid, p_neighbor_types text[], p_tourist_apartments text, p_building_cleanliness text, p_community_environment text[], p_community_security text, p_community_opinion text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  insert into public.comunidad_step4 (
    review_session_id,
    neighbor_types,
    tourist_apartments,
    building_cleanliness,
    community_environment,
    community_security,
    community_opinion
  )
  values (
    p_review_session_id,
    p_neighbor_types,
    p_tourist_apartments,
    p_building_cleanliness,
    p_community_environment,
    p_community_security,
    p_community_opinion
  )
  on conflict (review_session_id) do update
  set
    neighbor_types = excluded.neighbor_types,
    tourist_apartments = excluded.tourist_apartments,
    building_cleanliness = excluded.building_cleanliness,
    community_environment = excluded.community_environment,
    community_security = excluded.community_security,
    community_opinion = excluded.community_opinion,
    created_at = now();

  update public.review_sessions
  set step4_completed = true
  where id = p_review_session_id;
end;
$$;


--
-- Name: upsert_estancia_step2_and_mark_review_session(uuid, integer, integer, numeric, jsonb); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.upsert_estancia_step2_and_mark_review_session(p_review_session_id uuid, p_start_year integer, p_end_year integer, p_price numeric, p_included_services jsonb) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  insert into public.estancia_step2 (
    review_session_id,
    start_year,
    end_year,
    price,
    included_services
  )
  values (
    p_review_session_id,
    p_start_year,
    p_end_year,
    p_price,
    p_included_services
  )
  on conflict (review_session_id) do update
  set
    start_year = excluded.start_year,
    end_year = excluded.end_year,
    price = excluded.price,
    included_services = excluded.included_services,
    created_at = now();

  update public.review_sessions
  set step2_completed = true
  where id = p_review_session_id;
end;
$$;


--
-- Name: upsert_estancia_step2_and_mark_review_session(uuid, integer, integer, numeric, jsonb, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.upsert_estancia_step2_and_mark_review_session(p_review_session_id uuid, p_start_year integer DEFAULT NULL::integer, p_end_year integer DEFAULT NULL::integer, p_price numeric DEFAULT NULL::numeric, p_included_services jsonb DEFAULT NULL::jsonb, p_would_recommend text DEFAULT NULL::text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  insert into public.estancia_step2 (
    review_session_id,
    start_year,
    end_year,
    price,
    included_services,
    would_recommend
  )
  values (
    p_review_session_id,
    p_start_year,
    p_end_year,
    p_price,
    p_included_services,
    p_would_recommend
  )
  on conflict (review_session_id) do update
  set
    start_year = excluded.start_year,
    end_year = excluded.end_year,
    price = excluded.price,
    included_services = excluded.included_services,
    would_recommend = excluded.would_recommend,
    created_at = now();

  update public.review_sessions
  set step2_completed = true
  where id = p_review_session_id;
end;
$$;


--
-- Name: upsert_estancia_step2_and_mark_review_session(uuid, integer, integer, numeric, jsonb, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.upsert_estancia_step2_and_mark_review_session(p_review_session_id uuid, p_start_year integer, p_end_year integer, p_price numeric, p_included_services jsonb, p_would_recommend text, p_deposit_returned text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  insert into estancia_step2 (
    review_session_id,
    start_year,
    end_year,
    price,
    included_services,
    would_recommend,
    deposit_returned
  ) values (
    p_review_session_id,
    p_start_year,
    p_end_year,
    p_price,
    p_included_services,
    p_would_recommend,
    p_deposit_returned
  )
  on conflict (review_session_id) do update
  set
    start_year = excluded.start_year,
    end_year = excluded.end_year,
    price = excluded.price,
    included_services = excluded.included_services,
    would_recommend = excluded.would_recommend,
    deposit_returned = excluded.deposit_returned,
    created_at = now();

  update review_sessions
  set step2_completed = true
  where id = p_review_session_id;
end;
$$;


--
-- Name: upsert_gestion_step5_and_mark_review_session(uuid, text, text, text, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.upsert_gestion_step5_and_mark_review_session(p_review_session_id uuid, p_owner_type text DEFAULT NULL::text, p_owner_name text DEFAULT NULL::text, p_owner_phone text DEFAULT NULL::text, p_owner_email text DEFAULT NULL::text, p_owner_opinion text DEFAULT NULL::text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$
begin
  insert into public.gestion_step5 (
    review_session_id,
    owner_type,
    owner_name_hash,
    owner_phone_hash,
    owner_email_hash,
    owner_opinion
  )
  values (
    p_review_session_id,
    p_owner_type,
    p_owner_name,
    p_owner_phone,
    p_owner_email,
    p_owner_opinion
  )
  on conflict (review_session_id) do update
  set
    owner_type = excluded.owner_type,
    owner_name_hash = excluded.owner_name_hash,
    owner_phone_hash = excluded.owner_phone_hash,
    owner_email_hash = excluded.owner_email_hash,
    owner_opinion = excluded.owner_opinion,
    created_at = now();

  update public.review_sessions
  set step5_completed = true
  where id = p_review_session_id;
end;
$$;


--
-- Name: upsert_piso_step3_and_mark_review_session(uuid, text, text, text, text, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.upsert_piso_step3_and_mark_review_session(p_review_session_id uuid, p_summer_temperature text, p_winter_temperature text, p_noise_level text, p_light_level text, p_maintenance_status text, p_property_opinion text) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$begin
  insert into public.piso_step3 (
    review_session_id,
    summer_temperature,
    winter_temperature,
    noise_level,
    light_level,
    maintenance_status,
    property_opinion
  )
  values (
    p_review_session_id,
    p_summer_temperature,
    p_winter_temperature,
    p_noise_level,
    p_light_level,
    p_maintenance_status,
    p_property_opinion
  )
  on conflict (review_session_id) do update
  set
    summer_temperature = excluded.summer_temperature,
    winter_temperature = excluded.winter_temperature,
    noise_level = excluded.noise_level,
    light_level = excluded.light_level,
    maintenance_status = excluded.maintenance_status,
    property_opinion = excluded.property_opinion,
    created_at = now();

  update public.review_sessions
  set step3_completed = true
  where id = p_review_session_id;
end;$$;


--
-- Name: validate_review(uuid); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.validate_review(p_session_id uuid) RETURNS void
    LANGUAGE plpgsql SECURITY DEFINER
    AS $$declare
  addr jsonb;
  est estancia_step2;
  pis piso_step3;
  com comunidad_step4;
  ges gestion_step5;
begin
  -- Cargar datos de cada paso
  select address_details into addr from address_step1 where review_session_id = p_session_id;
  select * into est from estancia_step2 where review_session_id = p_session_id;
  select * into pis from piso_step3 where review_session_id = p_session_id;
  select * into com from comunidad_step4 where review_session_id = p_session_id;
  select * into ges from gestion_step5 where review_session_id = p_session_id;

  -- Insertar review pública
  insert into public_reviews (
    review_session_id,
    address_details,
    start_year,
    end_year,
    price,
    included_services,
    summer_temperature,
    winter_temperature,
    noise_level,
    light_level,
    maintenance_status,
    property_opinion,
    neighbor_types,
    community_environment,
    tourist_apartments,
    building_cleanliness,
    community_security,
    community_opinion,
    owner_type,
    owner_opinion,
    would_recommend,
    deposit_returned,
    validated_at
  ) values (
    p_session_id,
    addr,
    est.start_year,
    est.end_year,
    est.price,
    est.included_services,
    pis.summer_temperature,
    pis.winter_temperature,
    pis.noise_level,
    pis.light_level,
    pis.maintenance_status,
    pis.property_opinion,
    to_jsonb(com.neighbor_types),
    to_jsonb(com.community_environment),
    com.tourist_apartments,
    com.building_cleanliness,
    com.community_security,
    com.community_opinion,
    ges.owner_type,
    ges.owner_opinion,
    est.would_recommend,
    est.deposit_returned,
    now()
  );

  -- Marcar como validada
  update review_sessions
  set validated = true
  where id = p_session_id;
end;$$;


--
-- Name: blog_ai_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_ai_comments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    post_slug text NOT NULL,
    ordinal integer NOT NULL,
    author_name text,
    content text NOT NULL,
    is_auto boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT blog_ai_comments_content_check CHECK (((char_length(content) >= 12) AND (char_length(content) <= 800)))
);


--
-- Name: blog_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blog_comments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    post_slug text NOT NULL,
    user_id uuid NOT NULL,
    author_name text,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT blog_comments_content_check CHECK (((char_length(content) >= 3) AND (char_length(content) <= 2000)))
);


--
-- Name: public_reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.public_reviews (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    review_session_id uuid,
    address_details jsonb,
    start_year integer,
    end_year integer,
    price numeric,
    included_services jsonb,
    summer_temperature text,
    winter_temperature text,
    noise_level text,
    light_level text,
    maintenance_status text,
    property_opinion text,
    neighbor_types jsonb,
    community_environment jsonb,
    tourist_apartments text,
    building_cleanliness text,
    community_security text,
    community_opinion text,
    owner_type text,
    owner_opinion text,
    validated_at timestamp with time zone DEFAULT now(),
    is_public boolean DEFAULT true,
    edited boolean DEFAULT false,
    would_recommend text,
    deposit_returned text,
    is_seed boolean DEFAULT false
);


--
-- Name: address_step1 address_step1_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.address_step1
    ADD CONSTRAINT address_step1_pkey PRIMARY KEY (review_session_id);


--
-- Name: blog_ai_comments blog_ai_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_ai_comments
    ADD CONSTRAINT blog_ai_comments_pkey PRIMARY KEY (id);


--
-- Name: blog_comments blog_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_comments
    ADD CONSTRAINT blog_comments_pkey PRIMARY KEY (id);


--
-- Name: estancia_step2 estancia_step2_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.estancia_step2
    ADD CONSTRAINT estancia_step2_pkey PRIMARY KEY (review_session_id);


--
-- Name: piso_step3 estancia_step3_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.piso_step3
    ADD CONSTRAINT estancia_step3_pkey PRIMARY KEY (review_session_id);


--
-- Name: comunidad_step4 estancia_step4_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comunidad_step4
    ADD CONSTRAINT estancia_step4_pkey PRIMARY KEY (review_session_id);


--
-- Name: gestion_step5 gestion_step5_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gestion_step5
    ADD CONSTRAINT gestion_step5_pkey PRIMARY KEY (review_session_id);


--
-- Name: public_reviews public_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.public_reviews
    ADD CONSTRAINT public_reviews_pkey PRIMARY KEY (id);


--
-- Name: review_sessions review_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review_sessions
    ADD CONSTRAINT review_sessions_pkey PRIMARY KEY (id);


--
-- Name: blog_ai_comments_post_slug_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX blog_ai_comments_post_slug_created_at_idx ON public.blog_ai_comments USING btree (post_slug, created_at DESC);


--
-- Name: blog_ai_comments_post_slug_ordinal_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX blog_ai_comments_post_slug_ordinal_idx ON public.blog_ai_comments USING btree (post_slug, ordinal);


--
-- Name: blog_comments_post_slug_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX blog_comments_post_slug_created_at_idx ON public.blog_comments USING btree (post_slug, created_at DESC);


--
-- Name: address_step1 address_step1_review_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.address_step1
    ADD CONSTRAINT address_step1_review_session_id_fkey FOREIGN KEY (review_session_id) REFERENCES public.review_sessions(id) ON DELETE CASCADE;


--
-- Name: blog_comments blog_comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blog_comments
    ADD CONSTRAINT blog_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: estancia_step2 estancia_step2_review_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.estancia_step2
    ADD CONSTRAINT estancia_step2_review_session_id_fkey FOREIGN KEY (review_session_id) REFERENCES public.review_sessions(id) ON DELETE CASCADE;


--
-- Name: piso_step3 estancia_step3_review_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.piso_step3
    ADD CONSTRAINT estancia_step3_review_session_id_fkey FOREIGN KEY (review_session_id) REFERENCES public.review_sessions(id) ON DELETE CASCADE;


--
-- Name: comunidad_step4 estancia_step4_review_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comunidad_step4
    ADD CONSTRAINT estancia_step4_review_session_id_fkey FOREIGN KEY (review_session_id) REFERENCES public.review_sessions(id) ON DELETE CASCADE;


--
-- Name: gestion_step5 gestion_step5_review_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gestion_step5
    ADD CONSTRAINT gestion_step5_review_session_id_fkey FOREIGN KEY (review_session_id) REFERENCES public.review_sessions(id) ON DELETE CASCADE;


--
-- Name: public_reviews public_reviews_review_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.public_reviews
    ADD CONSTRAINT public_reviews_review_session_id_fkey FOREIGN KEY (review_session_id) REFERENCES public.review_sessions(id) ON DELETE SET NULL;


--
-- Name: review_sessions review_sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.review_sessions
    ADD CONSTRAINT review_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: blog_comments Allow delete own blog comment; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow delete own blog comment" ON public.blog_comments FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: blog_comments Allow insert own blog comment; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow insert own blog comment" ON public.blog_comments FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: review_sessions Allow inserts for all; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow inserts for all" ON public.review_sessions FOR INSERT WITH CHECK (true);


--
-- Name: blog_comments Allow public read of blog comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow public read of blog comments" ON public.blog_comments FOR SELECT USING (true);


--
-- Name: blog_ai_comments Enable delete for AI comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable delete for AI comments" ON public.blog_ai_comments FOR DELETE TO service_role USING (true);


--
-- Name: blog_ai_comments Enable insert for AI comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable insert for AI comments" ON public.blog_ai_comments FOR INSERT TO service_role WITH CHECK (true);


--
-- Name: blog_ai_comments Enable update for AI comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable update for AI comments" ON public.blog_ai_comments FOR UPDATE TO service_role USING (true) WITH CHECK (true);


--
-- Name: review_sessions User can DELETE their own sessions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "User can DELETE their own sessions" ON public.review_sessions FOR DELETE TO authenticated USING ((user_id = auth.uid()));


--
-- Name: review_sessions User can UPDATE their own sessions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "User can UPDATE their own sessions" ON public.review_sessions FOR UPDATE TO authenticated USING (((user_id IS NULL) OR (user_id = auth.uid())));


--
-- Name: address_step1; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.address_step1 ENABLE ROW LEVEL SECURITY;

--
-- Name: public_reviews block_deletes_from_clients; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY block_deletes_from_clients ON public.public_reviews FOR DELETE TO authenticated, anon USING (false);


--
-- Name: public_reviews block_inserts_from_clients; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY block_inserts_from_clients ON public.public_reviews FOR INSERT TO authenticated, anon WITH CHECK (false);


--
-- Name: public_reviews block_updates_from_clients; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY block_updates_from_clients ON public.public_reviews FOR UPDATE TO authenticated, anon USING (false) WITH CHECK (false);


--
-- Name: blog_ai_comments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.blog_ai_comments ENABLE ROW LEVEL SECURITY;

--
-- Name: blog_comments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;

--
-- Name: comunidad_step4; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.comunidad_step4 ENABLE ROW LEVEL SECURITY;

--
-- Name: estancia_step2; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.estancia_step2 ENABLE ROW LEVEL SECURITY;

--
-- Name: gestion_step5; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.gestion_step5 ENABLE ROW LEVEL SECURITY;

--
-- Name: public_reviews no_client_deletes_public_reviews; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY no_client_deletes_public_reviews ON public.public_reviews FOR DELETE TO authenticated, anon USING (false);


--
-- Name: public_reviews no_client_inserts_public_reviews; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY no_client_inserts_public_reviews ON public.public_reviews FOR INSERT TO authenticated, anon WITH CHECK (false);


--
-- Name: public_reviews no_client_updates_public_reviews; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY no_client_updates_public_reviews ON public.public_reviews FOR UPDATE TO authenticated, anon USING (false) WITH CHECK (false);


--
-- Name: piso_step3; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.piso_step3 ENABLE ROW LEVEL SECURITY;

--
-- Name: public_reviews public_can_read_reviews; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY public_can_read_reviews ON public.public_reviews FOR SELECT TO authenticated, anon USING (((COALESCE(is_public, false) = true) AND (validated_at IS NOT NULL)));


--
-- Name: public_reviews; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.public_reviews ENABLE ROW LEVEL SECURITY;

--
-- Name: public_reviews read_public_published_reviews; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY read_public_published_reviews ON public.public_reviews FOR SELECT TO authenticated, anon USING (((COALESCE(is_public, false) = true) AND (validated_at IS NOT NULL)));


--
-- Name: review_sessions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.review_sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: review_sessions select_own; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY select_own ON public.review_sessions FOR SELECT TO authenticated USING (true);


--
-- PostgreSQL database dump complete
--


