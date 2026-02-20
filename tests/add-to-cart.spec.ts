import { test } from './baseTest';

test('SauceDemo add item to cart', async ({ authenticatedPage, inventoryPage, cartPage }) => {
  // authenticatedPage fixture otomatik login yaptı ✅
  // Setup: @BeforeClass benzeri, direkt işleme başla
  const page = authenticatedPage['page']; // Kullandığını göster
  
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.assertCartBadgeCount('1');

  await inventoryPage.addToCart('sauce-labs-bike-light');
  await inventoryPage.assertCartBadgeCount('2');
  
  await inventoryPage.goToCart();
  
  await cartPage.assertItemInCart('Sauce Labs Bike Light');
  await cartPage.assertItemInCart('Sauce Labs Backpack');
});