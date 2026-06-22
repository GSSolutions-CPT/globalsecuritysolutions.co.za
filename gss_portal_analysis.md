# GSS Portal — Deep Analysis & Fix List

> **Scope**: Full portal analysis covering auth, routing, data access, performance, UX, and security.
> Issues are grouped by severity: 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low/Enhancement

---

## 🔴 CRITICAL — Breaks Core Functionality

### 1. Auth Callback is a `page.tsx` — NOT a Next.js Route Handler
**File**: [`app/portal/auth/callback/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/auth/callback/page.tsx)

**Problem**: The OAuth callback endpoint is implemented as a client-side `page.tsx`. This is wrong — Supabase OAuth PKCE flow requires a **server-side route handler** (`route.ts`) that exchanges the `code` for a session using cookies. A client page cannot reliably set the `sb-*` auth cookies that the middleware reads, causing users to be immediately redirected back to `/portal/login` after Google OAuth login despite successfully authenticating.

**Fix**: Replace `page.tsx` with a proper `route.ts` (GET route handler) that uses `createServerClient` to exchange the code.

```ts
// app/portal/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/portal'

    if (code) {
        const cookieStore = await cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            { cookies: { getAll: () => cookieStore.getAll(), setAll: (c) => c.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } }
        )
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) return NextResponse.redirect(`${origin}${next}`)
    }
    return NextResponse.redirect(`${origin}/portal/login?error=auth_failed`)
}
```

---

### 2. Dashboard Fetches ALL Clients & Invoices Without Limit
**File**: [`app/portal/dashboard/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/dashboard/page.tsx) — Lines 72–75

**Problem**: 
```ts
supabase.from('clients').select('*'),       // ALL clients, unlimited
supabase.from('invoices').select('*'),       // ALL invoices, unlimited
supabase.from('expenses').select('*'),       // ALL expenses, unlimited
```
This will bring the entire database into the browser for every dashboard load. As the database grows, this will cause catastrophic slowdowns or timeouts. Also triggers Supabase's default 1000-row limit silently, meaning metrics can be **wrong**.

**Fix**: Use date-range filters and aggregate queries (Supabase RPC or at minimum `.limit()` + specific column selects).

---

### 3. Double Auth Resolution on Every Protected Route (Performance + Race Condition)
**Files**: [`middleware.ts`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/middleware.ts), [`PortalGuard.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/components/portal/PortalGuard.tsx), [`AuthContext.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/context/AuthContext.tsx)

**Problem**: Every single portal page hit triggers **three independent auth/access checks**:
1. `middleware.ts` calls `resolvePortalAccessFromTables` (2 DB queries)
2. `AuthContext` calls `resolvePortalAccess` on mount (2 DB queries)  
3. `PortalGuard` re-runs the access logic client-side

That's **4 extra Supabase queries per page load** just for access control. On slow networks this causes a visible flash of "Checking access..." every time you navigate.

**Fix**: The middleware should be the authority. Pass resolved access info via a response header or cookie so the client doesn't need to re-query. At minimum, cache the result in AuthContext using `sessionStorage` with a short TTL.

---

### 4. `uploadFileToStorage` in Client Portal Uses Unauthenticated Direct Path
**File**: [`app/portal/client-portal/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/client-portal/page.tsx) — Line 199

**Problem**: The client's local `uploadFileToStorage` function constructs random path names and bypasses the `storage.ts` utility. It doesn't use the standardised `PRIVATE_STORAGE_BUCKETS` constants, making it impossible to reliably reconstruct those paths later for signed URLs.

**Fix**: Replace with the `uploadPrivateFile()` utility from `@/lib/portal/storage` and use the correct bucket constant.

---

### 5. `window.confirm()` Used for Destructive Operations
**Files**: [`app/portal/sales/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/sales/page.tsx) line 92, [`app/portal/clients/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/clients/page.tsx) line 88

**Problem**: `window.confirm()` is synchronous, blocks the thread, looks completely out of place vs. the sleek design system, and is blocked by many browser policies (e.g., iframes, some mobile browsers). 

**Fix**: Replace all `window.confirm()` calls with a proper `<AlertDialog>` from the existing portal UI library (`/components/portal/ui/`).

---

## 🟠 HIGH — Significant Bugs / Data Issues

### 6. Invoice Financial Data Silently Truncated at 1000 Rows (Supabase Default)
**Files**: [`app/portal/sales/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/sales/page.tsx), [`app/portal/financials/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/financials/page.tsx)

**Problem**: `fetchSalesStats` fetches `quotations` and `invoices` without `.range()` or server-side aggregation. Supabase returns a max of 1000 rows by default. After 1000 invoices, the financial stats, charts, and totals will all be **quietly wrong with no error shown**.

**Fix**: Use Supabase server-side `SUM()` via RPC or aggregate the count/sum server-side. At minimum, add `{ count: 'exact' }` and show a warning if results are truncated.

---

### 7. Quotation-to-Invoice Conversion Doesn't Update Quotation Status
**File**: [`app/portal/sales/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/sales/page.tsx) — `convertToInvoice()` (line 260)

