// @ts-nocheck
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground animate-in fade-in duration-500">
            <div className="bg-destructive/10 p-4 rounded-full mb-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="text-4xl font-bold mb-2">404</h1>
            <h2 className="text-xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8 text-center max-w-md">
                The page you are looking for does not exist or has been moved.
            </p>
            <div className="flex gap-4">
                <Button variant="outline" onClick={() => router.back()}>
                    Go Back
                </Button>
                <Button onClick={() => router.push('/dashboard')}>
                    Go to Dashboard
                </Button>
            </div>
        </div>
    )
}

