import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/InventoryPage';
import LoginPage from '../pages/LoginPage';


test('add an item to the cart', async ({ page }) => {


    const loginPage = new LoginPage(page)
    await loginPage.navigateToThePage()
    await loginPage.loginWithCredentials()
    
    const inventoryPage = new InventoryPage(page)
    const allProducts = await inventoryPage.getAllProducts()
    const product = await inventoryPage.selectRandomProduct(allProducts)
    await inventoryPage.addCartRandomProduct(product)
    
    const countOfItemsOnCart = await inventoryPage.getCartItemCount();
    expect(countOfItemsOnCart).toBe('1')

});