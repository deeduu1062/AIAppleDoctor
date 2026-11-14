-- Seb Saathi: admin page Marketing tab, version 2
-- Run once AFTER admins.sql, admin_profiles.sql, visits.sql, marketing.sql, referrals.sql and social_queue.sql:
-- Supabase → SQL Editor → New query → paste → Run. Safe to run again.
-- (Written without any star characters, so copying from a phone cannot damage it.)
--
-- What it adds:
--   1. where visitors come from: a "src" on each visit (links like sebsaathi.com/?src=poster-rohru)
--   2. room for longer saved values (AI video ideas) in admin_marketing
--   3. one content queue: posts, videos (Reels) and WhatsApp tips in social_queue
--   4. pilot growers list (admin_pilots)
--   5. admin_marketing_stats()  the scoreboard and "where growers come from"
--   6. admin_pilots_status()    pilot growers with "signed up" and "sales entered" filled in from their accounts
--   7. admin_invites()          now also gives the grower's mobile number

-- 1. visit source --------------------------------------------------------------------------
alter table public.site_visits add column if not exists src text;
alter table public.site_visits drop constraint if exists site_visits_src_check;
alter table public.site_visits add constraint site_visits_src_check check (src is null or src ~ '^[a-z0-9-]{1,40}$');

-- 2. longer values ------------------------------------------------------------------------
alter table public.admin_marketing drop constraint if exists admin_marketing_value_check;
alter table public.admin_marketing add constraint admin_marketing_value_check check (value is null or char_length(value) <= 8000);

-- 3. content queue: kind of item, and videos -----------------------------------------------
--   post  Facebook / Instagram post (text, optional photo)
--   video Facebook video / Instagram Reel (video_url)
--   wa    WhatsApp channel tip: copied and sent by hand, then marked as sent
--   yt    a YouTube upload, kept here so it shows in the same list (YouTube publishes it itself)
alter table public.social_queue add column if not exists kind text not null default 'post';
alter table public.social_queue drop constraint if exists social_queue_kind_check;
alter table public.social_queue add constraint social_queue_kind_check check (kind in ('post', 'video', 'wa', 'yt'));
alter table public.social_queue add column if not exists video_url text;
alter table public.social_queue drop constraint if exists social_queue_video_url_check;
alter table public.social_queue add constraint social_queue_video_url_check check (video_url is null or video_url like 'https://%');

-- the posting robot only takes Facebook / Instagram items, and now gets the video and any earlier result
create or replace function public.social_due(k text) returns json
language plpgsql security definer set search_path = public as $$
declare r record;
begin
  if k is null or k <> (select c.k from public.social_cron_key c where c.id = 1) then
    raise exception 'bad key';
  end if;
  update public.social_queue set status = 'failed', updated_at = now(),
         result = coalesce(result, '{}'::jsonb) || '{"error":"stopped half-way; check Facebook/Instagram before retrying"}'::jsonb
   where status = 'posting' and updated_at < now() - interval '15 minutes';
  select q.id, q.text, q.image_url, q.video_url, q.fb, q.ig, q.kind, q.result
    into r from public.social_queue q
   where q.status = 'scheduled' and q.post_at <= now() and q.kind in ('post', 'video') and (q.fb or q.ig)
   order by q.post_at limit 1 for update skip locked;
  if not found then return null; end if;
  update public.social_queue set status = 'posting', updated_at = now() where id = r.id;
  return json_build_object('id', r.id, 'text', r.text, 'image_url', r.image_url, 'video_url', r.video_url,
                           'fb', r.fb, 'ig', r.ig, 'kind', r.kind, 'prev', r.result);
end $$;
revoke all on function public.social_due(text) from public;
grant execute on function public.social_due(text) to anon, authenticated;

