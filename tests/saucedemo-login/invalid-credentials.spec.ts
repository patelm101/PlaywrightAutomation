// spec: specs/saucedemo-login.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login flow', () => {
  test('Invalid credentials are rejected', async ({ page }) => {
    // 1. Begin at https://www.saucedemo.com/ in a fresh logged-out browser session.
    await page.goto('https://www.saucedemo.com/');

    // 2. Enter foo in the Username field and bar in the Password field.
    await page.locator('[data-test="username"]').fill('foo');
    await page.locator('[data-test="password"]').fill('bar');
    await expect(page.locator('[data-test="username"]')).toHaveValue('foo');
    await expect(page.locator('[data-test="password"]')).toHaveValue('bar');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();

    // 3. Activate the Login button.
    await page.locator('[data-test="login-button"]').click();

    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  });
});
