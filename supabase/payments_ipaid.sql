-- Seb Saathi: "I've paid" — the grower pays by UPI, taps "I've paid", and their plan switches on straight away.
-- You then check your UPI app and mark each one "Money received", or "Rejected" (which switches the plan off).
-- No UTR needed. Old UTR payments keep working.
-- Run once AFTER payments.sql and payments_admin.sql: Supabase → SQL Editor → New query → paste → Run. Safe to run again.

-- columns from the other payment scripts, in case they were never run, plus the two new ones
alter table public.payments add column if not exists source         text not null default 'upi';
alter table public.payments add column if not exists method         text not null default 'upi';
alter table public.payments add column if not exists rzp_order_id   text;
alter table public.payments add column if not exists rzp_payment_id text;
alter table public.payments add column if not exists self_paid      boolean not null default false;  -- sent with "I've paid"
alter table public.payments add column if not exists checked_at     timestamptz;                     -- you saw the money arrive

alter table public.payments alter column utr drop not null;
alter table public.payments drop constraint if exists payments_utr_check;
alter table public.payments add constraint payments_utr_check check (utr is null or utr ~ '^[0-9]{12}$');
alter table public.payments drop constraint if exists payments_ref_check;
alter table public.payments add constraint payments_ref_check
  check (utr is not null or rzp_payment_id is not null or self_paid or source = 'referral');

-- prices: keep in step with PRICES in plans.js
create or replace function public.plan_price(p text, per text) returns integer
language sql immutable as $$
  select case p || '/' || per when 'basic/month' then 49 when 'basic/year' then 299
                              when 'premium/month' then 149 when 'premium/year' then 999 end
$$;

-- an "I've paid" row: the right price, approved now, end date worked out here (renewals add on to the current end date)
create or replace function public.payments_self_paid() returns trigger
language plpgsql security definer set search_path = public as $$
declare start date;
begin
  if not coalesce(new.self_paid, false) then return new; end if;
  if exists (select 1 from public.payments
              where user_id = new.user_id and self_paid and status = 'approved' and checked_at is null) then
    raise exception 'ipaid_waiting';
  end if;
  new.amount := public.plan_price(new.plan, new.period);
  if new.amount is null then raise exception 'ipaid_plan'; end if;
  select greatest(current_date, coalesce(max(valid_until), current_date)) into start
    from public.payments where user_id = new.user_id and status = 'approved' and plan = new.plan;
  new.status      := 'approved';
  new.valid_until := (start + case when new.period = 'year' then interval '1 year' else interval '1 month' end)::date;
  new.utr := null; new.note := null; new.checked_at := null; new.reviewed_at := null; new.reviewed_by := null;
  new.source := 'upi'; new.method := 'upi'; new.rzp_order_id := null; new.rzp_payment_id := null;
  return new;
end $$;
drop trigger if exists payments_self_paid on public.payments;
create trigger payments_self_paid before insert on public.payments
  for each row execute function public.payments_self_paid();

-- marking "Money received" stamps who and when
create or replace function public.payments_checked() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.checked_at is distinct from old.checked_at then
    new.reviewed_at := now(); new.reviewed_by := auth.jwt() ->> 'email';
  end if;
  return new;
end $$;
drop trigger if exists payments_checked on public.payments;
create trigger payments_checked before update on public.payments
  for each row execute function public.payments_checked();

-- growers: a UTR for checking (as before), or "I've paid"
drop policy if exists "grower sends payment" on public.payments;
create policy "grower sends payment" on public.payments for insert to authenticated
  with check (user_id = auth.uid() and note is null and source = 'upi' and method = 'upi'
              and rzp_payment_id is null and rzp_order_id is null
              and ((status = 'pending' and valid_until is null and not self_paid)
                   or (status = 'approved' and self_paid and checked_at is null)));

-- the admin can tick "Money received"
grant update (checked_at) on public.payments to authenticated;
