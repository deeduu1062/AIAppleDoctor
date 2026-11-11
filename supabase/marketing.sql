-- Seb Saathi: admin page Marketing tab — ticks on the plan's tasks and videos, and your social media links
-- Run once in Supabase → SQL Editor → New query → paste → Run (after admins.sql).
-- Until this is run, the Marketing tab keeps ticks on this device only.

create table if not exists public.admin_marketing (
  key        text primary key check (char_length(key) <= 80),
  done       boolean not null default false,
  value      text check (value is null or char_length(value) <= 500),
  updated_at timestamptz not null default now(),
  updated_by text default lower(auth.jwt() ->> 'email')
);

alter table public.admin_marketing enable row level security;
drop policy if exists "admins read marketing"  on public.admin_marketing;
drop policy if exists "admins write marketing" on public.admin_marketing;
create policy "admins read marketing"  on public.admin_marketing for select to authenticated using (public.is_admin());
create policy "admins write marketing" on public.admin_marketing for all    to authenticated using (public.is_admin()) with check (public.is_admin());

revoke all on public.admin_marketing from anon, authenticated;
grant select, insert, update, delete on public.admin_marketing to authenticated;
