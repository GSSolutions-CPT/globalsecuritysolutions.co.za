-- CRM RLS / schema smoke tests (run in Supabase SQL editor or via MCP execute_sql)
-- All checks should return rows; empty result = failure.

-- 1. New tables exist with RLS enabled
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('client_requests', 'job_attachments', 'installation_details', 'installation_photos')
order by tablename;

-- 2. Expected policies exist
select schemaname, tablename, policyname
from pg_policies
where schemaname = 'public'
  and tablename in ('client_requests', 'job_attachments', 'installation_details', 'installation_photos')
order by tablename, policyname;

-- 3. Private storage buckets are not public
select id, public from storage.buckets
where id in ('payment-proofs', 'receipts', 'job-attachments', 'installation-photos', 'site-plans')
order by id;

-- 4. Product stock columns
select column_name, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name = 'products'
  and column_name in ('stock_quantity', 'reorder_level');

-- 5. Helper functions for RLS
select proname from pg_proc
where pronamespace = 'public'::regnamespace
  and proname in ('is_staff_user', 'current_client_id', 'staff_role');
