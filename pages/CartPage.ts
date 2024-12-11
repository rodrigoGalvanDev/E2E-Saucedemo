import { Locator, Page } from "@playwright/test"

export default class CartPage {

    constructor(private page: Page) { }

    async navigateToCartPage(){
        await this.page.locator('.shopping_cart_link').click()
    }
    
    async getInfoProducts(){
        const productName = await this.page.locator('.inventory_item_name').innerText()
        const productPrice = await this.page.locator('.inventory_item_price').innerText()
        return {name: productName, price: productPrice};
    }

    async removeProduct(){
        await this.page.getByRole('button', {name: 'REMOVE'}).click();
    }

    async checkOutProducts() {
        await this.page.getByRole('link', { name: 'CHECKOUT' }).click();
    }

    // async checkOutMyInformation() {
    //     await this.page.getByRole('textbox', { name: 'First Name' }).fill('John');
    //     await this.page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    //     await this.page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('1000');
    //     await this.page.getByRole('button', { name: 'CONTINUE' }).click();
    // }

    // async finalizePurchase(){
    //     await this.page.getByRole('link', {name: 'FINISH'}).click()
    // }

}