**Problem**: After successfully creating an invoice from a quotation, the original quotation's `status` is never updated to `'Converted'`. This means the quotation stays as `'Accepted'` and will still appear as an active/outstanding quote, causing data inconsistency.

**Fix**: Add `.update({ status: 'Converted' })` to the quotation after the invoice is inserted successfully.

---

### 8. Contract Auto-Billing Runs Client-Side (Data Loss Risk)
**File**: [`app/portal/contracts/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website\globalsecuritysolutions.co.za/app/portal/contracts/page.tsx) — line 80+

**Problem**: `processDueContractBilling` runs in a `useEffect` on the client every time the Contracts page is visited. This is unreliable — if nobody visits the page on the billing day, invoices don't get generated. Also, if two staff members open the page simultaneously, duplicate invoices could be generated (the idempotency check works but has a race window).

**Fix**: Move recurring contract billing to a **Supabase Edge Function** triggered by a cron schedule (pg_cron or Supabase's built-in scheduler). The client-side trigger should be a manual "Run Billing" action only.

---

### 9. Products Page Loads 1000s of Products Into Memory
**File**: [`app/portal/products/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/products/page.tsx) — line 56–80

**Problem**: The product loading loop fetches ALL products in batches of 1000 into memory then does client-side filtering. With `extracted_products.json` at 653KB in the repo, this is already a huge dataset. Memory usage and initial load time will be very high.

**Fix**: Server-side search with `.ilike()` on name/code, and paginate just like the clients/jobs pages already do.

---

### 10. `AuthContext.tsx` — `refreshPortalAccess` Type Signature Mismatch
**File**: [`context/AuthContext.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/context/AuthContext.tsx) — Line 53 vs 119

**Problem**: The internal `refreshPortalAccess` accepts an optional `nextUser` parameter, but the exported version (line 119) is a zero-argument wrapper `() => refreshPortalAccess()`. This means external callers like login flows can't pass a freshly authenticated user, forcing an extra re-render cycle where `user` may not yet be set in state.

**Fix**: Export `refreshPortalAccess` with the `nextUser` parameter so callers can eagerly pass the user object.

---

### 11. `use-settings.tsx` — Settings Stored Raw in `localStorage` (Security Issue)
**File**: [`lib/portal/use-settings.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/lib/portal/use-settings.tsx) — Lines 51–53

**Problem**: All settings (including `logoUrl`, `legalTerms`, `bankAccountNumber`, `bankBranchCode`) are synced to `localStorage` with no sanitisation. Any XSS vector could read company banking details from localStorage. 

**Fix**: Only cache non-sensitive display settings (company name, colors, logo URL) in localStorage. Never cache banking details or legal terms client-side.

---

### 12. Dashboard Real-Time Only Listens to `activity_log` Inserts
**File**: [`app/portal/dashboard/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/dashboard/page.tsx) — Lines 214–219

**Problem**: The real-time subscription only triggers a full `fetchDashboardData()` when a new `activity_log` row is inserted. Changes to invoices, clients, or expenses directly (without an activity log entry) won't update the dashboard metrics.

**Fix**: Subscribe to relevant table channels (`invoices`, `expenses`, `clients`) separately, or use a debounced refresh, OR rely only on page-level manual refresh.

---

## 🟡 MEDIUM — UX Issues & Technical Debt

### 13. Login Page Has Google Sign-In That Only Works for Clients
**File**: [`app/portal/login/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/login/page.tsx)

**Problem**: The Google OAuth button is prominently displayed but staff cannot use it (they get redirected to `?error=google_not_client`). The error message says "Google Sign-In is for clients only" but the button has no visual indicator that staff shouldn't use it. Causes confusion.

