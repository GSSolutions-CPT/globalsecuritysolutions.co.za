import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sessionImages = join(
  process.env.SESSION_IMAGES_DIR ||
    join(process.env.USERPROFILE || '', '.grok', 'sessions', 'C%3A%5CUsers%5CUser%5COneDrive%5CDesktop%5CWebsite%5Cglobalsecuritysolutions.co.za', '019ed172-aba0-7251-ad39-d6850708aa02', 'images')
)

const mapping = {
  '1.jpg': ['public/images/hero-home.jpg', 'public/hero-bg-v2.jpg'],
  '2.jpg': ['public/page-heroes/about-hero.jpg'],
  '4.jpg': ['public/page-heroes/services-hero.jpg'],
  '3.jpg': ['public/page-heroes/sectors-hero.jpg'],
  '5.jpg': ['public/page-heroes/contact-hero.jpg'],
  '7.jpg': ['public/page-heroes/brands-hero.jpg'],
  '9.jpg': ['public/page-heroes/load-shedding-hero.jpg'],
  '8.jpg': ['public/page-heroes/audit-hero.jpg'],
  '6.jpg': ['public/page-heroes/ai-advisor-hero.jpg'],
  '13.jpg': ['public/page-heroes/areas-hero.jpg'],
  '11.jpg': ['public/page-heroes/gallery-hero.jpg'],
  '10.jpg': ['public/page-heroes/blog-hero.jpg'],
  '12.jpg': ['public/page-heroes/faq-hero.jpg'],
  '16.jpg': ['public/services/heroes/alarm-system.jpg'],
  '17.jpg': ['public/services/heroes/cctv.jpg'],
  '14.jpg': ['public/services/heroes/access-control.jpg'],
  '15.jpg': ['public/services/heroes/intercom.jpg'],
  '21.jpg': ['public/services/heroes/electric-fence.jpg'],
  '18.jpg': ['public/services/heroes/perimeter.jpg'],
  '19.jpg': ['public/services/heroes/gate-automation.jpg'],
  '20.jpg': ['public/services/heroes/vehicle-security.jpg'],
  '24.jpg': ['public/services/heroes/smart-home.jpg'],
  '25.jpg': ['public/services/heroes/integration.jpg'],
  '23.jpg': ['public/services/heroes/repairs.jpg'],
  '22.jpg': ['public/services/heroes/maintenance.jpg'],
  '29.jpg': ['public/sectors/heroes/residential.jpg'],
  '27.jpg': ['public/sectors/heroes/commercial.jpg'],
  '26.jpg': ['public/sectors/heroes/industrial.jpg'],
  '28.jpg': ['public/sectors/heroes/farm.jpg'],
  '32.jpg': ['public/sectors/heroes/estate.jpg'],
  '30.jpg': ['public/sectors/heroes/schools.jpg'],
  '31.jpg': ['public/page-heroes/areas/coastal.jpg'],
  '33.jpg': ['public/page-heroes/areas/northern-suburbs.jpg'],
  '35.jpg': ['public/page-heroes/areas/southern-peninsula.jpg'],
  '34.jpg': ['public/page-heroes/areas/winelands.jpg'],
  '36.jpg': ['public/page-heroes/areas/southern-suburbs.jpg'],
  '37.jpg': ['public/page-heroes/areas/west-coast.jpg'],
}

for (const targets of Object.values(mapping)) {
  for (const target of targets) {
    mkdirSync(join(root, dirname(target)), { recursive: true })
  }
}

for (const [source, targets] of Object.entries(mapping)) {
  const srcPath = join(sessionImages, source)
  if (!existsSync(srcPath)) {
    console.error(`Missing source image: ${srcPath}`)
    process.exit(1)
  }
  for (const target of targets) {
    const dest = join(root, target)
    copyFileSync(srcPath, dest)
    console.log(`Copied ${source} -> ${target}`)
  }
}

console.log('Photography deploy complete.')