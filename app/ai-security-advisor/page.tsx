'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { advisorSteps, getRecommendation, AdvisorOption, Recommendation } from '@/app/data/advisorLogic'
import {
    ShieldAlert, ScanFace, Eye, Flame,
    Wallet, Briefcase, Gem,
    ArrowRight, CheckCircle2, Loader2, RefreshCcw, ChevronRight
} from 'lucide-react'

// Icon mapping helper
const iconMap: Record<string, React.ReactNode> = {
    Home: <Image src="/icons/residential-security.png" alt="Residential Security" width={64} height={64} className="w-16 h-16 object-contain" />,
    Building2: <Image src="/icons/commercial-security.png" alt="Commercial Security" width={64} height={64} className="w-16 h-16 object-contain" />,
    Factory: <Image src="/icons/industrial-security.png" alt="Industrial Security" width={64} height={64} className="w-16 h-16 object-contain" />,
    Users2: <Image src="/icons/estate-security.png" alt="Estate Security" width={64} height={64} className="w-16 h-16 object-contain" />,
    Tractor: <Image src="/icons/farm-security-v2.png" alt="Farm Security" width={64} height={64} className="w-16 h-16 object-contain" />,
    ShieldAlert: <ShieldAlert className="w-8 h-8" />,
    ScanFace: <ScanFace className="w-8 h-8" />,
    Eye: <Eye className="w-8 h-8" />,
    Flame: <Flame className="w-8 h-8" />,
    Wallet: <Wallet className="w-8 h-8" />,
    Briefcase: <Briefcase className="w-8 h-8" />,
    Gem: <Gem className="w-8 h-8" />,
}

