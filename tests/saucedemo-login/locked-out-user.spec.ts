// spec: specs/saucedemo-login.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login flow', () => {
  test('locked_out_user is rejected', {
    tag: '@regression',
    annotation: { type: 'priority', description: 'P1' },
  }, async ({ page }) => {
    // 1. Begin at https://www.saucedemo.com/ in a fresh logged-out browser session.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();

    // 2. Enter locked_out_user in the Username field and secret_sauce in the Password field.
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await expect(page.locator('[data-test="username"]')).toHaveValue('locked_out_user');
    await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce');

    // 3. Activate the Login button.
    await page.locator('[data-test="login-button"]').click();

    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
});
