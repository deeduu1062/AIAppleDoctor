-- Seb Saathi: payment records for the admin page
-- Run once AFTER payments.sql: Supabase → SQL Editor → New query → paste → Run.
-- Adds who checked each payment and when, sets the plan end date on approval,
-- and keeps a permanent log of every payment sent and every status change.

alter table public.payments
  add column if not exists reviewed_at timestamptz,
  add column if not exists reviewed_by text;

create table if not exists public.payment_events (
  id         bigserial primary key,
  at         timestamptz not null default now(),
  payment_id uuid references public.payments(id) on delete set null,
  action     text not null check (action in ('sent', 'changed')),
  old_status text,
  new_status text,
  by_email   text,
  details    jsonb
);
create index if not exists payment_events_time on public.payment_events (at desc);

alter table public.payment_events enable row level security;
drop policy if exists "admin reads payment log" on public.payment_events;
create policy "admin reads payment log" on public.payment_events for select to authenticated
  using (lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com');
revoke all on public.payment_events from anon, authenticated;
grant select on public.payment_events to authenticated;

-- log every new payment
create or replace function public.payments_log_insert() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.payment_events (payment_id, action, new_status, by_email, details)
  values (new.id, 'sent', new.status, auth.jwt() ->> 'email',
          jsonb_build_object('plan', new.plan, 'period', new.period, 'amount', new.amount, 'utr', new.utr, 'email', new.email));
  return new;
end $$;

-- stamp who/when on a status change, set the end date on approval, and log it
create or replace function public.payments_track_update() returns trigger
language plpgsql security definer set search_path = public as $$
begin
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

drop trigger if exists payments_after_insert on public.payments;
create trigger payments_after_insert after insert on public.payments
  for each row execute function public.payments_log_insert();

drop trigger if exists payments_before_update on public.payments;
create trigger payments_before_update before update on public.payments
  for each row execute function public.payments_track_update();
