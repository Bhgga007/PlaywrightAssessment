import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { CartPage } from '../pages/cart';
import { checkoutPage } from '../pages/checkout';

let loginPage: LoginPage;
let cartPage: CartPage;
let CheckoutPage: checkoutPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    CheckoutPage = new checkoutPage(page);
    await loginPage.goto();
    console.log("This is before each test");
});
test.beforeAll(() => {
    console.log("This is before all tests");
});
test.afterAll(() => {
    console.log("This is after all tests");
});


test.describe('testing login', () => {
    test('valid login', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.assertLoginSuccess();
    });

});
test.describe('testing adding to cart', () => {

    test('add to cart', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.assertLoginSuccess();
        await page.locator("//button[@id='add-to-cart-sauce-labs-backpack']").click();
        await cartPage.gotoCart();
        await cartPage.assertItemInCart("Sauce Labs Backpack");
    });
});
test.describe('testing view cart', () => {

    test('view cart', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.assertLoginSuccess();
        await page.locator("//button[@id='add-to-cart-sauce-labs-backpack']").click();
        await cartPage.gotoCart();
        await cartPage.assertItemInCart("Sauce Labs Backpack");
        await cartPage.continueShopping();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

    test('remove from cart', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.assertLoginSuccess();
        await page.locator("//button[@id='add-to-cart-sauce-labs-backpack']").click();
        await cartPage.gotoCart();
        await cartPage.assertItemInCart("Sauce Labs Backpack");
        await cartPage.removeItem();
        await cartPage.assertItemNotInCart("Sauce Labs Backpack");
    });


});
test.describe('testing checkout', () => {

    test('checkout', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.assertLoginSuccess();
        await page.locator("//button[@id='add-to-cart-sauce-labs-backpack']").click();
        await cartPage.gotoCart();
        await cartPage.assertItemInCart("Sauce Labs Backpack");
        await cartPage.proceedToCheckout();
        await CheckoutPage.fillCheckoutInformation("Mustafa", "Bhgt", "12345");
        await CheckoutPage.finishCheckout();
    });

    test('checkout cancel', async ({ page }) => {

        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.assertLoginSuccess();
        await page.locator("//button[@id='add-to-cart-sauce-labs-backpack']").click();
        await cartPage.gotoCart();
        await cartPage.assertItemInCart("Sauce Labs Backpack");
        await cartPage.proceedToCheckout();
        await CheckoutPage.fillCheckoutInformation("Mustafa", "Bhgt", "12345");
        await CheckoutPage.cancelCheckout();

    });

    test('empty checkout', async ({ page }) => {

        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.assertLoginSuccess();
        await cartPage.gotoCart();
        await cartPage.proceedToCheckout();
        await CheckoutPage.fillCheckoutInformation("Mustafa", "Bhgt", "12345");
        await CheckoutPage.finishCheckout();
        await expect(page.locator(".complete-header")).toContainText("Thank you for your order!");
    });
});
test.describe('testing logout', () => {

    test('logout', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await loginPage.assertLoginSuccess();
        await loginPage.logout();
    });
});

