-- Atomic quotation/invoice save with line replacement
-- Applied via migration: upsert_sale_with_lines_rpc

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
  if not public.is_staff_user() then
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

grant execute on function public.upsert_sale_with_lines(text, uuid, jsonb, jsonb) to authenticated;
