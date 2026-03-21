const fs = require('fs');
const path = require('path');

const directories = ['app', 'components', 'utils'];

const colorMap = {
    'slate-950': 'brand-navy',
    'slate-900': 'brand-navy',
    'slate-800': 'brand-navy',
    'slate-700': 'brand-slate',
    'slate-600': 'brand-slate',
    'slate-500': 'brand-steel',
    'slate-400': 'brand-steel',
    'slate-300': 'brand-steel/60',
    'slate-200': 'brand-steel/40',
    'slate-100': 'brand-steel/20',
    'slate-50': 'brand-white',
    
    'blue-950': 'brand-navy',
    'blue-900': 'brand-navy',
    'blue-800': 'brand-navy',
    'blue-700': 'brand-electric',
    'blue-600': 'brand-electric',
    'blue-500': 'brand-electric',
    'blue-400': 'brand-electric',
    'blue-300': 'brand-electric/60',
    'blue-200': 'brand-electric/40',
    'blue-100': 'brand-electric/20',
    'blue-50': 'brand-electric/10',

    'indigo-900': 'brand-navy',
    'indigo-800': 'brand-navy',
    'indigo-700': 'brand-electric',
    'indigo-600': 'brand-electric',
    'indigo-500': 'brand-electric',
    'indigo-400': 'brand-electric',
    'indigo-300': 'brand-electric/60',
    'indigo-200': 'brand-electric/40',
    'indigo-100': 'brand-electric/20',
    'indigo-50': 'brand-electric/10'
};

function processDirectory(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;
            
            // Replaces instances exactly matching the mapping with word boundaries
            // e.g. text-slate-950 -> text-brand-navy
            for (const [oldColor, newColor] of Object.entries(colorMap)) {
                const regex = new RegExp(`\\b${oldColor}\\b`, 'g');
                if (regex.test(content)) {
                    content = content.replace(regex, newColor);
                    changed = true;
                }
            }
            
            if (changed) {
                fs.writeFileSync(fullPath, content);
                console.log(`Sanitized ${fullPath}`);
            }
        }
    }
}

directories.forEach(dir => processDirectory(path.join(process.cwd(), dir)));
console.log('Global aesthetic sanitization complete.');
