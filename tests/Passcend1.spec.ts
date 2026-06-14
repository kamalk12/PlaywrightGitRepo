import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPagePasscend'
import loginDataPasscend  from '../test-data/loginDataPasscend.json'

// This test is for valid login scenario of Passcend application. It uses the LoginPage class to perform the login action.
test('validLogin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openURL('https://passcend.ai/');
  //await loginPage.login('kamal.yuvi12@gmail.com', 'Test@1234');
  await loginPage.login(
    loginDataPasscend.validLoginData.email,
    loginDataPasscend.validLoginData.password
  );
  
  //await loginPage.verifyLoginSuccesfull();

 await expect(page.getByRole('navigation')).toContainText('Dashboard', { timeout: 30000 });
});

// This test is to verify the error message when user enters invalid credentials
test('invalidLogin', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openURL('https://passcend.ai/');
  //await loginPage.login('kamal.yuvi12@gmail.com', 'Test@1234');
  await loginPage.login(
    loginDataPasscend.invalidLoginData.email,
    loginDataPasscend.invalidLoginData.password
  );
  await expect(page.getByText('Invalid email or password')).toBeVisible();
  //await expect(page.getByRole('listitem')).toContainText('Invalid email or password');

});

// Recording

