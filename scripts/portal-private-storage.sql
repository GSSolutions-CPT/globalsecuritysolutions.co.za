-- Private portal storage buckets and policies
-- Creates buckets if missing, then locks them down.

insert into storage.buckets (id, name, public)
values
  ('payment-proofs', 'payment-proofs', false),
  ('receipts', 'receipts', false),
  ('job-attachments', 'job-attachments', false),
  ('installation-photos', 'installation-photos', false),
  ('site-plans', 'site-plans', false)
on conflict (id) do update
set public = false;

-- Authenticated staff can manage all private portal files
drop policy if exists "staff_manage_private_portal_files" on storage.objects;
create policy "staff_manage_private_portal_files"
  on storage.objects for all
  to authenticated
  using (
    bucket_id in ('payment-proofs', 'receipts', 'job-attachments', 'installation-photos', 'site-plans')
    and private.is_staff_user()
  )
  with check (
    bucket_id in ('payment-proofs', 'receipts', 'job-attachments', 'installation-photos', 'site-plans')
    and private.is_staff_user()
  );

-- Clients can upload payment proofs
drop policy if exists "client_upload_payment_proofs" on storage.objects;
create policy "client_upload_payment_proofs"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'payment-proofs'
    and private.current_client_id() is not null
  );

-- Clients can read payment proof files
drop policy if exists "client_read_payment_proofs" on storage.objects;
create policy "client_read_payment_proofs"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'payment-proofs'
    and (
      private.is_staff_user()
      or private.current_client_id() is not null
    )
  );