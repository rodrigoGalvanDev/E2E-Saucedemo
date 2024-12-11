import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test('login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateToThePage()
    await loginPage.loginWithCredentials()

    await expect(page.locator('.product_label')).toBeVisible();

});

test('trying to login with invalid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateToThePage()
    await loginPage.tryToLoginWithWrongCredentials()

    await expect(page.locator('.error-button')).toBeVisible();

});


