-- Apple Doctor: knowledge library (articles + photos)
-- Run once in Supabase → SQL Editor → New query → paste → Run.
-- Everyone can read PUBLISHED articles. Only the admin account can add, edit, publish or delete,
-- and only the admin can upload photos (into the public "library" storage bucket).
-- Then run supabase/library_seed.sql once to add the starter articles as drafts.

create table if not exists public.articles (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  category   text not null default 'other'
             check (category in ('disease','pest','spray','nutrition','pruning','orchard','harvest','market','schemes','other')),
  title_en   text not null default '' check (char_length(title_en) <= 200),
  title_hi   text not null default '' check (char_length(title_hi) <= 200),
  body_en    text not null default '' check (char_length(body_en) <= 30000),
  body_hi    text not null default '' check (char_length(body_hi) <= 30000),
  video_url  text check (video_url is null or char_length(video_url) <= 500),
  images     jsonb not null default '[]'::jsonb,
  status     text not null default 'draft' check (status in ('draft','published')),
  sort       int not null default 100
);

create index if not exists articles_list on public.articles (status, sort, updated_at desc);

alter table public.articles enable row level security;

drop policy if exists "read published articles" on public.articles;
drop policy if exists "admin reads articles"    on public.articles;
drop policy if exists "admin adds articles"     on public.articles;
drop policy if exists "admin edits articles"    on public.articles;
drop policy if exists "admin deletes articles"  on public.articles;

create policy "read published articles" on public.articles for select to anon, authenticated using (status = 'published');
create policy "admin reads articles"    on public.articles for select to authenticated using (lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com');
create policy "admin adds articles"     on public.articles for insert to authenticated with check (lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com');
create policy "admin edits articles"    on public.articles for update to authenticated
  using (lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com') with check (lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com');
create policy "admin deletes articles"  on public.articles for delete to authenticated using (lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com');

revoke all on public.articles from anon, authenticated;
grant select on public.articles to anon, authenticated;
grant insert, update, delete on public.articles to authenticated;

-- photos: public bucket, admin-only uploads and deletes
insert into storage.buckets (id, name, public) values ('library', 'library', true)
  on conflict (id) do update set public = true;

drop policy if exists "admin uploads library photos" on storage.objects;
drop policy if exists "admin deletes library photos" on storage.objects;
create policy "admin uploads library photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'library' and lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com');
create policy "admin deletes library photos" on storage.objects for delete to authenticated
  using (bucket_id = 'library' and lower(auth.jwt() ->> 'email') = 'deeduu@gmail.com');
