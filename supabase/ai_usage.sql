-- Seb Saathi: AI cost per grower (admin page → Costs tab → "AI cost per grower")
-- Run once AFTER admins.sql: Supabase → SQL Editor → New query → paste → Run. Safe to run again.
-- Every Saathi answer, photo check, translation and receipt reading saves one row here with its tokens and dollar cost.
-- Growers can only add rows for themselves and cannot read them; only admins can read.
-- (Written without any star characters, so copying from a phone cannot damage it.)

create table if not exists public.ai_usage (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  user_id     uuid not null default auth.uid() references auth.users(id) on delete cascade,
  feature     text not null check (feature in ('chat', 'photo', 'translate', 'receipt', 'other')),
  model       text check (model is null or char_length(model) <= 60),
  in_tok      integer not null default 0 check (in_tok >= 0),
  out_tok     integer not null default 0 check (out_tok >= 0),
  cache_read  integer not null default 0 check (cache_read >= 0),
  cache_write integer not null default 0 check (cache_write >= 0),
  cost_usd    numeric(12, 6) not null default 0 check (cost_usd >= 0 and cost_usd < 100)
);
create index if not exists ai_usage_user_time on public.ai_usage (user_id, created_at desc);
create index if not exists ai_usage_time on public.ai_usage (created_at desc);

alter table public.ai_usage enable row level security;
drop policy if exists "own ai usage add"    on public.ai_usage;
drop policy if exists "admin ai usage read" on public.ai_usage;
create policy "own ai usage add"    on public.ai_usage for insert to authenticated with check (auth.uid() = user_id);
create policy "admin ai usage read" on public.ai_usage for select to authenticated using (public.is_admin());
revoke all on public.ai_usage from anon, authenticated;
grant select, insert on public.ai_usage to authenticated;

-- One row per grower who used AI this month (India time): their saved AI cost, uses by kind,
-- and this month's photo checks and Saathi questions (for an estimate where nothing was saved yet).
create or replace function public.admin_ai_costs() returns json
language plpgsql stable security definer set search_path = public as $$
declare
  m0  timestamptz := (date_trunc('month', now() at time zone 'Asia/Kolkata')) at time zone 'Asia/Kolkata';
  res json;
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  select coalesce(json_agg(r), '[]'::json) into res from (
    select u.id as user_id, u.email, u.phone,
      coalesce(a.cost_usd, 0) as cost_usd, coalesce(a.calls, 0) as calls,
      coalesce(a.chat_usd, 0) as chat_usd, coalesce(a.photo_usd, 0) as photo_usd, coalesce(a.other_usd, 0) as other_usd,
      a.first_at,
      (select count(1) from diagnoses d where d.user_id = u.id and d.created_at >= m0) as photos,
      (select count(1) from chat_messages c where c.user_id = u.id and c.role = 'user' and c.created_at >= m0) as questions
    from auth.users u
    left join (
      select x.user_id, sum(x.cost_usd) as cost_usd, count(1) as calls, min(x.created_at) as first_at,
        sum(case when x.feature = 'chat' then x.cost_usd else 0 end) as chat_usd,
        sum(case when x.feature in ('photo', 'translate') then x.cost_usd else 0 end) as photo_usd,
        sum(case when x.feature not in ('chat', 'photo', 'translate') then x.cost_usd else 0 end) as other_usd
      from ai_usage x where x.created_at >= m0 group by x.user_id
    ) a on a.user_id = u.id
    where a.user_id is not null
       or exists (select 1 from diagnoses d where d.user_id = u.id and d.created_at >= m0)
       or exists (select 1 from chat_messages c where c.user_id = u.id and c.role = 'user' and c.created_at >= m0)
  ) r;
  return res;
end $$;
revoke all on function public.admin_ai_costs() from public, anon;
grant execute on function public.admin_ai_costs() to authenticated;
