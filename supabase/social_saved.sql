-- Seb Saathi: Saved library for the Social handler (admin page → Social handler → Create → Saved)
-- Run once in Supabase → SQL Editor → New query → paste → Run (after admins.sql). Safe to run again.
--
-- Everything you make (posts and videos) can be saved here and shared later, whenever you want,
-- on Facebook, Instagram, YouTube or WhatsApp. "posted" remembers where and when each one went out.
-- Discarded items keep "binned_at" and are deleted for good 7 days later (by the admin page).

create table if not exists public.social_saved (
  id          bigserial primary key,
  kind        text not null default 'post' check (kind in ('post', 'video')),
  title       text check (title is null or char_length(title) <= 200),
  text        text not null default '' check (char_length(text) <= 2200),
  ig_text     text check (ig_text is null or char_length(ig_text) <= 2200),
  yt_desc     text check (yt_desc is null or char_length(yt_desc) <= 5000),
  image_url   text check (image_url is null or image_url like 'https://%'),
  video_url   text check (video_url is null or video_url like 'https://%'),
  lang        text check (lang is null or lang in ('hn', 'hi', 'en')),
  bytes       bigint,
  posted      jsonb not null default '{}'::jsonb,
  binned_at   timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists social_saved_created on public.social_saved (created_at desc);

alter table public.social_saved enable row level security;
drop policy if exists "admins manage saved content" on public.social_saved;
create policy "admins manage saved content" on public.social_saved for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
revoke all on public.social_saved from anon, authenticated;
grant select, insert, update, delete on public.social_saved to authenticated;
grant usage, select on sequence public.social_saved_id_seq to authenticated;
