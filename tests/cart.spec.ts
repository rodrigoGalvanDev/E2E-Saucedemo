import { test, expect } from '@tests/fixture-logIn';
import InventoryPage from '@pages/inventory-page';
import CartPage from '@pages/cart-page';


test('see if the product was correctly added and proceed to checkout', async ({ loginPage, page }) => {
  const inventoryPage = new InventoryPage(page);
  const allProducts = await inventoryPage.getAllProducts();
  const product = await inventoryPage.selectRandomProduct(allProducts);
  await inventoryPage.addCartRandomProduct(product);
  const productDetails = await inventoryPage.getProductDetails(product)

  const cartPage = new CartPage(page);
  await cartPage.navigateToCartPage();
  const productDetailsOnCart = await cartPage.getInfoProducts();
  expect(productDetails).toStrictEqual(productDetailsOnCart);
  await cartPage.checkOutProducts()
});

test('see information on the cartPage and remove the product', async ({ loginPage, page }) => {
  const inventoryPage = new InventoryPage(page);
  const allProducts = await inventoryPage.getAllProducts();
  const product = await inventoryPage.selectRandomProduct(allProducts);
  await inventoryPage.addCartRandomProduct(product);

  const cartPage = new CartPage(page);
  await cartPage.navigateToCartPage();
  await cartPage.removeProduct()

  expect(await cartPage.checkProductWasRemoved()).toBe(true)
});