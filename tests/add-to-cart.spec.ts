import { test , expect} from '@tests/fixture-logIn';
import InventoryPage from '@pages/inventory-page';

test('add an item to the cart', async ({loginPage, page }) => {
  const inventoryPage = new InventoryPage(page)
  const allProducts = await inventoryPage.getAllProducts()
  const product = await inventoryPage.selectRandomProduct(allProducts)
  await inventoryPage.addCartRandomProduct(product)

  const countOfItemsOnCart = await inventoryPage.getCartItemCount();
  expect(countOfItemsOnCart).toBe('1')

});