-- 4. pilot growers -------------------------------------------------------------------------
create table if not exists public.admin_pilots (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 80),
  village     text check (village is null or char_length(village) <= 80),
  phone       text check (phone is null or phone ~ '^[0-9]{10}$'),
  visited     boolean not null default false,
  sales       boolean not null default false,   -- ticked by hand; also counted as done once their account has sale lots
  testimonial boolean not null default false,
  note        text check (note is null or char_length(note) <= 500),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
alter table public.admin_pilots enable row level security;
drop policy if exists "admins manage pilots" on public.admin_pilots;
create policy "admins manage pilots" on public.admin_pilots for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
revoke all on public.admin_pilots from anon, authenticated;
grant select, insert, update, delete on public.admin_pilots to authenticated;

-- a grower's 10-digit mobile number, from the phone field, the details or a mobile-PIN email
create or replace function public.ss_mobile10(u_phone text, u_email text, u_meta jsonb) returns text
language sql immutable as $$
  select nullif(right(regexp_replace(coalesce(nullif(u_phone, ''), u_meta ->> 'phone',
           case when u_email like '%@m.sebsaathi.com' then split_part(u_email, '@', 1) end, ''), '[^0-9]', '', 'g'), 10), '')
$$;

-- where a grower came from: the ?src= of their first visit, else "invite" if they joined by an invite link
create or replace function public.ss_user_src(u_meta jsonb) returns text
language sql immutable as $$
  select coalesce(nullif(u_meta ->> 'src', ''), case when coalesce(u_meta ->> 'ref', '') <> '' then 'invite' end, 'unknown')
$$;

-- 5. scoreboard and sources ----------------------------------------------------------------
create or replace function public.admin_marketing_stats() returns json
language plpgsql stable security definer set search_path = public, auth as $$
declare
  t0  timestamptz := (date_trunc('day', now() at time zone 'Asia/Kolkata')) at time zone 'Asia/Kolkata';
  w0  timestamp := date_trunc('week', now() at time zone 'Asia/Kolkata');   -- this Monday, India time (local clock)
  d7  timestamptz := now() - interval '7 days';
  d30 timestamptz := now() - interval '30 days';
  res json;
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  with g as (
    select u.id, u.created_at, public.ss_user_src(u.raw_user_meta_data::jsonb) as src,
      greatest(u.last_sign_in_at,
        (select max(c.created_at) from chat_messages c where c.user_id = u.id),
        (select max(d.created_at) from diagnoses d where d.user_id = u.id),
        (select max(l.updated_at) from ledgers l where l.user_id = u.id)) as last_seen
    from auth.users u
    where (u.email_confirmed_at is not null or u.phone_confirmed_at is not null)
      and lower(coalesce(u.email, '')) not in (select e.email from public.admin_emails e)
  ), v as (
    select coalesce(s.src, 'none') as src, count(distinct s.visitor) as n
      from site_visits s where s.at >= d30 and not s.signed_in group by 1
  ), su as (
    select g.src, count(1) filter (where g.created_at >= d30) as n30, count(1) as n_all from g group by g.src
  )
  select json_build_object(
    'growers',  (select count(1) from g),
    'active7',  (select count(1) from g where g.last_seen >= d7),
    'active30', (select count(1) from g where g.last_seen >= d30),
    'new7',     (select count(1) from g where g.created_at >= d7),
    'new30',    (select count(1) from g where g.created_at >= d30),
    'today',    (select count(1) from g where g.created_at >= t0),
    'weeks', coalesce((select json_agg(json_build_object('wk', x.wk, 'n', x.n) order by x.wk) from (
        select wk::date as wk, (select count(1) from g where g.created_at >= (wk at time zone 'Asia/Kolkata') and g.created_at < ((wk + interval '7 days') at time zone 'Asia/Kolkata')) as n
          from generate_series(w0 - interval '7 weeks', w0, interval '7 days') wk) x), '[]'::json),
    'sources', coalesce((select json_agg(json_build_object('src', z.src, 'visitors', z.visitors, 'n30', z.n30, 'n_all', z.n_all)
                                         order by z.n30 desc, z.visitors desc, z.n_all desc) from (
        select coalesce(su.src, v.src) as src, coalesce(v.n, 0) as visitors, coalesce(su.n30, 0) as n30, coalesce(su.n_all, 0) as n_all
          from su full join v on v.src = su.src) z), '[]'::json),
    'tracked_since', (select min(s.at) from site_visits s where s.src is not null)
  ) into res;
  return res;
