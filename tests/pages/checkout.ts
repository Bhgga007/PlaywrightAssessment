import { expect , type Locator , type Page }from "@playwright/test";


export class checkoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator("//input[@id='first-name']");
        this.lastNameInput = page.locator("//input[@id='last-name']");
        this.postalCodeInput = page.locator("//input[@id='postal-code']");
        this.continueButton = page.locator("//input[@id='continue']");
        this.finishButton = page.locator("//button[@id='finish']");
        this.cancelButton = page.locator("//button[@id='cancel']");
    }
    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
        await expect(this.page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
    }

    async finishCheckout() {
        await this.finishButton.click();
        await expect(this.page.locator(".complete-header")).toContainText("Thank you for your order!");
    }

    async cancelCheckout() {
        await this.cancelButton.click();
        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
    }

}