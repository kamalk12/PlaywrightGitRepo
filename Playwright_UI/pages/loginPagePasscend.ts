import { expect, type Page, type Locator } from '@playwright/test';

// ... rest of your class ...

export class LoginPage {

    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
  }

  async openURL(url: string) {
    await this.page.goto(url);
    await expect(this.page.getByRole('navigation')).toContainText('Log in');
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }

    async login(email: string, password: string) {
      await expect(this.page.locator('form')).toContainText('Email');
      await this.emailInput.click();
      await this.emailInput.fill(email);
      await this.emailInput.click();
      await this.passwordInput.click();
      await this.passwordInput.fill(password);
      await expect(this.page.locator('form')).toContainText('Sign in');
      await this.signInButton.click();
      
    }
    
    async verifyErrorMessage() {
      await expect(this.page.getByRole('alert')).toContainText('Invalid email or password');
    }
    
    async verifyLoginSuccesfull() {
    //   await this.page.waitForTimeout(25000);
        await expect(this.page.getByRole('navigation')).toContainText('Dashboard', { timeout: 30000 });
    }
}

 

