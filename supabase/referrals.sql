-- Seb Saathi: invite reward. Every 3 friends who join with your invite link = 1 free month.
-- Run once in Supabase → SQL Editor → New query → paste → Run (after payments.sql and payments_admin.sql).
-- A friend counts once they have created an account with the grower's invite link and confirmed
-- their email or phone (the link's code is saved on their account as user_metadata.ref at sign-up).
-- The reward is stored as an approved row in public.payments (source 'referral', ₹0, no UTR),
-- so the website, Saathi's limits and the admin page all treat it like a paid month.

-- 1. let payments hold a reward month
alter table public.payments add column if not exists source text not null default 'upi';
alter table public.payments drop constraint if exists payments_source_check;
alter table public.payments add constraint payments_source_check check (source in ('upi', 'referral'));
alter table public.payments alter column utr drop not null;
alter table public.payments drop constraint if exists payments_utr_check;
alter table public.payments add constraint payments_utr_check
  check ((source = 'upi' and utr ~ '^[0-9]{12}$') or (source = 'referral' and utr is null));
alter table public.payments drop constraint if exists payments_amount_check;
alter table public.payments add constraint payments_amount_check
  check ((source = 'upi' and amount > 0 and amount <= 100000) or (source = 'referral' and amount = 0));

-- growers can still only send UPI payments themselves
drop policy if exists "grower sends payment" on public.payments;
create policy "grower sends payment" on public.payments for insert to authenticated
  with check (user_id = auth.uid() and status = 'pending' and valid_until is null and note is null and source = 'upi');

-- 2. how many friends joined, and how many free months are waiting
create or replace function public.my_invites() returns json
language plpgsql security definer set search_path = public, auth as $$
declare uid uuid := auth.uid(); code text; joined int; claimed int;
begin
  if uid is null then return null; end if;
  code := left(replace(uid::text, '-', ''), 8);
  select count(*) into joined from auth.users u
   where u.raw_user_meta_data ->> 'ref' = code and u.id <> uid
     and (u.email_confirmed_at is not null or u.phone_confirmed_at is not null);
  select count(*) into claimed from public.payments where user_id = uid and source = 'referral';
  return json_build_object('joined', joined, 'claimed', claimed, 'free', greatest(joined / 3 - claimed, 0));
end $$;

-- 3. take one free month: extends the current plan by 30 days, or starts 30 days of the Saathi plan
create or replace function public.claim_invite_month() returns json
language plpgsql security definer set search_path = public, auth as $$
declare uid uuid := auth.uid(); info json; cur record; pl text := 'basic'; until date;
begin
  if uid is null then raise exception 'signin'; end if;
  perform pg_advisory_xact_lock(hashtext('invite-' || uid::text));
  info := public.my_invites();
  if coalesce((info ->> 'free')::int, 0) < 1 then raise exception 'none'; end if;
  select p.plan, p.valid_until into cur from public.payments p
   where p.user_id = uid and p.status = 'approved' and p.valid_until >= current_date
   order by p.valid_until desc limit 1;
  if found then pl := cur.plan; until := cur.valid_until + 30; else until := current_date + 30; end if;
  insert into public.payments (user_id, email, plan, period, amount, utr, status, valid_until, note, source)
  values (uid, (select email from auth.users where id = uid), pl, 'month', 0, null, 'approved', until,
          'Invite reward: 3 friends joined', 'referral');
  return json_build_object('plan', pl, 'valid_until', until);
end $$;

revoke all on function public.my_invites() from public, anon;
revoke all on function public.claim_invite_month() from public, anon;
grant execute on function public.my_invites() to authenticated;
grant execute on function public.claim_invite_month() to authenticated;

-- 4. admin page (Marketing tab): who has invited friends
create or replace function public.admin_invites() returns json
language plpgsql security definer set search_path = public, auth as $$
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  return (
    select coalesce(json_agg(x order by x.joined desc, x.email), '[]'::json) from (
      select inv.email,
             count(f.id) as joined,
             (select count(*) from public.payments p where p.user_id = inv.id and p.source = 'referral') as claimed
        from auth.users inv
        join auth.users f
          on f.raw_user_meta_data ->> 'ref' = left(replace(inv.id::text, '-', ''), 8)
         and f.id <> inv.id
         and (f.email_confirmed_at is not null or f.phone_confirmed_at is not null)
       group by inv.id, inv.email
    ) x);
end $$;
revoke all on function public.admin_invites() from public, anon;
grant execute on function public.admin_invites() to authenticated;
