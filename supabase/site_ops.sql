-- Seb Saathi: Site health tab on the admin page — login health, AI safety switch and admin activity log.
-- Run once AFTER admins.sql (and ai_usage.sql for the automatic AI limit): Supabase → SQL Editor → New query → paste → Run.
-- Safe to run again. (Written without any star characters, so copying from a phone cannot damage it.)

-- ---------- 1. AI safety switch ----------
-- One row of settings. Free-plan photo checks and Saathi questions can be paused by hand,
-- or paused automatically once this month's AI cost (India time) reaches the limit you set.
create table if not exists public.site_switches (
  id               int primary key default 1 check (id = 1),
  free_dx_paused   boolean not null default false,
  free_chat_paused boolean not null default false,
  auto_pause       boolean not null default false,
  ai_cap_inr       integer not null default 0 check (ai_cap_inr >= 0 and ai_cap_inr <= 10000000),
  usd_inr          numeric(6, 2) not null default 85 check (usd_inr > 0),
  updated_at       timestamptz not null default now(),
  updated_by       text
);
insert into public.site_switches (id) values (1) on conflict (id) do nothing;

alter table public.site_switches enable row level security;
drop policy if exists "admin reads switches"   on public.site_switches;
drop policy if exists "admin changes switches" on public.site_switches;
create policy "admin reads switches"   on public.site_switches for select to authenticated using (public.is_admin());
create policy "admin changes switches" on public.site_switches for update to authenticated using (public.is_admin()) with check (public.is_admin());
revoke all on public.site_switches from anon, authenticated;
grant select, update (free_dx_paused, free_chat_paused, auto_pause, ai_cap_inr, usd_inr) on public.site_switches to authenticated;

create or replace function public.site_switches_stamp() returns trigger
language plpgsql security definer set search_path = public as $$
begin new.updated_at := now(); new.updated_by := auth.jwt() ->> 'email'; return new; end $$;
drop trigger if exists site_switches_stamp on public.site_switches;
create trigger site_switches_stamp before update on public.site_switches for each row execute function public.site_switches_stamp();

-- this month's AI cost in rupees (India time), from ai_usage
create or replace function public.ai_month_inr() returns numeric
language plpgsql stable security definer set search_path = public as $$
declare v numeric := 0; rate numeric := 85; since timestamptz;
begin
  select usd_inr into rate from public.site_switches where id = 1;
  since := (date_trunc('month', now() at time zone 'Asia/Kolkata')) at time zone 'Asia/Kolkata';
  if to_regclass('public.ai_usage') is not null then
    execute 'select coalesce(sum(cost_usd), 0) from public.ai_usage where created_at >= $1' into v using since;
  end if;
  return round(v * coalesce(rate, 85), 2);
end $$;
revoke all on function public.ai_month_inr() from public, anon;
grant execute on function public.ai_month_inr() to authenticated;

-- asked by api/chat.js and api/diagnose.js for free-plan growers: kind is 'dx' or 'chat'
create or replace function public.free_ai_paused(kind text) returns boolean
language plpgsql stable security definer set search_path = public as $$
declare s public.site_switches;
begin
  select * into s from public.site_switches where id = 1;
  if not found then return false; end if;
  if kind = 'dx' and s.free_dx_paused then return true; end if;
  if kind = 'chat' and s.free_chat_paused then return true; end if;
  if s.auto_pause and s.ai_cap_inr > 0 and public.ai_month_inr() >= s.ai_cap_inr then return true; end if;
  return false;
end $$;
revoke all on function public.free_ai_paused(text) from public, anon;
grant execute on function public.free_ai_paused(text) to authenticated;

-- ---------- 2. Login health (sign-ups and sign-ins from Supabase Auth) ----------
create or replace function public.admin_login_health() returns json
language plpgsql stable security definer set search_path = public, auth as $$
declare d14 timestamptz := now() - interval '14 days'; d7 timestamptz := now() - interval '7 days'; d1 timestamptz := now() - interval '1 day';
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  return json_build_object(
    'signups_1',  (select count(*) from auth.users where created_at >= d1),
    'signups_7',  (select count(*) from auth.users where created_at >= d7),
    'signins_1',  (select count(*) from auth.users where last_sign_in_at >= d1),
    'signins_7',  (select count(*) from auth.users where last_sign_in_at >= d7),
    'phone_7',    (select count(*) from auth.users where created_at >= d7 and phone is not null and phone <> ''),
    'email_7',    (select count(*) from auth.users where created_at >= d7 and email is not null and email <> ''),
    -- started with a mobile number but never finished the code: the best sign that codes are not arriving
    'stuck_7',    (select count(*) from auth.users where created_at >= d7 and phone is not null and phone <> '' and phone_confirmed_at is null),
    'stuck_list', (select coalesce(json_agg(x order by x.created_at desc), '[]'::json) from (
                     select phone, created_at from auth.users
                      where created_at >= d14 and phone is not null and phone <> '' and phone_confirmed_at is null
                      order by created_at desc limit 30) x),
    'days',       (select coalesce(json_agg(x order by x.day), '[]'::json) from (
                     select (created_at at time zone 'Asia/Kolkata')::date as day,
                            count(*) as signups,
                            count(*) filter (where phone is not null and phone <> '' and phone_confirmed_at is null) as stuck
                       from auth.users where created_at >= d14 group by 1) x)
  );
