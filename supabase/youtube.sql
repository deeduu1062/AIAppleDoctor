-- Seb Saathi: YouTube connection for the admin Video Studio (api/youtube.js)
-- Run once in Supabase → SQL Editor → New query → paste → Run.
-- Holds the one YouTube channel the admin page uploads to. Only the server (service role key) can read
-- or change it: the website and the admin page never see the stored key, they only ask the server.

create table if not exists public.yt_auth (
  id            int primary key default 1 check (id = 1),
  refresh_token text not null,
  channel_id    text,
  channel_title text,
  channel_handle text,
  connected_at  timestamptz not null default now()
);
alter table public.yt_auth enable row level security;
revoke all on public.yt_auth from anon, authenticated;
