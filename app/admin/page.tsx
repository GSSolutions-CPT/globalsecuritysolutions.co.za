'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'
import { v4 as uuidv4 } from 'uuid'
import { Image as ImageIcon, Loader2, CheckCircle, AlertCircle, FileText, Briefcase } from 'lucide-react'

export default function AdminPage() {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [activeTab, setActiveTab] = useState<'blog' | 'projects'>('blog')

    // Common State
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    // BLOG State
    const [aiApiKey, setAiApiKey] = useState('')
    const [aiTopic, setAiTopic] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [showAiPanel, setShowAiPanel] = useState(false)
    const [blogTitle, setBlogTitle] = useState('')
    const [blogSlug, setBlogSlug] = useState('')
    const [blogExcerpt, setBlogExcerpt] = useState('')
    const [blogContent, setBlogContent] = useState('')
    const [blogImage, setBlogImage] = useState<File | null>(null)

    // PROJECT State
    const [projTitle, setProjTitle] = useState('')
    const [projCategory, setProjCategory] = useState('Residential')
    const [projDesc, setProjDesc] = useState('')
    const [projImage, setProjImage] = useState<File | null>(null)

    // Load API Key & Check Session
    useEffect(() => {
        const savedKey = localStorage.getItem('openai_api_key')
        if (savedKey) setAiApiKey(savedKey)

        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAuthenticated(!!session)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true); setError('')

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            // State update handled by onAuthStateChange
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }

    // ... (rest of blog/project functions remain unchanged)
    const handleBlogTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const t = e.target.value
        setBlogTitle(t)
        setBlogSlug(t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
    }

    const handleAiGenerate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!aiApiKey) { setError('Please enter an OpenAI API Key'); return }
        setIsGenerating(true); setError('')
        localStorage.setItem('openai_api_key', aiApiKey)

        try {
            const systemPrompt = `
Role: Senior SEO Content Strategist for Global Security Solutions (GSS).
Identity: Kyle Cass (Owner), Durbanville, Cape Town.
Goal: #1 Ranking Blog Posts.
Rules:
1. Title: Catchy with 1-2 emojis.
2. Intro: Local Hook (e.g. salt-air, loadshedding).
3. Experience: Include "Kyle’s Field Note" section.
4. Keywords: Durbanville, Bellville, Cape Town.
Output: JSON ONLY { "title": "string", "excerpt": "string", "content": "markdown string" }`

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${aiApiKey}` },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: `Write a blog post about: ${aiTopic}` }
                    ],
                    response_format: { type: "json_object" }
                })
            })

            const data = await response.json()
            if (data.error) throw new Error(data.error.message)
            const result = JSON.parse(data.choices[0].message.content)

            setBlogTitle(result.title)
            setBlogSlug(result.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
            setBlogExcerpt(result.excerpt)
            setBlogContent(result.content)
            setSuccess('AI Content Generated! Please review and publish.')
            setShowAiPanel(false)
        } catch (err: any) {
            console.error(err); setError(err.message || 'AI Generation Failed')
        } finally { setIsGenerating(false) }
    }

    const handleBlogSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true); setError(''); setSuccess('')

        try {
            let coverImageUrl = null
            if (blogImage) {
                const fileName = `${uuidv4()}.${blogImage.name.split('.').pop()}`
                const { error: upErr } = await supabase.storage.from('blog-images').upload(fileName, blogImage)
                if (upErr) throw new Error(upErr.message)
                const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName)
                coverImageUrl = data.publicUrl
            }

            const contentBlocks = blogContent.split('\n\n').map(p => {
                if (p.startsWith('# ')) return { type: 'heading', text: p.replace('# ', '') }
                return { type: 'paragraph', text: p }
            })

            const { error: dbErr } = await supabase.from('posts').insert([{
                title: blogTitle, slug: blogSlug, excerpt: blogExcerpt, content: contentBlocks, cover_image_url: coverImageUrl
            }])
            if (dbErr) throw new Error(dbErr.message)

            setSuccess('Blog Post Published!'); setBlogTitle(''); setBlogSlug(''); setBlogExcerpt(''); setBlogContent(''); setBlogImage(null)
        } catch (err: any) { setError(err.message) } finally { setLoading(false) }
    }

    // --- PROJECT FUNCTIONS ---
    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!projImage) { setError('Project image is required'); return }
        setLoading(true); setError(''); setSuccess('')

        try {
            const fileName = `${uuidv4()}.${projImage.name.split('.').pop()}`
            const { error: upErr } = await supabase.storage.from('project-images').upload(fileName, projImage)
            if (upErr) throw new Error(upErr.message)
            const { data } = supabase.storage.from('project-images').getPublicUrl(fileName)

            const { error: dbErr } = await supabase.from('projects').insert([{
                title: projTitle, category: projCategory, description: projDesc, image_url: data.publicUrl
            }])
            if (dbErr) throw new Error(dbErr.message)

            setSuccess('Project Added to Gallery!'); setProjTitle(''); setProjDesc(''); setProjImage(null)
        } catch (err: any) { setError(err.message) } finally { setLoading(false) }
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="admin@example.com" required />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="••••••••" required />
                        </div>
                        {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
                        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                            {loading ? 'Logging in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-slate-200 relative">
                    <button
                        onClick={() => { setActiveTab('blog'); setSuccess(''); setError('') }}
                        className={`flex-1 py-4 text-center font-bold flex items-center justify-center space-x-2 transition-colors ${activeTab === 'blog' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <FileText className="w-5 h-5" /> <span>Manage Blog</span>
                    </button>
                    <button
                        onClick={() => { setActiveTab('projects'); setSuccess(''); setError('') }}
                        className={`flex-1 py-4 text-center font-bold flex items-center justify-center space-x-2 transition-colors ${activeTab === 'projects' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Briefcase className="w-5 h-5" /> <span>Manage Projects</span>
                    </button>

                    <button onClick={handleLogout} className="absolute right-0 top-0 h-full px-6 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors uppercase tracking-wider border-l border-slate-100">
                        Sign Out
                    </button>
                </div>

                <div className="p-8">
                    {activeTab === 'blog' ? (
                        <>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-slate-900">Create Blog Post</h2>
                                <button type="button" onClick={() => setShowAiPanel(!showAiPanel)} className="text-purple-600 font-bold flex items-center hover:bg-purple-50 px-3 py-2 rounded-lg">
                                    <Loader2 className={`w-5 h-5 mr-2 ${isGenerating ? 'animate-spin' : ''}`} /> {showAiPanel ? 'Close AI' : 'Use AI Writer'}
                                </button>
                            </div>

                            {/* AI Panel */}
                            {showAiPanel && (
                                <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 mb-8">
                                    <div className="space-y-4">
                                        <input type="text" value={aiTopic} onChange={e => setAiTopic(e.target.value)} className="w-full p-3 border border-purple-200 rounded-lg" placeholder="Topic e.g. Best CCTV for windy areas" />
                                        <input type="password" value={aiApiKey} onChange={e => setAiApiKey(e.target.value)} className="w-full p-3 border border-purple-200 rounded-lg" placeholder="OpenAI API Key (sk-...)" />
                                        <button onClick={handleAiGenerate} disabled={isGenerating || !aiTopic} className="w-full py-3 rounded-lg text-white font-bold bg-purple-600 hover:bg-purple-700 disabled:opacity-50">
                                            {isGenerating ? 'Generating...' : 'Generate with AI 🚀'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleBlogSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input type="text" value={blogTitle} onChange={handleBlogTitleChange} className="w-full p-3 border rounded-lg" placeholder="Post Title" required />
                                    <input type="text" value={blogSlug} onChange={e => setBlogSlug(e.target.value)} className="w-full p-3 border rounded-lg bg-slate-50" placeholder="slug-url" required />
                                </div>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50">
                                    <input type="file" id="blogImg" className="hidden" accept="image/*" onChange={e => setBlogImage(e.target.files?.[0] || null)} />
                                    <label htmlFor="blogImg" className="block text-slate-500">{blogImage ? <span className="text-green-600 font-bold">{blogImage.name}</span> : 'Upload Cover Image'}</label>
                                </div>
                                <textarea value={blogExcerpt} onChange={e => setBlogExcerpt(e.target.value)} className="w-full p-3 border rounded-lg h-24" placeholder="Short Excerpt" required />
                                <textarea value={blogContent} onChange={e => setBlogContent(e.target.value)} className="w-full p-3 border rounded-lg h-64 font-mono text-sm" placeholder="Post Content (Markdown supported)" required />
                                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50">
                                    {loading ? 'Publishing...' : 'Publish Post'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-slate-900 mb-8">Add Project to Gallery</h2>
                            <form onSubmit={handleProjectSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input type="text" value={projTitle} onChange={e => setProjTitle(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Project Title" required />
                                    <select value={projCategory} onChange={e => setProjCategory(e.target.value)} className="w-full p-3 border rounded-lg bg-white">
                                        <option>Residential</option><option>Commercial</option><option>Industrial</option><option>Agricultural</option><option>Estate / HOA</option>
                                    </select>
                                </div>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-50">
                                    <input type="file" id="projImg" className="hidden" accept="image/*" onChange={e => setProjImage(e.target.files?.[0] || null)} />
                                    <label htmlFor="projImg" className="block text-slate-500">{projImage ? <span className="text-green-600 font-bold">{projImage.name}</span> : 'Upload Project Photo'}</label>
                                </div>
                                <textarea value={projDesc} onChange={e => setProjDesc(e.target.value)} className="w-full p-3 border rounded-lg h-24" placeholder="Description of installation..." required />
                                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50">
                                    {loading ? 'Uploading...' : 'Add Project'}
                                </button>
                            </form>
                        </>
                    )}

                    {/* Feedback */}
                    <div className="mt-6">
                        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center"><AlertCircle className="w-5 h-5 mr-2" />{error}</div>}
                        {success && <div className="bg-green-50 text-green-600 p-4 rounded-lg flex items-center"><CheckCircle className="w-5 h-5 mr-2" />{success}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
