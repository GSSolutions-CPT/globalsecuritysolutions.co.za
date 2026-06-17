-- Fix Supabase RLS performance linter warnings
-- 1. Remove legacy overlapping permissive policies
-- 2. Use (select auth.uid()) initplan pattern in policies
-- 3. Split broad FOR ALL policies to avoid duplicate permissive SELECT rules

-- Drop legacy catch-all policies that overlap with staff/client policies
do $$
declare
  rec record;
begin
  for rec in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and policyname in (
        'Allow authenticated full access',
        'Allow authenticated users to read team',
        'Allow public read access',
        'Allow authenticated insert access',
        'Allow authenticated update access'
      )
  loop
    execute format(
      'drop policy if exists %I on %I.%I',
      rec.policyname,
      rec.schemaname,
      rec.tablename
    );
  end loop;
end $$;

-- Users: one SELECT policy + admin write policies (no duplicate permissive SELECT)
drop policy if exists "staff_read_own_profile" on public.users;
create policy "staff_read_own_profile"
  on public.users for select
  using (
    (select auth.uid()) = id
    or private.is_staff_role(array['admin'])
  );

drop policy if exists "staff_manage_users_admin" on public.users;
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

-- Clients: initplan-safe auth calls
drop policy if exists "client_read_own_record" on public.clients;
create policy "client_read_own_record"
  on public.clients for select
  using (auth_user_id = (select auth.uid()));

drop policy if exists "client_update_own_record" on public.clients;
create policy "client_update_own_record"
  on public.clients for update
  using (auth_user_id = (select auth.uid()))
  with check (auth_user_id = (select auth.uid()));

-- Settings: one authenticated read policy + admin/manager write policies
drop policy if exists "staff_read_settings" on public.settings;
drop policy if exists "staff_manage_settings" on public.settings;
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