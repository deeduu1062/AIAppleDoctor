-- Seb Saathi: automatic Facebook + Instagram posts (admin page → Marketing → Auto posts)
-- Run once in Supabase → SQL Editor → New query → paste → Run (after admins.sql).
-- Safe to run again.
--
-- What it sets up:
--   1. social_queue   the AI drafts and scheduled posts (only admins can see or change them)
--   2. a private key  made here automatically; only this database and the posting robot know it
--   3. a timer        every 10 minutes Supabase asks the website to post anything that is due
--                     (api/social-cron.js), using pg_cron + pg_net

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- 1. the queue -----------------------------------------------------------------------------
create table if not exists public.social_queue (
  id          bigserial primary key,
  status      text not null default 'draft' check (status in ('draft', 'scheduled', 'posting', 'posted', 'failed')),
  text        text not null default '' check (char_length(text) <= 2200),
  image_url   text check (image_url is null or image_url like 'https://%'),
  fb          boolean not null default true,
  ig          boolean not null default false,
  post_at     timestamptz,
  topic       text check (topic is null or char_length(topic) <= 200),
  photo_idea  text check (photo_idea is null or char_length(photo_idea) <= 400),
  result      jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists social_queue_due on public.social_queue (status, post_at);

alter table public.social_queue enable row level security;
drop policy if exists "admins manage social queue" on public.social_queue;
create policy "admins manage social queue" on public.social_queue for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
revoke all on public.social_queue from anon, authenticated;
grant select, insert, update, delete on public.social_queue to authenticated;
grant usage, select on sequence public.social_queue_id_seq to authenticated;

-- 2. the private key (nobody can read this table through the website) -----------------------
create table if not exists public.social_cron_key (
  id  int primary key default 1 check (id = 1),
  k   text not null default replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', '')
);
insert into public.social_cron_key (id) values (1) on conflict (id) do nothing;
alter table public.social_cron_key enable row level security;
revoke all on public.social_cron_key from anon, authenticated;

-- the robot asks: "is anything due?"  → hands over ONE due post and marks it as posting
create or replace function public.social_due(k text) returns json
language plpgsql security definer set search_path = public as $$
declare r public.social_queue;
begin
  if k is null or k <> (select c.k from public.social_cron_key c where c.id = 1) then
    raise exception 'bad key';
  end if;
  -- a post stuck half-way for 15 minutes is marked failed so it can be retried by hand
  update public.social_queue set status = 'failed', updated_at = now(),
         result = coalesce(result, '{}'::jsonb) || '{"error":"stopped half-way; check Facebook/Instagram before retrying"}'::jsonb
   where status = 'posting' and updated_at < now() - interval '15 minutes';
  select * into r from public.social_queue
   where status = 'scheduled' and post_at <= now()
   order by post_at limit 1 for update skip locked;
  if r.id is null then return null; end if;
  update public.social_queue set status = 'posting', updated_at = now() where id = r.id;
  return json_build_object('id', r.id, 'text', r.text, 'image_url', r.image_url, 'fb', r.fb, 'ig', r.ig);
end $$;

-- the robot reports back: posted (with links) or failed (with the reason)
create or replace function public.social_done(k text, post_id bigint, ok boolean, res jsonb) returns void
language plpgsql security definer set search_path = public as $$
begin
  if k is null or k <> (select c.k from public.social_cron_key c where c.id = 1) then
    raise exception 'bad key';
  end if;
  update public.social_queue
     set status = case when ok then 'posted' else 'failed' end, result = res, updated_at = now()
   where id = post_id and status = 'posting';
end $$;

revoke all on function public.social_due(text) from public;
revoke all on function public.social_done(text, bigint, boolean, jsonb) from public;
grant execute on function public.social_due(text) to anon, authenticated;
grant execute on function public.social_done(text, bigint, boolean, jsonb) to anon, authenticated;

-- 3. the timer: every 10 minutes ------------------------------------------------------------
-- If your website address changes, change it here and run this file again.
do $$
begin
  if exists (select 1 from cron.job where jobname = 'seb-saathi-social-posts') then
    perform cron.unschedule('seb-saathi-social-posts');
  end if;
end $$;
select cron.schedule('seb-saathi-social-posts', '*/10 * * * *', $cron$
  select net.http_post(
    url     := 'https://sebsaathi.vercel.app/api/social-cron',
    headers := jsonb_build_object('Content-Type', 'application/json',
                                  'x-cron-key', (select k from public.social_cron_key where id = 1)),
    body    := '{}'::jsonb,
    timeout_milliseconds := 60000
  );
$cron$);
