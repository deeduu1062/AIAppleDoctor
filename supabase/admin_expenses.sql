-- Seb Saathi: your own business expenses, entered by hand (admin page → Costs tab → "My expenses")
-- Run once AFTER admins.sql: Supabase → SQL Editor → New query → paste → Run. Safe to run again.
-- Only admins can see or change these rows.
-- (Written without any star characters, so copying from a phone cannot damage it.)

create table if not exists public.admin_expenses (
  id         uuid primary key default gen_random_uuid(),
  spent_on   date not null default ((now() at time zone 'Asia/Kolkata')::date),
  item       text not null check (char_length(item) between 1 and 80),
  amount_inr numeric(12, 2) not null check (amount_inr >= 0 and amount_inr <= 100000000),
  note       text check (note is null or char_length(note) <= 500),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists admin_expenses_day on public.admin_expenses (spent_on desc);

alter table public.admin_expenses enable row level security;
drop policy if exists "admin reads expenses"   on public.admin_expenses;
drop policy if exists "admin adds expenses"    on public.admin_expenses;
drop policy if exists "admin edits expenses"   on public.admin_expenses;
drop policy if exists "admin deletes expenses" on public.admin_expenses;
create policy "admin reads expenses"   on public.admin_expenses for select to authenticated using (public.is_admin());
create policy "admin adds expenses"    on public.admin_expenses for insert to authenticated with check (public.is_admin());
create policy "admin edits expenses"   on public.admin_expenses for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin deletes expenses" on public.admin_expenses for delete to authenticated using (public.is_admin());
revoke all on public.admin_expenses from anon, authenticated;
grant select, insert, update, delete on public.admin_expenses to authenticated;
