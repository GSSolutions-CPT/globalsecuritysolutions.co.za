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

export interface Invoice {
    id: string;
    client_id: string;
    quotation_id?: string;
    status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled';
    date_created: string;
    due_date?: string;
    total_amount: number;
    vat_applicable: boolean;
    trade_subtotal?: number;
    profit_estimate?: number;
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

export interface Contract {
    id: string;
    client_id: string;
    title: string;
    amount: number;
    frequency: 'weekly' | 'monthly' | 'quarterly' | 'annually' | string;
    start_date: string;
    next_billing_date?: string;
    status: 'Active' | 'Paused' | 'Cancelled';
    service_type?: string;
    notes?: string;
    clients?: Pick<Client, 'name' | 'company'>;
}
