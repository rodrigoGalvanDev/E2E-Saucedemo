import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test('login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page)
    loginPage.navigateToThePage()
    loginPage.loginWithCredentials()

    await expect(page.locator('.product_label')).toBeVisible();

});


