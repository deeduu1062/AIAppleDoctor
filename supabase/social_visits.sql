-- Seb Saathi: "Visits from social media" on the admin Overview (Facebook, Instagram, YouTube, WhatsApp, Google)
-- Run once AFTER visits.sql, visit_places.sql and marketing_v2.sql: Supabase → SQL Editor → New query → paste → Run.
-- Safe to re-run. It reads the visits you already have; nothing new is stored about visitors.
--
-- A visit counts for a platform when:
--   1. it came in on a tracked link (?src=fb…, ads…, ig…, yt…, wa…), or else
--   2. the site that sent it was that platform (facebook.com, instagram.com, youtube.com, wa.me, google…), or else
--   3. it was opened inside the Facebook or Instagram app (the website notes this as the sending site).

create or replace function public.ss_visit_platform(v_src text, v_ref text) returns text
language sql immutable as $$
  select case
    when v_src ~ '^(fb|ads)'  then 'facebook'
    when v_src ~ '^ig'        then 'instagram'
    when v_src ~ '^yt'        then 'youtube'
    when v_src ~ '^wa'        then 'whatsapp'
    when v_ref ~* '(^|\.)(facebook\.com|fb\.com|fb\.me|messenger\.com)$' then 'facebook'
    when v_ref ~* '(^|\.)instagram\.com$'                                 then 'instagram'
    when v_ref ~* '(^|\.)(youtube\.com|youtu\.be)$'                        then 'youtube'
    when v_ref ~* '(^|\.)(whatsapp\.com|whatsapp\.net|wa\.me)$'            then 'whatsapp'
    when v_ref ~* '(^|\.)google\.[a-z.]+$'                                 then 'google'
    when coalesce(v_src, '') <> ''                                         then 'other'
    when coalesce(v_ref, '') <> ''                                         then 'other'
    else 'direct'
  end
$$;

create or replace function public.admin_social_visits() returns json
language plpgsql stable security definer set search_path = public, auth as $$
declare
  t0  timestamptz := (date_trunc('day', now() at time zone 'Asia/Kolkata')) at time zone 'Asia/Kolkata';  -- today, India time
  d7  timestamptz := now() - interval '7 days';
  d14 timestamptz := now() - interval '14 days';
  d30 timestamptz := now() - interval '30 days';
  res json;
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  with v as (
    select s.at, s.visitor, s.region, s.city, s.country,
           public.ss_visit_platform(s.src, s.ref) as p
      from site_visits s
  ), j as (   -- growers who joined, by where their first visit came from
    select public.ss_visit_platform(nullif(u.raw_user_meta_data ->> 'src', ''), null) as p, u.created_at
      from auth.users u
     where (u.email_confirmed_at is not null or u.phone_confirmed_at is not null)
       and lower(coalesce(u.email, '')) not in (select e.email from public.admin_emails e)
       and coalesce(u.raw_user_meta_data ->> 'src', '') <> ''
  ), plat as (
    select x.p from (values ('facebook'), ('instagram'), ('youtube'), ('whatsapp'), ('google'), ('other'), ('direct')) x(p)
  )
  select json_build_object(
    'platforms', (select json_agg(json_build_object(
        'p',        plat.p,
        'today',    (select count(*) from v where v.p = plat.p and v.at >= t0),
        'd7',       (select count(*) from v where v.p = plat.p and v.at >= d7),
        'prev7',    (select count(*) from v where v.p = plat.p and v.at >= d14 and v.at < d7),
        'd30',      (select count(*) from v where v.p = plat.p and v.at >= d30),
        'total',    (select count(*) from v where v.p = plat.p),
        'people30', (select count(distinct visitor) from v where v.p = plat.p and v.at >= d30),
        'joined30', (select count(*) from j where j.p = plat.p and j.created_at >= d30),
        'joined',   (select count(*) from j where j.p = plat.p),
        'states', coalesce((select json_agg(r) from (
            select nullif(v.region, '') as code, count(*) as n from v
             where v.p = plat.p and v.at >= d30 and v.country = 'IN' group by 1 order by 2 desc limit 4) r), '[]'::json),
        'cities', coalesce((select json_agg(r) from (
            select nullif(v.city, '') as city, nullif(v.region, '') as code, count(*) as n from v
             where v.p = plat.p and v.at >= d30 and v.country = 'IN' and coalesce(v.city, '') <> '' group by 1, 2 order by 3 desc limit 4) r), '[]'::json),
        'abroad', (select count(*) from v where v.p = plat.p and v.at >= d30 and v.country is not null and v.country not in ('IN', ''))
      ) order by array_position(array['facebook','instagram','youtube','whatsapp','google','other','direct'], plat.p)) from plat),
    'span', 30
  ) into res;
  return res;
end $$;
revoke all on function public.admin_social_visits() from public, anon;
grant execute on function public.admin_social_visits() to authenticated;

notify pgrst, 'reload schema';
