import { Page } from "@playwright/test"

export default class CartPage {
    //Selectors
    private shoppingCartButton: string = '.shopping_cart_link'
    private nameProduct: string = '.inventory_item_name';
    private priceProduct: string = '.inventory_item_price';
    private productOnCart: string = '.cart_item'

    constructor(private page: Page) { }

    async navigateToCartPage() {
        await this.page.locator(this.shoppingCartButton).click()
    }

    async getInfoProducts() {
        const productName = await this.page.locator(this.nameProduct).innerText()
        const productPrice = await this.page.locator(this.priceProduct).innerText()
        return { name: productName, price: productPrice };
    }

    async removeProduct() {
        await this.page.getByRole('button', { name: 'REMOVE' }).click();
    }

    async checkProductWasRemoved(){
        return await this.page.locator(this.productOnCart).isHidden()
    }

    async checkOutProducts() {
        await this.page.getByRole('link', { name: 'CHECKOUT' }).click();
    }

}