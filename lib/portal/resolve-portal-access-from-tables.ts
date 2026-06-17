import type { SupabaseClient } from '@supabase/supabase-js'
import type { StaffRole } from '@/lib/portal/permissions'

export type PortalAccessTablesResult = {
    staffRole: StaffRole | null
    clientId: string | null
}

export async function resolvePortalAccessFromTables(
    supabase: SupabaseClient,
    userId: string
): Promise<PortalAccessTablesResult> {
    const [{ data: staffProfile }, { data: clientProfile }] = await Promise.all([
        supabase.from('users').select('role').eq('id', userId).maybeSingle(),
        supabase.from('clients').select('id').eq('auth_user_id', userId).maybeSingle(),
    ])

    return {
        staffRole: (staffProfile?.role as StaffRole | undefined) ?? null,
        clientId: clientProfile?.id ?? null,
    }
}