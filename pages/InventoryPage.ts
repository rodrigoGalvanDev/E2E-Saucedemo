import { Locator, Page } from "@playwright/test"

export default class InventoryPage {

    //Selectors
    private allProducts: string = '.inventory_item';
    private nameProduct: string = '.inventory_item_name';
    private priceProduct: string = '.inventory_item_price';
    private counterCart: string = '.fa-layers-counter'

    constructor(private page: Page){}

    async getAllProducts(){
        return await this.page.locator(this.allProducts).all();
    }

    async selectRandomProduct(allProducts: Locator[]){
        const randomIndex =  Math.floor(Math.random() * allProducts.length)
        return allProducts[randomIndex]
    }

    async getProductDetails(product: Locator){
        const productName = await product.locator(this.nameProduct).innerText();
        const productPrice = await product.locator(this.priceProduct).innerText()
        return {name: productName, price: productPrice.replace('$', '')}
    }

    async addCartRandomProduct(product: Locator){
        await product.getByRole('button', {name: 'ADD TO CART'}).click();
    }

    async getCartItemCount(){
        return await this.page.locator(this.counterCart).innerText();
    }


}