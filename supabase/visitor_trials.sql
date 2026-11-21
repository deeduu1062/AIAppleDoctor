-- Seb Saathi: one free photo check for visitors who are not logged in (visitor page → Disease check)
-- Run once AFTER admins.sql: Supabase → SQL Editor → New query → paste → Run. Safe to run again.
-- Each visitor try saves one small row: a hash of their network address (not the address itself), the AI cost and the top answer.
-- No photo and nothing personal is kept. Only the website's server (service key) adds rows; only admins can read them.
-- The limits (1 try per phone/network every 30 days, a daily cap for all visitors) are in api/diagnose.js.
-- (Written without any star characters, so copying from a phone cannot damage it.)

create table if not exists public.visitor_trials (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  ip_hash     text not null check (char_length(ip_hash) <= 64),
  lang        text check (lang is null or lang in ('en', 'hi', 'hn')),
  part        text check (part is null or char_length(part) <= 20),
  model       text check (model is null or char_length(model) <= 60),
  top         text check (top is null or char_length(top) <= 30),
  cost_usd    numeric(12, 6) not null default 0 check (cost_usd >= 0 and cost_usd < 100)
);
create index if not exists visitor_trials_ip_time on public.visitor_trials (ip_hash, created_at desc);
create index if not exists visitor_trials_time on public.visitor_trials (created_at desc);

alter table public.visitor_trials enable row level security;
drop policy if exists "admin visitor trials read" on public.visitor_trials;
create policy "admin visitor trials read" on public.visitor_trials for select to authenticated using (public.is_admin());
revoke all on public.visitor_trials from anon, authenticated;
grant select on public.visitor_trials to authenticated;