export default function AIAdvisorPage() {
    const [currentStepIndex, setCurrentStepIndex] = useState(-1) // -1 is Welcome screen
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [result, setResult] = useState<Recommendation | null>(null)

    const currentStep = advisorSteps[currentStepIndex]
    const totalSteps = advisorSteps.length

    const handleStart = () => setCurrentStepIndex(0)

    const handleOptionSelect = (optionValue: string) => {
        const stepId = currentStep.id
        const newAnswers = { ...answers, [stepId]: optionValue }
        setAnswers(newAnswers)

        if (currentStepIndex < totalSteps - 1) {
            // Next Step
            setTimeout(() => setCurrentStepIndex(prev => prev + 1), 250) // Slight delay for visual feedback
        } else {
            // Finish / Analyze
            setIsAnalyzing(true)
            setTimeout(() => {
                const rec = getRecommendation(newAnswers)
                setResult(rec)
                setIsAnalyzing(false)
            }, 2000) // Fake analysis delay
        }
    }

    const handleReset = () => {
        setResult(null)
        setAnswers({})
        setCurrentStepIndex(-1)
    }

    // --- RENDERERS ---

    // 1. WELCOME SCREEN
    if (currentStepIndex === -1) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden px-4">
                {/* Background FX */}
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative z-10 text-center max-w-3xl">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-full mb-8 border border-blue-500/30">
                        <Loader2 className="w-6 h-6 text-blue-400 animate-spin-slow mr-2" />
                        <span className="text-blue-300 font-mono text-sm tracking-wider">AI SECURITY SYSTEM V2.0</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                        Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Advisor</span>
                    </h1>
                    <p className="text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto">
                        Unsure what you need? Let our intelligent advisor analyze your property type, risks, and budget to recommend the perfect security strategy.
                    </p>
                    <button
                        onClick={handleStart}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:ring-offset-slate-900"
                    >
                        Start Free Assessment
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 rounded-full ring-4 ring-white/10 group-hover:ring-white/20 transition-all" />
                    </button>
                </div>
            </div>
        )
    }

    // 2. ANALYSIS SCREEN
    if (isAnalyzing) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-center px-4">
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-6" />
                <h2 className="text-3xl font-bold text-white mb-2">Analyzing Requirements...</h2>
                <p className="text-slate-400">Comparing your inputs against 50+ security configurations.</p>
            </div>
        )
    }

    // 3. RESULT SCREEN
    if (result) {
        return (
            <div className="min-h-screen bg-slate-50 py-20 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-12">
                        <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-sm font-bold tracking-wide mb-4">
                            ANALYSIS COMPLETE
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Security Strategy Report</h2>
                        <p className="text-slate-600 text-xl max-w-3xl mx-auto">
                            We've analyzed your requirements and generated a tailored security profile.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Main Strategy Card */}
                        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 relative">
                            {/* Dog Ear Accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 rounded-bl-[4rem] z-10 flex items-center justify-center shadow-lg">
                                <div className="transform rotate-45 text-white/20">
                                    <ShieldAlert className="w-12 h-12" />
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">{result.title}</h3>
                                <div className="flex items-center space-x-4 mb-8">
                                    <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm bg-indigo-50 px-3 py-1 rounded-full">
                                        {result.priority} Package
                                    </span>
                                    <span className="text-slate-500 text-sm flex items-center">
                                        <Loader2 className="w-4 h-4 mr-1 text-green-500" />
                                        Est. Install: {result.timeline}
                                    </span>
                                </div>

                                <div className="space-y-8">
                                    {/* The "Why" */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                                            <Eye className="w-5 h-5 mr-2 text-blue-500" /> Strategic Reasoning
                                        </h4>
                                        <p className="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                            {result.reasoning}
                                        </p>
                                    </div>

                                    {/* Risk Analysis */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-slate-900 mb-3 flex items-center">
                                            <ShieldAlert className="w-5 h-5 mr-2 text-red-500" /> Vulnerability Assessment
                                        </h4>
                                        <p className="text-slate-600 leading-relaxed">
                                            {result.riskAnalysis}
                                        </p>
                                    </div>

                                    {/* Recommended Services Grid */}
                                    <div>
                                        <h4 className="text-lg font-semibold text-slate-900 mb-4">Recommended Hardware & Services</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {result.suggestedServices.map((service, idx) => (
                                                <div key={idx} className="flex items-center p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                                                    <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                                                    <span className="text-slate-800 font-medium text-sm">{service}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar: Cost & Action */}
                        <div className="space-y-8">
                            {/* Estimated Cost Card */}
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                                <div className="relative z-10">
                                    <p className="text-blue-300 font-medium mb-2 uppercase tracking-wide text-xs">Estimated Investment</p>
                                    <div className="text-4xl font-bold mb-1 tracking-tight">{result.estimatedCost}</div>
                                    <p className="text-slate-400 text-sm mb-6">*Includes hardware & labor</p>

                                    <div className="border-t border-slate-700 pt-6 mt-6">
                                        <h5 className="font-semibold mb-4 text-blue-200">Key Benefits</h5>
                                        <ul className="space-y-3">
                                            {result.keyBenefits.map((benefit, i) => (
                                                <li key={i} className="flex items-center text-sm text-slate-300">
                                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3" />
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-lg border border-slate-100 text-center">
                                <p className="text-slate-600 mb-6">
                                    Ready to implement this strategy?
                                </p>
                                <Link
                                    href="/contact?ref=advisor"
                                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-center transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 mb-4"
                                >
                                    Get Official Quote
                                </Link>
                                <button
                                    onClick={handleReset}
                                    className="block w-full bg-white border-2 border-slate-200 text-slate-600 font-bold py-4 px-6 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all"
                                >
                                    Start Over
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // 4. WIZARD STEPS
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header / Progress */}
            <div className="bg-white border-b border-slate-200 py-6 px-4">
                <div className="container mx-auto max-w-3xl flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step {currentStepIndex + 1} of {totalSteps}</span>
                    </div>
                    <button onClick={handleReset} className="text-slate-400 hover:text-slate-600 text-sm font-medium">Exit</button>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-1 bg-slate-100 mt-6 absolute bottom-0 left-0">
                    <div
                        className="h-full bg-blue-600 transition-all duration-500 ease-out"
                        style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question Area */}
            <div className="flex-grow flex items-center justify-center px-4 py-12">
                <div className="max-w-4xl w-full">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center animate-fade-in-up">
                        {currentStep.question}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentStep.options.map((option: AdvisorOption) => (
                            <button
                                key={option.id}
                                onClick={() => handleOptionSelect(option.value)}
                                className={`
                                    relative group p-8 rounded-[2rem] border-2 text-left transition-all duration-300
                                    ${answers[currentStep.id] === option.value
                                        ? 'border-blue-600 bg-blue-50 shadow-xl scale-105'
                                        : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-1'
                                    }
                                `}
                            >
                                <div className={`
                                    w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors
                                    ${answers[currentStep.id] === option.value
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                                    }
                                `}>
                                    {option.icon && iconMap[option.icon]}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{option.label}</h3>
                                <div className={`
                                    w-8 h-8 rounded-full border-2 flex items-center justify-center absolute top-6 right-6 transition-all
                                    ${answers[currentStep.id] === option.value
                                        ? 'border-blue-600 bg-blue-600 text-white'
                                        : 'border-slate-200 text-transparent group-hover:border-blue-300'
                                    }
                                `}>
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Step Navigation Hint */}
            <div className="py-8 text-center text-slate-400 text-sm">
                Select an option to proceed
            </div>
        </div>
    )
}
