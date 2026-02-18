"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type CurrencyContextType = {
    currency: string
    updateCurrency: (newCurrency: string) => void
    formatCurrency: (amount: number | string) => string
    currencies: { code: string; symbol: string; locale: string }[]
    setCurrency: (currency: string) => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrency] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('currency') || 'ZAR'
        }
        return 'ZAR'
    })

    const currencies = [
        { code: 'ZAR', symbol: 'R', locale: 'en-ZA' },
        { code: 'USD', symbol: '$', locale: 'en-US' },
        { code: 'EUR', symbol: '€', locale: 'en-IE' },
        { code: 'GBP', symbol: '£', locale: 'en-GB' },
    ]

    const updateCurrency = (newCurrency: string) => {
        setCurrency(newCurrency)
        localStorage.setItem('currency', newCurrency)
    }

    const formatCurrency = (amount: number | string) => {
        const value = parseFloat(amount as string) || 0

        const config: Record<string, { locale: string; currency: string }> = {
            ZAR: { locale: 'en-ZA', currency: 'ZAR' },
            USD: { locale: 'en-US', currency: 'USD' },
            EUR: { locale: 'en-IE', currency: 'EUR' },
            GBP: { locale: 'en-GB', currency: 'GBP' },
        }

        const { locale, currency: currencyCode } = config[currency] || config.ZAR

        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currencyCode,
        }).format(value)
    }

    return (
        <CurrencyContext.Provider value={{ currency, updateCurrency, formatCurrency, currencies, setCurrency: updateCurrency }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export function useCurrency() {
    const context = useContext(CurrencyContext)
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider')
    }
    return context
}
