export type AdvisorStep = {
    id: string;
    question: string;
    options: AdvisorOption[];
}

export type AdvisorOption = {
    id: string;
    label: string;
    icon?: string;
    value: string;
}

export type Recommendation = {
    title: string;
    description: string;
    suggestedServices: string[];
    priority: 'Essential' | 'Recommended' | 'Advanced';

    // New Fields for Detailed Report
    reasoning: string;
    riskAnalysis: string;
    estimatedCost: string;
    timeline: string;
    keyBenefits: string[];
}

export const advisorSteps: AdvisorStep[] = [
    {
        id: 'property',
        question: "What type of property are you looking to secure?",
        options: [
            { id: 'res', label: "Residential Home", value: 'residential', icon: 'Home' },
            { id: 'com', label: "Business / Office", value: 'commercial', icon: 'Building2' },
            { id: 'ind', label: "Industrial / Warehouse", value: 'industrial', icon: 'Factory' },
            { id: 'est', label: "HOA / Estate", value: 'estate', icon: 'Users2' },
            { id: 'frm', label: "Farm / Agricultural", value: 'farm', icon: 'Tractor' },
        ]
    },
    {
        id: 'concern',
        question: "What is your primary security concern?",
        options: [
            { id: 'break', label: "Burglary / Intrusion", value: 'intrusion', icon: 'ShieldAlert' },
            { id: 'access', label: "Unwanted Access / Control", value: 'access', icon: 'ScanFace' },
            { id: 'mon', label: "Lack of Visibility / Monitoring", value: 'monitoring', icon: 'Eye' },
            { id: 'fire', label: "Fire / Safety Hazards", value: 'safety', icon: 'Flame' },
        ]
    },
    {
        id: 'upload',
        question: "Would you like to analyze a photo of your property?",
        options: [
            { id: 'yes_upload', label: "Yes, Upload Photo", value: 'upload', icon: 'Camera' },
            { id: 'skip_upload', label: "Skip for now", value: 'skip', icon: 'Slash' },
        ]
    },
    {
        id: 'budget',
        question: "What is your approximate budget range?",
        options: [
            { id: 'ess', label: "Essential (Core protection only)", value: 'essential', icon: 'Wallet' },
            { id: 'comp', label: "Comprehensive (Balanced coverage)", value: 'comprehensive', icon: 'Briefcase' },
            { id: 'prem', label: "Premium (Top-tier tech & integration)", value: 'premium', icon: 'Gem' },
        ]
    }
];

