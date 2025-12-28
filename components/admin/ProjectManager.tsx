'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase/client'
// Removed uuid import
import { Loader2, CheckCircle, AlertCircle, ImagePlus, Briefcase } from 'lucide-react'

export function ProjectManager() {
    // Project State
    const [projTitle, setProjTitle] = useState('')
    const [projCategory, setProjCategory] = useState('Residential')
    const [projDesc, setProjDesc] = useState('')
    const [projImage, setProjImage] = useState<File | null>(null)

    // Status
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!projImage) { setError('Project image is required'); return }
        setLoading(true); setError(''); setSuccess('')

        try {
            const fileName = `${crypto.randomUUID()}.${projImage.name.split('.').pop()}`
            const { error: upErr } = await supabase.storage.from('project-images').upload(fileName, projImage)
            if (upErr) throw new Error(upErr.message)
            const { data } = supabase.storage.from('project-images').getPublicUrl(fileName)

            const { error: dbErr } = await supabase.from('projects').insert([{
                title: projTitle, category: projCategory, description: projDesc, image_url: data.publicUrl
            }])
            if (dbErr) throw new Error(dbErr.message)

            setSuccess('Project Added to Gallery!'); setProjTitle(''); setProjDesc(''); setProjImage(null)
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'An error occurred'
            setError(msg)
        } finally { setLoading(false) }
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Project Manager</h2>
                <p className="text-slate-500">Add new completed installations to your gallery.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <form onSubmit={handleProjectSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Project Title</label>
                            <input type="text" value={projTitle} onChange={e => setProjTitle(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Luxury Estate Perimeter" required />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                            <div className="relative">
                                <select value={projCategory} onChange={e => setProjCategory(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white appearance-none pr-10">
                                    <option>Residential</option><option>Commercial</option><option>Industrial</option><option>Agricultural</option><option>Estate / HOA</option>
                                </select>
                                <Briefcase className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Project Photo</label>
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:bg-slate-50 transition-colors relative group">
                            <input type="file" id="projImg" className="hidden" accept="image/*" onChange={e => setProjImage(e.target.files?.[0] || null)} />
                            <label htmlFor="projImg" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                                <div className="bg-slate-100 p-3 rounded-full mb-3 group-hover:bg-white transition-colors">
                                    <ImagePlus className="w-6 h-6 text-slate-400" />
                                </div>
                                <span className="text-slate-500 font-medium">{projImage ? <span className="text-green-600 font-bold">{projImage.name}</span> : 'Click to Upload Project Photo'}</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                        <textarea value={projDesc} onChange={e => setProjDesc(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl h-32 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Describe the installation details..." required />
                    </div>

                    <div className="pt-4">
                        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center mb-4"><AlertCircle className="w-5 h-5 mr-2" />{error}</div>}
                        {success && <div className="bg-green-50 text-green-600 p-4 rounded-xl flex items-center mb-4"><CheckCircle className="w-5 h-5 mr-2" />{success}</div>}

                        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-900/10">
                            {loading ? <span className="flex items-center justify-center"><Loader2 className="animate-spin mr-2" /> Saving...</span> : 'Add Project to Gallery'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
