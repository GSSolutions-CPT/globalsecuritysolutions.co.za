import type { SupabaseClient } from '@supabase/supabase-js'
import { supabase as browserSupabase } from '@/lib/portal/supabase'
import { addMonths, addWeeks, addQuarters, addYears } from 'date-fns'
import { Contract } from '@/types/crm'

export function calculateNextBillingDate(startDate: string, frequency: string): string {
    const date = new Date(startDate)
    switch (frequency) {
        case 'weekly': return addWeeks(date, 1).toISOString().split('T')[0]
        case 'monthly': return addMonths(date, 1).toISOString().split('T')[0]
        case 'quarterly': return addQuarters(date, 1).toISOString().split('T')[0]
        case 'annually': return addYears(date, 1).toISOString().split('T')[0]
        default: return addMonths(date, 1).toISOString().split('T')[0]
    }
}

export function isContractBillingDue(nextBillingDate?: string): boolean {
    if (!nextBillingDate) return false
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dueDate = new Date(nextBillingDate)
    dueDate.setHours(0, 0, 0, 0)
    return dueDate.getTime() <= today.getTime()
}

async function contractInvoiceExists(
    contract: Contract,
    db: SupabaseClient
): Promise<boolean> {
    const { data, error } = await db
        .from('invoices')
        .select('id')
        .eq('client_id', contract.client_id)
        .contains('metadata', { contract_id: contract.id, billing_date: contract.next_billing_date })
        .limit(1)

    if (error) {
        console.error('Error checking existing contract invoice:', error)
        return false
    }

    return (data?.length ?? 0) > 0
}

export async function generateInvoiceFromContract(
    contract: Contract,
    db: SupabaseClient = browserSupabase,
    options?: { status?: 'Draft' | 'Sent' }
): Promise<string | null> {
    if (!contract.active || !contract.next_billing_date) {
        return null
    }

    if (await contractInvoiceExists(contract, db)) {
        return null
    }

    const invoiceStatus = options?.status ?? 'Sent'

    const { data: invoiceData, error: invoiceError } = await db
        .from('invoices')
        .insert([{
            client_id: contract.client_id,
            status: invoiceStatus,
            date_created: new Date().toISOString(),
            due_date: contract.next_billing_date,
            total_amount: contract.amount,
            vat_applicable: false,
            metadata: {
                contract_id: contract.id,
                billing_date: contract.next_billing_date,
                auto_generated: true,
            },
        }])
        .select('id')
        .single()

    if (invoiceError || !invoiceData) {
        throw invoiceError || new Error('Failed to create invoice')
    }

    const { error: lineError } = await db
        .from('invoice_lines')
        .insert([{
            invoice_id: invoiceData.id,
            quantity: 1,
            unit_price: contract.amount,
            line_total: contract.amount,
            cost_price: 0,
            description: contract.description || 'Recurring Service',
        }])

    if (lineError) throw lineError

    const nextBilling = calculateNextBillingDate(contract.next_billing_date, contract.frequency)
    const { error: updateError } = await db
        .from('recurring_contracts')
        .update({ next_billing_date: nextBilling })
        .eq('id', contract.id)

    if (updateError) throw updateError

    await db.from('activity_log').insert([{
        type: 'Invoice Generated',
        description: `Recurring invoice generated for ${contract.clients?.name || 'client'}`,
        related_entity_id: invoiceData.id,
        related_entity_type: 'invoice',
    }])

    return invoiceData.id
}

export async function processDueContractBilling(
    contracts: Contract[],
    db: SupabaseClient = browserSupabase
): Promise<string[]> {
    const generatedInvoiceIds: string[] = []

    for (const contract of contracts) {
        if (!contract.active || !isContractBillingDue(contract.next_billing_date)) {
            continue
        }

        try {
            const invoiceId = await generateInvoiceFromContract(contract, db)
            if (invoiceId) {
                generatedInvoiceIds.push(invoiceId)
            }
        } catch (error) {
            console.error(`Failed to bill contract ${contract.id}:`, error)
        }
    }

    return generatedInvoiceIds
}