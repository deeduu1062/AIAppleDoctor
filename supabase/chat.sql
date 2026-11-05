-- Seb Saathi: "Saathi" chatbot messages
-- Run once in Supabase → SQL Editor → New query → paste → Run.
-- Each grower sees only their own chat; the admin account can read all chats (to learn what growers ask).

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
create policy "admin chat read" on public.chat_messages for select to authenticated using (lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com');

revoke all on public.chat_messages from anon, authenticated;
grant select, insert on public.chat_messages to authenticated;
