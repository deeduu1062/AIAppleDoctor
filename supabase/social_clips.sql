-- Seb Saathi: clip library for videos (admin page → Social handler → Create video → Pictures → My clips + free stock)
-- Run once in Supabase → SQL Editor → New query → paste → Run (after admins.sql). Safe to run again.
--
-- Your own short clips (orchard, trees, spraying, packing, hills) and free Pexels clips the video maker has fetched.
-- The files live in the "library" storage bucket under clips/; this table remembers what each clip shows.

create table if not exists public.social_clips (
  id          bigserial primary key,
  url         text not null check (url like 'https://%'),
  label       text not null default '' check (char_length(label) <= 200),
  source      text not null default 'own' check (source in ('own', 'pexels')),
  ext_id      text check (ext_id is null or char_length(ext_id) <= 40),
  credit      text check (credit is null or char_length(credit) <= 120),
  bytes       bigint,
  uses        int not null default 0,
  created_at  timestamptz not null default now()
);
create index if not exists social_clips_created on public.social_clips (created_at desc);

alter table public.social_clips enable row level security;
drop policy if exists "admins manage clips" on public.social_clips;
create policy "admins manage clips" on public.social_clips for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
revoke all on public.social_clips from anon, authenticated;
grant select, insert, update, delete on public.social_clips to authenticated;
grant usage, select on sequence public.social_clips_id_seq to authenticated;
