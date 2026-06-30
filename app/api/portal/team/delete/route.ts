import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, createServiceRoleClient } from '@/lib/portal/supabase/server'
import { canManageTeam, type StaffRole } from '@/lib/portal/permissions'

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

        if (!canManageTeam((staffProfile.role as StaffRole) || null)) {
            return NextResponse.json({ error: 'Insufficient permissions. Admin or Manager access required.' }, { status: 403 })
        }

        const body = await request.json()
        const userId = (body?.userId as string | undefined)?.trim()

        if (!userId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
        }

        const serviceClient = createServiceRoleClient()
        const { error } = await serviceClient.auth.admin.deleteUser(userId)

        if (error) {
            return NextResponse.json({ error: 'Failed to delete team user' }, { status: 400 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to delete team user' },
            { status: 500 }
        )
    }
}
