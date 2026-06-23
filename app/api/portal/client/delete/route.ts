import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, createServiceRoleClient } from '@/lib/portal/supabase/server'

export async function DELETE(request: NextRequest) {
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

        // Simple staff-only guard; tighten later if needed
        const role = staffProfile.role as string
        if (!role || role === 'client') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const url = new URL(request.url)
        const clientId = url.searchParams.get('clientId')

        if (!clientId) {
            return NextResponse.json({ error: 'Missing clientId' }, { status: 400 })
        }

        const serviceClient = createServiceRoleClient()

        // Requires a SQL function like public.delete_client_full(uuid)
        const { error: deleteError } = await serviceClient.rpc('delete_client_full', {
            p_client_id: clientId,
        })

        if (deleteError) {
            return NextResponse.json({ error: deleteError.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to delete client'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
