import { test, expect } from './baseTest';

test('SauceDemo successful login', async ({ loginPage, testData, page }) => {
  await loginPage.goto();
  await loginPage.login(testData.getStandartUser(), testData.getStandartPassword());

  // Login başarısını doğrula
  await expect(page).toHaveURL(/.*inventory\.html/);
});
