-- Seb Saathi: link each photo check to an orchard
-- Run once: Supabase → SQL Editor → New query → paste → Run.
-- Lets the photo check remember problems found in each orchard, and the orchard page show them.

alter table public.diagnoses add column if not exists orchard_id text check (orchard_id is null or char_length(orchard_id) <= 40);
create index if not exists diagnoses_orchard on public.diagnoses (user_id, orchard_id, created_at desc);
