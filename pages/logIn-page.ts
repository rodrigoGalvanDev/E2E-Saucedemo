import { Locator, Page } from '@playwright/test';

export default class LoginPage {

  //Selectors
  private page: Page;
  private productLabel: Locator;
  private errorButton: Locator;
  private userName: Locator;
  private password: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productLabel = page.locator('.product_label')
    this.errorButton = page.locator('.error-button')
    this.userName = page.getByRole('textbox', { name: 'Username' })
    this.password = page.getByRole('textbox', { name: 'Password' })
    this.loginButton = page.getByRole('button', { name: "LOGIN" })
  }

  async navigateToThePage() {
    await this.page.goto('https://www.saucedemo.com/v1/')
  }

  async loginWithCredentials(username: string = 'standard_user', password: string = 'secret_sauce') {
    await this.userName.fill(username)
    await this.password.fill(password)
    await this.loginButton.click()
  }

  async tryToLoginWithWrongCredentials(username: string = 'locked_out_user', password: string = 'secret_sauce') {
    await this.userName.fill(username)
    await this.password.fill(password)
    await this.loginButton.click()
  }

  async checkSuccessfulLogin() {
    return await this.productLabel.isVisible();
  }

  async checkUnsuccessfulLogin() {
    return await this.errorButton.isVisible();
  }

}