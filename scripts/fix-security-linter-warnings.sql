-- Fix Supabase database linter security warnings
-- Project: relzsctzfotbyaafnkqr

-- 1. Remove legacy permissive RLS policies (staff_manage_* policies remain)
drop policy if exists "purchase_order_lines_policy" on public.purchase_order_lines;
drop policy if exists "purchase_orders_policy" on public.purchase_orders;
drop policy if exists "site_plans_policy" on public.site_plans;
drop policy if exists "suppliers_policy" on public.suppliers;

-- 2. Move RLS helper functions out of the public API schema
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
    where id = auth.uid()
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
  where auth_user_id = auth.uid()
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

-- 3. Repoint table policies to private helpers, then drop public copies
create or replace function private._repoint_policy_expr(expr text)
returns text
language plpgsql
immutable
as $$
begin
  if expr is null then
    return null;
  end if;

  expr := replace(expr, 'public.is_staff_user()', 'private.is_staff_user()');
  expr := replace(expr, 'public.staff_role()', 'private.staff_role()');
  expr := replace(expr, 'public.is_staff_role(', 'private.is_staff_role(');
  expr := replace(expr, 'public.current_client_id()', 'private.current_client_id()');
  expr := replace(expr, 'is_staff_user()', 'private.is_staff_user()');
  expr := replace(expr, 'staff_role()', 'private.staff_role()');
  expr := replace(expr, 'is_staff_role(', 'private.is_staff_role(');
  expr := replace(expr, 'current_client_id()', 'private.current_client_id()');
  expr := replace(expr, 'private.private.', 'private.');

  return expr;
end;
$$;

do $$
declare
  pol record;
  new_qual text;
  new_check text;
  role_clause text;
begin
  for pol in
    select schemaname, tablename, policyname, cmd, qual, with_check, roles
    from pg_policies
    where schemaname in ('public', 'storage')
      and (
        coalesce(qual, '') ~* 'is_staff_user|staff_role|is_staff_role|current_client_id'
        or coalesce(with_check, '') ~* 'is_staff_user|staff_role|is_staff_role|current_client_id'
      )
  loop
    new_qual := private._repoint_policy_expr(pol.qual);
    new_check := private._repoint_policy_expr(pol.with_check);
    role_clause := case
      when pol.roles is null or array_length(pol.roles, 1) is null then ''
      else ' to ' || array_to_string(pol.roles, ', ')
    end;

    execute format('drop policy if exists %I on %I.%I', pol.policyname, pol.schemaname, pol.tablename);

    if pol.cmd = 'ALL' then
      execute format(
        'create policy %I on %I.%I for all%s using (%s) with check (%s)',
        pol.policyname,
        pol.schemaname,
        pol.tablename,
        role_clause,
        new_qual,
        coalesce(new_check, new_qual)
      );
    elsif pol.cmd = 'SELECT' then
      execute format(
        'create policy %I on %I.%I for select%s using (%s)',
        pol.policyname,
        pol.schemaname,
        pol.tablename,
        role_clause,
        new_qual
      );
    elsif pol.cmd = 'INSERT' then
      execute format(
        'create policy %I on %I.%I for insert%s with check (%s)',
        pol.policyname,
        pol.schemaname,
        pol.tablename,
        role_clause,
        coalesce(new_check, 'true')
      );
    elsif pol.cmd = 'UPDATE' then
      execute format(
        'create policy %I on %I.%I for update%s using (%s) with check (%s)',
        pol.policyname,
        pol.schemaname,
        pol.tablename,
        role_clause,
        new_qual,
        coalesce(new_check, new_qual)
      );
    elsif pol.cmd = 'DELETE' then
      execute format(
        'create policy %I on %I.%I for delete%s using (%s)',
        pol.policyname,
        pol.schemaname,
        pol.tablename,
        role_clause,
        new_qual
      );
    end if;
  end loop;
