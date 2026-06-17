import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/loginPagePasscend'
import { DashboardPage } from '../pages/dashboardPagePasscend'
import loginDataPasscend from '../test-data/loginDataPasscend.json'

test.beforeAll(async () => {
  console.log('Execution started at: ' + new Date().toLocaleString());
})

test.afterAll(async () => {
  console.log('Execution completed at: ' + new Date().toLocaleString());
})

// This test is to verify the error message when user enters invalid credentials
test('InvalidLogin', async ({ page }) => {
  await test.step('Login to the application with invalid credentials', async () => {
    const loginPage = new LoginPage(page);
    await loginPage.openURL('https://passcend.ai/');
    //await loginPage.login('kamal.yuvi12@gmail.com', 'Test@1234');
    await page.screenshot({ path: 'screenshots/PasscendLoginPage.png' });
    await loginPage.login(
      loginDataPasscend.invalidLoginData.email,
      loginDataPasscend.invalidLoginData.password
    );
    await expect(page.getByText('Invalid email or password')).toBeVisible();
    //await expect(page.getByRole('listitem')).toContainText('Invalid email or password');
  });
});

// This test is for valid login scenario of Passcend application. It uses the LoginPage class to perform the login action.
test('ValidLogin_VerifyDashboard', async ({ page }) => {

  await test.step('Login to the application', async () => {
    const loginPage = new LoginPage(page);
    await page.screenshot({ path: 'screenshots/PasscendLoginPage.png' });
    await loginPage.openURL('https://passcend.ai/');
    //await loginPage.login('kamal.yuvi12@gmail.com', 'Test@1234');
    await loginPage.login(
      loginDataPasscend.validLoginData.email,
      loginDataPasscend.validLoginData.password
    );
  });


  //await loginPage.verifyLoginSuccesfull();

  await expect(page.getByRole('navigation')).toContainText('Dashboard', { timeout: 30000 });
  await page.screenshot({ path: 'screenshots/PasscendDashboard.png' });
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.verifyDashboardHeading('Foundation Level', 'FOUNDATION', '$19', 1);
  await dashboardPage.verifyDashboardHeading('Advanced Level', 'ADVANCED', '$49', 5);
  await dashboardPage.verifyDashboardHeading('Specialist Level', 'SPECIALIST', '$79', 13);
  await dashboardPage.verifyDashboardHeading('Expert Level', 'EXPERT', '$99', 5);


});



// Recording


