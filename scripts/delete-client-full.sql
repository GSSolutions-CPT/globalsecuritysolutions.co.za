-- Purpose: hard-delete a client and all CRM data owned by that client.
-- Run once in Supabase SQL Editor.
--
-- Required owner / role: service_role or a DB owner role.
-- Safety: only rows tied to the target client UUID are removed.

create or replace function public.delete_client_full(p_client_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
with
  -- Collect dependent IDs before deleting anything
  invoice_ids as (
    select id from public.invoices where client_id = p_client_id
  ),
  job_ids as (
    select id from public.jobs where client_id = p_client_id
  ),
  quotation_ids as (
    select id from public.quotations where client_id = p_client_id
  ),
  -- Delete child records first (reverse dependency order)
  _del_invoice_lines as (
    delete from public.invoice_lines
    where invoice_id in (select id from invoice_ids)
  ),
  _del_quotation_lines as (
    delete from public.quotation_lines
    where quotation_id in (select id from quotation_ids)
  ),
  _del_installation_details as (
    delete from public.installation_details
    where invoice_id in (select id from invoice_ids)
  ),
  _del_site_plans as (
    delete from public.site_plans
    where quotation_id in (select id from quotation_ids)
  ),
  _del_job_attachments as (
    delete from public.job_attachments
    where job_id in (select id from job_ids)
  ),
  _del_client_requests as (
    delete from public.client_requests
    where client_id = p_client_id
  ),
  _del_activity_log_client as (
    delete from public.activity_log
    where related_entity_type = 'client'
      and related_entity_id = p_client_id
  ),
  _del_activity_log_invoice as (
    delete from public.activity_log
    where related_entity_type = 'invoice'
      and related_entity_id in (select id from invoice_ids)
  ),
  _del_activity_log_quotation as (
    delete from public.activity_log
    where related_entity_type = 'quotation'
      and related_entity_id in (select id from quotation_ids)
  ),
  _del_activity_log_job as (
    delete from public.activity_log
    where related_entity_type = 'job'
      and related_entity_id in (select id from job_ids)
  ),
  _del_invoices as (
    delete from public.invoices
    where client_id = p_client_id
  ),
  _del_quotations as (
    delete from public.quotations
    where client_id = p_client_id
  ),
  _del_jobs as (
    delete from public.jobs
    where client_id = p_client_id
  ),
  _del_client as (
    delete from public.clients
    where id = p_client_id
  )
select 1;
$$;

revoke all on function public.delete_client_full(uuid) from public;
grant execute on function public.delete_client_full(uuid) to service_role;
