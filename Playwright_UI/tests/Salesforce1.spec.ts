import { test, Locator, expect } from '@playwright/test';
import { SalesforceLogin } from '../pages/loginPageSalesforce';
import { CustomerPage } from '../pages/homePageSalesforce';

test('SalesforceTest1_NewContact', async ({ page }) => {

  await test.step('Login to Salesforce application', async () => {
    const salesforceLogin = new SalesforceLogin(page);
    await salesforceLogin.openURL('https://customization-ability-9581.my.salesforce.com/');
    await salesforceLogin.login('kamal.yuvi12_skwmc0gqlukg@gmail.com', 'Test@1234');
    //Verify Your Identity
    if (await page.getByRole('heading', { name: 'Verify Your Identity' }).isVisible()) {
      console.log('Verify Your Identity page is displayed..');
      // await page.waitForTimeout(30000);
      // return;
    }

  });

  await test.step('Create new contact', async () => {
    const customerPage = new CustomerPage(page);

    await customerPage.verifyHomePage();
    await customerPage.navigateToContacts();
    await customerPage.createNewContact('Kamal', 'Test1');
  });

});