-- Seb Saathi: Today tab (daily brief), morning email, and Broadcast (messages to growers).
-- Run once AFTER admins.sql and social_queue.sql: Supabase → SQL Editor → New query → paste → Run. Safe to run again.
-- (Written without any star characters, so copying from a phone cannot damage it.)

-- ---------- 1. Daily brief: everything that needs you, in one answer ----------
-- Each part is worked out on its own, so a table that is not set up just leaves that part empty.
create or replace function public.brief_core() returns json
language plpgsql stable security definer set search_path = public, auth as $$
declare o jsonb := jsonb_build_object('at', now()); v jsonb; d1 timestamptz := now() - interval '1 day'; d7 timestamptz := now() - interval '7 days';
        today date := (now() at time zone 'Asia/Kolkata')::date;
begin
  -- payments: "I've paid" not yet matched, and old UTR payments waiting
  begin
    select jsonb_build_object(
      'unchecked', count(1) filter (where self_paid and status = 'approved' and checked_at is null),
      'unchecked_sum', coalesce(sum(amount) filter (where self_paid and status = 'approved' and checked_at is null), 0),
      'overdue', count(1) filter (where self_paid and status = 'approved' and checked_at is null and created_at < now() - interval '3 days'),
      'pending', count(1) filter (where status = 'pending'),
      'money_1', coalesce(sum(amount) filter (where status = 'approved' and created_at >= d1 and source <> 'referral'), 0),
      'paid_1', count(1) filter (where status = 'approved' and created_at >= d1 and source <> 'referral'))
    into v from public.payments;
    o := o || jsonb_build_object('pay', v);
  exception when others then null; end;
  -- renewals: latest approved plan per grower ending in the next 7 days / ended in the last 7
  begin
    with cur as (select distinct on (user_id) user_id, valid_until, plan from public.payments
                  where status = 'approved' and valid_until is not null order by user_id, valid_until desc)
    select jsonb_build_object('due_7', count(1) filter (where valid_until between today and today + 7),
                              'ended_7', count(1) filter (where valid_until < today and valid_until >= today - 7))
    into v from cur;
    o := o || jsonb_build_object('ren', v);
  exception when others then null; end;
  -- growers: sign-ups, codes not entered
  begin
    select jsonb_build_object('signups_1', count(1) filter (where created_at >= d1),
                              'signups_7', count(1) filter (where created_at >= d7),
                              'stuck_1', count(1) filter (where created_at >= d1 and phone is not null and phone <> '' and phone_confirmed_at is null),
                              'phone_1', count(1) filter (where created_at >= d1 and phone is not null and phone <> ''),
                              'total', count(1))
    into v from auth.users;
    o := o || jsonb_build_object('users', v);
  exception when others then null; end;
  -- photo checks: yesterday, and answers to check
  begin
    select jsonb_build_object('checks_1', count(1) filter (where created_at >= d1),
                              'wrong_7', count(1) filter (where created_at >= d7 and feedback = 'wrong'),
                              'notbetter_7', count(1) filter (where outcome_at >= d7 and outcome in ('same', 'worse')))
    into v from public.diagnoses;
    o := o || jsonb_build_object('dx', v);
  exception when others then null; end;
  -- rising problems: this week vs the week before, by area (clear answers only)
  begin
    with x as (
      select coalesce(nullif(trim(area), ''), round(lat2, 1)::text || ', ' || round(lon2, 1)::text, '?') as ar,
             coalesce(expert_id, result -> 'matches' -> 0 ->> 'id') as dz, created_at
        from public.diagnoses
       where created_at >= now() - interval '14 days'
         and (expert_id is not null or coalesce(result -> 'matches' -> 0 ->> 'confidence', 'low') <> 'low')
         and coalesce(feedback, '') <> 'wrong'),
    g as (select ar, dz, count(1) filter (where created_at >= d7) as wk, count(1) filter (where created_at < d7) as pwk
            from x where dz is not null and dz not in ('healthy', 'other') group by ar, dz)
    select coalesce(jsonb_agg(jsonb_build_object('area', ar, 'dz', dz, 'wk', wk, 'pwk', pwk) order by wk desc), '[]'::jsonb)
      into v from g where wk >= 3 and wk >= pwk + pwk;
    o := o || jsonb_build_object('rising', v);
  exception when others then null; end;
  -- Saathi: questions yesterday, thumbs-down answers not checked
  begin
    select jsonb_build_object('q_1', count(1) filter (where role = 'user' and created_at >= d1)) into v from public.chat_messages;
    o := o || jsonb_build_object('chat', v);
    execute 'select to_jsonb(count(1)) from public.chat_messages where role = ''assistant'' and feedback = -1 and not reviewed' into v;
    o := jsonb_set(o, '{chat,bad}', v);
  exception when others then null; end;
  -- feedback not done
  begin
    select to_jsonb(count(1)) into v from public.feedback where status <> 'done';
    o := o || jsonb_build_object('fb_new', v);
  exception when others then null; end;
  -- social posts waiting for you
  begin
    select jsonb_build_object('drafts', count(1) filter (where status = 'draft'), 'failed', count(1) filter (where status = 'failed'),
                              'today', count(1) filter (where status = 'scheduled' and (post_at at time zone 'Asia/Kolkata')::date = today))
    into v from public.social_queue;
    o := o || jsonb_build_object('social', v);
  exception when others then null; end;
  -- AI cost this month and the safety switch
  begin
    o := o || jsonb_build_object('ai', jsonb_build_object('month_inr', public.ai_month_inr(),
      'cap', (select ai_cap_inr from public.site_switches where id = 1),
      'paused', (select free_dx_paused or free_chat_paused from public.site_switches where id = 1)));
  exception when others then null; end;
  -- live messages to growers
  begin
    select to_jsonb(count(1)) into v from public.announcements where active and starts_at <= now() and (ends_at is null or ends_at > now());
    o := o || jsonb_build_object('ann_live', v);
  exception when others then null; end;
  return o::json;
