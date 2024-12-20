import { Locator, Page } from "@playwright/test"

export default class InventoryPage {

  //Selectors
  private page: Page;
  private allProducts: Locator;
  private counterCart: Locator;

  constructor(page: Page) {
    this.page = page
    this.allProducts = page.locator('.inventory_item');
    this.counterCart = page.locator('.fa-layers-counter')
  }

  async getAllProducts() {
    return await this.allProducts.all();
  }

  async selectRandomProduct(allProducts: Locator[]) {
    const randomIndex = Math.floor(Math.random() * allProducts.length)
    return allProducts[randomIndex]
  }

  async getProductDetails(product: Locator) {
    const productName = await product.locator('.inventory_item_name').innerText();
    const productPrice = await product.locator('.inventory_item_price').innerText()
    return { name: productName, price: productPrice.replace('$', '') }
  }

  async addCartRandomProduct(product: Locator) {
    await product.getByRole('button', { name: 'ADD TO CART' }).click();
  }

  async getCartItemCount() {
    return await this.counterCart.innerText();
  }


}