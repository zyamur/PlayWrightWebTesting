import {test, expect} from './baseTest';
test('SauceDemo succesful login', async ({ loginPage, testData, page }) => {
    await loginPage.goto();
    await loginPage.login(testData.getStandartUser(), testData.getStandartPassword()); 
    // Login başarısını doğrula
    await expect(page).toHaveURL(/.*inventory\.html/);
    // Logo görünür mü?
    await expect(page.locator('.app_logo')).toBeVisible();
    // Logo text doğru mu?
    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
});

test('SauceDemo unsuccessful login', async ({ loginPage, testData, page }) => {
    await loginPage.goto();
    await loginPage.login(testData.getStandartUser(), 'wrongPassword'); 
    // Login başarısızlığını doğrula
    await expect(page.locator('[data-test="error"]')).toBeVisible();
});