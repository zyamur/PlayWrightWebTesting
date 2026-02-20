import { test, expect } from './baseTest';

test('SauceDemo login fails with wrong password', async ({ page, loginPage, testData }) => {
  // Bu test login başarısız olmalı, authenticatedPage fixture kullanmıyoruz
  // Manuel login yapıp hata mesajını kontrol ediyoruz

  await loginPage.goto();
  await loginPage.login(testData.getStandartUser(), testData.getInvalidPassword());

  await expect(page.locator('[data-test="error"]')).toContainText(
    'Username and password do not match'
  );
});
