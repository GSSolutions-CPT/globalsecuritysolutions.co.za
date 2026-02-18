"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/portal/supabase'
import { toast } from 'sonner'
import { hexToHsl } from '@/lib/portal/utils'

type SettingsContextType = {
    settings: Record<string, any>
    loading: boolean
    updateSetting: (key: string, value: any) => Promise<void>
    refreshSettings: () => Promise<void>
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<Record<string, any>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSettings()
    }, [])

    // Dynamic Theming Effect
    useEffect(() => {
        if (settings.primaryColor) {
            const root = document.documentElement
            const hsl = hexToHsl(settings.primaryColor)
            root.style.setProperty('--primary', hsl)
        }
    }, [settings.primaryColor])

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase.from('settings').select('*')
            if (error) {
                console.warn('Settings fetch error (table may not exist yet):', error)
                throw error
            }

            const settingsMap: Record<string, any> = {}
            if (data) {
                data.forEach((item: any) => {
                    settingsMap[item.key] = item.value
                })
            }
            setSettings(settingsMap)

            // Sync to localStorage
            Object.keys(settingsMap).forEach(key => {
                localStorage.setItem(key, settingsMap[key])
            })

        } catch (error) {
            console.log('Falling back to localStorage for settings')
            const localKeys = [
                'companyName', 'companyAddress', 'companyPhone', 'companyEmail', 'companyVat',
                'bankName', 'bankAccountHolder', 'bankAccountNumber', 'bankAccountType', 'bankBranchCode', 'bankReference',
                'primaryColor', 'taxRate', 'logoUrl', 'whatsappNumber', 'legalTerms', 'defaultQuoteValidityDays'
            ]
            const localSettings: Record<string, any> = {}
            localKeys.forEach(key => {
                const val = localStorage.getItem(key)
                if (val) localSettings[key] = val
            })
            setSettings(prev => ({ ...prev, ...localSettings }))
        } finally {
            setLoading(false)
        }
    }

    const updateSetting = async (key: string, value: any) => {
        try {
            // Optimistic update
            setSettings(prev => ({ ...prev, [key]: value }))
            localStorage.setItem(key, value)

            // Upsert to Supabase
            const { error } = await supabase
                .from('settings')
                .upsert({ key, value }, { onConflict: 'key' })

            if (error) throw error
            // toast.success('Setting saved') 
        } catch (error) {
            console.error('Error updating setting:', error)
            toast.error('Failed to save settings')
        }
    }

    return (
        <SettingsContext.Provider value={{ settings, loading, updateSetting, refreshSettings: fetchSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}

export const useSettings = () => {
    const context = useContext(SettingsContext)
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider')
    }
    return context
}
