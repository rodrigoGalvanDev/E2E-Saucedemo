import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test('login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page)
    loginPage.navigateToThePage()
    loginPage.loginWithCredentials()

    await expect(page.locator('.product_label')).toBeVisible();

});

test('trying to login with invalid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page)
    loginPage.navigateToThePage()
    loginPage.tryToLoginWithWrongCredentials()

    await expect(page.locator('.error-button')).toBeVisible();

});


