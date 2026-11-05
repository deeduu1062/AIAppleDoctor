-- Seb Saathi: site visits ("hits") for the admin Overview
-- Run once AFTER admins.sql: Supabase → SQL Editor → New query → paste → Run.
-- Each page open stores only: time, a random browser id (not personal), which site sent the visitor,
-- phone or computer, language, and whether someone was logged in. Admin visits are not counted.
-- Visitors can only add rows; only admins can see the totals, through admin_site_stats().

create table if not exists public.site_visits (
  id        bigserial primary key,
  at        timestamptz not null default now(),
  visitor   text not null check (char_length(visitor) between 8 and 40),
  page      text not null default 'home' check (char_length(page) <= 40),
  ref       text check (ref is null or char_length(ref) <= 120),
  device    text check (device in ('mobile', 'tablet', 'desktop')),
  lang      text check (lang is null or char_length(lang) <= 5),
  signed_in boolean not null default false
);
create index if not exists site_visits_time on public.site_visits (at desc);

alter table public.site_visits enable row level security;
drop policy if exists "anyone logs a visit" on public.site_visits;
create policy "anyone logs a visit" on public.site_visits for insert to anon, authenticated with check (true);
revoke all on public.site_visits from anon, authenticated;
grant insert on public.site_visits to anon, authenticated;
grant usage on sequence public.site_visits_id_seq to anon, authenticated;

create or replace function public.admin_site_stats() returns json
language plpgsql stable security definer set search_path = public as $$
declare
  t0  timestamptz := (date_trunc('day', now() at time zone 'Asia/Kolkata')) at time zone 'Asia/Kolkata';  -- today, India time
  d7  timestamptz := now() - interval '7 days';
  d30 timestamptz := now() - interval '30 days';
  res json;
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  select json_build_object(
    'visits', json_build_object(
      'today', (select count(*) from site_visits where at >= t0),
      'd7',    (select count(*) from site_visits where at >= d7),
      'd30',   (select count(*) from site_visits where at >= d30),
      'total', (select count(*) from site_visits)),
    'visitors', json_build_object(
      'today', (select count(distinct visitor) from site_visits where at >= t0),
      'd7',    (select count(distinct visitor) from site_visits where at >= d7),
      'd30',   (select count(distinct visitor) from site_visits where at >= d30),
      'total', (select count(distinct visitor) from site_visits)),
    'signed', json_build_object(
      'today', (select count(*) from site_visits where signed_in and at >= t0),
      'd7',    (select count(*) from site_visits where signed_in and at >= d7),
      'd30',   (select count(*) from site_visits where signed_in and at >= d30),
      'total', (select count(*) from site_visits where signed_in)),
    'refs', coalesce((select json_agg(r) from (
      select coalesce(ref, 'direct') as name, count(*) as n from site_visits where at >= d30
      group by 1 order by 2 desc limit 8) r), '[]'::json),
    'devices', coalesce((select json_agg(r) from (
      select coalesce(device, 'desktop') as name, count(*) as n from site_visits where at >= d30
      group by 1 order by 2 desc) r), '[]'::json),
    'days', coalesce((select json_agg(r order by r.day desc) from (
      select (at at time zone 'Asia/Kolkata')::date as day, count(*) as n, count(distinct visitor) as u
      from site_visits where at >= now() - interval '14 days' group by 1) r), '[]'::json)
  ) into res;
  return res;
end $$;
revoke all on function public.admin_site_stats() from anon;
grant execute on function public.admin_site_stats() to authenticated;
