import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, createServiceRoleClient } from '@/lib/portal/supabase/server'
import { getRequiredStaffRoles, type StaffRole } from '@/lib/portal/permissions'

export async function POST(request: NextRequest) {
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
        const requiredRoles = getRequiredStaffRoles('/portal/sales')
        if (requiredRoles !== 'all_staff' && !requiredRoles?.includes(role)) {
            return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
        }

        const body = await request.json()
        const table = body?.table as string | undefined
        const saleId = body?.saleId as string | null | undefined
        const header = body?.header
        const lines = body?.lines

        if (!table || (table !== 'quotations' && table !== 'invoices')) {
            return NextResponse.json({ error: 'Invalid table' }, { status: 400 })
        }

        if (!header || typeof header !== 'object') {
            return NextResponse.json({ error: 'Missing header payload' }, { status: 400 })
        }

        const serviceClient = createServiceRoleClient()
        const { data, error: rpcError } = await serviceClient.rpc('upsert_sale_with_lines', {
            p_actor_id: user.id,
            p_table: table,
            p_sale_id: saleId ?? null,
            p_header: header,
            p_lines: lines ?? [],
        })

        if (rpcError) {
            return NextResponse.json({ error: rpcError.message }, { status: 400 })
        }

        return NextResponse.json({ saleId: data })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to save sale' },
            { status: 500 }
        )
    }
}