end $$;
revoke all on function public.admin_login_health() from public, anon;
grant execute on function public.admin_login_health() to authenticated;

-- ---------- 3. Admin activity log ----------
-- Every change an admin makes to these tables is written here automatically, with who, when and what changed.
create table if not exists public.admin_log (
  id       bigserial primary key,
  at       timestamptz not null default now(),
  by_email text,
  tbl      text not null,
  op       text not null,
  row_id   text,
  changes  jsonb
);
create index if not exists admin_log_time on public.admin_log (at desc);
alter table public.admin_log enable row level security;
drop policy if exists "admin reads log" on public.admin_log;
drop policy if exists "admin adds log"  on public.admin_log;
create policy "admin reads log" on public.admin_log for select to authenticated using (public.is_admin());
-- the admin page adds its own lines too (for example "backup downloaded")
create policy "admin adds log"  on public.admin_log for insert to authenticated with check (public.is_admin());
revoke all on public.admin_log from anon, authenticated;
grant select, insert on public.admin_log to authenticated;
grant usage on sequence public.admin_log_id_seq to authenticated;

create or replace function public.admin_log_row() returns trigger
language plpgsql security definer set search_path = public as $$
declare o jsonb; n jsonb; ch jsonb := '{}'::jsonb; k text;
begin
  if not public.is_admin() then return coalesce(new, old); end if;
  o := case when tg_op <> 'INSERT' then to_jsonb(old) else '{}'::jsonb end;
  n := case when tg_op <> 'DELETE' then to_jsonb(new) else '{}'::jsonb end;
  if tg_op = 'UPDATE' then
    for k in select jsonb_object_keys(n) loop
      if k not in ('updated_at', 'reviewed_at', 'reviewed_by') and (o -> k) is distinct from (n -> k) then
        ch := ch || jsonb_build_object(k, jsonb_build_array(o -> k, n -> k));
      end if;
    end loop;
    if ch = '{}'::jsonb then return new; end if;
  elsif tg_op = 'INSERT' then ch := n;
  else ch := o;
  end if;
  insert into public.admin_log (by_email, tbl, op, row_id, changes)
  values (auth.jwt() ->> 'email', tg_table_name, lower(tg_op), coalesce(n ->> 'id', o ->> 'id'), ch);
  return coalesce(new, old);
end $$;

do $$
declare t text;
begin
  foreach t in array array['payments', 'admin_expenses', 'admin_costs', 'site_switches', 'plan_settings', 'feedback', 'diagnoses', 'articles', 'admin_emails'] loop
    if to_regclass('public.' || t) is not null then
      execute format('drop trigger if exists zz_admin_log on public.%I', t);
      execute format('create trigger zz_admin_log after insert or update or delete on public.%I for each row execute function public.admin_log_row()', t);
    end if;
  end loop;
end $$;

-- ---------- 4. Backup: growers' records ----------
-- Growers' orchard records (ledgers) and family sharing are private to each grower, so the backup reads them through this admin-only function.
create or replace function public.admin_backup_records() returns json
language plpgsql stable security definer set search_path = public as $$
declare a json := '[]'::json; b json := '[]'::json;
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  if to_regclass('public.ledgers') is not null then execute 'select coalesce(json_agg(l), ''[]''::json) from public.ledgers l' into a; end if;
  if to_regclass('public.ledger_shares') is not null then execute 'select coalesce(json_agg(s), ''[]''::json) from public.ledger_shares s' into b; end if;
  return json_build_object('ledgers', a, 'ledger_shares', b);
end $$;
revoke all on function public.admin_backup_records() from public, anon;
grant execute on function public.admin_backup_records() to authenticated;
