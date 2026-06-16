import { supabase } from '@/lib/portal/supabase'
import type { PortalUserType, StaffRole } from '@/lib/portal/permissions'

export type PortalAccess = {
    userType: PortalUserType
    staffRole: StaffRole | null
    clientId: string | null
}

export async function resolvePortalAccess(userId: string): Promise<PortalAccess> {
    const [{ data: staffProfile }, { data: clientProfile }] = await Promise.all([
        supabase.from('users').select('role').eq('id', userId).maybeSingle(),
        supabase.from('clients').select('id').eq('auth_user_id', userId).maybeSingle(),
    ])

    if (staffProfile?.role) {
        return {
            userType: 'staff',
            staffRole: staffProfile.role as StaffRole,
            clientId: clientProfile?.id ?? null,
        }
    }

    if (clientProfile) {
        return {
            userType: 'client',
            staffRole: null,
            clientId: clientProfile.id,
        }
    }

    return {
        userType: 'unknown',
        staffRole: null,
        clientId: null,
    }
}