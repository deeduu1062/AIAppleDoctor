-- Seb Saathi: UPI plan payments (checked by hand)
-- Run once in Supabase → SQL Editor → New query → paste → Run.
-- A signed-in grower sends their UPI reference number (UTR) after paying.
-- They can see only their own rows. The admin account reads all rows and sets
-- status to 'approved' or 'rejected' after checking the bank app.

create table if not exists public.payments (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  email      text check (email is null or char_length(email) <= 200),
  plan       text not null check (plan in ('basic', 'premium')),
  period     text not null check (period in ('month', 'year')),
  amount     integer not null check (amount > 0 and amount <= 100000),
  utr        text not null unique check (utr ~ '^[0-9]{12}$'),
  status     text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  valid_until date,
  note       text check (note is null or char_length(note) <= 500)
);

create index if not exists payments_user on public.payments (user_id, created_at desc);
create index if not exists payments_time on public.payments (created_at desc);

alter table public.payments enable row level security;

drop policy if exists "grower sends payment"  on public.payments;
drop policy if exists "grower reads own"      on public.payments;
drop policy if exists "admin updates payment" on public.payments;

-- growers: only as themselves, only as 'pending'
create policy "grower sends payment" on public.payments for insert to authenticated
  with check (user_id = auth.uid() and status = 'pending' and valid_until is null and note is null);

-- growers see their own rows; admin sees all (same email as ADMIN_EMAILS in index.html)
create policy "grower reads own" on public.payments for select to authenticated
  using (user_id = auth.uid() or lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com');

create policy "admin updates payment" on public.payments for update to authenticated
  using (lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com');

revoke all on public.payments from anon, authenticated;
grant insert, select on public.payments to authenticated;
grant update (status, valid_until, note) on public.payments to authenticated;
