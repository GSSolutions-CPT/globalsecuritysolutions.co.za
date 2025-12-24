
export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-24 pb-12">
            {/* Hero Skeleton */}
            <div className="w-full h-[40vh] bg-slate-200 animate-pulse mb-8" />

            {/* Content Skeleton */}
            <div className="container mx-auto px-4">
                <div className="h-10 w-2/3 bg-slate-200 animate-pulse rounded-lg mb-4 mx-auto" />
                <div className="h-4 w-1/2 bg-slate-200 animate-pulse rounded-full mb-12 mx-auto" />

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-[2.5rem] p-4 h-[400px] shadow-sm border border-slate-100 flex flex-col">
                            <div className="w-full h-48 bg-slate-100 rounded-[2rem] animate-pulse mb-4" />
                            <div className="h-6 w-3/4 bg-slate-100 rounded-full animate-pulse mb-4" />
                            <div className="h-4 w-full bg-slate-100 rounded-full animate-pulse mb-2" />
                            <div className="h-4 w-2/3 bg-slate-100 rounded-full animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
