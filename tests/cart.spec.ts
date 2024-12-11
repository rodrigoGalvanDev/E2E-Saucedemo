import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/InventoryPage';
import LoginPage from '../pages/LoginPage';
import CartPage from '../pages/cartPage';


test('see information on the cartPage and proceed to checkout', async ({ page }) => {


    const loginPage = new LoginPage(page);
    await loginPage.navigateToThePage();
    await loginPage.loginWithCredentials();
    
    const inventoryPage = new InventoryPage(page);
    const allProducts = await inventoryPage.getAllProducts();
    const product = await inventoryPage.selectRandomProduct(allProducts);
    await inventoryPage.addCartRandomProduct(product);
    const productDetails = await inventoryPage.getProductDetails(product)

    const cartPage = new CartPage(page);
    await cartPage.navigateToCartPage();
    const productDetailsOnCart = await cartPage.getInfoProducts();
    expect(productDetails).toStrictEqual(productDetailsOnCart);
});

test('see information on the cartPage and remove the product', async ({ page }) => {


    const loginPage = new LoginPage(page);
    await loginPage.navigateToThePage();
    await loginPage.loginWithCredentials();
    
    const inventoryPage = new InventoryPage(page);
    const allProducts = await inventoryPage.getAllProducts();
    const product = await inventoryPage.selectRandomProduct(allProducts);
    await inventoryPage.addCartRandomProduct(product);

    const cartPage = new CartPage(page);
    await cartPage.navigateToCartPage();
    await cartPage.removeProduct()
    expect(page.locator('.cart_item')).toBeHidden();
});