end $$;

drop function if exists public.is_staff_user();
drop function if exists public.staff_role();
drop function if exists public.is_staff_role(text[]);
drop function if exists public.current_client_id();
drop function if exists private._repoint_policy_expr(text);

-- 4. Harden intentional RPC functions and restrict grants
create or replace function public.get_portal_access()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'staff_role', (select role from public.users where id = auth.uid() limit 1),
    'client_id', (select id::text from public.clients where auth_user_id = auth.uid() limit 1)
  );
$$;

revoke all on function public.get_portal_access() from public;
revoke all on function public.get_portal_access() from anon;
grant execute on function public.get_portal_access() to authenticated;

create or replace function public.get_client_for_setup(p_client_id uuid)
returns table(id uuid, name text, email text, auth_user_id uuid)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  select c.id, c.name, c.email, c.auth_user_id
  from public.clients c
  where c.id = p_client_id
    and c.auth_user_id is null;
end;
$$;

revoke all on function public.get_client_for_setup(uuid) from public;
revoke all on function public.get_client_for_setup(uuid) from anon;
revoke all on function public.get_client_for_setup(uuid) from authenticated;

create or replace function public.claim_client_profile(p_client_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  select lower(c.email)
  into v_email
  from public.clients c
  where c.id = p_client_id
    and c.auth_user_id is null;

  if v_email is null then
    raise exception 'Profile link failed: Client not found or already claimed.';
  end if;

  if lower(coalesce(auth.jwt() ->> 'email', '')) <> v_email then
    raise exception 'Profile link failed: Email does not match invitation.';
  end if;

  update public.clients
  set auth_user_id = auth.uid()
  where id = p_client_id
    and auth_user_id is null;

  if not found then
    raise exception 'Profile link failed: Client not found or already claimed.';
  end if;
end;
$$;

revoke all on function public.claim_client_profile(uuid) from public;
revoke all on function public.claim_client_profile(uuid) from anon;
grant execute on function public.claim_client_profile(uuid) to authenticated;

create or replace function public.upsert_sale_with_lines(
  p_table text,
  p_sale_id uuid,
  p_header jsonb,
  p_lines jsonb
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sale_id uuid := p_sale_id;
  v_lines_table text;
  v_fk_col text;
  v_line jsonb;
begin
  if not private.is_staff_user() then
    raise exception 'Forbidden';
  end if;

  if p_table not in ('quotations', 'invoices') then
    raise exception 'Invalid table: %', p_table;
  end if;

  v_lines_table := p_table || '_lines';
  v_fk_col := case when p_table = 'quotations' then 'quotation_id' else 'invoice_id' end;

  if v_sale_id is null then
    if p_table = 'quotations' then
      insert into public.quotations (
        client_id, total_amount, vat_applicable, trade_subtotal, profit_estimate,
        valid_until, payment_type, deposit_percentage, status, date_created
      )
      values (
        (p_header->>'client_id')::uuid,
        coalesce((p_header->>'total_amount')::numeric, 0),
        coalesce((p_header->>'vat_applicable')::boolean, true),
        coalesce((p_header->>'trade_subtotal')::numeric, 0),
        coalesce((p_header->>'profit_estimate')::numeric, 0),
        nullif(p_header->>'valid_until', '')::date,
        coalesce(p_header->>'payment_type', 'deposit'),
        coalesce((p_header->>'deposit_percentage')::numeric, 0),
        coalesce(p_header->>'status', 'Draft'),
        coalesce((p_header->>'date_created')::timestamptz, now())
      )
      returning id into v_sale_id;
    else
      insert into public.invoices (
        client_id, total_amount, vat_applicable, trade_subtotal, profit_estimate,
        due_date, deposit_amount, status, date_created
      )
      values (
        (p_header->>'client_id')::uuid,
        coalesce((p_header->>'total_amount')::numeric, 0),
        coalesce((p_header->>'vat_applicable')::boolean, true),
        coalesce((p_header->>'trade_subtotal')::numeric, 0),
        coalesce((p_header->>'profit_estimate')::numeric, 0),
        nullif(p_header->>'due_date', '')::date,
        coalesce((p_header->>'deposit_amount')::numeric, 0),
        coalesce(p_header->>'status', 'Draft'),
        coalesce((p_header->>'date_created')::timestamptz, now())
      )
      returning id into v_sale_id;
    end if;
  else
    if p_table = 'quotations' then
      update public.quotations set
        client_id = (p_header->>'client_id')::uuid,
        total_amount = coalesce((p_header->>'total_amount')::numeric, 0),
        vat_applicable = coalesce((p_header->>'vat_applicable')::boolean, true),
        trade_subtotal = coalesce((p_header->>'trade_subtotal')::numeric, 0),
        profit_estimate = coalesce((p_header->>'profit_estimate')::numeric, 0),
        valid_until = nullif(p_header->>'valid_until', '')::date,
        payment_type = coalesce(p_header->>'payment_type', 'deposit'),
        deposit_percentage = coalesce((p_header->>'deposit_percentage')::numeric, 0),
        updated_at = now()
      where id = v_sale_id;
    else
      update public.invoices set
        client_id = (p_header->>'client_id')::uuid,
        total_amount = coalesce((p_header->>'total_amount')::numeric, 0),
        vat_applicable = coalesce((p_header->>'vat_applicable')::boolean, true),
        trade_subtotal = coalesce((p_header->>'trade_subtotal')::numeric, 0),
        profit_estimate = coalesce((p_header->>'profit_estimate')::numeric, 0),
        due_date = nullif(p_header->>'due_date', '')::date,
        deposit_amount = coalesce((p_header->>'deposit_amount')::numeric, 0),
        updated_at = now()
      where id = v_sale_id;
    end if;
  end if;

  execute format('delete from public.%I where %I = $1', v_lines_table, v_fk_col)
    using v_sale_id;

  for v_line in select * from jsonb_array_elements(coalesce(p_lines, '[]'::jsonb))
  loop
    execute format(
      'insert into public.%I (%I, product_id, description, quantity, unit_price, cost_price, line_total) values ($1, $2, $3, $4, $5, $6, $7)',
      v_lines_table,
      v_fk_col
    )
    using
      v_sale_id,
      nullif(v_line->>'product_id', '')::uuid,
      v_line->>'description',
      coalesce((v_line->>'quantity')::numeric, 1),
      coalesce((v_line->>'unit_price')::numeric, 0),
      coalesce((v_line->>'cost_price')::numeric, 0),
      coalesce((v_line->>'line_total')::numeric, 0);
  end loop;

  return v_sale_id;
end;
$$;

revoke all on function public.upsert_sale_with_lines(text, uuid, jsonb, jsonb) from public;
revoke all on function public.upsert_sale_with_lines(text, uuid, jsonb, jsonb) from anon;
grant execute on function public.upsert_sale_with_lines(text, uuid, jsonb, jsonb) to authenticated;

revoke all on function public.rls_auto_enable() from public;
revoke all on function public.rls_auto_enable() from anon;
revoke all on function public.rls_auto_enable() from authenticated;

-- 5. Fix organization-assets public bucket listing exposure
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "org_assets_select" on storage.objects;

drop policy if exists "org_assets_insert" on storage.objects;
create policy "org_assets_insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'organization-assets'
    and private.is_staff_user()
  );

drop policy if exists "org_assets_update" on storage.objects;
create policy "org_assets_update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'organization-assets'
    and private.is_staff_user()
  )
  with check (
    bucket_id = 'organization-assets'
    and private.is_staff_user()
  );

drop policy if exists "org_assets_delete" on storage.objects;
create policy "org_assets_delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'organization-assets'
    and private.is_staff_user()
  );