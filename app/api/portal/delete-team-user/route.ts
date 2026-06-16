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

        const role = staffProfile.role as StaffRole
        if (!canManageTeam(role)) {
            return NextResponse.json({ error: 'Only admins can delete team members' }, { status: 403 })
        }

        const body = await request.json()
        const targetUserId = body?.userId as string | undefined

        if (!targetUserId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
        }

        if (targetUserId === user.id) {
            return NextResponse.json({ error: 'You cannot delete your own account' }, { status: 400 })
        }

        const serviceClient = createServiceRoleClient()

        const { error: authDeleteError } = await serviceClient.auth.admin.deleteUser(targetUserId)
        if (authDeleteError) {
            return NextResponse.json({ error: authDeleteError.message }, { status: 500 })
        }

        const { error: profileDeleteError } = await serviceClient
            .from('users')
            .delete()
            .eq('id', targetUserId)

        if (profileDeleteError) {
            return NextResponse.json({ error: profileDeleteError.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to delete user'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}