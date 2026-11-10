-- Seb Saathi: disease diagnosis v3 (smarter, future-proof)
-- Run once: Supabase → SQL Editor → New query → paste → Run. Safe to run again.
-- Needs supabase/diagnosis_plus.sql to have been run first.
--
-- Adds to each photo check:
--   * stage        the tree's stage when the photo was taken (st1 dormant … st9 after harvest)
--   * context      a snapshot of what was known: altitude, variety, rootstock, tree age, days since last spray,
--                  weather of the last 7 days (rain, wet days, humidity, temperature). Kept for training.
--   * model_votes  what each AI model said (the big AI now; Seb Saathi's own model later)
--   * recheck_on   the day the grower asked to be reminded to look again
--   * outcome      the grower's follow-up: better / same / worse, with a short note and date
-- The website keeps working before this is run; these fields are simply not saved until then.

alter table public.diagnoses add column if not exists stage        text check (stage is null or stage ~ '^st[1-9]$');
alter table public.diagnoses add column if not exists context      jsonb;
alter table public.diagnoses add column if not exists model_votes  jsonb;
alter table public.diagnoses add column if not exists recheck_on   date;
alter table public.diagnoses add column if not exists outcome      text check (outcome is null or outcome in ('better','same','worse'));
alter table public.diagnoses add column if not exists outcome_note text check (outcome_note is null or char_length(outcome_note) <= 400);
alter table public.diagnoses add column if not exists outcome_at   timestamptz;

-- growers: add these with a new check, and later set their reminder and follow-up
grant insert (stage, context, model_votes, recheck_on) on public.diagnoses to authenticated;
grant update (recheck_on, outcome, outcome_note, outcome_at) on public.diagnoses to authenticated;

-- admin: a check where the grower says the trees got worse also goes to the review list
create or replace function public.admin_dx_queue(which text default 'open', max_rows int default 100)
returns table (id uuid, created_at timestamptz, email text, phone text, crop text, part text, note text, lang text, area text,
  result jsonb, feedback text, ask_expert boolean, needs_review boolean, consent boolean, photo_paths text[],
  expert_id text, expert_name text, expert_note text, reviewed_at timestamptz)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  return query
    select d.id, d.created_at, u.email::text, u.phone::text, d.crop, d.part, d.note, d.lang, d.area,
      d.result, d.feedback, d.ask_expert, d.needs_review, d.consent, d.photo_paths,
      d.expert_id, d.expert_name, d.expert_note, d.reviewed_at
    from public.diagnoses d left join auth.users u on u.id = d.user_id
    where case which
      when 'open' then d.reviewed_at is null and (d.ask_expert or d.needs_review or d.feedback in ('wrong','unsure') or d.outcome = 'worse')
      when 'done' then d.reviewed_at is not null
      else true end
    order by d.ask_expert desc, d.created_at desc
    limit greatest(1, least(max_rows, 500));
end $$;