end $$;
revoke all on function public.brief_core() from public, anon, authenticated;

-- the admin page's Today tab
create or replace function public.admin_brief() returns json
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  return public.brief_core();
end $$;
revoke all on function public.admin_brief() from public, anon;
grant execute on function public.admin_brief() to authenticated;

-- the morning email robot (api/social?fn=brief), with the same private key as the posting robot
create or replace function public.brief_data(k text) returns json
language plpgsql stable security definer set search_path = public as $$
begin
  if k is null or k <> (select c.k from public.social_cron_key c where c.id = 1) then raise exception 'bad key'; end if;
  return public.brief_core();
end $$;
revoke all on function public.brief_data(text) from public;
grant execute on function public.brief_data(text) to anon, authenticated;

-- every morning at 7:45 India time (02:15 UTC). If your website address changes, change it here and run this file again.
do $$
begin
  if exists (select 1 from cron.job where jobname = 'seb-saathi-morning-brief') then perform cron.unschedule('seb-saathi-morning-brief'); end if;
end $$;
select cron.schedule('seb-saathi-morning-brief', replace('15 2 x x x', 'x', chr(42)), $cron$
  select net.http_post(
    url     := 'https://sebsaathi.vercel.app/api/social?fn=brief',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-key', (select k from public.social_cron_key where id = 1)),
    body    := '{}'::jsonb,
    timeout_milliseconds := 30000
  );
$cron$);

-- ---------- 2. Broadcast: messages shown to growers on the website ----------
create table if not exists public.announcements (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  created_by text,
  kind       text not null default 'info' check (kind in ('info', 'alert', 'offer')),
  title      jsonb not null default '{}'::jsonb,   -- {"hn": "...", "hi": "...", "en": "..."}
  body       jsonb not null default '{}'::jsonb,
  link       text check (link is null or char_length(link) <= 300),
  link_label jsonb not null default '{}'::jsonb,
  audience   jsonb not null default '{}'::jsonb,   -- {"who": "all"|"growers"|"free"|"paid", "near": {"lat","lon","km","name"}, "words": "rohru"}
  starts_at  timestamptz not null default now(),
  ends_at    timestamptz,
  active     boolean not null default true,
  views      integer not null default 0,
  clicks     integer not null default 0
);
create index if not exists announcements_live on public.announcements (active, starts_at desc);
alter table public.announcements enable row level security;
drop policy if exists "anyone reads live messages" on public.announcements;
drop policy if exists "admin reads messages"       on public.announcements;
drop policy if exists "admin writes messages"      on public.announcements;
create policy "anyone reads live messages" on public.announcements for select to anon, authenticated
  using (active and starts_at <= now() and (ends_at is null or ends_at > now()));
create policy "admin reads messages"  on public.announcements for select to authenticated using (public.is_admin());
create policy "admin writes messages" on public.announcements for all to authenticated using (public.is_admin()) with check (public.is_admin());
revoke all on public.announcements from anon, authenticated;
grant select on public.announcements to anon, authenticated;
grant insert, update, delete on public.announcements to authenticated;

-- growers' phones count a view or a tap (numbers only, nothing about who)
create or replace function public.ann_seen(aid uuid, what text) returns void
language sql security definer set search_path = public as $$
  update public.announcements set views = views + case when what = 'view' then 1 else 0 end, clicks = clicks + case when what = 'click' then 1 else 0 end
   where id = aid and active;
$$;
revoke all on function public.ann_seen(uuid, text) from public;
grant execute on function public.ann_seen(uuid, text) to anon, authenticated;

-- where each grower's orchards are (village and map point), to pick who gets a WhatsApp message
create or replace function public.admin_grower_places() returns json
language plpgsql stable security definer set search_path = public as $$
declare out json := '[]'::json;
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  if to_regclass('public.ledgers') is null then return out; end if;
  execute $q$
    select coalesce(json_agg(json_build_object('id', l.user_id, 'places', p.places)), '[]'::json)
      from public.ledgers l,
      lateral (select coalesce(json_agg(json_build_object('v', o -> 'profile' ->> 'village', 'lat', o -> 'profile' ->> 'lat', 'lon', o -> 'profile' ->> 'lon')), '[]'::json) as places
                 from jsonb_array_elements(coalesce(l.data -> 'orchards', '[]'::jsonb)) o
                where coalesce(o ->> 'ex', 'false') <> 'true') p $q$ into out;
  return out;
end $$;
revoke all on function public.admin_grower_places() from public, anon;
grant execute on function public.admin_grower_places() to authenticated;

-- admin activity log (site_ops.sql), if it is set up
do $$
begin
  if to_regprocedure('public.admin_log_row()') is not null then
    drop trigger if exists zz_admin_log on public.announcements;
    create trigger zz_admin_log after insert or update or delete on public.announcements for each row execute function public.admin_log_row();
  end if;
end $$;
