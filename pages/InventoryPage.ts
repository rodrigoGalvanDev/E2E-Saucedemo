import { Page } from "@playwright/test"

export default class InventoryPage {


    constructor(private page: Page){}

    async addCartRandomItem(){
        const allItems = await this.page.locator('.inventory_item').all();
        const anItem = allItems[Math.floor(Math.random() * allItems.length)];
        await anItem.locator('.btn_primary').click()
        return anItem
    }

    async getCartItemCount(){
        return await this.page.locator('.fa-layers-counter').innerText();
    }


}