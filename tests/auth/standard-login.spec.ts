import { test, expect } from '../../src/fixtures/base';
import users from '../data/users.json';

test.describe('Login flow', () => {
  test('standard_user logs in successfully @smoke @critical', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await expect(loginPage.loginForm).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    await loginPage.login(users.standard);

    await expect(inventoryPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.productCards).toHaveCount(6);
    await expect(loginPage.loginError).toHaveCount(0);
  });
});
