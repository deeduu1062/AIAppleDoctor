-- Seb Saathi: Money tools on the admin page (Payments tab) — renewal reminders and plan & price settings.
-- Run once AFTER payments.sql, payments_admin.sql, payments_ipaid.sql and admins.sql:
-- Supabase → SQL Editor → New query → paste → Run. Safe to run again.
-- (Written without any star characters, so copying from a phone cannot damage it.)

-- ---------- 1. Renewal reminders ----------
-- when you last sent a grower a WhatsApp/email reminder that their plan is ending
alter table public.payments add column if not exists reminded_at timestamptz;
grant update (reminded_at) on public.payments to authenticated;

-- the payment log: only log real changes (status, end date, note, money received), not reminder stamps
create or replace function public.payments_track_update() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.status is not distinct from old.status and new.valid_until is not distinct from old.valid_until
     and new.note is not distinct from old.note and new.checked_at is not distinct from old.checked_at then
    return new;
  end if;
  if new.status is distinct from old.status then
    new.reviewed_at := now();
    new.reviewed_by := auth.jwt() ->> 'email';
    if new.status = 'approved' and new.valid_until is null then
      new.valid_until := (new.created_at + case when new.period = 'year' then interval '1 year' else interval '1 month' end)::date;
    elsif new.status <> 'approved' then
      new.valid_until := null;
    end if;
  end if;
  insert into public.payment_events (payment_id, action, old_status, new_status, by_email, details)
  values (new.id, 'changed', old.status, new.status, auth.jwt() ->> 'email',
          jsonb_build_object('utr', new.utr, 'amount', new.amount, 'valid_until', new.valid_until, 'note', new.note));
  return new;
end $$;

-- ---------- 2. Plan & price settings ----------
-- One row. Everyone can read it (the plans page shows prices to visitors); only admins can change it.
create table if not exists public.plan_settings (
  id         int primary key default 1 check (id = 1),
  data       jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by text
);
insert into public.plan_settings (id, data) values (1, '{
  "prices": {"basic": {"month": 29, "year": 299, "was": 499, "wasm": 49}, "premium": {"month": 99, "year": 999, "was": 1499, "wasm": 149}},
  "limits": {"free":    {"o": 2,  "y": 2,  "dx": 3,  "q": 5},
             "basic":   {"o": 5,  "y": 5,  "dx": 15, "q": 20},
             "premium": {"o": 10, "y": 10, "dx": 50, "q": 30}}
}'::jsonb) on conflict (id) do nothing;

alter table public.plan_settings enable row level security;
drop policy if exists "anyone reads plan settings" on public.plan_settings;
drop policy if exists "admin changes plan settings" on public.plan_settings;
create policy "anyone reads plan settings"  on public.plan_settings for select to anon, authenticated using (true);
create policy "admin changes plan settings" on public.plan_settings for update to authenticated using (public.is_admin()) with check (public.is_admin());
revoke all on public.plan_settings from anon, authenticated;
grant select on public.plan_settings to anon, authenticated;
grant update (data) on public.plan_settings to authenticated;

-- every number must be a whole number in range; stamps who and when
create or replace function public.plan_settings_check() returns trigger
language plpgsql security definer set search_path = public as $$
declare p text; per text; k text; v numeric;
begin
  foreach p in array array['basic', 'premium'] loop
    foreach per in array array['month', 'year'] loop
      v := (new.data -> 'prices' -> p ->> per)::numeric;
      if v is null or v <> trunc(v) or v < 1 or v > 100000 then raise exception 'bad price %/%', p, per; end if;
    end loop;
  end loop;
  foreach p in array array['free', 'basic', 'premium'] loop
    foreach k in array array['o', 'y', 'dx', 'q'] loop
      v := (new.data -> 'limits' -> p ->> k)::numeric;
      if v is null or v <> trunc(v) or v < 0 or v > 1000 then raise exception 'bad limit %/%', p, k; end if;
    end loop;
  end loop;
  new.updated_at := now(); new.updated_by := auth.jwt() ->> 'email';
  return new;
end $$;
drop trigger if exists plan_settings_check on public.plan_settings;
create trigger plan_settings_check before update on public.plan_settings for each row execute function public.plan_settings_check();

-- the "I've paid" price check now follows the settings (falls back to the old prices)
create or replace function public.plan_price(p text, per text) returns integer
language sql stable security definer set search_path = public as $$
  select coalesce(
    (select (data -> 'prices' -> p ->> per)::integer from public.plan_settings where id = 1),
    case p || '/' || per when 'basic/month' then 29 when 'basic/year' then 299
                         when 'premium/month' then 99 when 'premium/year' then 999 end)
$$;

-- admin activity log (from site_ops.sql), if it is set up
do $$
begin
  if to_regprocedure('public.admin_log_row()') is not null then
    drop trigger if exists zz_admin_log on public.plan_settings;
    create trigger zz_admin_log after insert or update or delete on public.plan_settings for each row execute function public.admin_log_row();
  end if;
end $$;
