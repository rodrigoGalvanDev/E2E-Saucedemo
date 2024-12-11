import { Locator, Page } from "@playwright/test"

export default class InventoryPage {


    constructor(private page: Page){}

    async getAllProducts(){
        return await this.page.locator('.inventory_item').all();
    }

    async selectRandomProduct(allProducts: Locator[]){
        const randomIndex = Math.floor(Math.random() * allProducts.length)
        return allProducts[randomIndex]
    }

    async getProductDetails(product: Locator){
        const productName = await product.locator('.inventory_item_name').innerText();
        const productPrice = await product.locator('.inventory_item_price').innerText()
        return {name: productName, productPrice}
    }

    async addCartRandomProduct(product: Locator){
        await product.locator('.btn_primary').click()
    }

    async getCartItemCount(){
        return await this.page.locator('.fa-layers-counter').innerText();
    }


}