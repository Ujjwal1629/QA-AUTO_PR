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

    const heading = page.locator('h1');
    await expect(heading).toHaveText('API Documentation');
  });

  test('should navigate between sections', async ({ page }) => {
    await page.goto('/docs/intro');

    const link = page.locator('text=Installation').first();
    await link.click();

    await page.waitForLoadState('networkidle');

    const newHeading = page.locator('h1');
    await expect(newHeading).toHaveText('Installation');
  });

  test('should display code examples', async ({ page }) => {
    await page.goto('/docs/writing-tests');

    await page.waitForLoadState('networkidle');

    const codeBlock = page.locator('pre code');
    await expect(codeBlock).toBeVisible();

    // New test for copying code snippets
    const copyButton = page.locator('button', { hasText: 'Copy' });
    await expect(copyButton).toBeVisible();

    // New test for dark/light theme toggle
    const themeToggle = page.locator('button', { hasText: 'Toggle Theme' });
    await expect(themeToggle).toBeVisible();
  });
});