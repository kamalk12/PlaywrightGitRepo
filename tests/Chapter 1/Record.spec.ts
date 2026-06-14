import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await test.step('Open url', async () => {
    await page.goto('https://github.com/');
    await page.getByRole('link', { name: 'Sign in' }).click();
  });

  await test.step('Enter username and password', async () => {
    await page.getByRole('textbox', { name: 'Username or email address' }).click();
    await page.getByRole('textbox', { name: 'Username or email address' }).fill('test');
    await page.getByText('Password', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('test');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  });

  await test.step("verify error message", async () => {
    await expect(page.getByRole('alert')).toContainText('Incorrect username or password.');
  })
});