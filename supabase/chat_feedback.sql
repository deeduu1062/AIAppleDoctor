-- Seb Saathi: thumbs up / thumbs down on Saathi's answers, and an admin review list
-- Run once in Supabase → SQL Editor → New query → paste → Run. (Run supabase/chat.sql first.)
-- Growers can rate only their own Saathi answers. Admins can read all ratings and mark them reviewed.

alter table public.chat_messages add column if not exists feedback      smallint check (feedback is null or feedback in (-1, 1));
alter table public.chat_messages add column if not exists feedback_note text     check (feedback_note is null or char_length(feedback_note) <= 500);
alter table public.chat_messages add column if not exists feedback_at   timestamptz;
alter table public.chat_messages add column if not exists reviewed      boolean not null default false;

create index if not exists chat_messages_feedback on public.chat_messages (feedback, reviewed, created_at desc) where feedback is not null;

drop policy if exists "own chat rate"     on public.chat_messages;
drop policy if exists "admin chat review" on public.chat_messages;
create policy "own chat rate" on public.chat_messages for update to authenticated
  using (auth.uid() = user_id and role = 'assistant') with check (auth.uid() = user_id and role = 'assistant');
create policy "admin chat review" on public.chat_messages for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- only these columns can ever be changed; the question and answer text stay as they were
grant update (feedback, feedback_note, feedback_at, reviewed) on public.chat_messages to authenticated;

-- growers can rate, but only an admin can mark an answer reviewed
create or replace function public.chat_review_guard() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.reviewed is distinct from old.reviewed and not public.is_admin() then new.reviewed := old.reviewed; end if;
  if new.feedback is distinct from old.feedback then new.feedback_at := now(); new.reviewed := false; end if;
  return new;
end $$;
drop trigger if exists chat_review_guard on public.chat_messages;
create trigger chat_review_guard before update on public.chat_messages for each row execute function public.chat_review_guard();
