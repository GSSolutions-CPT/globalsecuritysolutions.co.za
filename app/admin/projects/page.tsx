'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { v4 as uuidv4 } from 'uuid'
import { Image as ImageIcon, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function AdminProjectsPage() {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')

    // Form State
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    // Project Data
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('Residential')
    const [description, setDescription] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === 'admin123') {
            setIsAuthenticated(true)
        } else {
            setError('Incorrect Password')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!imageFile) {
            setError('Please select an image')
            return
        }

        setLoading(true)
        setError('')
        setSuccess('')

        try {
            // 1. Upload Image
            const fileExt = imageFile.name.split('.').pop()
            const fileName = `${uuidv4()}.${fileExt}`
            const { error: uploadError } = await supabase.storage
                .from('project-images')
                .upload(fileName, imageFile)

            if (uploadError) throw new Error(`Image Upload Failed: ${uploadError.message}`)

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('project-images')
                .getPublicUrl(fileName)

            // 2. Insert into Database
            const { error: dbError } = await supabase
                .from('projects')
                .insert([{
                    title,
                    category,
                    description,
                    image_url: publicUrl
                }])

            if (dbError) throw new Error(dbError.message)

            setSuccess('Project added successfully! Check the gallery.')
            // Reset Form 
            setTitle('')
            setCategory('Residential')
            setDescription('')
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
                    <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">Project Manager Access</h1>
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
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Add New Project</h1>
                    <a href="/projects" target="_blank" className="text-blue-600 hover:underline">View Gallery &rarr;</a>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Project Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g. Camps Bay Installation"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            >
                                <option value="Residential">Residential</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Industrial">Industrial</option>
                                <option value="Agricultural">Agricultural</option>
                                <option value="Estate / HOA">Estate / HOA</option>
                            </select>
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
                                    <p>Click to upload photo</p>
                                    <p className="text-xs text-slate-400 mt-1">PG, PNG, WebP (Max 2MB)</p>
                                </div>
                            )}
                        </label>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Short Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24"
                            placeholder="What did we install? (e.g. 5x Hikvision Cameras and Paradox Alarm)"
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
                                <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Uploading...
                            </span>
                        ) : 'Add Project to Gallery'}
                    </button>
                </form>
            </div>
        </div>
    )
}
