-- Fix Supabase multiple_permissive_policies linter warnings
-- Merge staff FOR ALL policies with client per-action policies so each role/action
-- has at most one permissive policy (staff access via OR, not a second policy).

-- clients --------------------------------------------------------------------

drop policy if exists "staff_all_clients" on public.clients;

drop policy if exists "client_read_own_record" on public.clients;
create policy "client_read_own_record"
  on public.clients for select
  using (auth_user_id = (select auth.uid()) or private.is_staff_user());

drop policy if exists "client_update_own_record" on public.clients;
create policy "client_update_own_record"
  on public.clients for update
  using (auth_user_id = (select auth.uid()) or private.is_staff_user())
  with check (auth_user_id = (select auth.uid()) or private.is_staff_user());

drop policy if exists "staff_insert_clients" on public.clients;
create policy "staff_insert_clients"
  on public.clients for insert
  with check (private.is_staff_user());

drop policy if exists "staff_delete_clients" on public.clients;
create policy "staff_delete_clients"
  on public.clients for delete
  using (private.is_staff_user());

-- client_requests ------------------------------------------------------------

drop policy if exists "staff_all_client_requests" on public.client_requests;

drop policy if exists "client_insert_own_requests" on public.client_requests;
create policy "client_insert_own_requests"
  on public.client_requests for insert
  with check (client_id = private.current_client_id() or private.is_staff_user());

drop policy if exists "client_read_own_requests" on public.client_requests;
create policy "client_read_own_requests"
  on public.client_requests for select
  using (client_id = private.current_client_id() or private.is_staff_user());

drop policy if exists "staff_update_client_requests" on public.client_requests;
create policy "staff_update_client_requests"
  on public.client_requests for update
  using (private.is_staff_user())
  with check (private.is_staff_user());

drop policy if exists "staff_delete_client_requests" on public.client_requests;
create policy "staff_delete_client_requests"
  on public.client_requests for delete
  using (private.is_staff_user());

-- quotations -----------------------------------------------------------------

drop policy if exists "staff_all_quotations" on public.quotations;

drop policy if exists "client_own_quotations" on public.quotations;
create policy "client_own_quotations"
  on public.quotations for select
  using (
    private.is_staff_user()
    or (client_id = private.current_client_id() and status <> 'Draft')
  );

drop policy if exists "client_update_own_quotations" on public.quotations;
create policy "client_update_own_quotations"
  on public.quotations for update
  using (client_id = private.current_client_id() or private.is_staff_user())
  with check (client_id = private.current_client_id() or private.is_staff_user());

drop policy if exists "staff_insert_quotations" on public.quotations;
create policy "staff_insert_quotations"
  on public.quotations for insert
  with check (private.is_staff_user());

drop policy if exists "staff_delete_quotations" on public.quotations;
create policy "staff_delete_quotations"
  on public.quotations for delete
  using (private.is_staff_user());

-- invoices -------------------------------------------------------------------

drop policy if exists "staff_all_invoices" on public.invoices;

drop policy if exists "client_own_invoices" on public.invoices;
create policy "client_own_invoices"
  on public.invoices for select
  using (
    private.is_staff_user()
    or (client_id = private.current_client_id() and status <> 'Draft')
  );

drop policy if exists "staff_insert_invoices" on public.invoices;
create policy "staff_insert_invoices"
  on public.invoices for insert
  with check (private.is_staff_user());

drop policy if exists "staff_update_invoices" on public.invoices;
create policy "staff_update_invoices"
  on public.invoices for update
  using (private.is_staff_user())
  with check (private.is_staff_user());

drop policy if exists "staff_delete_invoices" on public.invoices;
create policy "staff_delete_invoices"
  on public.invoices for delete
  using (private.is_staff_user());

-- jobs -----------------------------------------------------------------------

drop policy if exists "staff_all_jobs" on public.jobs;

drop policy if exists "client_own_jobs" on public.jobs;
create policy "client_own_jobs"
  on public.jobs for select
  using (private.is_staff_user() or client_id = private.current_client_id());

drop policy if exists "staff_insert_jobs" on public.jobs;
create policy "staff_insert_jobs"
  on public.jobs for insert
  with check (private.is_staff_user());

drop policy if exists "staff_update_jobs" on public.jobs;
create policy "staff_update_jobs"
  on public.jobs for update
  using (private.is_staff_user())
  with check (private.is_staff_user());

drop policy if exists "staff_delete_jobs" on public.jobs;
create policy "staff_delete_jobs"
  on public.jobs for delete
  using (private.is_staff_user());

-- job_attachments ------------------------------------------------------------

drop policy if exists "staff_all_job_attachments" on public.job_attachments;

drop policy if exists "client_read_own_job_attachments" on public.job_attachments;
create policy "client_read_own_job_attachments"
  on public.job_attachments for select
  using (
    private.is_staff_user()
    or exists (
      select 1
      from public.jobs j
      where j.id = job_attachments.job_id
        and j.client_id = private.current_client_id()
    )
  );

drop policy if exists "staff_insert_job_attachments" on public.job_attachments;
create policy "staff_insert_job_attachments"
  on public.job_attachments for insert
  with check (private.is_staff_user());

drop policy if exists "staff_update_job_attachments" on public.job_attachments;
create policy "staff_update_job_attachments"
  on public.job_attachments for update
  using (private.is_staff_user())
  with check (private.is_staff_user());

drop policy if exists "staff_delete_job_attachments" on public.job_attachments;
create policy "staff_delete_job_attachments"
  on public.job_attachments for delete
  using (private.is_staff_user());

-- installation_details -------------------------------------------------------

drop policy if exists "staff_all_installation_details" on public.installation_details;

drop policy if exists "client_read_own_installation_details" on public.installation_details;
create policy "client_read_own_installation_details"
  on public.installation_details for select
  using (
    private.is_staff_user()
    or exists (
      select 1
      from public.invoices i
      where i.id = installation_details.invoice_id
        and i.client_id = private.current_client_id()
    )
  );

drop policy if exists "staff_insert_installation_details" on public.installation_details;
create policy "staff_insert_installation_details"
  on public.installation_details for insert
  with check (private.is_staff_user());

drop policy if exists "staff_update_installation_details" on public.installation_details;
create policy "staff_update_installation_details"
  on public.installation_details for update
  using (private.is_staff_user())
  with check (private.is_staff_user());

drop policy if exists "staff_delete_installation_details" on public.installation_details;
create policy "staff_delete_installation_details"
  on public.installation_details for delete
  using (private.is_staff_user());

-- installation_photos --------------------------------------------------------

drop policy if exists "staff_all_installation_photos" on public.installation_photos;

drop policy if exists "client_read_own_installation_photos" on public.installation_photos;
create policy "client_read_own_installation_photos"
  on public.installation_photos for select
  using (
    private.is_staff_user()
    or exists (
      select 1
      from public.installation_details d
      join public.invoices i on i.id = d.invoice_id
      where d.id = installation_photos.installation_detail_id
        and i.client_id = private.current_client_id()
    )
  );

drop policy if exists "staff_insert_installation_photos" on public.installation_photos;
create policy "staff_insert_installation_photos"
  on public.installation_photos for insert
  with check (private.is_staff_user());

drop policy if exists "staff_update_installation_photos" on public.installation_photos;
create policy "staff_update_installation_photos"
  on public.installation_photos for update
  using (private.is_staff_user())
  with check (private.is_staff_user());

drop policy if exists "staff_delete_installation_photos" on public.installation_photos;
create policy "staff_delete_installation_photos"
  on public.installation_photos for delete
  using (private.is_staff_user());