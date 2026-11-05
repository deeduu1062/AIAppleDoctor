-- Seb Saathi: admin accounts
-- Run once in Supabase → SQL Editor → New query → paste → Run.
-- Keeps the list of admin emails in one table and points every admin permission at it.
-- To add another admin later:  insert into public.admin_emails (email) values ('name@example.com');
-- Safe to run again. Tables that are not set up yet are skipped.

create table if not exists public.admin_emails (
  email    text primary key check (email = lower(email)),
  added_at timestamptz not null default now()
);
insert into public.admin_emails (email) values ('deeduu@gmail.com'), ('admin@sebsaathi.com')
  on conflict (email) do nothing;

alter table public.admin_emails enable row level security;
revoke all on public.admin_emails from anon, authenticated;

-- true when the signed-in account is an admin
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_emails where email = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;
grant execute on function public.is_admin() to authenticated, anon;

-- helper for older functions that compare against the first admin email
create or replace function public.admin_email_match() returns text
language sql stable security definer set search_path = public as $$
  select case when public.is_admin() then lower(auth.jwt() ->> 'email') else 'deeduu@gmail.com' end;
$$;
grant execute on function public.admin_email_match() to authenticated, anon;

do $$
begin
  -- payments
  if to_regclass('public.payments') is not null then
    drop policy if exists "grower reads own" on public.payments;
    drop policy if exists "admin updates payment" on public.payments;
    create policy "grower reads own" on public.payments for select to authenticated
      using (user_id = auth.uid() or public.is_admin());
    create policy "admin updates payment" on public.payments for update to authenticated
      using (public.is_admin()) with check (public.is_admin());
  end if;
  if to_regclass('public.payment_events') is not null then
    drop policy if exists "admin reads payment log" on public.payment_events;
    create policy "admin reads payment log" on public.payment_events for select to authenticated using (public.is_admin());
  end if;

  -- feedback
  if to_regclass('public.feedback') is not null then
    drop policy if exists "admin reads feedback" on public.feedback;
    drop policy if exists "admin marks feedback" on public.feedback;
    create policy "admin reads feedback" on public.feedback for select to authenticated using (public.is_admin());
    create policy "admin marks feedback" on public.feedback for update to authenticated
      using (public.is_admin()) with check (public.is_admin());
  end if;

  -- Saathi chat
  if to_regclass('public.chat_messages') is not null then
    drop policy if exists "admin chat read" on public.chat_messages;
    create policy "admin chat read" on public.chat_messages for select to authenticated using (public.is_admin());
  end if;

  -- library articles and photos
  if to_regclass('public.articles') is not null then
    drop policy if exists "admin reads articles" on public.articles;
    drop policy if exists "admin adds articles" on public.articles;
    drop policy if exists "admin edits articles" on public.articles;
    drop policy if exists "admin deletes articles" on public.articles;
    create policy "admin reads articles" on public.articles for select to authenticated using (public.is_admin());
    create policy "admin adds articles" on public.articles for insert to authenticated with check (public.is_admin());
    create policy "admin edits articles" on public.articles for update to authenticated
      using (public.is_admin()) with check (public.is_admin());
    create policy "admin deletes articles" on public.articles for delete to authenticated using (public.is_admin());
  end if;
  drop policy if exists "admin uploads library photos" on storage.objects;
  drop policy if exists "admin deletes library photos" on storage.objects;
  create policy "admin uploads library photos" on storage.objects for insert to authenticated
    with check (bucket_id = 'library' and public.is_admin());
  create policy "admin deletes library photos" on storage.objects for delete to authenticated
    using (bucket_id = 'library' and public.is_admin());
end $$;

-- the Growers list (admin_overview function): let every admin open it
do $$
declare d text;
begin
  if to_regprocedure('public.admin_overview()') is not null then
    d := pg_get_functiondef('public.admin_overview()'::regprocedure);
    if position('''deeduu@gmail.com''' in d) > 0 then
      execute replace(d, '''deeduu@gmail.com''', 'public.admin_email_match()');
    end if;
  end if;
end $$;
