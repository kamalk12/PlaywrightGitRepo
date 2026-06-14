import { expect, Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly mainHeading: Locator;
    readonly foundationLevelButton: Locator;
    readonly advancedLevelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mainHeading = page.getByRole('main');
        this.foundationLevelButton = page.getByRole('button', { name: 'Foundation Level FOUNDATION' });
        this.advancedLevelButton = page.getByRole('button', { name: 'Advanced Level ADVANCED' });
    }

    async verifyDashboardHeading(heading1: string, heading2: string, cost: string, certifications: number) {
        await expect(this.mainHeading).toContainText(heading1);
        await expect(this.mainHeading).toContainText(heading2);
        await expect(this.mainHeading).toContainText('Upgrade from ' + cost);
        await this.page.getByRole('button', { name: heading1 + ' ' + heading2 }).click();
        await expect(this.mainHeading).toContainText('Unlock ' + heading1 + ' — ' + certifications + ' certifications');
        //  await expect(this.mainHeading).toContainText('Foundation Level');
        // await expect(this.mainHeading).toContainText('FOUNDATION');
        // await expect(this.mainHeading).toContainText('Upgrade from $19');
        // await this.page.getByRole('button', { name: 'Foundation Level FOUNDATION' }).click();
        // await this.page.getByRole('button', { name: 'Advanced Level ADVANCED' }).click();
        // await expect(this.mainHeading).toContainText('Unlock Advanced Level — 5 certifications');
    }


}

