-- Seb Saathi: grower profiles and activity for the admin page (Profiles tab)
-- Run once AFTER admins.sql: Supabase → SQL Editor → New query → paste → Run.
-- admin_profiles()      one row per grower for the list
-- admin_profile(uid)    one grower: profile, plan, usage counts, orchards and a timeline of what they did
-- Only admins can call these. Sale amounts and profit figures are NOT included, only counts.
-- Safe to run again. (Written without any star characters, so copying from a phone cannot damage it.)

create or replace function public.admin_profiles() returns json
language plpgsql stable security definer set search_path = public as $$
declare
  today date := (now() at time zone 'Asia/Kolkata')::date;
  res json;
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  select coalesce(json_agg(r order by r.last_seen desc nulls last), '[]'::json) into res from (
    select u.id, u.email, u.phone, u.created_at, u.last_sign_in_at,
      (u.email_confirmed_at is not null or u.phone_confirmed_at is not null) as confirmed,
      u.raw_user_meta_data ->> 'lang' as lang,
      coalesce((select p.plan from payments p where p.user_id = u.id and p.status = 'approved'
                 and (p.valid_until is null or p.valid_until >= today) order by p.valid_until desc nulls first limit 1), 'free') as plan,
      (select count(1) from chat_messages c where c.user_id = u.id and c.role = 'user') as questions,
      (select count(1) from diagnoses d where d.user_id = u.id) as checks,
      greatest(u.last_sign_in_at,
        (select max(c.created_at) from chat_messages c where c.user_id = u.id),
        (select max(d.created_at) from diagnoses d where d.user_id = u.id),
        (select max(l.updated_at) from ledgers l where l.user_id = u.id)) as last_seen
    from auth.users u
  ) r;
  return res;
end $$;
revoke all on function public.admin_profiles() from public, anon;
grant execute on function public.admin_profiles() to authenticated;

create or replace function public.admin_profile(uid uuid) returns json
language plpgsql stable security definer set search_path = public as $$
declare
  u      record;
  led    jsonb;
  led_at timestamptz;
  orch   jsonb := '[]'::jsonb;
  seas   jsonb := '[]'::jsonb;
  today  date := (now() at time zone 'Asia/Kolkata')::date;
  t0     timestamptz := (date_trunc('day', now() at time zone 'Asia/Kolkata')) at time zone 'Asia/Kolkata';
  m0     timestamptz := (date_trunc('month', now() at time zone 'Asia/Kolkata')) at time zone 'Asia/Kolkata';
  res    json;
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  select au.id, au.email, au.phone, au.created_at, au.last_sign_in_at, au.email_confirmed_at, au.phone_confirmed_at,
         au.raw_user_meta_data, au.raw_app_meta_data
    into u from auth.users au where au.id = uid;
  if not found then return null; end if;

  select l.data::jsonb, l.updated_at into led, led_at from ledgers l where l.user_id = uid;
  if led is not null and jsonb_typeof(led -> 'orchards') = 'array' then
    select coalesce(jsonb_agg(o), '[]'::jsonb) into orch
      from jsonb_array_elements(led -> 'orchards') o where o ->> 'ex' is distinct from 'true';   -- skip the example orchards
  end if;
  if led is not null and jsonb_typeof(led -> 'seasons') = 'array' then
    select coalesce(jsonb_agg(s), '[]'::jsonb) into seas
      from jsonb_array_elements(led -> 'seasons') s
      where exists (select 1 from jsonb_array_elements(orch) o where o ->> 'id' = s ->> 'oid');
  end if;

  select json_build_object(
    'profile', json_build_object(
      'id', u.id, 'email', u.email, 'phone', u.phone,
      'created_at', u.created_at, 'last_sign_in_at', u.last_sign_in_at,
      'confirmed', (u.email_confirmed_at is not null or u.phone_confirmed_at is not null),
      'lang', u.raw_user_meta_data ->> 'lang',
      'ref', u.raw_user_meta_data ->> 'ref',
      'provider', u.raw_app_meta_data ->> 'provider'),
    'plan', (select json_build_object('plan', p.plan, 'period', p.period, 'valid_until', p.valid_until)
               from payments p where p.user_id = uid and p.status = 'approved'
                and (p.valid_until is null or p.valid_until >= today) order by p.valid_until desc nulls first limit 1),
    'counts', json_build_object(
      'q_total',  (select count(1) from chat_messages where user_id = uid and role = 'user'),
      'q_30',     (select count(1) from chat_messages where user_id = uid and role = 'user' and created_at >= now() - interval '30 days'),
      'q_today',  (select count(1) from chat_messages where user_id = uid and role = 'user' and created_at >= t0),
      'dx_total', (select count(1) from diagnoses where user_id = uid),
      'dx_month', (select count(1) from diagnoses where user_id = uid and created_at >= m0),
      'fb_total', (select count(1) from feedback where user_id = uid),
      'pay_total',(select count(1) from payments where user_id = uid),
      'shares',   (select count(1) from ledger_shares where owner_id = uid)),
    'records', json_build_object(
      'saved_at', led_at,
      'orchards', (select coalesce(json_agg(json_build_object('name', o ->> 'name', 'trees', o ->> 'trees')), '[]'::json) from jsonb_array_elements(orch) o),
      'years',    (select count(distinct s ->> 'year') from jsonb_array_elements(seas) s),
      'lots',     (select coalesce(sum(case when jsonb_typeof(s -> 'lots') = 'array' then jsonb_array_length(s -> 'lots') else 0 end), 0) from jsonb_array_elements(seas) s)),
    'activity', (select coalesce(json_agg(json_build_object('at', a.at, 'kind', a.kind, 'detail', a.detail, 'extra', a.extra) order by a.at desc), '[]'::json) from (
      select x.at, x.kind, x.detail, x.extra from (
        select u.created_at as at, 'join' as kind, null::text as detail, null::text as extra
        union all select u.last_sign_in_at, 'login', null, null
        union all select led_at, 'save', null, null
        union all select c.created_at, 'q', left(c.content, 200), c.lang from chat_messages c where c.user_id = uid and c.role = 'user'
        union all select d.created_at, 'dx', d.result -> 'matches' -> 0 ->> 'id', d.feedback from diagnoses d where d.user_id = uid
        union all select p.created_at, 'pay', p.plan || ' / ' || p.period || ' / ' || p.amount, p.status from payments p where p.user_id = uid
        union all select f.created_at, 'fb', left(f.message, 200), f.kind from feedback f where f.user_id = uid
        union all select s.created_at, 'share', s.viewer_email, null from ledger_shares s where s.owner_id = uid
      ) x where x.at is not null order by x.at desc limit 80) a)
  ) into res;
  return res;
end $$;
revoke all on function public.admin_profile(uuid) from public, anon;
grant execute on function public.admin_profile(uuid) to authenticated;
