-- Seb Saathi: show your social media pages on the website
-- Run once in Supabase → SQL Editor → New query → paste → Run (after marketing.sql).
-- The admin page's Marketing tab saves each page link; this lets the website read only those links
-- (nothing else from admin_marketing), so "coming soon" is replaced by your real pages.

create or replace function public.public_social_links() returns json
language sql stable security definer set search_path = public as $$
  select coalesce(json_object_agg(substr(key, 6), value), '{}'::json)
    from public.admin_marketing
   where key in ('link:facebook', 'link:instagram', 'link:youtube', 'link:whatsapp')
     and value ~ '^https://';
$$;
revoke all on function public.public_social_links() from public;
grant execute on function public.public_social_links() to anon, authenticated;
