import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { configManager } from '../utils/configManager';
import { testDataManager } from '../utils/testDataManager';
import { apiClient } from '../utils/apiClient';
import { TestState } from '../utils/testState';

/**
 * Custom Fixtures Type Definition
 */
type TestFixtures = {
  // Page Objects
  loginPage: LoginPage;
  authenticatedPage: LoginPage; // Login yapılmış durumda
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;

  // Managers
  config: typeof configManager;
  testData: typeof testDataManager;
  apiClient: typeof apiClient;
  testState: typeof TestState;
};

export const test = base.extend<TestFixtures>({
  // Config Manager fixture
  config: async ({}, use) => {
    await use(configManager);
  },

  // Test Data Manager fixture
  testData: async ({}, use) => {
    await use(testDataManager);
  },

  // API Client fixture
  apiClient: async ({}, use) => {
    await use(apiClient);
  },

  // Test State fixture
  testState: async ({}, use) => {
    TestState.reset();
    await use(TestState);
    TestState.reset();
  },

  // Page Objects - Unauthenticated
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  /**
   * Authenticated Page Fixture
   * Setup: Otomatik olarak login yap
   * Teardown: Otomatik cleanup
   */
  authenticatedPage: async ({ page, testData, testState }, use) => {
    const loginPage = new LoginPage(page);

    // SETUP: Login yap (Java @BeforeClass benzeri)
    console.log('🔐 Setup: Logging in...');
    await loginPage.goto();
    await loginPage.login(testData.getStandartUser(), testData.getStandartPassword());

    // Test state'i güncelle
    testState.setLoginSuccess(testData.getPersonalAccountId());
    console.log('✅ Login successful - Test başlayabilir');

    // TEST: Fixture'ı test'e sun
    await use(loginPage);

    // TEARDOWN: Cleanup (Playwright otomatik handle ediyor)
    console.log('🧹 Cleanup: Test bitti');
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { expect };
