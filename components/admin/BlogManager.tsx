'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'
import { v4 as uuidv4 } from 'uuid'
import { Loader2, CheckCircle, AlertCircle, Wand2, ImagePlus } from 'lucide-react'

export function BlogManager() {
    const [aiApiKey, setAiApiKey] = useState('')
    const [aiTopic, setAiTopic] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [showAiPanel, setShowAiPanel] = useState(false)

    // Form State
    const [blogTitle, setBlogTitle] = useState('')
    const [blogSlug, setBlogSlug] = useState('')
    const [blogExcerpt, setBlogExcerpt] = useState('')
    const [blogContent, setBlogContent] = useState('')
    const [blogImage, setBlogImage] = useState<File | null>(null)

    // Status
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const savedKey = localStorage.getItem('openai_api_key')
        if (savedKey) setAiApiKey(savedKey)
    }, [])

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
        } catch (err: unknown) {
            console.error(err);
            const msg = err instanceof Error ? err.message : 'AI Generation Failed'
            setError(msg)
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
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'An error occurred'
            setError(msg)
        } finally { setLoading(false) }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Blog Manager</h2>
                    <p className="text-slate-500">Create and publish SEO-optimized content.</p>
                </div>
                <button
                    type="button"
                    onClick={() => setShowAiPanel(!showAiPanel)}
                    className="bg-purple-600 text-white font-bold flex items-center hover:bg-purple-700 px-5 py-3 rounded-xl transition-colors shadow-lg shadow-purple-600/20"
                >
                    <Wand2 className={`w-5 h-5 mr-2 ${isGenerating ? 'animate-pulse' : ''}`} />
                    {showAiPanel ? 'Close AI Writer' : 'Use AI Writer'}
                </button>
            </div>

            {/* AI Panel */}
            {showAiPanel && (
                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-bold text-purple-800 mb-1">Topic Idea</label>
                                <input type="text" value={aiTopic} onChange={e => setAiTopic(e.target.value)} className="w-full p-3 border border-purple-200 rounded-xl bg-white" placeholder="e.g. Benefits of IP Cameras in Windy Areas" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-bold text-purple-800 mb-1">OpenAI API Key</label>
                                <input type="password" value={aiApiKey} onChange={e => setAiApiKey(e.target.value)} className="w-full p-3 border border-purple-200 rounded-xl bg-white" placeholder="sk-..." />
                            </div>
                        </div>
                        <button onClick={handleAiGenerate} disabled={isGenerating || !aiTopic} className="w-full py-3 rounded-xl text-white font-bold bg-purple-600 hover:bg-purple-700 disabled:opacity-50 transition-all">
                            {isGenerating ? 'Generating Content...' : 'Generate Post Draft 🚀'}
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <form onSubmit={handleBlogSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Post Title</label>
                            <input type="text" value={blogTitle} onChange={handleBlogTitleChange} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Enter title..." required />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Slug (URL)</label>
                            <input type="text" value={blogSlug} onChange={e => setBlogSlug(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-500" placeholder="auto-generated-slug" required readOnly />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Cover Image</label>
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors relative group">
                            <input type="file" id="blogImg" className="hidden" accept="image/*" onChange={e => setBlogImage(e.target.files?.[0] || null)} />
                            <label htmlFor="blogImg" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                                <div className="bg-slate-100 p-3 rounded-full mb-3 group-hover:bg-white transition-colors">
                                    <ImagePlus className="w-6 h-6 text-slate-400" />
                                </div>
                                <span className="text-slate-500 font-medium">{blogImage ? <span className="text-green-600 font-bold">{blogImage.name}</span> : 'Click to Upload Image'}</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Excerpt (SEO Description)</label>
                        <textarea value={blogExcerpt} onChange={e => setBlogExcerpt(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl h-24 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Short summary for search engines..." required />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Content (Markdown Supported)</label>
                        <textarea value={blogContent} onChange={e => setBlogContent(e.target.value)} className="w-full p-4 border border-slate-200 rounded-xl h-96 font-mono text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="# Heading 1&#10;&#10;Your content goes here..." required />
                    </div>

                    <div className="pt-4">
                        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center mb-4"><AlertCircle className="w-5 h-5 mr-2" />{error}</div>}
                        {success && <div className="bg-green-50 text-green-600 p-4 rounded-xl flex items-center mb-4"><CheckCircle className="w-5 h-5 mr-2" />{success}</div>}

                        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-900/10">
                            {loading ? <span className="flex items-center justify-center"><Loader2 className="animate-spin mr-2" /> Publishing...</span> : 'Publish Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
