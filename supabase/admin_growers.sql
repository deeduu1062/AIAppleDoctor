-- Seb Saathi: Growth tab on the admin page — sign-up funnel, quiet growers and invite tracking.
-- Run once AFTER admins.sql: Supabase → SQL Editor → New query → paste → Run. Safe to run again.
-- (Written without any star characters, so copying from a phone cannot damage it.)

-- One row per grower account: when they joined, how far they got (orchard added, sale entered, paid),
-- when they were last active anywhere on the site, and who invited them.
create or replace function public.admin_growth() returns json
language plpgsql stable security definer set search_path = public, auth as $$
declare has_led boolean := to_regclass('public.ledgers') is not null;
        has_dx  boolean := to_regclass('public.diagnoses') is not null;
        has_ch  boolean := to_regclass('public.chat_messages') is not null;
        out json;
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  execute format($q$
    select coalesce(json_agg(x order by x.created_at desc), '[]'::json) from (
      select u.id, u.email, u.phone, u.created_at, u.last_sign_in_at,
             (u.email_confirmed_at is not null or u.phone_confirmed_at is not null) as confirmed,
             u.raw_user_meta_data ->> 'ref' as ref,
             left(replace(u.id::text, '-', ''), 8) as code,
             %s as orchards,
             %s as has_sale,
             %s as led_at,
             %s as dx_at,
             %s as ch_at,
             (select max(p.valid_until) from public.payments p where p.user_id = u.id and p.status = 'approved' and p.source <> 'referral') as paid_until,
             exists (select 1 from public.payments p where p.user_id = u.id and p.status = 'approved' and p.source <> 'referral') as ever_paid,
             (select count(*) from public.payments p where p.user_id = u.id and p.source = 'referral') as rewards
        from auth.users u
    ) x $q$,
    case when has_led then $s$(select coalesce((select count(*) from jsonb_array_elements(coalesce(l.data -> 'orchards', '[]'::jsonb)) o
                              where coalesce(o ->> 'ex', 'false') <> 'true'), 0) from public.ledgers l where l.user_id::text = u.id::text limit 1)$s$ else 'null::bigint' end,
    case when has_led then $s$exists (select 1 from public.ledgers l, jsonb_array_elements(coalesce(l.data -> 'seasons', '[]'::jsonb)) s
                              where l.user_id::text = u.id::text and jsonb_typeof(s -> 'lots') = 'array' and jsonb_array_length(s -> 'lots') > 0)$s$ else 'false' end,
    case when has_led then '(select max(l.updated_at) from public.ledgers l where l.user_id::text = u.id::text)' else 'null::timestamptz' end,
    case when has_dx  then '(select max(d.created_at) from public.diagnoses d where d.user_id = u.id)' else 'null::timestamptz' end,
    case when has_ch  then $s$(select max(c.created_at) from public.chat_messages c where c.user_id = u.id and c.role = 'user')$s$ else 'null::timestamptz' end
  ) into out;
  return out;
end $$;
revoke all on function public.admin_growth() from public, anon;
grant execute on function public.admin_growth() to authenticated;
