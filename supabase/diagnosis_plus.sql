-- Seb Saathi: disease diagnosis upgrade
-- Run once: Supabase → SQL Editor → New query → paste → Run. Safe to run again.
-- Needs supabase/diagnoses.sql, diagnoses_orchard.sql and admins.sql to have been run first.
--
-- Adds:
--   * which fruit the photo is of, how bad it looks, and a rough area (village + location to about 10 km)
--   * the grower's permission to keep the photos, and where they are kept
--   * "Ask an expert" from the grower, and the expert's answer from the admin page
--   * a private photo store (bucket "dx-photos"): growers add to their own folder only; only admins can open others' photos
--   * area report: how many problems were found near each place in the last few weeks (counts only, no names)

alter table public.diagnoses add column if not exists crop        text default 'apple' check (crop in ('apple','cherry','pear','plum','walnut'));
alter table public.diagnoses add column if not exists severity    text check (severity in ('mild','moderate','severe'));
alter table public.diagnoses add column if not exists area        text check (area is null or char_length(area) <= 60);
alter table public.diagnoses add column if not exists lat2        numeric(6,2);
alter table public.diagnoses add column if not exists lon2        numeric(6,2);
alter table public.diagnoses add column if not exists consent     boolean not null default false;
alter table public.diagnoses add column if not exists photo_paths text[];
alter table public.diagnoses add column if not exists needs_review boolean not null default false;
alter table public.diagnoses add column if not exists ask_expert  boolean not null default false;
alter table public.diagnoses add column if not exists expert_id   text;
alter table public.diagnoses add column if not exists expert_name text;
alter table public.diagnoses add column if not exists expert_note text;
alter table public.diagnoses add column if not exists reviewed_at timestamptz;
alter table public.diagnoses add column if not exists reviewed_by text;

create index if not exists diagnoses_review on public.diagnoses (reviewed_at, created_at desc);
create index if not exists diagnoses_area   on public.diagnoses (created_at desc, lat2, lon2);

-- growers: add their own checks (not the expert columns), and change only feedback / ask-an-expert / photos
revoke insert, update on public.diagnoses from anon, authenticated;
grant insert (id, user_id, part, note, lang, photos, result, orchard_id, crop, severity, area, lat2, lon2, consent, photo_paths, needs_review)
  on public.diagnoses to authenticated;
grant update (feedback, ask_expert, consent, photo_paths) on public.diagnoses to authenticated;

-- admins can read every check
drop policy if exists "admin diagnoses read" on public.diagnoses;
create policy "admin diagnoses read" on public.diagnoses for select to authenticated using (public.is_admin());

-- ---------- photo store ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('dx-photos', 'dx-photos', false, 2000000, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = false;

drop policy if exists "dx photos add own"  on storage.objects;
drop policy if exists "dx photos read own" on storage.objects;
create policy "dx photos add own" on storage.objects for insert to authenticated
  with check (bucket_id = 'dx-photos' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "dx photos read own" on storage.objects for select to authenticated
  using (bucket_id = 'dx-photos' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));

-- ---------- expert review (admin page) ----------
-- queue: 'open' = waiting for an expert, 'done' = answered, 'all' = everything (newest first)
create or replace function public.admin_dx_queue(which text default 'open', max_rows int default 100)
returns table (id uuid, created_at timestamptz, email text, phone text, crop text, part text, note text, lang text, area text,
  result jsonb, feedback text, ask_expert boolean, needs_review boolean, consent boolean, photo_paths text[],
  expert_id text, expert_name text, expert_note text, reviewed_at timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  return query
    select d.id, d.created_at, u.email::text, u.phone::text, d.crop, d.part, d.note, d.lang, d.area,
      d.result, d.feedback, d.ask_expert, d.needs_review, d.consent, d.photo_paths,
      d.expert_id, d.expert_name, d.expert_note, d.reviewed_at
    from public.diagnoses d left join auth.users u on u.id = d.user_id
    where case which
      when 'open' then d.reviewed_at is null and (d.ask_expert or d.needs_review or d.feedback in ('wrong','unsure'))
      when 'done' then d.reviewed_at is not null
      else true end
    order by d.ask_expert desc, d.created_at desc
    limit greatest(1, least(max_rows, 500));
end $$;
grant execute on function public.admin_dx_queue(text, int) to authenticated;

create or replace function public.admin_dx_review(did uuid, label text, label_name text, note text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  update public.diagnoses set
    expert_id = nullif(left(coalesce(label, ''), 20), ''),
    expert_name = nullif(left(coalesce(label_name, ''), 80), ''),
    expert_note = nullif(left(coalesce(note, ''), 1000), ''),
    reviewed_at = now(),
    reviewed_by = lower(auth.jwt() ->> 'email')
  where id = did;
end $$;
grant execute on function public.admin_dx_review(uuid, text, text, text) to authenticated;

-- numbers for the admin page: how often growers and experts agree with the AI
create or replace function public.admin_dx_stats()
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare r jsonb;
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  select jsonb_build_object(
    'total',     count(*),
    'month',     count(*) filter (where created_at >= date_trunc('month', now())),
    'kept',      count(*) filter (where consent and coalesce(array_length(photo_paths, 1), 0) > 0),
    'marked',    count(*) filter (where feedback is not null),
    'right',     count(*) filter (where feedback = 'right'),
    'wrong',     count(*) filter (where feedback = 'wrong'),
    'open',      count(*) filter (where reviewed_at is null and (ask_expert or needs_review or feedback in ('wrong','unsure'))),
    'reviewed',  count(*) filter (where reviewed_at is not null),
    'agree',     count(*) filter (where reviewed_at is not null and expert_id = result -> 'matches' -> 0 ->> 'id'),
    'labelled',  count(*) filter (where consent and coalesce(array_length(photo_paths, 1), 0) > 0 and (reviewed_at is not null or feedback = 'right'))
  ) into r from public.diagnoses;
  return r;
end $$;
grant execute on function public.admin_dx_stats() to authenticated;

-- ---------- area report (for every signed-in grower) ----------
-- Problems found in the last N days, grouped to about 10 km squares. Counts only: no names, no exact places.
-- Uses the expert's answer when there is one; leaves out checks the grower marked wrong, unclear or healthy results,
-- and AI guesses marked "not sure".
create or replace function public.dx_area_reports(days int default 30)
returns table (lat numeric, lon numeric, area text, disease text, crop text, n bigint, last_at timestamptz)
language sql stable security definer set search_path = public as $$
  with x as (
    select round(lat2, 1) as la, round(lon2, 1) as lo, nullif(trim(area), '') as ar, coalesce(crop, 'apple') as cr, created_at,
      coalesce(expert_id, result -> 'matches' -> 0 ->> 'id') as dz,
      (expert_id is not null or coalesce(result -> 'matches' -> 0 ->> 'confidence', 'low') <> 'low') as sure,
      coalesce(feedback, '') as fb
    from public.diagnoses
    where created_at >= now() - make_interval(days => greatest(1, least(days, 120)))
      and lat2 is not null and lon2 is not null
      and auth.uid() is not null
  )
  select la, lo, mode() within group (order by ar) as area, dz, cr, count(*) as n, max(created_at) as last_at
  from x
  where sure and fb <> 'wrong' and dz is not null and dz not in ('healthy', 'other')
  group by la, lo, dz, cr
  order by n desc
  limit 400;
$$;
grant execute on function public.dx_area_reports(int) to authenticated;
