import { test, expect } from '@playwright/test';

test.describe('Site navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the API docs page', async ({ page }) => {
    await page.click('text=API Docs');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/docs/api/class-page');
    const content = page.locator('h1');
    await expect(content).toHaveText('API Documentation');
  });

  test('should navigate between sections', async ({ page }) => {
    await page.click('text=Intro');
    await page.waitForLoadState('networkidle');
    const link = page.locator('text=Installation').first();
    await link.click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/docs/installation');
  });

  test('should display code examples', async ({ page }) => {
    await page.click('text=Writing Tests');
    await page.waitForLoadState('networkidle');
    const codeBlock = page.locator('pre code');
    await expect(codeBlock).toBeVisible();
  });
});