import { test, expect } from '@playwright/test';
import InventoryPage from '../pages/InventoryPage';
import LoginPage from '../pages/LoginPage';
import CartPage from '../pages/CartPage';


test('see if the product was correctly added and proceed to checkout', async ({ page }) => {


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
    await cartPage.checkOutProducts()
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

    expect (await cartPage.checkProductWasRemoved()).toBe(true)
});