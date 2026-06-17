import { NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/portal/supabase/server'

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        if (!id) {
            return NextResponse.json({ error: 'Missing client id' }, { status: 400 })
        }

        const supabase = createServiceRoleClient()
        const { data, error } = await supabase
            .from('clients')
            .select('id, name, email, auth_user_id')
            .eq('id', id)
            .is('auth_user_id', null)
            .maybeSingle()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        if (!data) {
            return NextResponse.json({ error: 'Invalid or expired invitation link' }, { status: 404 })
        }

        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to load invitation' },
            { status: 500 }
        )
    }
}