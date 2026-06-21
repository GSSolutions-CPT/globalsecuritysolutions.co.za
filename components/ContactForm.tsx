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
            // 1. Check if client already exists
            const { data: existingClient } = await supabase
                .from('clients')
                .select('id, metadata')
                .eq('email', email)
                .single()

            let clientId = existingClient?.id

            if (existingClient) {
                // Client exists: SAFELY update metadata only via RPC
                // This prevents exposing public UPDATE permissions on the clients table
                const { error: updateError } = await supabase.rpc('update_lead_interest', {
                    p_email: email,
                    p_service: service || 'General'
                })

                if (updateError) {
                    console.error('Failed to update lead interest:', updateError)
                    // Continue to log activity
                }
            } else {
                // 2. New Client: Insert normally
                const { data: newClient, error: createError } = await supabase
                    .from('clients')
                    .insert([
                        {
                            name,
                            email,
                            phone,
                            address: suburb,
                            company: null, // Keep clean for real business names
                            metadata: {
                                source: 'website_form',
                                service_interest: service,
                                last_inquiry_date: new Date().toISOString()
                            }
                        }
                    ])
                    .select()
                    .single()

                if (createError) throw createError
                clientId = newClient.id
            }

            // 3. Log Activity (CRITICAL for Dashboard Visibility)
            const { error: logError } = await supabase
                .from('activity_log')
                .insert([
                    {
                        type: existingClient ? 'Lead Inquiry' : 'New Lead',
                        description: `Website Inquiry: ${service || 'General'}`,
                        related_entity_id: clientId,
                        related_entity_type: 'client'
                    }
                ])

            if (logError) {
                console.error('Failed to log activity:', logError)
                // We don't throw here to avoid failing the user submission if just logging fails
            }

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
        <div className="w-full">
            <h3 className="text-xl md:text-2xl font-black mb-6 text-brand-navy tracking-tight">Get a Free Security Strategy Session</h3>

            {success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-5 rounded-2xl mb-6 flex items-start">
                    <CheckCircle className="w-6 h-6 mr-3 mt-0.5 shrink-0 text-emerald-600" />
                    <div>
                        <h4 className="font-semibold mb-0.5">Thank you — your request has been received.</h4>
                        <p className="text-emerald-800/90 text-sm">A security specialist will contact you shortly to arrange your free assessment. We typically respond the same business day.</p>
                    </div>
                </div>
            )}
            {error && (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 p-5 rounded-2xl mb-6 flex items-start">
                    <AlertCircle className="w-6 h-6 mr-3 mt-0.5 shrink-0 text-amber-600" />
                    <div><h4 className="font-semibold mb-0.5">There was a problem submitting your request</h4><p className="text-sm">{error}</p></div>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1.5">Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-steel" />
                            <input name="name" required className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-brand-steel/30 rounded-xl focus:border-brand-electric focus:ring-1 focus:ring-brand-electric outline-none transition-all duration-200 text-brand-navy font-semibold text-sm" placeholder="John Doe" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1.5">Phone</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-steel" />
                            <input name="phone" required type="tel" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-brand-steel/30 rounded-xl focus:border-brand-electric focus:ring-1 focus:ring-brand-electric outline-none transition-all duration-200 text-brand-navy font-semibold text-sm" placeholder="082 123 4567" />
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1.5">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-steel" />
                        <input name="email" required type="email" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-brand-steel/30 rounded-xl focus:border-brand-electric focus:ring-1 focus:ring-brand-electric outline-none transition-all duration-200 text-brand-navy font-semibold text-sm" placeholder="john@example.com" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1.5">Suburb / Area</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-steel" />
                            <input name="suburb" className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-brand-steel/30 rounded-xl focus:border-brand-electric focus:ring-1 focus:ring-brand-electric outline-none transition-all duration-200 text-brand-navy font-semibold text-sm" placeholder="e.g. Durbanville" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-brand-slate uppercase tracking-wider mb-1.5">Service Interested In</label>
                        <div className="relative">
                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-steel" />
                            <select aria-label="Select a Service" name="service" required defaultValue="" className="w-full pl-11 pr-8 py-2.5 bg-gray-50 border border-brand-steel/30 rounded-xl focus:border-brand-electric focus:ring-1 focus:ring-brand-electric outline-none transition-all duration-200 text-brand-navy font-semibold text-sm appearance-none bg-white">
                                <option value="" disabled>Select a Service</option>
                                <option value="General Inquiry">General Inquiry</option>
                                <optgroup label="Residential Security">
                                    <option value="Smart Alarm System">Smart Alarm System</option>
                                    <option value="Home CCTV & Remote View">Home CCTV & Remote View</option>
                                    <option value="Perimeter Beams (Garden)">Perimeter Beams (Garden)</option>
                                    <option value="Video Intercom & Gate">Video Intercom & Gate</option>
                                </optgroup>
                                <optgroup label="Commercial & Industrial">
                                    <option value="Biometric Access Control">Biometric Access Control</option>
                                    <option value="IP Camera Network (AI)">IP Camera Network (AI)</option>
                                    <option value="Fire Detection Integration">Fire Detection Integration</option>
                                    <option value="Time & Attendance">Time & Attendance</option>
                                </optgroup>
                                <optgroup label="Specialized Solutions">
                                    <option value="Solar Perimeter Beams">Solar Perimeter Beams (Farm/Remote)</option>
                                    <option value="LPR (License Plate Recognition)">LPR (License Plate Recognition)</option>
                                    <option value="Off-Site Monitoring Setup">Off-Site Monitoring Setup</option>
                                    <option value="Electric Fencing">Electric Fencing</option>
                                </optgroup>
                                <option value="Maintenance & Repairs">Maintenance & Repairs</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-full shadow-lg shadow-red-600/10 hover:shadow-red-600/25 active:scale-[0.98] transition-all duration-200 flex justify-center items-center cursor-pointer">{loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get My Free Quote'}</button>
            </form>
        </div>
    )
}
