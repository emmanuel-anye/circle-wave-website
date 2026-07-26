-- Extend employer intake with structured conversion and qualification fields.
-- Existing records remain valid because all new columns are nullable.

alter table public.employer_requests
  add column if not exists preferred_contact_method text,
  add column if not exists hiring_timeline text,
  add column if not exists primary_goal text,
  add column if not exists source_page text;

comment on column public.employer_requests.preferred_contact_method is
  'Contact channel selected by the employer.';
comment on column public.employer_requests.hiring_timeline is
  'Employer-selected range for when hiring support is needed.';
comment on column public.employer_requests.primary_goal is
  'Optional short description of the main hiring outcome.';
comment on column public.employer_requests.source_page is
  'First-party page identifier for submission attribution; never contains a URL or user identifier.';
