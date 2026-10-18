import { test, expect } from '@playwright/test';

test.describe('Site navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the API docs page', async ({ page }) => {
    await page.goto('/docs/api/class-page');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*docs\/api\/class-page/);
  });

  test('should navigate between sections', async ({ page }) => {
    await page.goto('/docs/intro');
    const link = page.locator('text=Installation').first();
    await link.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*docs\/installation/);
  });

  test('should display code examples', async ({ page }) => {
    await page.goto('/docs/writing-tests');
    await page.waitForSelector('pre');
    const codeBlocks = page.locator('pre');
    await expect(codeBlocks).toBeVisible();
  });

  test('should toggle dark/light theme', async ({ page }) => {
    await page.goto('/docs/writing-tests');
    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    await themeToggle.click();
    await expect(themeToggle).toHaveAttribute('aria-pressed', 'true');
  });
});