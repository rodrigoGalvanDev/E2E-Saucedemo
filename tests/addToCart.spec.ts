import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/InventoryPage';
import LoginPage from '../pages/LoginPage';


test('add an item to the cart', async ({ page }) => {


    const loginPage = new LoginPage(page)
    await loginPage.navigateToThePage()
    await loginPage.loginWithCredentials()
    const inventoryPage = new InventoryPage(page)
    await inventoryPage.addCartRandomItem()

    const countOfItemsOnCart = await page.locator('//span[@class = "fa-layers-counter shopping_cart_badge"]').innerText()
    expect(countOfItemsOnCart).toBe('1')

});