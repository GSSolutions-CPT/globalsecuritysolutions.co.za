import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://relzsctzfotbyaafnkqr.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const email = process.argv[2]
const redirectTo = process.argv[3] || 'https://www.globalsecuritysolutions.co.za/portal/reset-password'

if (!serviceRoleKey) {
  console.error('Set SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

if (!email) {
  console.error('Usage: node scripts/generate-recovery-link.mjs <email> [redirectTo]')
  process.exit(1)
}

const admin = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

const { data, error } = await admin.auth.admin.generateLink({
  type: 'recovery',
  email: email.trim().toLowerCase(),
  options: { redirectTo },
})

if (error) {
  console.error(error.message)
  process.exit(1)
}

console.log(data.properties.action_link)