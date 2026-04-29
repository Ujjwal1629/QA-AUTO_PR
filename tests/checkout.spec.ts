import { test, expect } from '@playwright/test';

test.describe('Site navigation', () => {
  test.describe.configure({ retries: 2 });

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
    expect(page.url()).toContain('installation');
  });

  test('should display code examples', async ({ page }) => {
    await page.goto('/docs/writing-tests');
    await page.waitForSelector('pre');
    const codeBlocks = page.locator('pre');
    await expect(codeBlocks).toBeVisible();
  });

  test('should copy code snippets', async ({ page }) => {
    await page.goto('/docs/writing-tests');
    const copyButton = page.locator('button.copy');
    await copyButton.click();
    // Add assertion to verify clipboard content if possible
  });

  test('should toggle dark/light theme', async ({ page }) => {
    await page.goto('/docs/writing-tests');
    const themeToggle = page.locator('button.theme-toggle');
    await themeToggle.click();
    // Add assertion to verify theme change
  });
});
