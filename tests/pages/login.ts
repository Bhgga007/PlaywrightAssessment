import { expect , type Locator , type Page }from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder("Username");
        this.passwordInput = page.getByPlaceholder("Password");
        this.loginButton = page.locator("//input[@id='login-button']");
        this.errorMessage = page.locator("//h3[@data-test='error']");
    }
    async goto() {
        await this.page.goto("https://www.saucedemo.com");
    }
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async assertLoginSuccess() {
        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
    }
    async assertLoginFailure(expectedMessage: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedMessage);

    }

    async logout() {
        await this.page.locator("//button[@id='react-burger-menu-btn']").click();
        await this.page.locator("//a[@id='logout_sidebar_link']").click();
        await expect(this.page).toHaveURL("https://www.saucedemo.com/");
    }
    

};
