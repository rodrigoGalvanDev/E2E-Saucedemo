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

    const checkUnsuccessfulLogin = await loginPage.checkUnsuccessfulLogin()
    expect(checkUnsuccessfulLogin).toBe(true);

});


