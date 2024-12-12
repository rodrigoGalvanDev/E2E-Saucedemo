import { Page } from "@playwright/test"

export default class CartPage {

    constructor(private page: Page) { }

    async navigateToCartPage() {
        await this.page.locator('.shopping_cart_link').click()
    }

    async getInfoProducts() {
        const productName = await this.page.locator('.inventory_item_name').innerText()
        const productPrice = await this.page.locator('.inventory_item_price').innerText()
        return { name: productName, price: productPrice };
    }

    async removeProduct() {
        await this.page.getByRole('button', { name: 'REMOVE' }).click();
    }

    async checkProductWasRemoved(){
        return await this.page.locator('.cart_item').isHidden()
    }

    async checkOutProducts() {
        await this.page.getByRole('link', { name: 'CHECKOUT' }).click();
    }

}