export interface Client {
    id: string;
    name: string;
    company?: string;
    email?: string;
    phone?: string;
    address?: string;
    created_at?: string;
    auth_user_id?: string;
    metadata?: Record<string, unknown>;
}

export interface QuotationLine {
    id?: string;
    quotation_id?: string;
    product_id?: string;
    description?: string;
    quantity: number;
    unit_price: number;
    line_total: number;
    cost_price?: number;
}

export interface Quotation {
    id: string;
    client_id: string;
    status: 'Draft' | 'Sent' | 'Pending Review' | 'Accepted' | 'Approved' | 'Rejected' | 'Converted' | 'Cancelled';
    date_created: string;
    created_at?: string;
    valid_until?: string;
    total_amount: number;
    vat_applicable: boolean;
    trade_subtotal?: number;
    profit_estimate?: number;
    payment_request_sent?: boolean;
    final_payment_approved?: boolean;
    payment_proof?: string;
    final_payment_proof?: string;
    admin_approved?: boolean;
    site_plan_url?: string;
    payment_type?: 'deposit' | 'full';
    deposit_percentage?: number;
    accepted_at?: string;
    client_signature?: string;
    clients?: Pick<Client, 'name' | 'company' | 'email' | 'address'>;
    lines?: QuotationLine[];
}

export interface InvoiceLine {
    id?: string;
    invoice_id?: string;
    product_id?: string;
    description?: string;
    quantity: number;
    unit_price: number;
    line_total: number;
    cost_price?: number;
}

export interface InvoiceMetadata {
    contract_id?: string;
    billing_date?: string;
    auto_generated?: boolean;
    [key: string]: unknown;
}

export interface Invoice {
    id: string;
    client_id: string;
    quotation_id?: string;
    status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled';
    date_created: string;
    created_at?: string;
    due_date?: string;
    total_amount: number;
    vat_applicable: boolean;
    trade_subtotal?: number;
    profit_estimate?: number;
    metadata?: InvoiceMetadata;
    clients?: Pick<Client, 'name' | 'company' | 'email' | 'address'>;
    quotations?: Pick<Quotation, 'payment_proof'>;
    payment_proof?: string;
    lines?: InvoiceLine[];
}

export interface Supplier {
    id: string;
    name: string;
    contact_person?: string;
    email?: string;
    phone?: string;
    address?: string;
}

export interface PurchaseOrderLine {
    id?: string;
    purchase_order_id?: string;
    description?: string;
    quantity: number;
    unit_price: number;
    line_total: number;
}

export interface PurchaseOrder {
    id: string;
    supplier_id: string;
    status: 'Draft' | 'Sent' | 'Delivered' | 'Cancelled';
    date_created: string;
    expected_date?: string;
    expected_delivery?: string;
    total_amount: number;
    pdf_url?: string;
    suppliers?: Pick<Supplier, 'name' | 'contact_person' | 'email' | 'phone' | 'address'>;
    lines?: PurchaseOrderLine[];
    metadata?: Record<string, unknown>;
}

export type ContractFrequency = 'weekly' | 'monthly' | 'quarterly' | 'annually';

/** Maps to the `recurring_contracts` table. */
export interface RecurringContract {
    id: string;
    client_id: string;
    description: string;
    amount: number;
    frequency: ContractFrequency | string;
    start_date: string;
    next_billing_date?: string;
    active: boolean;
    created_at?: string;
    clients?: Pick<Client, 'name' | 'company' | 'email'>;
}

/** @deprecated Use RecurringContract — kept as alias for existing imports. */
export type Contract = RecurringContract;

export interface ActivityLog {
    id: string;
    type: string;
    description: string;
    timestamp?: string;
    created_at?: string;
    related_entity_id?: string;
    related_entity_type?: string;
}

export interface Job {
    id: string;
    client_id: string;
    quotation_id?: string;
    status: 'Pending' | 'In Progress' | 'Completed' | string;
    assigned_technicians?: string[];
    scheduled_datetime?: string;
    scheduled_end_datetime?: string;
    notes?: string;
    created_at?: string;
    clients?: Pick<Client, 'name' | 'company'>;
    quotations?: Pick<Quotation, 'id' | 'payment_proof'>;
}

export interface JobAttachment {
    id: string;
    job_id?: string;
    client_id?: string;
    file_name: string;
    file_url: string;
    file_type?: string;
    description?: string;
    created_at?: string;
}

export interface Product {
    id: string;
    name: string;
    code?: string;
    category?: string;
    description?: string;
    retail_price: number;
    cost_price?: number;
    stock_quantity?: number | null;
    reorder_level?: number | null;
    created_at?: string;
}

export interface SitePlan {
    id: string;
    quotation_id: string;
    canvas_json: Record<string, unknown>;
    background_url?: string;
    flattened_url?: string;
    updated_at?: string;
}

export interface Expense {
    id: string;
    type: string;
    job_id?: string;
    amount: number;
    description?: string;
    date: string;
    receipt_url?: string;
    created_at?: string;
}

export interface CalendarEvent {
    id?: string;
    title?: string;
    datetime?: string;
    end_datetime?: string;
    event_type?: string;
    notes?: string;
}

export interface ClientRequest {
    id: string;
    client_id: string;
    type: 'quote' | 'site_visit';
    description: string;
    address?: string;
    preferred_date?: string | null;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    staff_notes?: string | null;
    created_at?: string;
    updated_at?: string;
    clients?: Pick<Client, 'name' | 'company' | 'email' | 'phone'>;
}

export interface SerialNumberEntry {
    component: string;
    serial: string;
}

export interface InstallationDetail {
    id: string;
    invoice_id: string;
    serial_numbers: SerialNumberEntry[];
    notes?: string;
    created_at?: string;
    updated_at?: string;
}

export interface InstallationPhoto {
    id: string;
    installation_detail_id: string;
    photo_url: string;
    caption?: string;
    uploaded_at?: string;
}

export interface UserProfile {
    id: string;
    email: string;
    role: string;
    created_at?: string;
    is_active?: boolean;
    [key: string]: unknown;
}
