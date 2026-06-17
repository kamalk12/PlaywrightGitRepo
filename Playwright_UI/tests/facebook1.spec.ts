import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
    console.log('Execution started at: ' + new Date().toLocaleString());
})

test('test', async ({ page }) => {
    await page.goto('https://www.facebook.com/');
    await page.getByRole('link', { name: 'Create new account' }).click();
    await page.getByLabel('Select day').locator('div').filter({ hasText: /^Day$/ }).click();

    await page.getByText('5', { exact: true }).click();
    await page.getByLabel('Select month').locator('div').filter({ hasText: /^Month$/ }).click();

    await page.locator('div').filter({ hasText: /^April$/ }).nth(1).click();

    await page.getByLabel('Select year').locator('div').filter({ hasText: /^Year$/ }).click();

    await page.getByText('1989').click();
});