end $$;
revoke all on function public.admin_marketing_stats() from public, anon;
grant execute on function public.admin_marketing_stats() to authenticated;

-- 6. pilot growers with their account ------------------------------------------------------
create or replace function public.admin_pilots_status() returns json
language plpgsql stable security definer set search_path = public, auth as $$
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  return (
    select coalesce(json_agg(json_build_object(
        'id', p.id, 'name', p.name, 'village', p.village, 'phone', p.phone,
        'visited', p.visited, 'sales', p.sales, 'testimonial', p.testimonial, 'note', p.note, 'created_at', p.created_at,
        'user_id', a.id, 'joined_at', a.created_at, 'orchards', coalesce(a.orchards, 0), 'lots', coalesce(a.lots, 0))
        order by p.created_at), '[]'::json)
      from public.admin_pilots p
      left join lateral (
        select u.id, u.created_at,
          (select count(1) from ledgers l, jsonb_array_elements(case when jsonb_typeof(l.data::jsonb -> 'orchards') = 'array' then l.data::jsonb -> 'orchards' else '[]'::jsonb end) o
            where l.user_id = u.id and o ->> 'ex' is distinct from 'true') as orchards,
          (select coalesce(sum(case when jsonb_typeof(s -> 'lots') = 'array' then jsonb_array_length(s -> 'lots') else 0 end), 0)
             from ledgers l, jsonb_array_elements(case when jsonb_typeof(l.data::jsonb -> 'seasons') = 'array' then l.data::jsonb -> 'seasons' else '[]'::jsonb end) s
            where l.user_id = u.id
              and exists (select 1 from jsonb_array_elements(case when jsonb_typeof(l.data::jsonb -> 'orchards') = 'array' then l.data::jsonb -> 'orchards' else '[]'::jsonb end) o2
                           where o2 ->> 'id' = s ->> 'oid' and o2 ->> 'ex' is distinct from 'true')) as lots
          from auth.users u
         where p.phone is not null and public.ss_mobile10(u.phone, u.email, u.raw_user_meta_data::jsonb) = p.phone
         order by u.created_at limit 1) a on true);
end $$;
revoke all on function public.admin_pilots_status() from public, anon;
grant execute on function public.admin_pilots_status() to authenticated;

-- 7. invites, with the mobile number -------------------------------------------------------
create or replace function public.admin_invites() returns json
language plpgsql security definer set search_path = public, auth as $$
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  return (
    select coalesce(json_agg(x order by x.joined desc, x.email), '[]'::json) from (
      select case when inv.email like '%@m.sebsaathi.com' then null else inv.email end as email,
             public.ss_mobile10(inv.phone, inv.email, inv.raw_user_meta_data::jsonb) as phone,
             nullif(inv.raw_user_meta_data ->> 'name', '') as name,
             count(f.id) as joined,
             (select count(1) from public.payments p where p.user_id = inv.id and p.source = 'referral') as claimed
        from auth.users inv
        join auth.users f
          on f.raw_user_meta_data ->> 'ref' = left(replace(inv.id::text, '-', ''), 8)
         and f.id <> inv.id
         and (f.email_confirmed_at is not null or f.phone_confirmed_at is not null)
       group by inv.id, inv.email, inv.phone, inv.raw_user_meta_data
    ) x);
end $$;
revoke all on function public.admin_invites() from public, anon;
grant execute on function public.admin_invites() to authenticated;
