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
        const userId = body?.userId as string | undefined

        if (!userId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
        }

        const { error: deleteError } = await supabase.auth.admin.deleteUser(userId)

        if (deleteError) {
            return NextResponse.json({ error: deleteError.message }, { status: 400 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to delete team user' },
            { status: 500 }
        )
    }
}