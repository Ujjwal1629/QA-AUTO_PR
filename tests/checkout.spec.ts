import { test, expect } from '@playwright/test';

test.describe('Site navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the API docs page', async ({ page }) => {
    await page.goto('/docs/api/class-page');
    await page.waitForLoadState('networkidle');
    expect(await page.title()).toContain('API Docs');
  });

  test('should navigate between sections', async ({ page }) => {
    await page.goto('/docs/intro');
    await page.click('text=Installation');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('installation');
  });

  test('should display code examples', async ({ page }) => {
    await page.goto('/docs/writing-tests');
    await page.waitForSelector('pre');
    const codeBlocks = await page.locator('pre').count();
    expect(codeBlocks).toBeGreaterThan(0);
  });

  test('should toggle dark/light theme', async ({ page }) => {
    await page.goto('/docs/writing-tests');
    const toggleButton = page.locator('button[aria-label="Toggle theme"]');
    await toggleButton.click();
    expect(await page.evaluate(() => document.body.classList.contains('dark'))).toBe(true);
  });
});