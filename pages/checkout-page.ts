import { Page, Locator } from "@playwright/test"

export default class CheckOutPage {

  //Selectors
  private page: Page;
  private nameProduct: Locator;
  private priceProduct: Locator;
  private finalPriceProduct: Locator;
  private buttonError: Locator;
  private headerFinishPurchase: Locator;
  private firstName: Locator;
  private lastName: Locator;
  private zipCode: Locator;
  private buttonContinue: Locator;
  private buttonFinalizePurchase: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameProduct = page.locator('.inventory_item_name');
    this.priceProduct = page.locator('.inventory_item_price');
    this.finalPriceProduct = page.locator('.summary_total_label');
    this.buttonError = page.locator('.error-button');
    this.headerFinishPurchase = page.locator('.complete-header');
    this.firstName = page.getByRole('textbox', { name: 'First Name' })
    this.lastName = page.getByRole('textbox', { name: 'Last Name' })
    this.zipCode = page.getByRole('textbox', { name: 'Zip/Postal Code' })
    this.buttonContinue = page.getByRole('button', { name: 'CONTINUE' })
    this.buttonFinalizePurchase = page.getByRole('link', { name: 'FINISH' });
  }

  async putMyInformation(name: string, lastname: string, zipcode: string) {
    await this.firstName.fill(name);
    await this.lastName.fill(lastname);
    await this.zipCode.fill(zipcode);
    await this.buttonContinue.click();
  }

  async finalizePurchase() {
    await this.buttonFinalizePurchase.click()
  }

  async getProductDetails() {
    const productName = await this.nameProduct.innerText()
    const productPrice = await this.priceProduct.innerText()
    return { name: productName, price: productPrice.replace('$', '') };
  }

  async addingTaxesToPrice() {
    const productPrice = parseFloat((await this.priceProduct.innerText()).replace('$', ''))
    const finalProductPrice = productPrice + (productPrice * 0.08);
    return finalProductPrice
  }

  async checkFinalPrice() {
    return parseFloat((await this.finalPriceProduct.innerText()).replace('Total: $', ''))
  }

  async checkUncessfulCheckOut() {
    return await this.buttonError.isVisible();
  }

  async checkSuccessfulPurchase() {
    return await this.headerFinishPurchase.isVisible();
  }
}