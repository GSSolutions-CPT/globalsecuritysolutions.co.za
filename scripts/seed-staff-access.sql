-- Restore portal staff access for existing Supabase Auth users.
-- Safe to re-run: uses ON CONFLICT on primary key.

insert into public.users (id, email, role, is_active, created_at)
values
  (
    '3dcbdb44-6e45-4ae2-87f5-3cdd7d8ddbc6',
    'kyle@gssolutions.co.za',
    'admin',
    true,
    now()
  ),
  (
    '57bb0ec5-6573-4c63-8100-be2bc52c4871',
    'kyle@globalsecuritysolutions.co.za',
    'admin',
    true,
    now()
  )
on conflict (id) do update
set
  email = excluded.email,
  role = excluded.role,
  is_active = excluded.is_active;