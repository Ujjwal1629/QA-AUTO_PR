import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------
// NAVIGATION / CONTENT TESTS
// Status: Improved with better waits and assertions
// ---------------------------------------------------------------

test.describe('Site navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the API docs page', async ({ page }) => {
    await page.goto('/docs/api/class-page');
    await page.waitForLoadState('networkidle');
    expect(await page.title()).toContain('API Documentation');
  });

  test('should navigate between sections', async ({ page }) => {
    await page.goto('/docs/intro');
    const link = page.locator('text=Installation').first();
    await link.click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/docs/installation');
  });

  test('should display code examples', async ({ page }) => {
    await page.goto('/docs/writing-tests');
    await page.waitForSelector('pre');
    const codeBlock = page.locator('pre');
    await expect(codeBlock).toBeVisible();
  });

  test('should toggle dark/light theme', async ({ page }) => {
    await page.goto('/docs/writing-tests');
    const themeToggle = page.locator('#theme-toggle');
    await themeToggle.click();
    // Verify theme change, e.g., by checking body class
    const bodyClass = await page.evaluate(() => document.body.className);
    expect(bodyClass).toContain('dark-mode');
  });
});
