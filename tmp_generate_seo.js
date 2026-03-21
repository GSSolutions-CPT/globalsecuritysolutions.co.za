const fs = require('fs');
const path = require('path');

const dataPath = 'c:\\Users\\User\\OneDrive\\Desktop\\Website\\globalsecuritysolutions.co.za\\app\\data\\seoData.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const serviceAdditions = {
    "Alarm System Installation": {
        features: [
            { title: "AJAX & Paradox Experts", text: "We strictly install industry-leading wireless and hybrid alarm systems." },
            { title: "Pet-Friendly Sensors", text: "Smart PIR sensors ignore animals up to 25kg to universally prevent false alarms." },
            { title: "App Integration", text: "Instantly arm or disarm your property directly from your smartphone." },
            { title: "Anti-Jamming Tech", text: "Advanced signal jamming detection alerts you if intruders try to block frequencies." }
        ],
        faqs: [
            { q: "How much does a wireless alarm installation cost in Cape Town?", a: "Costs vary depending on property size, but a reliable wireless system (like AJAX) typically starts from R6,500 fully installed." },
            { q: "Do these alarms work during load shedding?", a: "Yes. All our AJAX, IDS, and Paradox systems come standard with heavy-duty backup batteries that easily outlast stage 6 load shedding." },
            { q: "Can the alarm connect to my armed response company?", a: "Absolutely. We ensure your system is fully compatible and securely linked with major Cape Town armed response networks." },
            { q: "What is the warranty on an installed alarm?", a: "We provide a 1-year workmanship guarantee, and premium brands like AJAX offer up to 2 years warranty on their hardware." }
        ],
        riskDescription: "Without a modern, monitored alarm system, your property is a blind spot. Intruders bypass outdated sensors easily, and unnotified breaches give criminals ample time to target your home or business.",
        solutionDescription: "A smart, app-controlled alarm system acts as a proactive shield. With instant mobile push notifications and direct armed response integration, you regain absolute control over your perimeter."
    },
    "CCTV Surveillance Systems": {
        features: [
            { title: "4K ColorVu Tech", text: "Capture full-color, ultra-HD 4K footage even in the dead of night." },
            { title: "AcuSense AI", text: "Camera AI distinguishes humans and vehicles from swaying trees and pets." },
            { title: "Remote Access", text: "View live and recorded camera feeds securely from anywhere in the world." },
            { title: "Vandal-Proof Housings", text: "IK10-rated enclosures protect cameras from tampering and severe impacts." }
        ],
        faqs: [
            { q: "How many days of CCTV footage can be recorded?", a: "Depending on your hard drive size and camera count, we typically configure systems to store 14 to 30 days of high-definition recording." },
            { q: "Do CCTV cameras work without WiFi?", a: "Yes, the cameras continue recording directly to the internal NVR/DVR hard drive without internet. WiFi is only required for remote mobile viewing." },
            { q: "What is the best CCTV brand installed in South Africa?", a: "We highly recommend and exclusively install Hikvision and Dahua systems due to their unmatched reliability, Ai-capabilities, and local support." }
        ],
        riskDescription: "Relying on outdated, grainy analog camera footage renders post-incident investigations useless. Without proactive alerts, a break-in often goes entirely unnoticed until the morning.",
        solutionDescription: "We deploy AI-powered smart cameras that serve as active deterrents. With built-in strobe lights, sirens, and instant line-crossing push notifications, intruders are warned off before they even breach a door."
    },
    "Access Control Solutions": {
        features: [
            { title: "Biometric Scanners", text: "Fingerprint and facial recognition terminals for highly secure, keyless entry." },
            { title: "Time & Attendance", text: "Seamlessly integrate entry logs with standard payroll and HR software." },
            { title: "Anti-Passback", text: "Prevent employees or residents from sharing access cards with unauthorized guests." },
            { title: "Fail-Secure Locks", text: "Heavy-duty maglocks and strike locks keep doors sealed even during power grid failures." }
        ],
        faqs: [
            { q: "Can access control be managed remotely?", a: "Yes, our networked IP access controllers allow administrators to add or revoke access credentials from a central dashboard instantly." },
            { q: "What happens during load shedding to magnetic locks?", a: "Our installations always include dedicated high-capacity battery backups (or integration into an inverter) to ensure maglocks remain fully energized during blackouts." },
            { q: "Are facial recognition scanners hygienic?", a: "Absolutely. Touchless facial recognition systems from ZKTeco and Hikvision offer incredibly secure, frictionless entry without physical contact." }
        ],
        riskDescription: "Physical keys are easily lost, stolen, or duplicated. When an employee leaves or a resident moves out, failing to retrieve a key means your security is instantly compromised.",
        solutionDescription: "Digital access control removes the risk of keys. You gain a granular, auditable trail of exactly who entered which door and when. Revoke access instantly with a single click."
    },
    "Intercom System Installers": {
        features: [
            { title: "HD Video Verification", text: "See exactly who is at your gate in crisp 1080p resolution before granting access." },
            { title: "Mobile App Routing", text: "Answer the gate bell directly on your smartphone, even if you are out of the country." },
            { title: "Memory Capture", text: "Automatically capture and save a photo or video of anyone who rings the bell." },
            { title: "Vandal-Resistant Panels", text: "Gate stations built with stainless steel alloys to resist tampering and harsh weather." }
        ],
        faqs: [
            { q: "Can I open the gate from my phone via the intercom?", a: "Yes. Our IP intercoms feature built-in relays. While speaking to the visitor via the app, you can press an unlock icon to open the pedestrian or main gate." },
            { q: "Do IP intercoms require complex wiring?", a: "We primarily use PoE (Power over Ethernet) intercoms, meaning a single network cable provides both power and data, resulting in a significantly cleaner installation." },
            { q: "What if my Wi-Fi doesn't reach the front gate?", a: "We can install a dedicated point-to-point wireless bridge or run outdoor-shielded CAT6 cabling to ensure a stable, uninterrupted connection." }
        ],
        riskDescription: "Opening a gate blind or struggling with a static-filled analog intercom puts you in a highly vulnerable position, explicitly risking hijackings and home invasions.",
        solutionDescription: "A smart video intercom empowers you to fully vet visitors safely from inside. With mobile forwarding, you create the illusion of occupancy, deterring scouts even when you aren't home."
    },
    "Electric Fence Installations": {
        features: [
            { title: "Nemtek Certified", text: "Installations by certified professionals ensuring legal COC compliance." },
            { title: "Multi-Zone Energizers", text: "Pinpoint the exact location of a breach instantly on larger perimeters." },
            { title: "Anti-Climb Brackets", text: "Custom manufactured offset brackets prevent intruders from scaling walls." },
            { title: "Smart Monitoring", text: "Receive instantly detailed voltage drop alerts directly to your mobile phone." }
        ],
        faqs: [
            { q: "Do I legally need a Certificate of Compliance (COC) for electric fencing?", a: "Yes. In South Africa, it is a strict legal requirement to have a valid COC for any electric fence to cover you for insurance and liability." },
            { q: "How much power does an electric fence use?", a: "Surprisingly little. A standard Nemtek energizer uses roughly the same amount of electricity as a standard light bulb." },
            { q: "Will the electric fence work during load shedding?", a: "Yes, all our energizers are fitted with backup batteries that maintain active voltage pulses during standard load shedding schedules." }
        ],
        riskDescription: "An unfortified perimeter wall is merely a privacy screen, not a security barrier. Without an active deterrent, criminals have unlimited time to plan entry.",
        solutionDescription: "A high-voltage electric fence delivers a severe, non-lethal shock that acts as the ultimate psychological and physical barrier, instantly triggering alarms if tampered with."
    },
    "Perimeter Security Enhancement": {
        features: [
            { title: "Dual-Tech Beams", text: "Microwave and PIR overlapping technology guarantees zero false alarms." },
            { title: "Solar Strip Beams", text: "Wireless, solar-powered window and wall beams for completely independent operation." },
            { title: "Smart Integration", text: "Link outdoor beams directly to your indoor sirens and CCTV PTZ tracking." },
            { title: "Invisible Shielding", text: "Create an undetectable IR web across vulnerable driveways and dark corners." }
        ],
        faqs: [
            { q: "Will dogs trigger outdoor security beams?", a: "We install specialized 'pet-immune' outdoor passive sensors that are specifically calibrated to ignore small to medium dogs and cats while catching humans." },
            { q: "What is the range of an outdoor perimeter beam?", a: "Depending on the model, active infrared point-to-point beams can cover straight-line distances from 10 meters up to 100 meters." },
            { q: "Can the beams activate floodlights?", a: "Yes, we can wire beam relays to smart switches, automatically flooding the yard with light the second an intruder is detected." }
        ],
        riskDescription: "If an intruder reaches your door or window, your security has fundamentally failed. Relying solely on indoor alarms means damage has already been done during the breach.",
        solutionDescription: "Perimeter early-warning systems detect threats at the boundary line. By combining outdoor beams with instant sirens, intruders are forced to flee before they ever touch your home."
    },
    "Gate and Garage Automation": {
        features: [
            { title: "High-Speed Opening", text: "Centurion D5 SMART motors open and close rapidly to prevent tailgating." },
            { title: "Anti-Theft Cages", text: "Heavy-duty steel brackets with integrated padlocks protect the motor from theft." },
            { title: "Lithium Upgrades", text: "Optional LifePO4 battery upgrades ensure the gate operates through extended blackouts." },
            { title: "App Configuration", text: "Monitor gate status, battery health, and add remotes via Bluetooth apps." }
        ],
        faqs: [
            { q: "Why is my gate motor completely dead after load shedding?", a: "Standard lead-acid batteries degrade quickly with frequent Eskom outages. We upgrade motors with deep-cycle Lithium-Iron batteries to solve this permanently." },
            { q: "Can my gate motor be stolen easily?", a: "Gate motor theft is highly prevalent in Cape Town. We combat this by welding aggressive anti-lift brackets and installing heavy-duty anti-theft cages." },
            { q: "Can I open the gate with my phone?", a: "Yes, we can install a GSM module or smart relay, allowing you to open the gate by simply dropping a missed call or tapping an app." }
        ],
        riskDescription: "A slow, unmaintained gate forces you to wait in your driveway, creating the perfect window for a precision hijacking. Furthermore, unprotected motors are heavily targeted for battery theft.",
        solutionDescription: "High-speed automation secures your transition from street to property. We combine rapid Centurion motors with anti-theft enclosures to guarantee reliable, impenetrable property access."
    },
    "Vehicle Security Systems": {
        features: [
            { title: "Live GPS Tracking", text: "Monitor exact vehicle locations, speeds, and routes on a live digital map." },
            { title: "Remote Immobilization", text: "Safely cut the engine power remotely via SMS or app if the vehicle is stolen." },
            { title: "Driver Behavior Logs", text: "Receive reports on harsh braking, aggressive acceleration, and cornering." },
            { title: "Slam-Lock Integration", text: "Heavy-duty transit locks for courier vehicles that automatically secure upon closing." }
        ],
        faqs: [
            { q: "Is the GPS tracker hidden?", a: "Yes, our technicians expertly splice and conceal the tracking units deep within the vehicle's dashboard or chassis to prevent discovery by thieves." },
            { q: "Does tracking require a monthly fee?", a: "We offer both self-managed (no-contract, prepaid SIM) systems and fully managed armed-response recovery contracts depending on your insurance requirements." },
            { q: "Can I track multiple vehicles on one screen?", a: "Yes, our fleet management software allows logistics managers to view up to hundreds of vehicles simultaneously on a single unified dashboard." }
        ],
        riskDescription: "Without granular tracking, stolen vehicles or hijacked cargo vanish instantly. Unmonitored fleet drivers may also abuse vehicles, causing massive maintenance and fuel losses.",
        solutionDescription: "Advanced telematics provide total visibility. Whether it's securing a personal vehicle with an immobilizer or optimizing an entire logistics fleet, you remain in complete control."
    },
    "Smart Home Automation": {
        features: [
            { title: "Unified Dashboard", text: "Control lighting, security, and climate from one sleek mobile interface." },
            { title: "Logic Automations", text: "Set rules like 'Turn on exterior lights when the driveway beam is broken'." },
            { title: "Voice Control", text: "Full integration with Google Assistant and Amazon Alexa for hands-free command." },
            { title: "Energy Monitoring", text: "Track exact electricity usage per appliance to significantly reduce monthly bills." }
        ],
        faqs: [
            { q: "Do I need to rewire my house for smart lighting?", a: "No. We install Sonoff and Shelly micro-relays behind your existing light switches, meaning no messy chasing or rewiring is required." },
            { q: "What happens to smart homes when the internet goes down?", a: "We design local-control logic (using hubs like Home Assistant). Your automated routines remain fully functional even without external internet access." },
            { q: "Can smart automation improve my security?", a: "Drastically. We can program 'vacation modes' that randomly turn lights and TVs on/off to make the home look occupied while you are away." }
        ],
        riskDescription: "Static homes are dumb homes. Without automation, you rely on human memory to turn off lights, arm systems, and check locks, inevitably leading to fatal security lapses.",
        solutionDescription: "Smart automation dynamically manages your home. Your house actively defends you—activating sirens, communicating alerts, and illuminating threats automatically."
    },
    "Security System Integration": {
        features: [
            { title: "Alarm-to-CCTV Links", text: "Cameras automatically pan, tilt, and zoom onto zones where alarms are triggered." },
            { title: "Access-to-Video", text: "Every door swipe records a 10-second video snippet for absolute identity verification." },
            { title: "Centralized VMS", text: "Milestone and HikCentral platforms to manage dozens of sites from one control room." },
            { title: "Fire Alarm Synching", text: "Fire triggers automatically unlock all maglocks and open access gates for evacuation." }
        ],
        faqs: [
            { q: "Can different brands be integrated?", a: "Yes. Using universal protocols like ONVIF, Wiegand, and smart relays, we can seamlessly bridge equipment from entirely different manufacturers." },
            { q: "What is Converged Security?", a: "It is the process of networking physical security elements together so they share data, drastically improving response times and forensic clarity." },
            { q: "Do you build off-site control rooms?", a: "Yes, we construct comprehensive VMS (Video Management System) arrays for security estates and corporate hubs requiring centralized monitoring." }
        ],
        riskDescription: "Siloed security systems are vastly inefficient. Having to manually check CCTV footage to verify a vague alarm trigger wastes critical minutes during an active breach.",
        solutionDescription: "Through deep integration, your security elements converse. A breached beam instantly triggers a camera rotation and floods emergency lighting, creating a responsive net of protection."
    },
    "Security Repairs and Upgrades": {
        features: [
            { title: "System Takeovers", text: "We adopt, repair, and upgrade existing alarm panels left by previous installers." },
            { title: "Cable Health Audits", text: "Thorough testing of legacy coax and CAT5 lines to spot corrosion and voltage drops." },
            { title: "Lithium Conversions", text: "Replacing failing lead-acid batteries with 10-year lifespan Lithium-Iron equivalents." },
            { title: "Firmware Flashing", text: "Updating camera and DVR software to patch critical cybersecurity vulnerabilities." }
        ],
        faqs: [
            { q: "Can you fix an alarm system installed by another company?", a: "Yes. Our technicians are highly trained across all major legacy platforms (DSC, IDS, Paradox) and can readily take over and repair third-party installations." },
            { q: "My CCTV cameras are blurry and grainy at night. Can they be fixed?", a: "Usually, this is caused by IR reflection, dirt, or degraded cabling. We can clean the housings or upgrade the camera heads to 4K ColorVu while utilizing your existing cables." },
            { q: "Is it cheaper to upgrade or replace completely?", a: "Whenever safely possible, we utilize existing wiring networks to save you labor costs, simply swapping the 'brains' and sensors to modern wireless and IP hardware." }
        ],
        riskDescription: "Security hardware degrades silently. A dead backup battery, a corroded camera lens, or a rusted gate motor bracket means your system will fail exactly when you need it most.",
        solutionDescription: "We rapidly diagnose and resuscitate failing infrastructure. Our precise upgrades breathe new life into old systems, ensuring you maintain maximum security without complete reinvestment."
    },
    "Security Maintenance Contracts": {
        features: [
            { title: "Quarterly Site Audits", text: "Scheduled testing of all motion sensors, beams, and electric fence tensioning." },
            { title: "Lens Calibrations", text: "Physical cleaning of CCTV lenses and re-focusing to guarantee optimal night vision clarity." },
            { title: "Load Test Certifications", text: "Deep-cycle capacity testing on all backup batteries to survive Eskom's load shedding." },
            { title: "Priority Call-Outs", text: "SLA clients receive guaranteed front-of-the-line emergency dispatch during crisis events." }
        ],
        faqs: [
            { q: "Why do I need a maintenance contract?", a: "Spiders build webs over camera sensors, batteries fail silently over time, and fences lose tension. Regular maintenance guarantees your system actually works during a break-in." },
            { q: "How often do you service the site?", a: "For residential clients, we recommend bi-annual (6 months) checks. For commercial estates and factories, monthly or quarterly strict SLAs are implemented." },
            { q: "What happens if a part breaks during maintenance?", a: "Our SLA clients receive drastically reduced hardware replacement rates, and we carry critical spares in our vehicles to swap out components identically on the same day." }
        ],
        riskDescription: "Installing a premium system and abandoning it is a massive risk. Dust, weather, insect infestations, and power surges drastically degrade hardware efficacy over time.",
        solutionDescription: "Our meticulous Service Level Agreements (SLAs) guarantee operational uptime. By proactively catching battery failures and sensor blockages, we maintain your 100% security guarantee."
    }
};

