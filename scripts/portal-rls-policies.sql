-- Portal RLS policies for Global Security Solutions CRM
-- Schema-aligned for project relzsctzfotbyaafnkqr

-- Helper functions (private schema — not exposed via PostgREST) ---------------

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to postgres, service_role;

create or replace function private.is_staff_user()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where id = (select auth.uid())
  );
$$;

create or replace function private.staff_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.users
  where id = auth.uid()
  limit 1;
$$;

create or replace function private.is_staff_role(allowed_roles text[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(private.staff_role(), '') = any (allowed_roles);
$$;

create or replace function private.current_client_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from public.clients
  where auth_user_id = (select auth.uid())
  limit 1;
$$;

revoke all on function private.is_staff_user() from public;
revoke all on function private.staff_role() from public;
revoke all on function private.is_staff_role(text[]) from public;
revoke all on function private.current_client_id() from public;
grant execute on function private.is_staff_user() to authenticated, service_role;
grant execute on function private.staff_role() to authenticated, service_role;
grant execute on function private.is_staff_role(text[]) to authenticated, service_role;
grant execute on function private.current_client_id() to authenticated, service_role;

-- Enable RLS on existing tables --------------------------------------------

alter table if exists public.users enable row level security;
alter table if exists public.clients enable row level security;
alter table if exists public.quotations enable row level security;
alter table if exists public.quotation_lines enable row level security;
alter table if exists public.invoices enable row level security;
alter table if exists public.invoice_lines enable row level security;
alter table if exists public.jobs enable row level security;
alter table if exists public.expenses enable row level security;
alter table if exists public.products enable row level security;
alter table if exists public.suppliers enable row level security;
alter table if exists public.purchase_orders enable row level security;
alter table if exists public.purchase_order_lines enable row level security;
alter table if exists public.recurring_contracts enable row level security;
alter table if exists public.activity_log enable row level security;
alter table if exists public.settings enable row level security;
alter table if exists public.calendar_events enable row level security;
alter table if exists public.site_plans enable row level security;
alter table if exists public.leads enable row level security;
alter table if exists public.projects enable row level security;
alter table if exists public.conversations enable row level security;
alter table if exists public.client_requests enable row level security;
alter table if exists public.job_attachments enable row level security;
alter table if exists public.installation_details enable row level security;
alter table if exists public.installation_photos enable row level security;

-- Staff users table ----------------------------------------------------------

drop policy if exists "staff_read_own_profile" on public.users;
create policy "staff_read_own_profile"
  on public.users for select
  using ((select auth.uid()) = id or private.is_staff_role(array['admin']));

drop policy if exists "staff_manage_users_admin" on public.users;
drop policy if exists "staff_manage_users_admin_insert" on public.users;
drop policy if exists "staff_manage_users_admin_update" on public.users;
drop policy if exists "staff_manage_users_admin_delete" on public.users;
create policy "staff_manage_users_admin_insert"
  on public.users for insert
  with check (private.is_staff_role(array['admin']));
create policy "staff_manage_users_admin_update"
  on public.users for update
  using (private.is_staff_role(array['admin']))
  with check (private.is_staff_role(array['admin']));
create policy "staff_manage_users_admin_delete"
  on public.users for delete
  using (private.is_staff_role(array['admin']));

-- Clients --------------------------------------------------------------------

drop policy if exists "staff_all_clients" on public.clients;
create policy "staff_all_clients"
  on public.clients for all
  using (private.is_staff_user())
  with check (private.is_staff_user());

drop policy if exists "client_read_own_record" on public.clients;
create policy "client_read_own_record"
  on public.clients for select
  using (auth_user_id = (select auth.uid()));

drop policy if exists "client_update_own_record" on public.clients;
create policy "client_update_own_record"
  on public.clients for update
  using (auth_user_id = (select auth.uid()))
  with check (auth_user_id = (select auth.uid()));

-- Quotations ---------------------------------------------------------------

drop policy if exists "staff_all_quotations" on public.quotations;
create policy "staff_all_quotations"
  on public.quotations for all
  using (private.is_staff_user())
  with check (private.is_staff_user());

drop policy if exists "client_own_quotations" on public.quotations;
create policy "client_own_quotations"
  on public.quotations for select
  using (client_id = private.current_client_id() and status <> 'Draft');

drop policy if exists "client_update_own_quotations" on public.quotations;
create policy "client_update_own_quotations"
  on public.quotations for update
  using (client_id = private.current_client_id())
  with check (client_id = private.current_client_id());

-- Invoices -------------------------------------------------------------------

drop policy if exists "staff_all_invoices" on public.invoices;
create policy "staff_all_invoices"
  on public.invoices for all
  using (private.is_staff_user())
  with check (private.is_staff_user());

drop policy if exists "client_own_invoices" on public.invoices;
create policy "client_own_invoices"
  on public.invoices for select
  using (client_id = private.current_client_id() and status <> 'Draft');

-- Jobs -----------------------------------------------------------------------

drop policy if exists "staff_all_jobs" on public.jobs;
create policy "staff_all_jobs"
  on public.jobs for all
  using (private.is_staff_user())
  with check (private.is_staff_user());

drop policy if exists "client_own_jobs" on public.jobs;
create policy "client_own_jobs"
  on public.jobs for select
  using (client_id = private.current_client_id());

-- Activity log ---------------------------------------------------------------

drop policy if exists "staff_read_activity_log" on public.activity_log;
create policy "staff_read_activity_log"
  on public.activity_log for select
  using (private.is_staff_user());

drop policy if exists "staff_insert_activity_log" on public.activity_log;
create policy "staff_insert_activity_log"
  on public.activity_log for insert
  with check (private.is_staff_user() or private.current_client_id() is not null);

-- Staff-only operational tables ------------------------------------------------

do $$
declare
  tbl text;
begin
  foreach tbl in array array[
    'products',
    'suppliers',
    'purchase_orders',
    'purchase_order_lines',
    'expenses',
    'recurring_contracts',
    'calendar_events',
    'quotation_lines',
    'invoice_lines',
    'site_plans',
    'leads',
    'projects',
    'conversations'
  ]
  loop
    execute format('drop policy if exists "staff_manage_%I" on public.%I', tbl, tbl);
    execute format(
      'create policy "staff_manage_%I" on public.%I for all using (private.is_staff_user()) with check (private.is_staff_user())',
      tbl, tbl
    );
  end loop;
end $$;

-- Settings -------------------------------------------------------------------

drop policy if exists "staff_manage_settings" on public.settings;
drop policy if exists "staff_manage_settings_insert" on public.settings;
drop policy if exists "staff_manage_settings_update" on public.settings;
drop policy if exists "staff_manage_settings_delete" on public.settings;
drop policy if exists "staff_read_settings" on public.settings;
drop policy if exists "authenticated_read_settings" on public.settings;

create policy "authenticated_read_settings"
  on public.settings for select
  to authenticated
  using (true);

create policy "staff_manage_settings_insert"
  on public.settings for insert
  with check (private.is_staff_role(array['admin', 'manager']));

create policy "staff_manage_settings_update"
  on public.settings for update
  using (private.is_staff_role(array['admin', 'manager']))
  with check (private.is_staff_role(array['admin', 'manager']));

create policy "staff_manage_settings_delete"
  on public.settings for delete
  using (private.is_staff_role(array['admin', 'manager']));