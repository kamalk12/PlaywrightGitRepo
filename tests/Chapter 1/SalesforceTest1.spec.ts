import { test, expect } from '@playwright/test';

test('SalesforceTest1', async ({ page }) => {
  await page.goto('https://www.salesforce.com/au/');
  await expect(page.getByLabel('Salesforce Main Menu').getByRole('list')).toContainText('Products');
  await page.locator('span').filter({ hasText: /^Products$/ }).click();
  await page.getByText('All Products', { exact: true }).click();
  await expect(page.getByLabel('Salesforce Context Menu', { exact: true })).toContainText('New to Salesforce');
  await page.locator('.cl1-button > .icon').first().click();
  await page.getByLabel('Secondary').getByText('What is Salesforce?').click();

  await page.getByRole('link', { name: 'Launch interactive demo: What' }).click();
  const page1Promise = page.waitForEvent('popup');
  const page1 = await page1Promise;
  const textLocator = page1.getByText('Need help? Ask Agentforce.');
  if (await textLocator.isVisible()) {
    // Do something
    await page1.getByTestId('minimize-button').click();
  }
  await expect(page1.getByLabel('Test drive Salesforce')).toContainText('Test drive Salesforce');
  // Close the current active tab
  await page1.close();
  await page.getByText('More', { exact: true })
  await page.locator('#l1-overflow').getByText('Learning').click();
  await page.locator('span').filter({ hasText: /^Products$/ }).click();
  await page.locator('div').filter({ hasText: /^Pricing$/ }).nth(1).click();
  await page.getByRole('link', { name: 'Calculate pricing: Salesforce' }).click();
  await expect(page.getByLabel('Secondary')).toContainText('Pricing');
  await page.getByRole('button', { name: 'Financial Services' }).click();
  await page.getByRole('button', { name: 'Small & Medium Business 50-' }).click();
  await page.getByRole('button', { name: 'Start estimate' }).click();
});