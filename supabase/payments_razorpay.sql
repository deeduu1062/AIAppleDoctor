-- Seb Saathi: automatic plan payments with Razorpay
-- Run once AFTER payments.sql and payments_admin.sql: Supabase → SQL Editor → New query → paste → Run.
-- Safe to run again.
--
-- Razorpay payments are written by the website's server (api/rzp-verify.js, api/rzp-webhook.js)
-- as 'approved' straight away, with the Razorpay payment id instead of a UTR.
-- Growers can still send a UPI reference (UTR) by hand; those stay 'pending' until you approve them.

alter table public.payments
  add column if not exists method         text not null default 'upi',
  add column if not exists rzp_order_id   text,
  add column if not exists rzp_payment_id text;

alter table public.payments alter column utr drop not null;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'payments_method_check') then
    alter table public.payments add constraint payments_method_check check (method in ('upi', 'razorpay'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'payments_ref_check') then
    alter table public.payments add constraint payments_ref_check check (utr is not null or rzp_payment_id is not null);
  end if;
  if not exists (select 1 from pg_constraint where conname = 'payments_rzp_payment_key') then
    alter table public.payments add constraint payments_rzp_payment_key unique (rzp_payment_id);
  end if;
end $$;

-- growers can still only send a pending UPI reference for themselves (never a Razorpay row)
drop policy if exists "grower sends payment" on public.payments;
create policy "grower sends payment" on public.payments for insert to authenticated
  with check (user_id = auth.uid() and status = 'pending' and valid_until is null and note is null
              and method = 'upi' and rzp_payment_id is null and rzp_order_id is null);

-- the payment log also records Razorpay ids
create or replace function public.payments_log_insert() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.payment_events (payment_id, action, new_status, by_email, details)
  values (new.id, 'sent', new.status, coalesce(auth.jwt() ->> 'email', 'razorpay'),
          jsonb_build_object('plan', new.plan, 'period', new.period, 'amount', new.amount, 'utr', new.utr, 'email', new.email,
                             'method', new.method, 'rzp_payment_id', new.rzp_payment_id, 'valid_until', new.valid_until));
  return new;
end $$;
