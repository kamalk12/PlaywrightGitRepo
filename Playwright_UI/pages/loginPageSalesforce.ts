import {Page, Locator, expect} from '@playwright/test';

export class SalesforceLogin {

    // Define locators for the login page elements
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.rememberMeCheckbox = page.getByText('Remember me');
        this.loginButton = page.getByRole('button', { name: 'Log In' });
    }

    async openURL(url: string) {
        await this.page.goto(url);
        await expect(this.page.locator('#usernamegroup')).toContainText('Username');
    }

    async login(username: string, password: string) {
        await this.usernameInput.click();
        await this.usernameInput.fill(username);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.rememberMeCheckbox.click();
        await this.loginButton.click();
    }
}


