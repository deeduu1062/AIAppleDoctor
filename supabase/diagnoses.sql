-- Apple Doctor: photo diagnosis history
-- Run once in Supabase → SQL Editor → New query → paste → Run.
-- Each grower can only see their own checks and mark them right or wrong.
-- No delete for growers, so the daily photo limit cannot be reset by deleting rows.

create table if not exists public.diagnoses (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  part       text,
  note       text,
  lang       text,
  photos     int,
  result     jsonb,
  feedback   text check (feedback in ('right', 'wrong', 'unsure'))
);

create index if not exists diagnoses_user_time on public.diagnoses (user_id, created_at desc);

alter table public.diagnoses enable row level security;

drop policy if exists "own diagnoses read"   on public.diagnoses;
drop policy if exists "own diagnoses add"    on public.diagnoses;
drop policy if exists "own diagnoses mark"   on public.diagnoses;
drop policy if exists "own diagnoses remove" on public.diagnoses;

create policy "own diagnoses read"   on public.diagnoses for select using (auth.uid() = user_id);
create policy "own diagnoses add"    on public.diagnoses for insert with check (auth.uid() = user_id);
create policy "own diagnoses mark"   on public.diagnoses for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- growers may only change the feedback column, nothing else
revoke update on public.diagnoses from anon, authenticated;
grant update (feedback) on public.diagnoses to authenticated;
revoke delete on public.diagnoses from anon, authenticated;
