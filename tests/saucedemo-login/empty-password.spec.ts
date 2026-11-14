// spec: specs/saucedemo-login.md
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login flow', () => {
  test('Empty password is rejected', async ({ page }) => {
    // 1. Begin at https://www.saucedemo.com/ in a fresh logged-out browser session with both fields empty.
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();

    // 2. Enter standard_user in the Username field and leave the Password field empty.
    await page.locator('[data-test="username"]').fill('standard_user');
    await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');
    await expect(page.locator('[data-test="password"]')).toBeEmpty();

    // 3. Activate the Login button.
    await page.locator('[data-test="login-button"]').click();

    await expect(page.getByRole('form', { name: 'Login' })).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Password is required');
  });
});
