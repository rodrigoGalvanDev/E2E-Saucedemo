import { test, expect } from '@tests/fixture-logIn';
import LoginPage from '@pages/logIn-page';

test('login with valid credentials', async ({ loginPage }) => {
  expect(await loginPage.checkSuccessfulLogin()).toBe(true);
});

test('trying to login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.navigateToThePage()
  await loginPage.tryToLoginWithWrongCredentials()

  expect(await loginPage.checkUnsuccessfulLogin()).toBe(true);

});


