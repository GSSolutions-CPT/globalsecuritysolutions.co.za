-- Missing CRM tables: client_requests, job_attachments, installation_details, installation_photos
-- Project: relzsctzfotbyaafnkqr

-- client_requests ------------------------------------------------------------

create table if not exists public.client_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  type text not null check (type in ('quote', 'site_visit')),
  description text not null,
  address text,
  preferred_date date,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed', 'cancelled')),
  staff_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists client_requests_client_id_idx on public.client_requests(client_id);
create index if not exists client_requests_status_idx on public.client_requests(status);

alter table public.client_requests enable row level security;

drop policy if exists "staff_all_client_requests" on public.client_requests;
create policy "staff_all_client_requests"
  on public.client_requests for all
  using (public.is_staff_user())
  with check (public.is_staff_user());

drop policy if exists "client_insert_own_requests" on public.client_requests;
create policy "client_insert_own_requests"
  on public.client_requests for insert
  with check (client_id = public.current_client_id());

drop policy if exists "client_read_own_requests" on public.client_requests;
create policy "client_read_own_requests"
  on public.client_requests for select
  using (client_id = public.current_client_id());

-- job_attachments ------------------------------------------------------------

create table if not exists public.job_attachments (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  file_url text not null,
  file_type text,
  file_name text not null,
  description text default '',
  created_at timestamptz not null default now()
);

create index if not exists job_attachments_job_id_idx on public.job_attachments(job_id);

alter table public.job_attachments enable row level security;

drop policy if exists "staff_all_job_attachments" on public.job_attachments;
create policy "staff_all_job_attachments"
  on public.job_attachments for all
  using (public.is_staff_user())
  with check (public.is_staff_user());

drop policy if exists "client_read_own_job_attachments" on public.job_attachments;
create policy "client_read_own_job_attachments"
  on public.job_attachments for select
  using (
    exists (
      select 1
      from public.jobs j
      where j.id = job_attachments.job_id
        and j.client_id = public.current_client_id()
    )
  );

-- installation_details -------------------------------------------------------

create table if not exists public.installation_details (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  serial_numbers jsonb not null default '[]'::jsonb,
  notes text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create unique index if not exists installation_details_invoice_id_idx on public.installation_details(invoice_id);

alter table public.installation_details enable row level security;

drop policy if exists "staff_all_installation_details" on public.installation_details;
create policy "staff_all_installation_details"
  on public.installation_details for all
  using (public.is_staff_user())
  with check (public.is_staff_user());

drop policy if exists "client_read_own_installation_details" on public.installation_details;
create policy "client_read_own_installation_details"
  on public.installation_details for select
  using (
    exists (
      select 1
      from public.invoices i
      where i.id = installation_details.invoice_id
        and i.client_id = public.current_client_id()
    )
  );

-- installation_photos --------------------------------------------------------

create table if not exists public.installation_photos (
  id uuid primary key default gen_random_uuid(),
  installation_detail_id uuid not null references public.installation_details(id) on delete cascade,
  photo_url text not null,
  caption text,
  uploaded_at timestamptz not null default now()
);

create index if not exists installation_photos_detail_id_idx on public.installation_photos(installation_detail_id);

alter table public.installation_photos enable row level security;

drop policy if exists "staff_all_installation_photos" on public.installation_photos;
create policy "staff_all_installation_photos"
  on public.installation_photos for all
  using (public.is_staff_user())
  with check (public.is_staff_user());

drop policy if exists "client_read_own_installation_photos" on public.installation_photos;
create policy "client_read_own_installation_photos"
  on public.installation_photos for select
  using (
    exists (
      select 1
      from public.installation_details d
      join public.invoices i on i.id = d.invoice_id
      where d.id = installation_photos.installation_detail_id
        and i.client_id = public.current_client_id()
    )
  );

-- Storage: clients can read their own job attachments and installation photos

drop policy if exists "client_read_own_job_attachment_files" on storage.objects;
create policy "client_read_own_job_attachment_files"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'job-attachments'
    and public.current_client_id() is not null
    and exists (
      select 1
      from public.job_attachments ja
      join public.jobs j on j.id = ja.job_id
      where ja.file_url = storage.objects.name
        and j.client_id = public.current_client_id()
    )
  );

drop policy if exists "client_read_own_installation_photo_files" on storage.objects;
create policy "client_read_own_installation_photo_files"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'installation-photos'
    and public.current_client_id() is not null
    and exists (
      select 1
      from public.installation_photos ip
      join public.installation_details d on d.id = ip.installation_detail_id
      join public.invoices i on i.id = d.invoice_id
      where ip.photo_url = storage.objects.name
        and i.client_id = public.current_client_id()
    )
  );
