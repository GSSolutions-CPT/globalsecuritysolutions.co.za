# Cursor → Grok Build handoff (CRM)

**Project:** `globalsecuritysolutions.co.za`  
**Supabase:** `relzsctzfotbyaafnkqr`

## Already done (do NOT redo)

1. **Tables + RLS** — `client_requests`, `job_attachments`, `installation_details`, `installation_photos` + storage policies (`scripts/create-missing-crm-tables.sql`, applied)
2. **Stock columns** — `products.stock_quantity`, `reorder_level` (applied)
3. **Env template** — `.env.example` (Supabase, SITE_URL, service role, Resend)
4. **SitePlanner signed URLs** — private paths + `StorageImage` / `resolveStorageUrl`
5. **Job-completion invoice** — duplicate guard + mark quotation `Converted`
6. **Smoke SQL** — `scripts/crm-smoke-tests.sql` (DB checks pass)
7. **Transactional sales save** — RPC `upsert_sale_with_lines` + `scripts/upsert-sale-with-lines.sql`; `sales/new/page.tsx` uses RPC
8. **Pagination** — sales (quotes/invoices), jobs list, clients (`PaginationBar`, 50/page)
9. **TypeScript** — `InstallationDetail`/`InstallationPhoto` in `types/crm.d.ts`; `InstallationDetails.tsx` typed (fix any remaining `onChange` TS errors on Textarea)
10. **Email** — `lib/portal/email.ts` + Resend in `request-payment` route when `RESEND_API_KEY` set

## Your remaining work

1. **Fix `npm run build`** — resolve any TS/lint errors (Grok was on `InstallationDetails.tsx` Textarea `onChange` typing)
2. **Deploy staging** — Vercel preview or production URL
3. **Browser smoke test** — `node scripts/staging-browser-pass.mjs <staging-url>`  
   - Needs `playwright` installed if missing: `npm i -D playwright` then `npx playwright install chromium`
   - Optional: `PORTAL_TEST_EMAIL` + `PORTAL_TEST_PASSWORD` in `.env.local` for authenticated checks
4. **Manual env** — user must set in `.env.local`: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL`

## Known gaps (low priority)

- `saveDraftForSitePlan()` still uses direct inserts (create-only, not RPC)
- Board/calendar job views still load all jobs (list view is paginated)

## Coordination

Cursor cannot inject keystrokes into your interactive Grok TUI. This file + `grok -c -p` prompt syncs state. Continue from step 1 above.
