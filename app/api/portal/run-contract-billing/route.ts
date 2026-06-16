import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/portal/supabase/server'
import { getRequiredStaffRoles, type StaffRole } from '@/lib/portal/permissions'
import { processDueContractBilling } from '@/lib/portal/contract-billing'
import { Contract } from '@/types/crm'

export async function POST() {
    try {
        const supabase = await createServerSupabaseClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { data: staffProfile, error: profileError } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .maybeSingle()

        if (profileError || !staffProfile) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const role = staffProfile.role as StaffRole
        const requiredRoles = getRequiredStaffRoles('/portal/contracts')
        if (requiredRoles !== 'all_staff' && !requiredRoles?.includes(role)) {
            return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
        }

        const { data: contracts, error: contractsError } = await supabase
            .from('recurring_contracts')
            .select(`
                *,
                clients (name, company, email)
            `)
            .eq('active', true)

        if (contractsError) {
            return NextResponse.json({ error: contractsError.message }, { status: 500 })
        }

        const generatedInvoiceIds = await processDueContractBilling(
            (contracts || []) as Contract[],
            supabase
        )

        return NextResponse.json({
            success: true,
            generatedCount: generatedInvoiceIds.length,
            invoiceIds: generatedInvoiceIds,
        })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to process contract billing'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}