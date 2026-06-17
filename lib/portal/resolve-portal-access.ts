import { supabase } from '@/lib/portal/supabase'
import type { PortalUserType, StaffRole } from '@/lib/portal/permissions'
import { resolvePortalAccessFromTables } from '@/lib/portal/resolve-portal-access-from-tables'

export type PortalAccess = {
    userType: PortalUserType
    staffRole: StaffRole | null
    clientId: string | null
}

export async function resolvePortalAccess(userId: string): Promise<PortalAccess> {
    const { staffRole, clientId } = await resolvePortalAccessFromTables(supabase, userId)

    if (staffRole) {
        return {
            userType: 'staff',
            staffRole,
            clientId,
        }
    }

    if (clientId) {
        return {
            userType: 'client',
            staffRole: null,
            clientId,
        }
    }

    return {
        userType: 'unknown',
        staffRole: null,
        clientId: null,
    }
}