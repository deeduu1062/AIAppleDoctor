-- Seb Saathi: family sharing — a grower shares their orchard records with up to two people.
-- Each person is set to "only view" or "can edit". The person needs their own Seb Saathi account,
-- signed in with the mobile number (or email) the grower added.
-- Run once in Supabase → SQL Editor → New query → paste → Run. Safe to run again.

create table if not exists public.ledger_shares (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  owner_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  owner_email  text,
  -- who it is shared with: an email (lower case) or a mobile number as digits with country code, e.g. 919876543210
  viewer_email text not null,
  unique (owner_id, viewer_email)
);
-- the first draft of this table had none of these: add them when missing
alter table public.ledger_shares add column if not exists owner_label text;
alter table public.ledger_shares add column if not exists name text;
alter table public.ledger_shares add column if not exists can_edit boolean not null default false;
alter table public.ledger_shares drop constraint if exists ledger_shares_viewer_email_check;
alter table public.ledger_shares drop constraint if exists ledger_shares_viewer_ok;
alter table public.ledger_shares add constraint ledger_shares_viewer_ok check (
  viewer_email ~ '^[0-9]{11,15}$'
  or (viewer_email = lower(viewer_email) and viewer_email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(viewer_email) <= 200));
alter table public.ledger_shares drop constraint if exists ledger_shares_name_len;
alter table public.ledger_shares add constraint ledger_shares_name_len check (name is null or char_length(name) <= 60);

create index if not exists ledger_shares_viewer on public.ledger_shares (viewer_email);

-- every way the signed-in person can be matched: email, mobile digits, and the old PIN-login address (digits@m.sebsaathi.com)
create or replace function public.share_keys() returns text[]
language sql stable set search_path = public as $$
  select array_remove(array[
    nullif(lower(coalesce(auth.jwt() ->> 'email', '')), ''),
    nullif(regexp_replace(coalesce(auth.jwt() ->> 'phone', ''), '\D', '', 'g'), ''),
    case when lower(coalesce(auth.jwt() ->> 'email', '')) like '%@m.sebsaathi.com'
         then split_part(lower(auth.jwt() ->> 'email'), '@', 1) end
  ], null)
$$;
grant execute on function public.share_keys() to authenticated;

-- on add: not yourself, at most two people, and fill in who the owner is (their email or mobile) for the other person to see
create or replace function public.ledger_shares_check() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    if new.viewer_email = any(public.share_keys()) then raise exception 'share_self'; end if;
    if (select count(*) from public.ledger_shares where owner_id = new.owner_id) >= 2 then raise exception 'share_limit'; end if;
    new.owner_email := nullif(lower(coalesce(auth.jwt() ->> 'email', '')), '');
    new.owner_label := coalesce(nullif(regexp_replace(coalesce(auth.jwt() ->> 'phone', ''), '\D', '', 'g'), ''),
                                case when new.owner_email like '%@m.sebsaathi.com' then split_part(new.owner_email, '@', 1) end,
                                new.owner_email);
  else
    -- on change: only the name and view/edit can change
    new.owner_id := old.owner_id; new.viewer_email := old.viewer_email; new.owner_email := old.owner_email; new.owner_label := old.owner_label;
  end if;
  return new;
end $$;

drop trigger if exists ledger_shares_check on public.ledger_shares;
create trigger ledger_shares_check before insert or update on public.ledger_shares
  for each row execute function public.ledger_shares_check();

alter table public.ledger_shares enable row level security;

drop policy if exists "owner sees shares"     on public.ledger_shares;
drop policy if exists "viewer sees shares"    on public.ledger_shares;
drop policy if exists "owner adds share"      on public.ledger_shares;
drop policy if exists "owner changes share"   on public.ledger_shares;
drop policy if exists "owner removes share"   on public.ledger_shares;
drop policy if exists "viewer leaves share"   on public.ledger_shares;

create policy "owner sees shares"   on public.ledger_shares for select to authenticated using (owner_id = auth.uid());
create policy "viewer sees shares"  on public.ledger_shares for select to authenticated using (viewer_email = any(public.share_keys()));
create policy "owner adds share"    on public.ledger_shares for insert to authenticated with check (owner_id = auth.uid());
create policy "owner changes share" on public.ledger_shares for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "owner removes share" on public.ledger_shares for delete to authenticated using (owner_id = auth.uid());

revoke all on public.ledger_shares from anon, authenticated;
grant select, insert, update, delete on public.ledger_shares to authenticated;

-- the shared person may READ the grower's records; with "can edit" they may also UPDATE them (never create or delete)
drop policy if exists "shared viewers read ledger"  on public.ledgers;
drop policy if exists "shared editors edit ledger"  on public.ledgers;
create policy "shared viewers read ledger" on public.ledgers for select to authenticated
  using (exists (select 1 from public.ledger_shares s
                 where s.owner_id = ledgers.user_id and s.viewer_email = any(public.share_keys())));
create policy "shared editors edit ledger" on public.ledgers for update to authenticated
  using (exists (select 1 from public.ledger_shares s
                 where s.owner_id = ledgers.user_id and s.can_edit and s.viewer_email = any(public.share_keys())))
  with check (exists (select 1 from public.ledger_shares s
                 where s.owner_id = ledgers.user_id and s.can_edit and s.viewer_email = any(public.share_keys())));

-- records can never be moved to another account
create or replace function public.ledgers_keep_owner() returns trigger
language plpgsql set search_path = public as $$
begin
  if new.user_id is distinct from old.user_id then raise exception 'ledger_owner_fixed'; end if;
  return new;
end $$;
drop trigger if exists ledgers_keep_owner on public.ledgers;
create trigger ledgers_keep_owner before update on public.ledgers
  for each row execute function public.ledgers_keep_owner();
