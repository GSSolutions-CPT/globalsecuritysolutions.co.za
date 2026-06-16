-- Run in Supabase SQL editor to enable stock tracking on products
alter table public.products
  add column if not exists stock_quantity integer,
  add column if not exists reorder_level integer;