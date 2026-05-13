import { test, expect } from '@playwright/test';

test.describe('Site navigation', () => {
  test.describe.configure({ retries: 2 });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the API docs page', async ({ page }) => {
    await page.goto('/docs/api/class-page');
    await page.waitForLoadState('domcontentloaded');
    expect(await page.title()).toContain('API Docs');
  });

  test('should navigate between sections', async ({ page }) => {
    await page.goto('/docs/intro');
    await page.click('text=Installation');
    await page.waitForSelector('h1:has-text("Installation")');
    expect(page.url()).toContain('/docs/installation');
  });

  test('should display code examples', async ({ page }) => {
    await page.goto('/docs/writing-tests');
    await page.waitForSelector('pre code');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('should toggle dark/light theme', async ({ page }) => {
    await page.goto('/docs/writing-tests');
    const themeToggle = page.locator('button[aria-label="Toggle theme"]');
    await themeToggle.click();
    await expect(page.locator('body')).toHaveClass(/dark-mode/);
  });
});