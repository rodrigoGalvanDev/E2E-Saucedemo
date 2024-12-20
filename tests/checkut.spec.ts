import { test, expect } from '@tests/fixture-logIn'
import InventoryPage from '@pages/inventory-page';
import CartPage from '@pages/cart-page';
import CheckOutPage from '@pages/checkout-page';

test('do all the checkout process and finalize the purchase', async ({ loginPage, page }) => {
  const inventoryPage = new InventoryPage(page);
  const allProducts = await inventoryPage.getAllProducts();
  const product = await inventoryPage.selectRandomProduct(allProducts);
  await inventoryPage.addCartRandomProduct(product);

  const cartPage = new CartPage(page);
  await cartPage.navigateToCartPage();
  await cartPage.checkOutProducts();

  const checkOutPage = new CheckOutPage(page);
  await checkOutPage.putMyInformation("John", "Doe", "1000");
  const priceIncludingTaxes = await checkOutPage.addingTaxesToPrice();
  expect(await checkOutPage.checkFinalPrice()).toBeCloseTo(priceIncludingTaxes)
  await checkOutPage.finalizePurchase();
  expect(await checkOutPage.checkSuccessfulPurchase()).toBe(true)

})

test('putting wrong infomation on check out', async ({ loginPage, page }) => {
  const inventoryPage = new InventoryPage(page);
  const allProducts = await inventoryPage.getAllProducts();
  const product = await inventoryPage.selectRandomProduct(allProducts);
  await inventoryPage.addCartRandomProduct(product);

  const cartPage = new CartPage(page);
  await cartPage.navigateToCartPage();
  await cartPage.checkOutProducts();

  const checkOutPage = new CheckOutPage(page);
  await checkOutPage.putMyInformation("", "", "");
  expect(await checkOutPage.checkUncessfulCheckOut()).toBe(true);

})

