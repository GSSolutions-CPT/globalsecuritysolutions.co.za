import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Security Blog | Global Security Solutions',
    description: 'Read the latest news and tips on home and business security in Cape Town.',
}

export default function BlogPage() {
    const posts = [
        { title: "Top 5 Security Tips for Cape Town Residents", date: "Dec 12, 2024", slug: "top-5-tips" },
        { title: "Understanding the New Electric Fencing Regulations", date: "Nov 28, 2024", slug: "electric-fencing-regs" },
        { title: "CCTV: Why Remote Viewing is a Game Changer", date: "Nov 15, 2024", slug: "cctv-remote-viewing" },
    ]

    return (
        <div className="min-h-screen bg-slate-50 py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-slate-900 mb-12 text-center">Security Insights</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <article key={post.slug} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="h-48 bg-slate-200 rounded-lg mb-4 flex items-center justify-center text-slate-400">Image Placeholder</div>
                            <div className="text-sm text-blue-600 font-semibold mb-2">{post.date}</div>
                            <h2 className="text-xl font-bold text-slate-900 mb-3 hover:text-blue-600 cursor-pointer">{post.title}</h2>
                            <p className="text-slate-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...</p>
                            <span className="text-blue-600 font-semibold cursor-pointer">Read More &rarr;</span>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
