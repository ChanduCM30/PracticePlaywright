
import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {

    readonly page: Page;
    readonly username: Locator
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator("#user-name");
        this.password = page.locator("#password");
        this.loginButton = page.locator("#login-button")
    }

    async urlAction(url: string) {
        await this.page.goto(url)
    }

    async fillUserName(userName: string) {
        await this.username.fill(userName);
    }

    async fillPassword(password: string) {
        await this.password.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async loginToApplication(url: string, userName: string, password: string) {
        this.urlAction(url);
        this.fillUserName(userName);
        this.fillPassword(password);
        this.clickLoginButton();
        await this.page.waitForTimeout(2000)
        expect(await this.page.title()).toBe('Swag Labs');
    }
}