import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------
// SEARCH TESTS
// Status: Improved with better waits and additional edge case tests
// ---------------------------------------------------------------

test.describe('Search functionality', () => {
  test.describe.configure({ retries: 2 });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should open search dialog', async ({ page }) => {
    await page.keyboard.press('Control+K');

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
  });

  test('should return results for a valid query', async ({ page }) => {
    await page.keyboard.press('Control+K');

    const searchInput = page.locator('[placeholder="Search"]');
    await searchInput.type('locator');

    const results = page.locator('[cmdk-item]');
    await expect(results).toHaveCountGreaterThan(0);
  });

  // New test for empty search query
  test('should handle empty search query gracefully', async ({ page }) => {
    await page.keyboard.press('Control+K');

    const searchInput = page.locator('[placeholder="Search"]');
    await searchInput.type('');

    const noResultsMessage = page.locator('text=No results found');
    await expect(noResultsMessage).toBeVisible();
  });

  // New test for search with special characters
  test('should handle special characters in search query', async ({ page }) => {
    await page.keyboard.press('Control+K');

    const searchInput = page.locator('[placeholder="Search"]');
    await searchInput.type('!@#$%^&*()');

    const noResultsMessage = page.locator('text=No results found');
    await expect(noResultsMessage).toBeVisible();
  });

  // New test for closing search dialog with Escape
  test('should close search dialog on Escape', async ({ page }) => {
    await page.keyboard.press('Control+K');

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });
});