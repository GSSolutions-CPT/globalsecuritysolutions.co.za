'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'
import { v4 as uuidv4 } from 'uuid'
import { Image as ImageIcon, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function AdminBlogPage() {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')

    // Form State
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    // AI State
    const [aiApiKey, setAiApiKey] = useState('')
    const [aiTopic, setAiTopic] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [showAiPanel, setShowAiPanel] = useState(false)

    // Load API Key from local storage on mount (Client-side only)
    useEffect(() => {
        const savedKey = localStorage.getItem('openai_api_key')
        if (savedKey) setAiApiKey(savedKey)
    }, [])

    // Post Data
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [content, setContent] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)

    // Auto-generate slug
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const t = e.target.value
        setTitle(t)
        setSlug(t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === 'admin123') { // Simple hardcoded password for easy access
            setIsAuthenticated(true)
        } else {
            setError('Incorrect Password')
        }
    }

    const handleAiGenerate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!aiApiKey) {
            setError('Please enter an OpenAI API Key')
            return
        }
        setIsGenerating(true)
        setError('')

        // Save key for future
        localStorage.setItem('openai_api_key', aiApiKey)

        try {
            const systemPrompt = `
Role: You are the Senior SEO Content Strategist for Global Security Solutions (GSS). Your mission is to write "People-First" blog posts that rank #1 in Cape Town by demonstrating real-world experience and solving local security problems.

Core Identity:
Business: Global Security Solutions (GSS).
Owner: Kyle Cass (Expert Security Installer).
Location: Durbanville, Cape Town (Servicing the entire Western Cape).
Goal: Dominate local search results for security installation, maintenance, and repairs.

Writing Rules for #1 Ranking:
1. Title: Catchy, SEO-optimized title with exactly 1 or 2 emojis (e.g., 🛡️ 🔍).
2. Introduction: Start with a "Local Hook." Mention a specific Cape Town challenge (e.g., salt-air corrosion, load-shedding, or South-Easter winds affecting sensors).
3. The "Experience" Factor (Crucial): Every post must include a section called "Kyle’s Field Note." Describe a fictional but realistic scenario from a job site in areas like Bellville, Somerset West, or Durbanville to prove real-world experience.
4. Expertise: Use simple language but mention specific technical brands we use (e.g., Paradox, Hikvision) to show authority.
5. Structure: Use H2 and H3 subheadings. Use bullet points for checklists.
6. Local Keywords: Naturally weave in suburbs: Durbanville, Bellville, Brackenfell, Stellenbosch, and Cape Town.
7. Trustworthiness: Always provide a clear, helpful conclusion and the standard CTA.

Standard Contact Info (CTA):
Website: https://globalsecuritysolutions.co.za
WhatsApp: 0629558559
Email: Kyle@globalsecuritysolutions.co.za

Output Format:
Return a JSON object ONLY: { "title": "string", "excerpt": "string", "content": "markdown string" }
`

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${aiApiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o', // or gpt-3.5-turbo
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

            setTitle(result.title)
            // Auto-generate slug from new title
            const newSlug = result.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            setSlug(newSlug)
            setExcerpt(result.excerpt)
            setContent(result.content) // We will keep it as markdown text for the editor

            setSuccess('AI Content Generated Successfully! Please review and publish.')
            setShowAiPanel(false)

        } catch (err: any) {
            console.error(err)
            setError(err.message || 'AI Generation Failed')
        } finally {
            setIsGenerating(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            let coverImageUrl = null

            // 1. Upload Image
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop()
                const fileName = `${uuidv4()}.${fileExt}`
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('blog-images')
                    .upload(fileName, imageFile)

                if (uploadError) throw new Error(`Image Upload Failed: ${uploadError.message}`)

                // Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('blog-images')
                    .getPublicUrl(fileName)

                coverImageUrl = publicUrl
            }

            // 2. Format Content (Simple Paragraph Split for now, or raw text)
            // We store it as a simple array of blocks to match our JSON structure
            const contentBlocks = content.split('\n\n').map(p => {
                if (p.startsWith('# ')) return { type: 'heading', text: p.replace('# ', '') }
                return { type: 'paragraph', text: p }
            })

            // 3. Insert into Database
            const { error: dbError } = await supabase
                .from('posts')
                .insert([{
                    title,
                    slug,
                    excerpt,
                    content: contentBlocks,
                    cover_image_url: coverImageUrl
                }])

            if (dbError) throw new Error(dbError.message)

            setSuccess('Post published successfully! View it at /blog/' + slug)
            // Reset Form (optional)
            setTitle('')
            setSlug('')
            setExcerpt('')
            setContent('')
            setImageFile(null)

        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">Admin Access</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Enter Code</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="******"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Create New Post</h1>
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={() => setShowAiPanel(!showAiPanel)}
                            className="text-purple-600 font-bold flex items-center hover:bg-purple-50 px-3 py-2 rounded-lg transition-colors"
                        >
                            <Loader2 className={`w-5 h-5 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                            {showAiPanel ? 'Close AI' : 'Use AI Writer'}
                        </button>
                        <a href="/blog" target="_blank" className="text-blue-600 hover:underline flex items-center">
                            View Blog &rarr;
                        </a>
                    </div>
                </div>

                {/* AI Panel */}
                {showAiPanel && (
                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 mb-8">
                        <h2 className="text-xl font-bold text-purple-900 mb-4 flex items-center">
                            🤖 SEO Content Strategist
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-purple-800 mb-2">Topic / Keyword</label>
                                <input
                                    type="text"
                                    value={aiTopic}
                                    onChange={e => setAiTopic(e.target.value)}
                                    className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="e.g. Best CCTV for windy areas"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-purple-800 mb-2">OpenAI API Key</label>
                                <input
                                    type="password"
                                    value={aiApiKey}
                                    onChange={e => setAiApiKey(e.target.value)}
                                    className="w-full p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="sk-..."
                                />
                                <p className="text-xs text-purple-600 mt-1">Key is saved locally in your browser only.</p>
                            </div>
                            <button
                                onClick={handleAiGenerate}
                                disabled={isGenerating || !aiTopic}
                                className={`w-full py-3 rounded-lg text-white font-bold transition-all ${isGenerating ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
                                    }`}
                            >
                                {isGenerating ? 'Generating awesome content...' : 'Generate SEO Post 🚀'}
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. 5 Tips for Security"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Slug (URL)</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={e => setSlug(e.target.value)}
                                className="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors">
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            accept="image/*"
                            onChange={e => setImageFile(e.target.files?.[0] || null)}
                        />
                        <label htmlFor="fileInput" className="cursor-pointer block">
                            {imageFile ? (
                                <div className="text-green-600 font-bold flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 mr-2" />
                                    {imageFile.name}
                                </div>
                            ) : (
                                <div className="text-slate-500">
                                    <ImageIcon className="w-10 h-10 mx-auto mb-2 text-slate-400" />
                                    <p>Click to upload cover image</p>
                                    <p className="text-xs text-slate-400 mt-1">PG, PNG, WebP (Max 2MB)</p>
                                </div>
                            )}
                        </label>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Short Excerpt (SEO Description)</label>
                        <textarea
                            value={excerpt}
                            onChange={e => setExcerpt(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24"
                            placeholder="Brief summary shown on the card..."
                            required
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Content</label>
                        <div className="text-xs text-slate-500 mb-2">Tip: Use double enter for new paragraph. Start line with "# " for a heading.</div>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-64 font-mono text-sm"
                            placeholder="Write your article here..."
                            required
                        />
                    </div>

                    {/* Status Messages */}
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-50 text-green-600 p-4 rounded-lg flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            {success}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-md transition-all ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Publishing...
                            </span>
                        ) : 'Publish Post'}
                    </button>
                </form>
            </div>
        </div>
    )
}
