import { test, expect } from '@playwright/test'

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000'

test.describe('Portal E2E', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/portal/login`)
    })

    test('loads login page and shows login UI', async ({ page }) => {
        await expect(page.locator('body')).toBeVisible()
        await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible()
    })

    test('navigates to register client page', async ({ page }) => {
        await page.getByRole('link', { name: /create an account/i }).click()
        await expect(page).toHaveURL(`${BASE_URL}/portal/register-client`)
        await expect(page.getByLabel(/full name/i)).toBeVisible()
    })
})
