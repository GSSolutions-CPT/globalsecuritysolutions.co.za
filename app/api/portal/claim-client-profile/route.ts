import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, createServiceRoleClient } from '@/lib/portal/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const supabase = await createServerSupabaseClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const clientId = body?.clientId as string | undefined

        if (!clientId) {
            return NextResponse.json({ error: 'Missing clientId' }, { status: 400 })
        }

        const serviceClient = createServiceRoleClient()
        const { error: claimError } = await serviceClient.rpc('claim_client_profile', {
            p_actor_id: user.id,
            p_client_id: clientId,
            p_email: user.email ?? '',
        })

        if (claimError) {
            return NextResponse.json({ error: claimError.message }, { status: 400 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to link client profile' },
            { status: 500 }
        )
    }
}