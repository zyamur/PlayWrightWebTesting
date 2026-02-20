import { test } from './baseTest';

test('SauceDemo checkout completes', async ({ authenticatedPage, inventoryPage, cartPage, checkoutPage, testData }) => {
  // authenticatedPage fixture otomatik login yaptı ✅
  // Setup: @BeforeClass benzeri, direkt işleme başla
  const page = authenticatedPage['page']; // Kullandığını göster
  
  await inventoryPage.addToCart('sauce-labs-bike-light');
  await inventoryPage.goToCart();
  await cartPage.clickCheckout();

  await checkoutPage.fillCheckoutInfo(
    testData.getFirstName(),
    testData.getLastName(),
    testData.getPostalCode()
  );
  await checkoutPage.clickContinue();
  await checkoutPage.clickFinish();

  await checkoutPage.assertOrderComplete('Thank you for your order!');
});
