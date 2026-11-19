-- Seb Saathi: soil test orders for the admin page (Soil tests tab, soiltests.js)
-- Run once AFTER admins.sql: Supabase → SQL Editor → New query → paste → Run.
-- Admin only: growers cannot see these tables. Results reach a grower only when an admin taps
-- "Copy to orchard", which adds one row to that orchard's Soil tests list in the grower's records.
-- Safe to run again. (Written without any star characters, so copying from a phone cannot damage it.)

create table if not exists public.soil_tests (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  grower_id         uuid references auth.users (id) on delete set null,
  grower_label      text,
  orchard_id        text,
  orchard_name      text,
  test_type         text not null default 'basic' check (test_type in ('basic', 'full')),
  sample_method     text not null default 'collect' check (sample_method in ('collect', 'courier', 'drop_off')),
  contact_name      text,
  contact_mobile    text,
  address           text,
  price             numeric not null default 0,
  paid              boolean not null default false,
  status            text not null default 'ordered' check (status in ('ordered', 'sample_received', 'testing', 'report_ready', 'cancelled')),
  results           jsonb not null default '{}'::jsonb,
  tested_on         date,
  notes             text,
  report_path       text,
  copied_to_orchard boolean not null default false
);
create index if not exists soil_tests_created on public.soil_tests (created_at desc);

create table if not exists public.soil_test_prices (
  test_type text primary key check (test_type in ('basic', 'full')),
  label     text not null,
  price     numeric not null default 0,
  includes  text
);
insert into public.soil_test_prices (test_type, label, price, includes) values
  ('basic', 'Basic', 0, 'pH, EC, organic carbon, N, P, K'),
  ('full',  'Full',  0, 'Basic plus zinc, boron, iron, manganese, copper')
  on conflict (test_type) do nothing;

alter table public.soil_tests enable row level security;
alter table public.soil_test_prices enable row level security;
revoke all on public.soil_tests, public.soil_test_prices from anon;
drop policy if exists soil_tests_admin on public.soil_tests;
create policy soil_tests_admin on public.soil_tests for all to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists soil_prices_admin on public.soil_test_prices;
create policy soil_prices_admin on public.soil_test_prices for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- growers with their orchards (from their records), for the New order form
create or replace function public.admin_soil_growers() returns json
language plpgsql stable security definer set search_path = public as $$
declare res json;
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  select coalesce(json_agg(r order by r.name nulls last, r.email), '[]'::json) into res from (
    select u.id, u.email, u.phone,
      nullif(trim(coalesce(u.raw_user_meta_data ->> 'full_name', u.raw_user_meta_data ->> 'name', '')), '') as name,
      (select coalesce(json_agg(json_build_object('id', o ->> 'id', 'name', o ->> 'name')), '[]'::json)
         from ledgers l, jsonb_array_elements(case when jsonb_typeof(l.data::jsonb -> 'orchards') = 'array' then l.data::jsonb -> 'orchards' else '[]'::jsonb end) o
        where l.user_id = u.id and o ->> 'ex' is distinct from 'true') as orchards
    from auth.users u
  ) r;
  return res;
end $$;
revoke all on function public.admin_soil_growers() from public, anon;
grant execute on function public.admin_soil_growers() to authenticated;

-- copy a test's results into the grower's orchard: one row in that orchard's Soil tests list
-- (date, pH, N, P, K, organic carbon, note). EC and the micronutrients go into the note.
-- Copying again replaces the same row instead of adding a second one.
create or replace function public.admin_soil_copy(test_id uuid) returns json
language plpgsql security definer set search_path = public as $$
declare
  t    record;
  led  jsonb;
  orch jsonb;
  i    int;
  r    jsonb;
  extra text;
  entry jsonb;
  soil jsonb;
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  select s.id, s.grower_id, s.orchard_id, s.results, s.tested_on, s.notes into t from public.soil_tests s where s.id = test_id;
  if t.id is null then raise exception 'soil test not found'; end if;
  if t.grower_id is null or t.orchard_id is null then raise exception 'this order has no grower orchard'; end if;
  select l.data::jsonb into led from ledgers l where l.user_id = t.grower_id for update;
  if led is null or jsonb_typeof(led -> 'orchards') <> 'array' then raise exception 'grower has no records yet'; end if;
  select o.ord - 1 into i from jsonb_array_elements(led -> 'orchards') with ordinality o(v, ord) where o.v ->> 'id' = t.orchard_id;
  if i is null then raise exception 'orchard not found in the grower records'; end if;
  r := coalesce(t.results, '{}'::jsonb);
  select string_agg(x, ' · ') into extra from (
    select v from (values
      (case when r ? 'ec' then 'EC ' || (r ->> 'ec') || ' dS/m' end),
      (case when r ? 'zinc' then 'Zn ' || (r ->> 'zinc') || ' ppm' end),
      (case when r ? 'boron' then 'B ' || (r ->> 'boron') || ' ppm' end),
      (case when r ? 'iron' then 'Fe ' || (r ->> 'iron') || ' ppm' end),
      (case when r ? 'manganese' then 'Mn ' || (r ->> 'manganese') || ' ppm' end),
      (case when r ? 'copper' then 'Cu ' || (r ->> 'copper') || ' ppm' end)) a(v)
    where v is not null) b(x);
  entry := jsonb_strip_nulls(jsonb_build_object(
    'id', 'st-' || t.id::text,
    'date', to_char(coalesce(t.tested_on, (now() at time zone 'Asia/Kolkata')::date), 'YYYY-MM-DD'),
    'ph', r -> 'ph', 'n', r -> 'nitrogen', 'p', r -> 'phosphorus', 'k', r -> 'potassium', 'oc', r -> 'organic_carbon',
    'note', nullif(concat_ws(' · ', 'Tested by Seb Saathi', extra, nullif(trim(coalesce(t.notes, '')), '')), '')));
  orch := led -> 'orchards' -> i;
  soil := case when jsonb_typeof(orch -> 'soil') = 'array' then orch -> 'soil' else '[]'::jsonb end;
  select coalesce(jsonb_agg(e), '[]'::jsonb) into soil from jsonb_array_elements(soil) e where e ->> 'id' is distinct from entry ->> 'id';
  soil := soil || jsonb_build_array(entry);
  led := jsonb_set(led, array['orchards', i::text, 'soil'], soil);
  update ledgers set data = led, updated_at = now() where user_id = t.grower_id;
  update public.soil_tests set copied_to_orchard = true where id = t.id;
  return json_build_object('ok', true, 'orchard', orch ->> 'name');
end $$;
revoke all on function public.admin_soil_copy(uuid) from public, anon;
grant execute on function public.admin_soil_copy(uuid) to authenticated;

-- private storage for report PDFs (admins only; opened with a short-lived link)
insert into storage.buckets (id, name, public) values ('soil-reports', 'soil-reports', false)
  on conflict (id) do nothing;
drop policy if exists soil_reports_admin_read on storage.objects;
create policy soil_reports_admin_read on storage.objects for select to authenticated using (bucket_id = 'soil-reports' and public.is_admin());
drop policy if exists soil_reports_admin_write on storage.objects;
create policy soil_reports_admin_write on storage.objects for insert to authenticated with check (bucket_id = 'soil-reports' and public.is_admin());
drop policy if exists soil_reports_admin_update on storage.objects;
create policy soil_reports_admin_update on storage.objects for update to authenticated using (bucket_id = 'soil-reports' and public.is_admin());
