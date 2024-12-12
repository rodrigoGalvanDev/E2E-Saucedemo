import { Page } from "@playwright/test"

export default class CheckOutPage {

    //Selectors
    private nameProduct: string = '.inventory_item_name';
    private priceProduct: string = '.inventory_item_price';
    private finalPriceProduct: string = '.summary_total_label'
    private buttonError: string = '.error-button'
    private headerFinishPurchase: string = '.complete-header'

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
        const productName = await this.page.locator(this.nameProduct).innerText()
        const productPrice = await this.page.locator(this.priceProduct).innerText()
        return { name: productName, price: productPrice.replace('$','') };
    }

    async addingTaxesToPrice(){
        const productPrice =  parseFloat((await this.page.locator(this.priceProduct).innerText()).replace('$',''))
        const finalProductPrice = productPrice + (productPrice * 0.08);
        return finalProductPrice
    }

    async checkFinalPrice(){
        return parseFloat((await this.page.locator(this.finalPriceProduct).innerText()).replace('Total: $', ''))
    }

    async checkUncessfulCheckOut(){
        return await this.page.locator(this.buttonError).isVisible();
    }

    async checkSuccessfulPurchase(){
        return await this.page.locator(this.headerFinishPurchase).isVisible();
    }
}