-- Apple Doctor: feedback and suggestions
-- Run once in Supabase → SQL Editor → New query → paste → Run.
-- Anyone (logged in or not) can send a message. Nobody can read, change or delete messages
-- except the admin account below, who can read them and mark them done.

create table if not exists public.feedback (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id    uuid default auth.uid() references auth.users(id) on delete set null,
  kind       text not null default 'other' check (kind in ('problem', 'idea', 'other')),
  message    text not null check (char_length(message) between 1 and 2000),
  contact    text check (contact is null or char_length(contact) <= 200),
  page       text check (page is null or char_length(page) <= 60),
  lang       text check (lang is null or char_length(lang) <= 5),
  agent      text check (agent is null or char_length(agent) <= 300),
  status     text not null default 'new' check (status in ('new', 'done'))
);

create index if not exists feedback_time on public.feedback (created_at desc);

alter table public.feedback enable row level security;

drop policy if exists "anyone sends feedback" on public.feedback;
drop policy if exists "admin reads feedback"  on public.feedback;
drop policy if exists "admin marks feedback"  on public.feedback;

-- senders: logged-out visitors send with no user id; logged-in growers only as themselves; always as 'new'
create policy "anyone sends feedback" on public.feedback for insert to anon, authenticated
  with check ((user_id is null or user_id = auth.uid()) and status = 'new');

-- admin only (same email as ADMIN_EMAILS in index.html)
create policy "admin reads feedback" on public.feedback for select to authenticated
  using (lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com');
create policy "admin marks feedback" on public.feedback for update to authenticated
  using (lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com')
  with check (lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com');

revoke all on public.feedback from anon, authenticated;
grant insert on public.feedback to anon, authenticated;
grant select on public.feedback to authenticated;
grant update (status) on public.feedback to authenticated;
