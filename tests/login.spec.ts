import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test('login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateToThePage()
    await loginPage.loginWithCredentials()

    const checkSuccessfulLogin = await loginPage.checkSuccessfulLogin();
    expect(checkSuccessfulLogin).toBe(true);

});

test('trying to login with invalid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.navigateToThePage()
    await loginPage.tryToLoginWithWrongCredentials()

    expect(await loginPage.checkUnsuccessfulLogin()).toBe(true);

});