const sectorAdditions = {
    "Residential Security": {
        features: [
            { title: "Aesthetic Installs", text: "We aggressively hide cables and use low-profile sensors to maintain your home's beauty." },
            { title: "Pet Immunity", text: "Specialized PIRs ensure your dogs and cats can roam freely inside without triggering sirens." },
            { title: "Remote Viewing", text: "Watch over your driveway, children, or pets natively from your smartphone securely." },
            { title: "Early Warning", text: "Perimeter beams catch threats entirely outside the house before they reach windows." }
        ],
        riskDescription: "Criminals constantly observe neighborhoods for weak points. Homes with zero visible deterrents or outdated 'dummy' cameras are mathematically the highest targets for devastating home invasions.",
        solutionDescription: "We build a multi-layered defensive perimeter. From high-voltage fencing to smart app-controlled alarms, we turn your property into a highly deterrent, impenetrable safe haven for your family."
    },
    "Commercial Security": {
        features: [
            { title: "Biometric Timesheets", text: "Eliminate 'buddy clocking' and secure restricted rooms via fingerprint or facial scans." },
            { title: "High-Res Audits", text: "4K internal dome cameras drastically reduce internal shrinkage and liability claims." },
            { title: "Partitioned Alarms", text: "Arm the warehouse completely while the front office remains actively functioning during shifts." },
            { title: "Fire Integration", text: "Automated emergency procedures that unlock all fire escapes and cut power to specific zones." }
        ],
        riskDescription: "Commercial businesses face devastating threats from internal shrinkage, external syndicates, and false liability claims from employees or customers.",
        solutionDescription: "We deploy enterprise-grade infrastructure. Detailed access logs, crystal-clear 4K surveillance networks, and robust security gates ensure absolute operational control and indisputable legal evidence."
    },
    "Industrial Security": {
        features: [
            { title: "Thermal Imaging", text: "Detect human heat signatures across hundreds of meters in zero-light storage yards." },
            { title: "Explosion-Proof Housings", text: "Specialized ATEX-certified camera hardware designed for volatile chemical environments." },
            { title: "High-Voltage Rings", text: "Aggressive, lethal-deterrent grade commercial fencing systems backed by massive energizers." },
            { title: "LPR Gates", text: "Automatic License Plate Recognition to log all heavy-vehicle logistics moving in and out." }
        ],
        riskDescription: "Industrial sectors harbor massive, highly valuable assets distributed over massive dark expanses, making them primary targets for organized heavy-logistics theft syndicates.",
        solutionDescription: "We fortify industrial expanses with ruggedized, long-range technology. Thermal tripwires and automated heavy-duty turnstiles guarantee early detection and uncompromised access control."
    },
    "Farm Security Systems": {
        features: [
            { title: "Solar Beam Towers", text: "Totally off-grid perimeter beams ensuring boundary protection across massive acreage." },
            { title: "Wireless Radios", text: "Ubiquiti point-to-point dishes capable of beaming camera feeds up to 10 kilometers." },
            { title: "GSM Intercoms", text: "Talk to visitors at distant property gates via cellular networks directly to your mobile." },
            { title: "Early Warning", text: "Linked neighborhood watch radio integration for incredibly rapid rural armed response." }
        ],
        riskDescription: "Farms lack municipal infrastructure and neighbors. Vast dark boundaries and unstable Eskom grids leave agricultural assets and families uniquely isolated and vulnerable to brutal attacks.",
        solutionDescription: "We specialize in off-grid, long-range tech. Powered entirely by solar arrays and bridged by wireless microwave networks, we bring inner-city grade CCTV and alarms to the most remote perimeters."
    },
    "Estate Security Management": {
        features: [
            { title: "Visitor OTP Codes", text: "Generate unique, expiring QR codes or PINs for contractors and guests." },
            { title: "Driver Scanning", text: "Handheld scanners that extract and log data directly from South African driver's licenses." },
            { title: "LPR Integration", text: "Frictionless boom-gate entry for residents via ultra-fast License Plate Recognition." },
            { title: "Control Rooms", text: "Unified Video Management Systems (VMS) allowing guards to monitor the entire estate." }
        ],
        riskDescription: "Gated communities present a unique challenge: balancing highly restrictive security with the high-volume traffic flow of residents, deliveries, and contractors without causing congestion.",
        solutionDescription: "We digitalize your estate perimeter. By automating resident flow with fast LPR cameras and restricting contractors with strict OTP scanning, we eliminate guard bribery and maintain total situational awareness."
    },
    "Schools & Education": {
        features: [
            { title: "Lockdown Alarms", text: "Specialized panic arrays capable of triggering distinct lockdown sirens and messaging." },
            { title: "Vandal-Proof Tech", text: "IK10-rated cameras and intercoms capable of surviving aggressive student tampering." },
            { title: "Staff Biometrics", text: "Strict access control ensuring students cannot enter staff rooms or dangerous laboratories." },
            { title: "Perimeter Safety", text: "Non-lethal but highly effective fencing ensuring students stay in, and threats stay out." }
        ],
        riskDescription: "Educational institutions are responsible for hundreds of vulnerable lives. Poor access control allows unauthorized individuals onto campuses, while hidden blind spots breed bullying and vandalism.",
        solutionDescription: "We balance campus warmth with rigorous security. Utilizing discreet high-definition surveillance and heavy-duty staff access control, we ensure total protection without turning the school into a prison."
    }
};

// Merge
data.primaryServicePages = data.primaryServicePages.map(s => {
    return { ...s, ...(serviceAdditions[s.page] || {}) };
});

data.sectorSolutions = data.sectorSolutions.map(s => {
    return { ...s, ...(sectorAdditions[s.page] || {}) };
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
console.log('seoData.json massively enriched.');
