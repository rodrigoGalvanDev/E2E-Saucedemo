import { test as base } from '@playwright/test';
import LoginPage from '@pages/logIn-page';

export const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await loginPage.navigateToThePage();
    await loginPage.loginWithCredentials();
    await use(loginPage);
  },
});

export { expect } from '@playwright/test'