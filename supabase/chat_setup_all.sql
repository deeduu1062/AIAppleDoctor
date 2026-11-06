-- Seb Saathi: Saathi chat table + thumbs up/down ratings, all in one
-- Run once in Supabase → SQL Editor → New query → paste ALL of this → Run. Safe to run again.
-- (Use this instead of chat.sql + chat_feedback.sql.)

-- 1. Admin accounts (skipped if already set up)
create table if not exists public.admin_emails (
  email    text primary key check (email = lower(email)),
  added_at timestamptz not null default now()
);
insert into public.admin_emails (email) values ('deeduu@gmail.com'), ('admin@sebsaathi.com')
  on conflict (email) do nothing;

alter table public.admin_emails enable row level security;
revoke all on public.admin_emails from anon, authenticated;

-- true when the signed-in account is an admin
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_emails where email = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;
grant execute on function public.is_admin() to authenticated, anon;

-- 2. Saathi chat messages: each grower sees only their own chat; admins can read all
create table if not exists public.chat_messages (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  role       text not null check (role in ('user', 'assistant')),
  content    text not null check (char_length(content) between 1 and 8000),
  lang       text check (lang is null or char_length(lang) <= 5)
);

create index if not exists chat_messages_user_time on public.chat_messages (user_id, created_at desc);

alter table public.chat_messages enable row level security;

drop policy if exists "own chat read"   on public.chat_messages;
drop policy if exists "own chat add"    on public.chat_messages;
drop policy if exists "own chat clear"  on public.chat_messages;
drop policy if exists "admin chat read" on public.chat_messages;

create policy "own chat read"   on public.chat_messages for select to authenticated using (auth.uid() = user_id);
create policy "own chat add"    on public.chat_messages for insert to authenticated with check (auth.uid() = user_id);
create policy "admin chat read" on public.chat_messages for select to authenticated using (public.is_admin());

revoke all on public.chat_messages from anon, authenticated;
grant select, insert on public.chat_messages to authenticated;

-- 3. Ratings on Saathi's answers
alter table public.chat_messages add column if not exists feedback      smallint check (feedback is null or feedback in (-1, 1));
alter table public.chat_messages add column if not exists feedback_note text     check (feedback_note is null or char_length(feedback_note) <= 500);
alter table public.chat_messages add column if not exists feedback_at   timestamptz;
alter table public.chat_messages add column if not exists reviewed      boolean not null default false;

create index if not exists chat_messages_feedback on public.chat_messages (feedback, reviewed, created_at desc) where feedback is not null;

drop policy if exists "own chat rate"     on public.chat_messages;
drop policy if exists "admin chat review" on public.chat_messages;
create policy "own chat rate" on public.chat_messages for update to authenticated
  using (auth.uid() = user_id and role = 'assistant') with check (auth.uid() = user_id and role = 'assistant');
create policy "admin chat review" on public.chat_messages for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- only these columns can ever be changed; the question and answer text stay as they were
grant update (feedback, feedback_note, feedback_at, reviewed) on public.chat_messages to authenticated;

-- growers can rate, but only an admin can mark an answer reviewed
create or replace function public.chat_review_guard() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.reviewed is distinct from old.reviewed and not public.is_admin() then new.reviewed := old.reviewed; end if;
  if new.feedback is distinct from old.feedback then new.feedback_at := now(); new.reviewed := false; end if;
  return new;
end $$;
drop trigger if exists chat_review_guard on public.chat_messages;
create trigger chat_review_guard before update on public.chat_messages for each row execute function public.chat_review_guard();
