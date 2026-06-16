/**
 * Quick staging smoke test: portal routes, auth redirects, storage signed URLs.
 * Usage: node scripts/staging-browser-pass.mjs [baseUrl]
 * Optional env: PORTAL_TEST_EMAIL, PORTAL_TEST_PASSWORD for authenticated checks.
 */
import { chromium } from 'playwright'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const baseUrl = process.argv[2] || 'http://localhost:3000'

function loadEnvLocal() {
    try {
        const raw = readFileSync(resolve(__dirname, '../.env.local'), 'utf8')
        for (const line of raw.split('\n')) {
            const trimmed = line.trim()
            if (!trimmed || trimmed.startsWith('#')) continue
            const eq = trimmed.indexOf('=')
            if (eq === -1) continue
            const key = trimmed.slice(0, eq)
            let val = trimmed.slice(eq + 1)
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1)
            }
            if (!process.env[key]) process.env[key] = val
        }
    } catch {
        // ignore
    }
}

loadEnvLocal()

const results = []

function pass(name, detail = '') {
    results.push({ status: 'PASS', name, detail })
    console.log(`✓ ${name}${detail ? ` — ${detail}` : ''}`)
}

function fail(name, detail = '') {
    results.push({ status: 'FAIL', name, detail })
    console.error(`✗ ${name}${detail ? ` — ${detail}` : ''}`)
}

function skip(name, detail = '') {
    results.push({ status: 'SKIP', name, detail })
    console.log(`○ ${name}${detail ? ` — ${detail}` : ''}`)
}

async function testAuthRedirects(page) {
    const routes = [
        '/portal/requests',
        '/portal/jobs',
        '/portal/sales',
    ]

    for (const route of routes) {
        await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 })
        const url = page.url()
        if (url.includes('/portal/login')) {
            pass(`Auth redirect: ${route}`, 'redirected to login')
        } else {
            fail(`Auth redirect: ${route}`, `landed on ${url}`)
        }
    }
}

async function testLoginPage(page) {
    await page.goto(`${baseUrl}/portal/login`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForSelector('#email', { timeout: 60000 })
    const hasEmail = await page.locator('#email').count()
    const hasPassword = await page.locator('#password, input[type="password"]').count()
    if (hasEmail > 0 && hasPassword > 0) {
        pass('Login page', 'email + password fields present')
    } else {
        fail('Login page', `email=${hasEmail}, password=${hasPassword}`)
    }
}

async function testAuthenticatedFlows(page, email, password) {
    await page.goto(`${baseUrl}/portal/login`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForSelector('#email', { timeout: 60000 })
    await page.fill('#email', email)
    await page.fill('#password, input[type="password"]', password)
    await page.click('button[type="submit"]')

    await page.waitForURL((url) => !url.pathname.includes('/portal/login'), { timeout: 15000 }).catch(() => null)
    const afterLogin = page.url()
    if (afterLogin.includes('/portal/login')) {
        fail('Staff login', 'still on login page — check PORTAL_TEST_EMAIL/PASSWORD')
        return false
    }
    pass('Staff login', afterLogin)

    // Client requests page
    await page.goto(`${baseUrl}/portal/requests`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    const requestsHeading = await page.getByRole('heading', { name: /client requests/i }).count()
    if (requestsHeading > 0) {
        pass('Client requests page', 'heading rendered')
    } else {
        const body = await page.locator('body').innerText()
        if (body.toLowerCase().includes('client requests') || body.toLowerCase().includes('no client requests')) {
            pass('Client requests page', 'content rendered')
        } else {
            fail('Client requests page', 'expected heading or empty state')
        }
    }

    // Jobs page — attachments tab uses StorageImage / signed URLs
    await page.goto(`${baseUrl}/portal/jobs`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    const jobsLoaded = await page.locator('body').innerText()
    if (/jobs|job board|no jobs/i.test(jobsLoaded)) {
        pass('Jobs page', 'loaded')
    } else {
        fail('Jobs page', 'unexpected content')
    }

    // Check for signed storage URLs in network (img/src or fetch to supabase storage sign)
    const signedUrlRequests = []
    page.on('request', (req) => {
        const u = req.url()
        if (u.includes('/storage/v1/object/sign/') || u.includes('token=')) {
            signedUrlRequests.push(u)
        }
    })

    await page.goto(`${baseUrl}/portal/sales`, { waitUntil: 'domcontentloaded', timeout: 60000 })
    await page.waitForTimeout(2000)
    const salesLoaded = await page.locator('body').innerText()
    if (/sales|quotation|invoice/i.test(salesLoaded)) {
        pass('Sales page', 'loaded')
    } else {
        fail('Sales page', 'unexpected content')
    }

    // Open first sale detail if available to trigger site-plan signed URL
    const viewBtn = page.getByRole('button', { name: /view|details|open/i }).first()
    if (await viewBtn.count()) {
        await viewBtn.click()
        await page.waitForTimeout(2500)
    }

    const signedImgs = await page.locator('img[src*="storage/v1/object/sign"], img[src*="token="]').count()
    if (signedUrlRequests.length > 0 || signedImgs > 0) {
        pass('Signed storage URLs', `${signedUrlRequests.length} sign requests, ${signedImgs} signed img(s)`)
    } else {
        skip('Signed storage URLs', 'no signed URLs observed (may be no attachments/site plans in data)')
    }

    return true
}

async function testSignedUrlResolution() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
        skip('Supabase signed URL API', 'missing NEXT_PUBLIC_SUPABASE_* env')
        return
    }

    const supabase = createClient(url, key)
    const email = process.env.PORTAL_TEST_EMAIL
    const password = process.env.PORTAL_TEST_PASSWORD

    if (email && password) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) {
            fail('Supabase auth for storage', signInError.message)
            return
        }
    }

    const buckets = ['site-plans', 'job-attachments', 'payment-proofs']
    for (const bucket of buckets) {
        const { data: files, error: listError } = await supabase.storage.from(bucket).list('', { limit: 1 })
        if (listError) {
            skip(`List ${bucket}`, listError.message)
            continue
        }
        if (!files?.length) {
            skip(`Signed URL ${bucket}`, 'bucket empty or no access')
            continue
        }
        const path = files[0].name
        const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, 3600)
        if (error) {
            fail(`Signed URL ${bucket}`, error.message)
        } else if (data?.signedUrl?.includes('token=')) {
            pass(`Signed URL ${bucket}`, path)
        } else {
            fail(`Signed URL ${bucket}`, 'no token in response')
        }
    }
}

async function main() {
    console.log(`\nStaging browser pass → ${baseUrl}\n`)

    const browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    const page = await context.newPage()

    try {
        await testLoginPage(page)
        await testAuthRedirects(page)

        const email = process.env.PORTAL_TEST_EMAIL
        const password = process.env.PORTAL_TEST_PASSWORD
        if (email && password) {
            await testAuthenticatedFlows(page, email, password)
        } else {
            skip('Authenticated portal flows', 'set PORTAL_TEST_EMAIL + PORTAL_TEST_PASSWORD for full pass')
        }
    } catch (err) {
        fail('Browser test', err instanceof Error ? err.message : String(err))
    } finally {
        await browser.close()
    }

    await testSignedUrlResolution()

    const failed = results.filter((r) => r.status === 'FAIL').length
    console.log(`\n--- Summary: ${results.filter((r) => r.status === 'PASS').length} pass, ${failed} fail, ${results.filter((r) => r.status === 'SKIP').length} skip ---\n`)
    process.exit(failed > 0 ? 1 : 0)
}

main()