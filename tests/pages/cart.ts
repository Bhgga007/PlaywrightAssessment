import { expect , type Locator , type Page }from "@playwright/test";


export class CartPage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly itemName: Locator;
    readonly removeButton: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator("//a[@class='shopping_cart_link']");
        this.itemName = page.locator("//div[@class='inventory_item_name']");
        this.removeButton = page.locator("//button[contains(@id,'remove-')]");
        this.checkoutButton = page.locator("//button[@id='checkout']");
        this.continueShoppingButton = page.locator("//button[@id='continue-shopping']");
    }

    async gotoCart() {
        await this.cartLink.click();
        await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html");
    }

    async assertItemInCart(expectedItem: string) {
        await expect(this.itemName).toContainText(expectedItem);
    }
    async removeItem() {
        await this.removeButton.click();
    }

    async assertItemNotInCart(expectedItem: string) {
        await expect(this.page.locator("(//div[@class='removed_cart_item'])[1]")).not.toContainText("Sauce Labs Backpack");
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
    }



}