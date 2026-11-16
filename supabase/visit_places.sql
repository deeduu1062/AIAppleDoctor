-- Seb Saathi: "Where visitors come from" on the admin Overview (country, Indian state, city)
-- Run once AFTER visits.sql: Supabase → SQL Editor → New query → paste → Run. Safe to re-run.
-- The website already sends a rough place for each visit (from Vercel, no GPS, nothing personal).
-- Visits are counted by place from the moment this has been run; older visits show as "Not known".

alter table public.site_visits add column if not exists country text check (country is null or char_length(country) <= 2);
alter table public.site_visits add column if not exists region  text check (region  is null or char_length(region)  <= 10);
alter table public.site_visits add column if not exists city    text check (city    is null or char_length(city)    <= 80);
alter table public.site_visits add column if not exists src     text check (src     is null or char_length(src)     <= 40);
create index if not exists site_visits_country on public.site_visits (country);

create or replace function public.admin_visit_places() returns json
language plpgsql stable security definer set search_path = public as $$
declare
  d30 timestamptz := now() - interval '30 days';
  res json;
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  select json_build_object(
    'countries', coalesce((select json_agg(r) from (
      select coalesce(nullif(country, ''), '?') as code, count(*) as n, count(distinct visitor) as u
      from site_visits where at >= d30 group by 1 order by 2 desc limit 15) r), '[]'::json),
    'states', coalesce((select json_agg(r) from (
      select nullif(region, '') as code, count(*) as n, count(distinct visitor) as u
      from site_visits where at >= d30 and country = 'IN' group by 1 order by 2 desc limit 20) r), '[]'::json),
    'cities', coalesce((select json_agg(r) from (
      select nullif(city, '') as city, nullif(region, '') as code, count(*) as n, count(distinct visitor) as u
      from site_visits where at >= d30 and country = 'IN' group by 1, 2 order by 3 desc limit 20) r), '[]'::json)
  ) into res;
  return res;
end $$;
revoke all on function public.admin_visit_places() from anon;
grant execute on function public.admin_visit_places() to authenticated;

notify pgrst, 'reload schema';
