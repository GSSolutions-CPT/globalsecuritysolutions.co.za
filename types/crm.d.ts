/**
 * CRM Type Definitions
 *
 * Strict TypeScript interfaces for all core CRM entities.
 * Apply these to useState and function signatures — never use `any` for CRM data.
 */

// ------------------------------------------------------------------
// Client
// ------------------------------------------------------------------
export interface Client {
    id: string
    name: string
    email: string
    phone?: string
    company?: string
    address?: string
    /** References auth.users.id — used for IDOR checks in ClientPortal */
    auth_user_id?: string
    created_at: string
}

// ------------------------------------------------------------------
// Line item (shared between Quotation and Invoice)
// ------------------------------------------------------------------
export interface LineItem {
    id: string
    description: string
    quantity: number
    unit_price: number
    line_total: number
    cost_price?: number
}

// ------------------------------------------------------------------
// Quotation
// ------------------------------------------------------------------
export type QuotationStatus =
    | 'Draft'
    | 'Sent'
    | 'Accepted'
    | 'Approved'
    | 'Rejected'
    | 'Pending Review'

export type PaymentType = 'deposit' | 'full'

export interface Quotation {
    id: string
    client_id: string
    /** Joined client record (optional, returned via Supabase select) */
    clients?: Client
    status: QuotationStatus
    total_amount: number
    date_created: string
    valid_until?: string
    accepted_at?: string
    payment_type?: PaymentType
    deposit_percentage?: number
    /** URL to uploaded deposit payment proof */
    payment_proof?: string
    /** URL to uploaded final payment proof */
    final_payment_proof?: string
    /** Set to true by admin after verifying final payment */
    final_payment_approved?: boolean
    /** Set to true by admin */
    admin_approved?: boolean
    /** URL to client's digital signature (stored in Supabase Storage) */
    client_signature?: string
    site_plan_url?: string
    vat_applicable?: boolean
    lines?: LineItem[]
}

// ------------------------------------------------------------------
// Invoice
// ------------------------------------------------------------------
export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue'

export interface Invoice {
    id: string
    client_id: string
    clients?: Client
    status: InvoiceStatus
    total_amount: number
    date_created: string
    due_date?: string
    vat_applicable?: boolean
    /** Pulled from the related quotation via join */
    payment_proof?: string
    /** Arbitrary metadata blob */
    metadata?: Record<string, unknown>
    lines?: LineItem[]
}

// ------------------------------------------------------------------
// Purchase Order
// ------------------------------------------------------------------
export type PurchaseOrderStatus = 'Draft' | 'Sent' | 'Received' | 'Cancelled'

export interface PurchaseOrder {
    id: string
    supplier_id: string
    suppliers?: {
        id: string
        name: string
        email?: string
        phone?: string
        address?: string
        contact_person?: string
    }
    status: PurchaseOrderStatus
    total_amount: number
    expected_date?: string
    updated_at?: string
    metadata?: {
        notes?: string
        reference?: string
        extracted_text_snippet?: string
        vat_applicable?: boolean
    }
    lines?: LineItem[]
}

// ------------------------------------------------------------------
// Recurring Contract
// ------------------------------------------------------------------
export type ContractFrequency = 'weekly' | 'monthly' | 'quarterly' | 'annually'

export interface Contract {
    id: string
    client_id: string
    clients?: Pick<Client, 'name' | 'company' | 'email'>
    description: string
    amount: number
    frequency: ContractFrequency
    start_date: string
    next_billing_date: string
    active: boolean
    created_at: string
}
