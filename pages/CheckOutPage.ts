import { Page } from "@playwright/test"

export default class CheckOutPage {

    constructor(private page: Page) { }

    async putMyInformation(name: string, lastname: string, zipcode: string) {
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(name);
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastname);
        await this.page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill(zipcode);
        await this.page.getByRole('button', { name: 'CONTINUE' }).click();
    }

    async finalizePurchase() {
        await this.page.getByRole('link', { name: 'FINISH' }).click()
    }

    async getProductDetails() {
        const productName = await this.page.locator('.inventory_item_name').innerText()
        const productPrice = await this.page.locator('.inventory_item_price').innerText()
        return { name: productName, price: productPrice.replace('$','') };
    }

    async addingTaxesToPrice(){
        const productPrice =  parseFloat((await this.page.locator('.inventory_item_price').innerText()).replace('$',''))
        const finalProductPrice = productPrice + (productPrice * 0.08);
        return finalProductPrice
    }

    async checkFinalPrice(){
        return parseFloat((await this.page.locator('.summary_total_label').innerText()).replace('Total: $', ''))
    }

    async checkUncessfulCheckOut(){
        return await this.page.locator('.error-button').isVisible();
    }

    async checkSuccessfulPurchase(){
        return await this.page.locator('.complete-header').isVisible();
    }
}