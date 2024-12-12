import { Page } from '@playwright/test';

export default class LoginPage {

    //Selectors
    private productLabel: string = '.product_label';
    private errorButton: string = '.error-button';

    constructor(private page: Page) {}

    async navigateToThePage() {
        await this.page.goto('https://www.saucedemo.com/v1/')
    }

    async loginWithCredentials() {
        await this.page.getByRole('textbox', { name: 'Username' }).fill('standard_user')
        await this.page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce')
        await this.page.getByRole('button', { name: "LOGIN" }).click()
    }

    async tryToLoginWithWrongCredentials(){
        await this.page.getByRole('textbox', { name: 'Username' }).fill('locked_out_user')
        await this.page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce')
        await this.page.getByRole('button', { name: "LOGIN" }).click()
    }

    async checkSuccessfulLogin(){
        return await this.page.locator(this.productLabel).isVisible();
    }

    async checkUnsuccessfulLogin(){
        return await this.page.locator(this.errorButton).isVisible();
    }

}