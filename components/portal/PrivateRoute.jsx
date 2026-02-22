import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (!loading && !user) {
            // Redirect them to the /portal/login page, but save the current location they were
            // trying to go to when they were redirected.
            router.replace('/portal/login?from=' + pathname)
        }
    }, [user, loading, router, pathname])

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-muted-foreground animate-pulse">Checking access...</p>
            </div>
        )
    }

    return children
}
