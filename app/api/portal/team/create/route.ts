import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/portal/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const supabase = await createServerSupabaseClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const email = (body?.email as string | undefined)?.trim()
        const role = (body?.role as string | undefined)?.trim()

        if (!email || !role) {
            return NextResponse.json({ error: 'Email and role are required' }, { status: 400 })
        }

        const allowedRoles = ['admin', 'manager', 'technician', 'accountant']
        if (!allowedRoles.includes(role)) {
            return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
        }

        const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
            data: { role },
        })

        if (inviteError) {
            return NextResponse.json({ error: inviteError.message }, { status: 400 })
        }

        const inviteLink = inviteData?.invite_link || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/portal/auth/callback`

        return NextResponse.json({ inviteLink })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to create team user' },
            { status: 500 }
        )
    }
}
