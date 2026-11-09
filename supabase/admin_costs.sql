-- Seb Saathi: running costs list for the admin page (Costs tab)
-- Run once: Supabase → SQL Editor → New query → paste → Run.
-- Only the admin can see or change these rows. Also lets the admin count
-- photo checks across all growers, for the AI cost estimate.

create table if not exists public.admin_costs (
  id         uuid primary key default gen_random_uuid(),
  sort       integer not null default 0,
  service    text not null check (char_length(service) between 1 and 80),
  what_for   text check (what_for is null or char_length(what_for) <= 120),
  plan       text check (plan is null or char_length(plan) <= 80),
  amount_inr integer check (amount_inr is null or (amount_inr >= 0 and amount_inr <= 10000000)),
  per        text not null default 'month' check (per in ('month', 'year', 'once')),
  renews_on  date,
  note       text check (note is null or char_length(note) <= 500),
  updated_at timestamptz not null default now()
);

alter table public.admin_costs enable row level security;
drop policy if exists "admin reads costs"   on public.admin_costs;
drop policy if exists "admin adds costs"    on public.admin_costs;
drop policy if exists "admin edits costs"   on public.admin_costs;
drop policy if exists "admin deletes costs" on public.admin_costs;
create policy "admin reads costs"   on public.admin_costs for select to authenticated using (public.is_admin());
create policy "admin adds costs"    on public.admin_costs for insert to authenticated with check (public.is_admin());
create policy "admin edits costs"   on public.admin_costs for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin deletes costs" on public.admin_costs for delete to authenticated using (public.is_admin());
revoke all on public.admin_costs from anon, authenticated;
grant select, insert, update, delete on public.admin_costs to authenticated;

-- starting list (only added when the table is empty); change the amounts on the admin page
insert into public.admin_costs (sort, service, what_for, plan, amount_inr, per, note)
select * from (values
  (1, 'Vercel',          'Website hosting and photo/Saathi functions', 'Hobby (free)',            0, 'month', 'Hobby is for non-commercial use only. Move to Pro ($20 ≈ ₹1,700 a month) before charging growers.'),
  (2, 'Supabase',        'Sign-in, records, payments',                 'Free',                    0, 'month', 'Free: 500 MB database, pauses after 7 days with no use. Pro $25 ≈ ₹2,100 a month for a live paid service.'),
  (3, 'Anthropic (AI)',  'Photo check (Sonnet) and Saathi chat (Haiku)', 'Pay as you go',         0, 'month', 'Usage is estimated below from this month''s checks and questions. Exact spend: console.anthropic.com.'),
  (4, 'Open-Meteo',      'Weather on orchards and in Saathi',          'Free (non-commercial)',   0, 'month', 'Commercial use needs a paid plan. Ask info@open-meteo.com for the price.'),
  (5, 'Resend',          'Sign-in emails',                             'Free',                    0, 'month', 'Free: 3,000 emails a month, 100 a day. Pro $20 a month after that.'),
  (6, 'GoDaddy',         'Domain sebsaathi.com',                       'Yearly',               null, 'year',  'Fill in the renewal price and date from your GoDaddy account.'),
  (7, 'Twilio',          'WhatsApp OTP and spray reminders',           'Not started',             0, 'month', 'Charged per message once switched on.')
) as v(sort, service, what_for, plan, amount_inr, per, note)
where not exists (select 1 from public.admin_costs);

-- admin can count photo checks of all growers (for the AI cost estimate)
drop policy if exists "admin reads diagnoses" on public.diagnoses;
create policy "admin reads diagnoses" on public.diagnoses for select to authenticated using (public.is_admin());
