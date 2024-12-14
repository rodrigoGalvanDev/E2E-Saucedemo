import { test, expect } from '@playwright/test'
import LoginPage from '@pages/LoginPage';
import InventoryPage from '@pages/InventoryPage';
import CartPage from '@pages/CartPage';
import CheckOutPage from '@pages/CheckOutPage';

test('do all the checkout process and finalize the purchase', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.navigateToThePage();
    await loginPage.loginWithCredentials();

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

test('putting wrong infomation on check out', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.navigateToThePage();
    await loginPage.loginWithCredentials();

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

