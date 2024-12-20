import { Page, Locator } from "@playwright/test"

export default class CartPage {
  //Selectors
  private page: Page;
  private shoppingCartButton: Locator;
  private nameProduct: Locator;
  private priceProduct: Locator;
  private productOnCart: Locator;
  private buttonRemove: Locator;
  private buttonCheckout: Locator;

  constructor(page: Page) { 
    this.page = page
    this.shoppingCartButton = page.locator('.shopping_cart_link');
    this.nameProduct = page.locator('.inventory_item_name');
    this.priceProduct = page.locator('.inventory_item_price');
    this.productOnCart = page.locator('.cart_item');
    this.buttonRemove = page.getByRole('button', { name: 'REMOVE' });
    this.buttonCheckout = page.getByRole('link', { name: 'CHECKOUT' });
  }

  async navigateToCartPage() {
    await this.shoppingCartButton.click()
  }

  async getInfoProducts() {
    const productName = await this.nameProduct.innerText()
    const productPrice = await this.priceProduct.innerText()
    return { name: productName, price: productPrice };
  }

  async removeProduct() {
    await this.buttonRemove.click();
  }

  async checkProductWasRemoved() {
    return await this.productOnCart.isHidden()
  }

  async checkOutProducts() {
    await this.buttonCheckout.click();
  }

}