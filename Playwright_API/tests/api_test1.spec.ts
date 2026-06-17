import { test, expect } from '@playwright/test';

test('API Test 1', async ({ request}) => {

  const response = await request.get('https://fake-json-api.mock.beeceptor.com/users');
  expect(response.status()).toBe(200);

  const responseText = await response.text();
  expect(responseText).toContain('users');
});