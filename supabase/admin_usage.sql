-- Seb Saathi: database usage for the admin page (Costs tab → Supabase usage)
-- Run once: Supabase → SQL Editor → New query → paste → Run.
-- Shows database size, number of growers (sign-ins) and file storage, against the Free plan limits.

create or replace function public.admin_usage() returns jsonb
language plpgsql security definer set search_path = public, pg_catalog as $$
declare out jsonb;
begin
  if not public.is_admin() then raise exception 'admin only'; end if;
  select jsonb_build_object(
    'db_bytes',      pg_database_size(current_database()),
    'users',         (select count(*) from auth.users),
    'users_30d',     (select count(*) from auth.users where last_sign_in_at > now() - interval '30 days'),
    'storage_bytes', coalesce((select sum(coalesce((metadata->>'size')::bigint, 0)) from storage.objects), 0)
  ) into out;
  return out;
end $$;
revoke all on function public.admin_usage() from public, anon;
grant execute on function public.admin_usage() to authenticated;
