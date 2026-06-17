-- Portal access is resolved via direct table reads under RLS.
-- Authenticated users can read their own staff profile and client record.
-- Settings read policy for client portal branding/bank details:

drop policy if exists "authenticated_read_settings" on public.settings;
create policy "authenticated_read_settings"
  on public.settings for select
  to authenticated
  using (true);