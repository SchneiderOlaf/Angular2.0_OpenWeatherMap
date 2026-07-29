import { test, expect } from '@playwright/test';

test('homepage renders the weather app shell', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Weather' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Unit:/ })).toBeVisible();
});
