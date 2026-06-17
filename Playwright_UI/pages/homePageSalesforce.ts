import { Page, expect, Locator } from '@playwright/test';

export class CustomerPage {
    readonly page: Page;
    readonly GlobalMenu: Locator;
    readonly FirstNameInput: Locator;
    readonly LastNameInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.GlobalMenu = page.getByLabel('Global', { exact: true }).getByRole('list');
        this.FirstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.LastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    }
    //Home Page
    async verifyHomePage() {
        await expect(this.GlobalMenu).toContainText('Home');
        await expect(this.GlobalMenu).toContainText('Contacts');
    }

    async navigateToContacts() {
        await this.page.getByRole('link', { name: 'Contacts' }).click();
        await expect(this.page.locator('#brandBand_2')).toContainText('Contacts');
    }

    //Go to Create New Contact
    async createNewContact(FirstName: string, LastName: string) {

        await this.page.getByRole('button', { name: 'Contacts List' }).click();
        await this.page.getByRole('menuitem', { name: 'New Contact' }).click();
        await expect(this.page.locator('record_flexipage-desktop-record-page-decorator')).toContainText('New Contact');
        await expect(this.page.locator('flexipage-record-home-single-col-no-header-template-desktop2')).toContainText('Account Name');
        await expect(this.page.locator('flexipage-record-home-single-col-no-header-template-desktop2')).toContainText('Contact Owner');
        await this.FirstNameInput.click();
        await this.FirstNameInput.fill(FirstName);
        await this.LastNameInput.click();
        await this.LastNameInput.fill(LastName);
        await expect(this.page.locator('button[name="SaveAndNew"]')).toContainText('Save & New');
        await expect(this.page.locator('button[name="SaveEdit"]')).toContainText('Save');
        await this.page.getByRole('button', { name: 'Cancel', exact: true }).click();
    }
}




