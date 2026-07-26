-- Explicitly prevent browser roles from invoking the internal audit trigger function.
revoke execute on function public.record_recruitment_activity() from anon, authenticated;
