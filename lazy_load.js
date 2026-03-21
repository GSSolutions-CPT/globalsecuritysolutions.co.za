const fs = require('fs');
const path = require('path');

const targetFiles = [
    'app/warranty-and-support/page.tsx',
    'app/services/[slug]/page.tsx',
    'app/sectors/[slug]/page.tsx',
    'app/sectors/SectorsClient.tsx',
    'app/load-shedding-security-solutions/page.tsx',
    'app/free-security-audit/page.tsx',
    'app/brands-we-install/page.tsx',
    'app/areas/[slug]/page.tsx'
];

const dynamicImportStr = `
const ContactForm = dynamic(() => import('@/components/ContactForm').then(mod => mod.ContactForm), { 
    ssr: false,
    loading: () => <div className="h-[500px] w-full animate-pulse bg-brand-navy/5 rounded-2xl border border-brand-steel/10 flex items-center justify-center text-brand-steel">Loading secure form...</div>
});
`;

targetFiles.forEach(file => {
    const fullPath = path.join(process.cwd(), file);
    if (!fs.existsSync(fullPath)) return;
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    if (content.includes("import { ContactForm } from '@/components/ContactForm'")) {
        content = content.replace("import { ContactForm } from '@/components/ContactForm'", '');
        
        // Find last import line
        let importsEndIndex = content.lastIndexOf('import ');
        let nextLinePos = content.indexOf('\n', importsEndIndex) + 1;
        
        content = content.slice(0, nextLinePos) + dynamicImportStr + content.slice(nextLinePos);
        
        if (!content.includes("import dynamic from 'next/dynamic'")) {
            content = "import dynamic from 'next/dynamic'\n" + content;
        }
        
        // Cleanup double newlines
        content = content.replace(/\n\n\n+/g, '\n\n');
        
        fs.writeFileSync(fullPath, content);
        console.log(`Lazy-loaded ContactForm in ${file}`);
    }
});
