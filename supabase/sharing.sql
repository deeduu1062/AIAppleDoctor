-- DRAFT: the website does not use this yet (view-only sharing is paused). Do not run it until that feature is finished.
-- Seb Saathi: share your records VIEW-ONLY with up to two people
-- Run once in Supabase → SQL Editor → New query → paste → Run.
-- A grower adds a person's email. When that person logs in with that email, they can
-- see the grower's records but can never change them. At most two people per grower.

create table if not exists public.ledger_shares (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  owner_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  owner_email  text default lower(auth.jwt() ->> 'email'),
  viewer_email text not null check (viewer_email = lower(viewer_email) and viewer_email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(viewer_email) <= 200),
  unique (owner_id, viewer_email)
);

create index if not exists ledger_shares_viewer on public.ledger_shares (viewer_email);

-- no more than two viewers per grower, and not yourself
create or replace function public.ledger_shares_check() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.viewer_email = lower(coalesce(auth.jwt() ->> 'email', '')) then
    raise exception 'share_self';
  end if;
  if (select count(*) from public.ledger_shares where owner_id = new.owner_id) >= 2 then
    raise exception 'share_limit';
  end if;
  return new;
end $$;

drop trigger if exists ledger_shares_check on public.ledger_shares;
create trigger ledger_shares_check before insert on public.ledger_shares
  for each row execute function public.ledger_shares_check();

alter table public.ledger_shares enable row level security;

drop policy if exists "owner sees shares"    on public.ledger_shares;
drop policy if exists "viewer sees shares"   on public.ledger_shares;
drop policy if exists "owner adds share"     on public.ledger_shares;
drop policy if exists "owner removes share"  on public.ledger_shares;

create policy "owner sees shares"   on public.ledger_shares for select to authenticated using (owner_id = auth.uid());
create policy "viewer sees shares"  on public.ledger_shares for select to authenticated using (viewer_email = lower(auth.jwt() ->> 'email'));
create policy "owner adds share"    on public.ledger_shares for insert to authenticated with check (owner_id = auth.uid());
create policy "owner removes share" on public.ledger_shares for delete to authenticated using (owner_id = auth.uid());

revoke all on public.ledger_shares from anon, authenticated;
grant select, insert, delete on public.ledger_shares to authenticated;

-- people a grower has shared with may READ that grower's ledger (never write: no insert/update policy for them)
drop policy if exists "shared viewers read ledger" on public.ledgers;
create policy "shared viewers read ledger" on public.ledgers for select to authenticated
  using (exists (select 1 from public.ledger_shares s
                 where s.owner_id = ledgers.user_id
                   and s.viewer_email = lower(auth.jwt() ->> 'email')));
