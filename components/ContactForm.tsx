'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Loader2, CheckCircle, AlertCircle, User, Phone, Mail, MapPin, Briefcase } from 'lucide-react'

export function ContactForm() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true); setError(null); setSuccess(false)

        const formData = new FormData(event.currentTarget)
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const phone = formData.get('phone') as string
        const service = formData.get('service') as string
        const suburb = formData.get('suburb') as string

        const form = event.currentTarget

        try {
            // FIX APPLIED: Using upsert to prevent duplicate email crashes
            const { error: supabaseError } = await supabase
                .from('clients')
                .upsert([
                    {
                        name: name,
                        email: email,
                        phone: phone,
                        company: `Website Inquiry - ${service || 'General'}`, // This tags them as a web lead
                        address: suburb,
                        metadata: {
                            last_service_interest: service,
                            source: 'website_form'
                        }
                    },
                ], { onConflict: 'email' }) // This ensures we update, not error

            if (supabaseError) throw supabaseError

            setSuccess(true)
            form.reset()
        } catch (err: unknown) {
            console.error('Submission error:', err)
            const errorMsg = err instanceof Error ? err.message : 'Something went wrong'
            setError(errorMsg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">Get a Free Security Strategy Session</h3>
            {success && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-6 rounded-r-xl mb-6 flex items-start shadow-sm">
                    <CheckCircle className="w-6 h-6 mr-4 mt-0.5 shrink-0 text-green-600" />
                    <div>
                        <h4 className="font-bold mb-1">Request Received!</h4>
                        <p className="text-green-700">Thank you! One of our security experts will contact you shortly.</p>
                    </div>
                </div>
            )}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-6 rounded-r-xl mb-6 flex items-start shadow-sm">
                    <AlertCircle className="w-6 h-6 mr-4 mt-0.5 shrink-0 text-red-600" />
                    <div><h4 className="font-bold mb-1">Submission Error</h4><p>{error}</p></div>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                        <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><input name="name" required className="w-full pl-11 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" /></div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                        <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><input name="phone" required type="tel" className="w-full pl-11 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="082 123 4567" /></div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><input name="email" required type="email" className="w-full pl-11 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Suburb / Area</label>
                        <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><input name="suburb" className="w-full pl-11 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Durbanville" /></div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Service Interested In</label>
                        <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" /><select name="service" className="w-full pl-11 pr-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none"><option value="General Inquiry">General Inquiry</option><option value="Alarm Installation">Alarm Installation</option><option value="CCTV Systems">CCTV Systems</option><option value="Electric Fencing">Electric Fencing</option><option value="Access Control">Access Control</option><option value="Gate Automation">Gate Automation</option></select></div>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full shadow-md hover:shadow-lg transition-all flex justify-center items-center">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get My Free Quote'}</button>
            </form>
        </div>
    )
}