export const getRecommendation = (answers: Record<string, string>): Recommendation => {
    const { property, concern, budget } = answers;

    let title = "Custom Security Strategy";
    let description = "Based on your inputs, we recommend a tailored approach.";
    let services: string[] = [];
    let reasoning = "";
    let riskAnalysis = "";
    let estimatedCost = "R15 000 - R25 000";
    let timeline = "2-3 Days";
    let keyBenefits: string[] = [];

    // --- LOGIC TREE ---

    // 1. PROPERTY & CONCERN LOGIC
    if (property === 'residential') {
        title = "Home Sanctuary Protection";
        if (concern === 'intrusion') {
            services = ["Smart Alarm System", "Perimeter Beams", "Armed Response Link"];
            description = "For home burglary prevention, an early warning system is key. We recommend independent perimeter beams tailored to your garden layout.";
            reasoning = "Perimeter detection stops intruders *before* they damage your property. Combining this with a smart alarm ensures instant alerts to you and armed response.";
            riskAnalysis = "High risk of opportunistic theft. Hidden garden corners and darker areas are primary vulnerability points.";
            keyBenefits = ["Early Detection (Before Entry)", "Smartphone Alerts", "Pet-Friendly Sensors"];
        } else if (concern === 'monitoring') {
            services = ["Home CCTV System", "Remote Viewing App", "Video Intercom"];
            description = "To enhance visibility, a high-definition CCTV kit with mobile access will give you peace of mind from anywhere.";
            reasoning = "Visual verification prevents false alarms. Being able to check your cameras remotely provides assurance when traveling or late at night.";
            riskAnalysis = "Lack of visibility at key entry points (gate, front door) creates blind spots for criminals to test security.";
            keyBenefits = ["Remote Viewing via App", "HD Night Vision", "Event Recording"];
        } else if (concern === 'access') {
            services = ["Video Intercom", "Smart Gate Motor", "Electric Fencing"];
            description = "Controlling who enters your property starts at the gate. A smart intercom and secure gate automation are essential.";
            reasoning = "Driveway hijackings and forced gate entries are common. A reinforced gate motor and visual intercom allow you to verify visitors safely.";
            riskAnalysis = "The driveway is the highest risk zone during entry/exit. Slow gate motors increase vulnerability time.";
            keyBenefits = ["Visitor Verification", "Anti-Tamper Gate Motor", "Secure Perimeter"];
        }
    } else if (property === 'commercial' || property === 'industrial') {
        title = "Business Asset Defender";
        if (concern === 'access') {
            services = ["Biometric Access Control", "Time & Attendance", "Turnstiles"];
            description = "Managing staff and visitor flow is critical. Biometric scanners ensure only authorized personnel enter specific zones.";
            reasoning = "Keys and codes can be shared or lost. Biometrics provide irrefutable proof of identity and attendance.";
            riskAnalysis = "Internal shrinkage and unauthorized access to sensitive areas (server rooms, stock) are major business risks.";
            keyBenefits = ["Audit Trails", "Staff Management", "Zone Restriction"];
        } else if (concern === 'monitoring') {
            services = ["IP Camera Network", "Control Room Setup", "Off-site Monitoring"];
            description = "For large sites, intelligent video analytics can detect loitering or unauthorized movement automatically.";
            reasoning = "Security guards cannot watch every corner at once. AI-powered cameras act as force multipliers, alerting guards only to real threats.";
            riskAnalysis = "Large perimeters and blind spots behind warehousing structures are difficult to patrol manually.";
            keyBenefits = ["AI Human Detection", "24/7 Documentation", "Reduced Guarding Costs"];
        } else {
            services = ["Commercial Alarm", "Electric Fencing", "Fire Detection"];
            description = "A robust commercial alarm integrated with fire detection protects both your physical assets and your workforce.";
            reasoning = "Insurance compliance often requires dual-path signalling (alarm + fire). Integrated systems minimize false alarm callouts.";
            riskAnalysis = "After-hours break-ins and fire hazards pose existential threats to business continuity.";
            keyBenefits = ["Insurance Compliance", "Asset Protection", "Fire & Safety Integration"];
        }
    } else if (property === 'farm') {
        title = "Agri-Secure Perimeter";
        services = ["Solar Perimeter Beams", "Thermal Cameras", "Off-grid Power"];
        description = "Farms require specialized, long-range detection that isn't prone to false alarms from wildlife. Solar options are unmatched here.";
        reasoning = "Grid power is unreliable in remote areas. Solar-powered wireless beams ensure your perimeter is active even during load shedding.";
        riskAnalysis = "Remote locations have slow response times. Early detection at the outer perimeter is critical to buy time.";
        keyBenefits = ["Wireless / Solar Power", "Long-Range Detection", "Wildlife Immunity"];
        timeline = "1-2 Weeks";
        estimatedCost = "R45 000+";
    } else if (property === 'estate') {
        title = "Community Fortress";
        services = ["License Plate Recognition (LPR)", "Visitor Management System", "Control Room"];
        description = "For estates, verifying every vehicle and visitor is the first line of defense. LPR cameras at gates are highly recommended.";
        reasoning = "Criminals often tailgait or use cloned plates. LPR systems flag suspicious vehicles instantly against national databases.";
        riskAnalysis = "High traffic volumes make manual checking impossible. Unverified vehicles are the primary vector for organized crime.";
        keyBenefits = ["Vehicle Tracking", "Visitor Logs", "Database Integration"];
        timeline = "2-3 Weeks";
        estimatedCost = "R85 000+";
    }

    // 2. BUDGET MODIFIERS
    if (budget === 'premium') {
        services.push("AI Video Analytics");
        services.push("Full Smart Home/Office Integration");
        description += " With your premium budget, we can integrate AI analytics for proactive threat detection.";
        keyBenefits.push("Advanced AI Analytics");
        keyBenefits.push("Seamless Automation Integration");
        estimatedCost = property === 'residential' ? "R35 000 - R60 000" : "R120 000+";
        if (property === 'estate' || property === 'industrial') estimatedCost = "R250 000+";
    } else if (budget === 'essential') {
        description += " We've focused on the absolute essentials to maximize security within a cost-effective framework.";
        estimatedCost = property === 'residential' ? "R8 500 - R15 000" : "R25 000 - R45 000";
        keyBenefits.push("Cost-Effective");
        keyBenefits.push("Core Protection");
    } else {
        // Comprehensive
        estimatedCost = property === 'residential' ? "R18 000 - R30 000" : "R55 000 - R85 000";
    }

    // Timeline Tweaks
    if (property === 'residential' && budget === 'essential') timeline = "1-2 Days";
    if ((property === 'commercial' || property === 'industrial') && budget === 'premium') timeline = "1-2 Weeks";


    return {
        title,
        description,
        suggestedServices: Array.from(new Set(services)), // Dedup
        priority: budget === 'premium' ? 'Advanced' : 'Recommended',
        reasoning,
        riskAnalysis,
        estimatedCost,
        timeline,
        keyBenefits
    };
}
