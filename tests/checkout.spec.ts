import { test, expect } from '@playwright/test';

test.describe('Site navigation', () => {
  test.describe.configure({ retries: 2 });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the API docs page', async ({ page }) => {
    await page.goto('/docs/api/class-page');
    await page.waitForLoadState('domcontentloaded');
    const content = await page.locator('h1').textContent();
    expect(content).toContain('API Documentation');
  });

  test('should navigate between sections', async ({ page }) => {
    await page.goto('/docs/intro');
    await page.click('text=Installation');
    await page.waitForLoadState('domcontentloaded');
    const url = page.url();
    expect(url).toContain('installation');
  });

  test('should display code examples', async ({ page }) => {
    await page.goto('/docs/writing-tests');
    await page.waitForSelector('pre');
    const codeBlocks = await page.locator('pre').count();
    expect(codeBlocks).toBeGreaterThan(0);
  });
});