'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { advisorSteps, getRecommendation, AdvisorOption, Recommendation } from '@/app/data/advisorLogic'
import {
    ShieldAlert, ScanFace, Eye, Flame,
    Wallet, Briefcase, Gem,
    CheckCircle2, Loader2, Camera, Slash, ArrowRight
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
    Camera: <Camera className="w-8 h-8" />,
    Slash: <Slash className="w-8 h-8" />,
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
            <div className="min-h-screen bg-brand-navy flex flex-col items-center justify-center relative overflow-hidden px-4 selection:bg-brand-electric selection:text-brand-navy">
                {/* Background FX */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/page-heroes/ai-advisor-hero.png"
                        alt="AI Security Advisor"
                        fill
                        className="object-cover opacity-30 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-electric/5 via-brand-navy/90 to-brand-navy z-10" />
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center p-3 px-6 bg-brand-electric/10 rounded-full mb-10 border border-brand-electric/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                        <Loader2 className="w-5 h-5 text-brand-electric animate-spin-slow mr-3 drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]" />
                        <span className="text-brand-electric font-black text-sm tracking-widest uppercase">AI SECURITY SYSTEM V2.0</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-white mb-8 tracking-tighter drop-shadow-2xl">
                        Intelligent <br className="hidden md:block" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-electric filter drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">Security Advisor</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-brand-steel/80 mb-14 leading-relaxed max-w-3xl mx-auto font-light">
                        Unsure what you need? Let our intelligent advisor analyze your property type, risks, and budget to recommend the perfect security strategy in seconds.
                    </p>
                    <button
                        onClick={handleStart}
                        className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-black text-brand-navy transition-all duration-300 bg-brand-electric rounded-full hover:bg-brand-white focus:outline-none hover:scale-105 shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
                    >
                        Initialize Assessment
                        <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                        <div className="absolute inset-0 rounded-full ring-4 ring-white/10 group-hover:ring-white/30 transition-all duration-500" />
                    </button>
                </div>
                
                {/* Cyber Decorative Elements */}
                <div className="absolute bottom-10 left-10 hidden md:flex items-center space-x-2 opacity-50 z-10">
                    <div className="w-2 h-2 rounded-full bg-brand-electric animate-pulse duration-1000" />
                    <span className="text-brand-electric font-mono text-xs tracking-widest uppercase">System Online</span>
                </div>
                <div className="absolute bottom-10 right-10 hidden md:flex items-center space-x-2 opacity-50 z-10">
                    <span className="text-brand-electric font-mono text-xs tracking-widest uppercase">Neural Net Active</span>
                    <div className="w-2 h-2 rounded-full bg-brand-electric animate-pulse duration-700" />
                </div>
            </div>
        )
    }

    // 2. ANALYSIS SCREEN
    if (isAnalyzing) {
        return (
            <div className="min-h-screen bg-brand-navy flex flex-col items-center justify-center text-center px-4">
                <Loader2 className="w-16 h-16 text-brand-electric animate-spin mb-6" />
                <h2 className="text-3xl font-bold text-white mb-2">Analyzing Requirements...</h2>
                <p className="text-brand-steel">Comparing your inputs against 50+ security configurations.</p>
            </div>
        )
    }

    // 3. RESULT SCREEN
    if (result) {
        return (
            <div className="min-h-screen bg-brand-navy py-12 px-4 selection:bg-brand-electric selection:text-brand-navy">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-12">
                        <span className="inline-flex py-1 px-4 rounded-full bg-brand-electric/20 border border-brand-electric/50 text-brand-electric text-sm font-black tracking-widest mb-6 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                            ANALYSIS COMPLETE
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-brand-white mb-6 tracking-tight drop-shadow-lg">Security Strategy <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-electric">Report</span></h2>
                        <p className="text-brand-steel text-xl max-w-3xl mx-auto font-light">
                            We&apos;ve analyzed your requirements and generated a tailored security profile.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Main Strategy Card */}
                        <div className="lg:col-span-2 bg-brand-navy/60 backdrop-blur-2xl rounded-[3rem] shadow-[0_0_40px_rgba(0,0,0,0.3)] overflow-hidden border border-brand-white/10 ring-1 ring-brand-white/5 relative">
                            {/* Dog Ear Accent */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-electric/20 rounded-bl-[5rem] z-10 flex items-center justify-center shadow-[inset_0_0_30px_rgba(0,229,255,0.3)] backdrop-blur-md border-b border-l border-brand-electric/30">
                                <div className="transform rotate-12 text-brand-electric drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]">
                                    <ShieldAlert className="w-16 h-16" />
                                </div>
                            </div>

                            <div className="p-8 md:p-12 relative z-20">
                                <h3 className="text-4xl font-black text-brand-white mb-4 tracking-tight">{result.title}</h3>
                                <div className="flex items-center space-x-4 mb-10">
                                    <span className="text-brand-navy font-black uppercase tracking-widest text-sm bg-brand-electric px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,229,255,0.5)]">
                                        {result.priority} Package
                                    </span>
                                    <span className="text-brand-steel text-sm flex items-center font-medium">
                                        <Loader2 className="w-4 h-4 mr-2 text-brand-electric animate-spin-slow" />
                                        Est. Install: {result.timeline}
                                    </span>
                                </div>

                                <div className="space-y-10">
                                    {/* The "Why" */}
                                    <div>
                                        <h4 className="text-xl font-bold text-brand-white mb-4 flex items-center tracking-tight">
                                            <Eye className="w-6 h-6 mr-3 text-brand-electric drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]" /> Strategic Reasoning
                                        </h4>
                                        <p className="text-brand-steel leading-relaxed bg-brand-navy/50 p-6 rounded-3xl border border-brand-white/10 shadow-inner font-light">
                                            {result.reasoning}
                                        </p>
                                    </div>

                                    {/* Risk Analysis */}
                                    <div>
                                        <h4 className="text-xl font-bold text-brand-white mb-4 flex items-center tracking-tight">
                                            <ShieldAlert className="w-6 h-6 mr-3 text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]" /> Vulnerability Assessment
                                        </h4>
                                        <p className="text-brand-steel leading-relaxed bg-red-950/20 p-6 rounded-3xl border border-red-500/20 shadow-inner font-light">
                                            {result.riskAnalysis}
                                        </p>
                                    </div>

                                    {/* Recommended Services Grid */}
                                    <div>
                                        <h4 className="text-xl font-bold text-brand-white mb-6 tracking-tight">Recommended Hardware & Services</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {result.suggestedServices.map((service, idx) => (
                                                <div key={idx} className="flex items-center p-4 bg-brand-electric/5 backdrop-blur-md rounded-2xl border border-brand-electric/20 hover:border-brand-electric/40 hover:bg-brand-electric/10 transition-colors shadow-sm">
                                                    <CheckCircle2 className="w-5 h-5 text-brand-electric mr-3 flex-shrink-0 drop-shadow-[0_0_3px_rgba(0,229,255,0.5)]" />
                                                    <span className="text-brand-white font-medium text-sm">{service}</span>
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
                            <div className="bg-brand-navy rounded-[3rem] p-10 text-white relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-brand-white/10 ring-1 ring-brand-white/5">
                                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 mix-blend-overlay" />
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-electric/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                                <div className="relative z-10">
                                    <p className="text-brand-electric font-bold mb-3 uppercase tracking-widest text-xs drop-shadow-[0_0_5px_rgba(0,229,255,0.2)]">Estimated Investment</p>
                                    <div className="text-5xl font-black mb-2 tracking-tighter drop-shadow-md">{result.estimatedCost}</div>
                                    <p className="text-brand-steel text-sm mb-8 font-light">*Includes hardware & labor</p>

                                    <div className="border-t border-brand-white/10 pt-8 mt-8">
                                        <h5 className="font-bold mb-6 text-brand-white tracking-tight">Key Benefits</h5>
                                        <ul className="space-y-4">
                                            {result.keyBenefits.map((benefit, i) => (
                                                <li key={i} className="flex items-center text-sm text-brand-steel font-medium">
                                                    <div className="w-2 h-2 bg-brand-electric rounded-full mr-4 shadow-[0_0_5px_rgba(0,229,255,0.8)]" />
                                                    {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="bg-brand-navy/40 backdrop-blur-xl rounded-[3rem] p-10 shadow-[0_0_30px_rgba(0,0,0,0.2)] border border-brand-white/10 text-center ring-1 ring-brand-white/5">
                                <p className="text-brand-white font-bold mb-6 text-lg tracking-tight">
                                    Ready to implement this strategy?
                                </p>
                                <Link
                                    href="/contact?ref=advisor"
                                    className="block w-full bg-brand-electric hover:bg-brand-white text-brand-navy font-black py-4 px-6 rounded-2xl text-center transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:-translate-y-1 mb-4"
                                >
                                    Get Official Quote
                                </Link>
                                <button
                                    onClick={handleReset}
                                    className="block w-full bg-transparent border-2 border-brand-white/20 text-brand-white font-bold py-4 px-6 rounded-2xl hover:border-brand-electric hover:text-brand-electric transition-all"
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

    // 4. UPLOAD SCREEN (Custom Handling)
    if (currentStep.id === 'upload') {
        return (
            <div className="min-h-screen bg-brand-navy flex flex-col selection:bg-brand-electric selection:text-brand-navy">
                {/* Header */}
                <div className="bg-brand-navy/80 backdrop-blur-3xl border-b border-brand-white/10 py-6 px-4 z-50">
                    <div className="container mx-auto max-w-3xl flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="text-xs font-black text-brand-electric uppercase tracking-widest drop-shadow-[0_0_5px_rgba(0,229,255,0.3)]">Step {currentStepIndex + 1} of {totalSteps}</span>
                        </div>
                        <button onClick={handleReset} className="text-brand-steel hover:text-brand-white text-sm font-bold transition-colors">Abort</button>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-brand-white/5 mt-6 absolute bottom-0 left-0">
                        <div
                            className="h-full bg-brand-electric shadow-[0_0_15px_rgba(0,229,255,0.8)] transition-all duration-500 ease-out"
                            style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="flex-grow flex items-center justify-center px-4 py-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-electric/5 via-brand-navy to-brand-navy pointer-events-none" />
                    
                    <div className="max-w-2xl w-full text-center relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black text-brand-white mb-10 animate-fade-in-up tracking-tight drop-shadow-md">
                            {currentStep.question}
                        </h2>

                        <div className="bg-brand-navy/60 backdrop-blur-xl p-12 rounded-[3.5rem] border-2 border-dashed border-brand-electric/30 hover:border-brand-electric transition-colors duration-500 mb-10 cursor-pointer relative group shadow-[0_0_40px_rgba(0,0,0,0.3)] hover:shadow-[0_0_50px_rgba(0,229,255,0.15)] ring-1 ring-brand-white/5">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                        // Simulator upload delay
                                        handleOptionSelect('uploaded')
                                    }
                                }}
                            />
                            <div className="flex flex-col items-center pointer-events-none">
                                <div className="w-24 h-24 bg-brand-electric/10 rounded-full flex items-center justify-center text-brand-electric mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_0_20px_rgba(0,229,255,0.3)] drop-shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                                    <Image src="/icons/residential-security.png" alt="Upload" width={40} height={40} className="opacity-0 absolute" />
                                    <Camera className="w-12 h-12" />
                                </div>
                                <h3 className="text-2xl font-black text-brand-white mb-2 tracking-tight">Access Secure Upload</h3>
                                <p className="text-brand-steel text-sm font-light">End-to-end encrypted • JPG or PNG (Max 5MB)</p>
                            </div>
                        </div>

                        <button
                            onClick={() => handleOptionSelect('skip')}
                            className="text-brand-steel hover:text-brand-white font-bold text-sm tracking-wide transition-colors"
                        >
                            Or analyze via manual input strictly &rarr;
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // 5. STANDARD WIZARD STEPS
    return (
        <div className="min-h-screen bg-brand-navy flex flex-col selection:bg-brand-electric selection:text-brand-navy relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-electric/5 via-brand-navy to-brand-navy pointer-events-none" />

            {/* Header / Progress */}
            <div className="bg-brand-navy/80 backdrop-blur-3xl border-b border-brand-white/10 py-6 px-4 z-50">
                <div className="container mx-auto max-w-3xl flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs font-black text-brand-electric uppercase tracking-widest drop-shadow-[0_0_5px_rgba(0,229,255,0.3)]">Step {currentStepIndex + 1} of {totalSteps}</span>
                    </div>
                    <button onClick={handleReset} className="text-brand-steel hover:text-brand-white text-sm font-bold transition-colors">Abort</button>
                </div>
                {/* Progress Bar */}
                <div className="w-full h-1 bg-brand-white/5 mt-6 absolute bottom-0 left-0">
                    <div
                        className="h-full bg-brand-electric shadow-[0_0_15px_rgba(0,229,255,0.8)] transition-all duration-500 ease-out"
                        style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question Area */}
            <div className="flex-grow flex items-center justify-center px-4 py-12 relative z-10">
                <div className="max-w-5xl w-full">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand-white mb-16 text-center animate-fade-in-up tracking-tight drop-shadow-md">
                        {currentStep.question}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentStep.options.map((option: AdvisorOption) => (
                            <button
                                key={option.id}
                                onClick={() => handleOptionSelect(option.value)}
                                className={`
                                    relative group p-8 rounded-[3rem] border border-brand-white/10 text-left transition-all duration-500 overflow-hidden ring-1 ring-brand-white/5
                                    ${answers[currentStep.id] === option.value
                                        ? 'bg-brand-electric/10 shadow-[0_0_30px_rgba(0,229,255,0.2)] scale-105 backdrop-blur-3xl ring-brand-electric border-brand-electric/40'
                                        : 'bg-brand-navy/60 backdrop-blur-xl hover:bg-brand-white/5 hover:border-brand-electric/30 hover:shadow-[0_0_40px_rgba(0,229,255,0.1)] hover:-translate-y-2'
                                    }
                                `}
                            >
                                <div className={`
                                    w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500 border
                                    ${answers[currentStep.id] === option.value
                                        ? 'bg-brand-electric text-brand-navy border-brand-electric shadow-[0_0_20px_rgba(0,229,255,0.5)]'
                                        : 'bg-brand-navy border-brand-white/10 text-brand-steel group-hover:bg-brand-electric/10 group-hover:text-brand-electric group-hover:border-brand-electric/30 group-hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                                    }
                                `}>
                                    {option.icon && iconMap[option.icon]}
                                </div>
                                <h3 className="text-2xl font-black text-brand-white mb-2 tracking-tight">{option.label}</h3>
                                <div className={`
                                    w-8 h-8 rounded-full border-2 flex items-center justify-center absolute top-8 right-8 transition-all duration-500 shadow-sm
                                    ${answers[currentStep.id] === option.value
                                        ? 'border-brand-electric bg-brand-electric text-brand-navy drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]'
                                        : 'border-brand-white/10 text-transparent group-hover:border-brand-electric/40 bg-brand-navy'
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
            <div className="py-8 text-center text-brand-steel/60 text-sm font-medium tracking-wide uppercase">
                Awaiting input configuration
            </div>
        </div>
    )
}


