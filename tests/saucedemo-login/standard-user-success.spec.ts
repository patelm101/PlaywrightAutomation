// spec: specs/saucedemo-login.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login flow', () => {
  test('standard_user logs in successfully', {
    tag: ['@smoke', '@critical'],
    annotation: { type: 'priority', description: 'P0' },
  }, async ({ page }) => {
    // 1. Begin at https://www.saucedemo.com/ in a fresh logged-out browser session.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();

    // 2. Enter standard_user in the Username field and secret_sauce in the Password field.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');
    await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce');

    // 3. Activate the Login button.
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    await expect(page.locator('[data-test="error"]')).toHaveCount(0);
  });
});