**Fix**: Either (a) hide the Google button for the staff login and show it only on the client-facing portal, or (b) add a clear label "Clients only" next to the Google button.

---

### 14. `PortalGuard` Shows Flash of "Checking Access..." on Every Navigation
**File**: [`components/portal/PortalGuard.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/components/portal/PortalGuard.tsx) — Lines 68–73

**Problem**: Every time you navigate between portal pages, `loading || accessLoading` flashes true momentarily, showing the "Checking access..." screen. This creates a flickering UX even for users who are already authenticated and authorised.

**Fix**: Only show the loading screen if the user is `null` (truly unknown). If the user is already known and access is being refreshed, don't block the UI — let the page render and update silently.

---

### 15. `Dashboard` Welcome Banner Shows No User Name
**File**: [`app/portal/dashboard/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/dashboard/page.tsx) — Line 229

**Problem**: The greeting says "Good Morning" but never includes the user's name or role. The `user` object is available from `useAuth()` but not imported/used on this page.

**Fix**: Import `useAuth`, extract `user.email.split('@')[0]`, and display it: *"Good Morning, Kyle 👋"*.

---

### 16. Reset Password Page Doesn't Verify Active Session Token
**File**: [`app/portal/reset-password/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/reset-password/page.tsx)

**Problem**: The reset password page calls `supabase.auth.updateUser({ password })` directly without first verifying that the page was opened via a valid reset token from the email link. If someone navigates to `/portal/reset-password` directly (not from email), `updateUser` may succeed using their current session password — which is confusing and potentially dangerous.

**Fix**: Check for the `#access_token` hash in the URL (Supabase password reset links contain this) and explicitly call `supabase.auth.setSession()` with the token before allowing the form to submit.

---

### 17. `sale/new` Page — Both Clients & Products Fetched on Mount (Unnecessary For Edit Mode)
**File**: [`app/portal/sales/new/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/sales/new/page.tsx)

**Problem**: `fetchClients()` fetches ALL clients (`id, name, company`) without pagination. With many clients this is a large payload just to populate a dropdown, especially since `ClientSearch` component already exists with server-side search capability.

**Fix**: The `ClientSearch` component should handle its own async loading — remove the `fetchClients()` preload entirely and let `ClientSearch` do its job.

---

### 18. `SitePlanner.tsx` is 28KB — Should be Lazy Loaded
**File**: [`components/portal/SitePlanner.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/components/portal/SitePlanner.tsx) (28,423 bytes)

**Problem**: `SitePlanner` is eagerly imported in the sales/new page. It's a heavy canvas-based component that most users don't interact with on every quotation creation.

**Fix**: Already lazy-loaded in `jobs/page.tsx` — apply the same pattern in `sales/new/page.tsx`.

---

### 19. `client-portal/page.tsx` — Three Separate Sequential Fetches on Load
**File**: [`app/portal/client-portal/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/client-portal/page.tsx) — Lines 121–167

**Problem**: Client data, quotations, and invoices are fetched sequentially in `fetchClientData()` using three separate `await` calls inside the function. This could be parallelised with `Promise.all()`.

**Fix**:
```ts
const [clientRes, quotesRes, invoicesRes] = await Promise.all([
    supabase.from('clients').select('*').eq('id', clientId).single(),
    supabase.from('quotations').select('*').eq('client_id', clientId).order('date_created', { ascending: false }),
    supabase.from('invoices').select('*, quotations(payment_proof)').eq('client_id', clientId).order('date_created', { ascending: false }),
])
```
This alone cuts client portal load time by ~60%.

---

### 20. `use-settings.tsx` — `Record<string, any>` Type is Too Loose
**File**: [`lib/portal/use-settings.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/lib/portal/use-settings.tsx) — Lines 9, 18

**Problem**: `settings` is typed as `Record<string, any>` and `updateSetting` accepts `value: any`. This means typos in setting keys (`companyNme` vs `companyName`) are completely silent and hard to debug.

**Fix**: Define a typed `PortalSettings` interface with all known keys, and narrow the type.

---

### 21. `clients/page.tsx` — Pagination Bug: Archived Clients Still Count Toward Total
**File**: [`app/portal/clients/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/clients/page.tsx) — Lines 54–68

**Problem**: The query uses `{ count: 'exact' }` for the total count, but then filters out archived clients client-side. This means `clientsCount` (used for pagination) includes archived clients, making pagination calculations wrong (e.g., showing "Page 1 of 3" when there might be fewer active pages).

**Fix**: Add a server-side filter `.not('metadata->>status', 'eq', 'archived')` to the Supabase query so the count and data are both accurate.

---

### 22. `financials/page.tsx` — Date Filter Doesn't Apply to Invoices Query Correctly
**File**: [`app/portal/financials/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/financials/page.tsx) — Line 94

**Problem**: The invoice query uses `.gte('date_created', dateRange.start)` but `date_created` is a full ISO timestamp while `dateRange.start` is a `YYYY-MM-DD` string. Depending on timezone, invoices created on the start date but before midnight UTC may be excluded.

**Fix**: Normalise dates consistently — either use timestamps throughout, or truncate with `.gte('date_created', dateRange.start + 'T00:00:00')`.

---

### 23. `pdf-service.js` — Console Log in Production
**File**: [`lib/portal/pdf-service.js`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/lib/portal/pdf-service.js) — Line 28

**Problem**: 
```js
console.log('Generating PDF (Premium V2) for:', docType, data, settings)
```
This logs the full document data (including potentially sensitive client info) to the browser console in production. Should be removed or wrapped in a dev-only guard.

---

### 24. Auth Callback — Google Sign-In for Staff Is Blocked But Unclear
**File**: [`app/portal/auth/callback/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/auth/callback/page.tsx)

**Problem**: When a staff member accidentally signs in with Google, they're signed out silently and redirected to `/portal/login?error=google_not_client`. The error handling flow works but the UX is poor — the user sees no explanation of *why* it failed.

**Fix**: The error message on the login page for `google_not_client` is already defined, but the `AuthCallbackPage` should also show the error visually before redirecting, not redirect immediately.

---

## 🟢 LOW / ENHANCEMENTS

### 25. `portal/layout.tsx` is Marked `"use client"` — Prevents Server-Side Rendering
**File**: [`app/portal/layout.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/layout.tsx)

**Problem**: The portal layout is a client component purely to wrap providers. This prevents any server-side rendering benefits and means the initial HTML served to the browser contains no content — just a JS bundle.

**Fix**: Move providers to a separate `Providers.tsx` client component and make the layout itself a server component.

---

### 26. No Error State for Failed Dashboard Data Fetch
**File**: [`app/portal/dashboard/page.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/app/portal/dashboard/page.tsx) — Line 97

**Problem**: If the dashboard data fetch fails, it just `console.error()`s. The user sees a dashboard with all zeros and no indication that data failed to load.

**Fix**: Add an `error` state and show a toast + retry button if the fetch fails.

---

### 27. `SmartEstimator.tsx` and `SitePlanner.tsx` Are Not Memoized
**Files**: [`components/portal/SmartEstimator.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/components/portal/SmartEstimator.tsx), [`components/portal/SitePlanner.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/components/portal/SitePlanner.tsx)

**Problem**: These heavy components re-render on every parent state change in the New Sale page. The `SitePlanner` re-renders when any line item changes price.

**Fix**: Wrap with `React.memo()` and memoize callback props with `useCallback`.

---

### 28. No Loading Skeletons on Key Pages
**Files**: `clients/page.tsx`, `contracts/page.tsx`, `requests/page.tsx`

**Problem**: These pages simply show blank content while loading. The jobs and sales pages also show blank tables.

**Fix**: Add skeleton loading states (placeholder cards/rows) to match the existing design system's glassmorphism aesthetic.

---

### 29. `purchase-orders` Not in Portal Nav
**File**: [`components/portal/Layout.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/components/portal/Layout.tsx) — navItems array

**Problem**: The `purchase-orders` route exists at `/portal/purchase-orders` and is in the permissions system, but it's not in the navigation. Users have no way to navigate to it from the sidebar (only discoverable via the Sales page tab).

**Fix**: Either add it to the nav (with a ShoppingCart icon) or confirm it's intentionally tab-only.

---

### 30. `ErrorBoundary.tsx` Catches But Doesn't Report Errors
**File**: [`components/portal/ErrorBoundary.tsx`](file:///c:/Users/User/OneDrive/Desktop/Website/globalsecuritysolutions.co.za/components/portal/ErrorBoundary.tsx)

**Problem**: The error boundary catches React rendering errors but only logs to console. Production errors affecting real users are invisible.

**Fix**: Integrate with Sentry or a similar error monitoring service, or at minimum write a `/api/log-error` endpoint that captures these to Supabase.

---

## Summary Table

| # | Issue | Severity | File | Effort |
|---|-------|----------|------|--------|
| 1 | Auth callback must be a route handler | 🔴 Critical | `auth/callback/page.tsx` | 30 min |
| 2 | Dashboard fetches all data without limits | 🔴 Critical | `dashboard/page.tsx` | 2 hrs |
| 3 | Triple auth resolution per page load | 🔴 Critical | `middleware.ts`, `AuthContext`, `PortalGuard` | 3 hrs |
| 4 | Client portal file upload bypasses storage util | 🔴 Critical | `client-portal/page.tsx` | 1 hr |
| 5 | `window.confirm()` on destructive actions | 🔴 Critical | `sales/page.tsx`, `clients/page.tsx` | 2 hrs |
| 6 | Stats silently truncated at 1000 rows | 🟠 High | `sales/page.tsx`, `financials/page.tsx` | 3 hrs |
| 7 | Quotation status not set to Converted | 🟠 High | `sales/page.tsx` | 15 min |
| 8 | Contract billing runs client-side | 🟠 High | `contracts/page.tsx` | 4 hrs |
| 9 | Products loads all into memory | 🟠 High | `products/page.tsx` | 2 hrs |
| 10 | `refreshPortalAccess` type mismatch | 🟠 High | `AuthContext.tsx` | 30 min |
| 11 | Banking details in localStorage | 🟠 High | `use-settings.tsx` | 1 hr |
| 12 | Real-time only on activity_log | 🟠 High | `dashboard/page.tsx` | 1 hr |
| 13 | Google button misleads staff users | 🟡 Medium | `login/page.tsx` | 30 min |
| 14 | Access check flash on navigation | 🟡 Medium | `PortalGuard.tsx` | 1 hr |
| 15 | No user name in dashboard greeting | 🟡 Medium | `dashboard/page.tsx` | 15 min |
| 16 | Reset password doesn't verify token | 🟡 Medium | `reset-password/page.tsx` | 1 hr |
| 17 | New sale prefetches all clients | 🟡 Medium | `sales/new/page.tsx` | 30 min |
| 18 | SitePlanner not lazy-loaded in sale | 🟡 Medium | `sales/new/page.tsx` | 15 min |
| 19 | Client portal sequential fetches | 🟡 Medium | `client-portal/page.tsx` | 30 min |
| 20 | Settings typed as `any` | 🟡 Medium | `use-settings.tsx` | 1 hr |
| 21 | Pagination wrong for archived clients | 🟡 Medium | `clients/page.tsx` | 30 min |
| 22 | Date filter timezone issue in financials | 🟡 Medium | `financials/page.tsx` | 30 min |
| 23 | Console.log in PDF production code | 🟡 Medium | `pdf-service.js` | 5 min |
| 24 | Google callback error UX is jarring | 🟡 Medium | `auth/callback/page.tsx` | 30 min |
| 25 | Portal layout is client component | 🟢 Low | `portal/layout.tsx` | 1 hr |
| 26 | No error state on dashboard | 🟢 Low | `dashboard/page.tsx` | 30 min |
| 27 | Heavy components not memoized | 🟢 Low | `SmartEstimator`, `SitePlanner` | 1 hr |
| 28 | No loading skeletons | 🟢 Low | multiple pages | 3 hrs |
| 29 | Purchase Orders missing from nav | 🟢 Low | `Layout.tsx` | 10 min |
| 30 | ErrorBoundary doesn't report errors | 🟢 Low | `ErrorBoundary.tsx` | 2 hrs |

---

## Recommended Fix Priority Order

**Phase 1 — Do These First (Prevent data loss & auth breakage)**
1. Fix Auth Callback → Route Handler (#1)
2. Fix Quotation status after conversion (#7)
3. Remove banking details from localStorage (#11)
4. Replace `window.confirm()` with AlertDialog (#5)
5. Add `.limit()` / date filter to dashboard fetches (#2)

**Phase 2 — Performance & Reliability**
6. Parallelise client portal fetches (#19)
7. Fix clients pagination count (#21)
8. Move contract billing to Edge Function (#8)
9. Paginate products list (#9)
10. Fix financials date filter (#22)

**Phase 3 — UX Polish**
11. Add user name to dashboard (#15)
12. Fix Google button for staff (#13)
13. Reduce auth flash (#14)
14. Add error states to dashboard (#26)
15. Add loading skeletons (#28)
16. Add Purchase Orders to nav (#29)
