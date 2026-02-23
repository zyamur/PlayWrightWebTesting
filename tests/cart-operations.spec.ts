import { test, expect } from './baseTest';

test('SauceDemo remove item from cart', async ({ authenticatedPage, inventoryPage, cartPage }) => {
  const page = authenticatedPage['page'];

  // Sepete 2 ürün ekle
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.addToCart('sauce-labs-bike-light');
  await inventoryPage.assertCartBadgeCount('2');

  // Sepete git
  await inventoryPage.goToCart();

  // Bir ürünü kaldır
  await cartPage.removeItemFromCart('Sauce Labs Backpack');

  // Kontrol: Ürün artık sepette olmamalı
  await cartPage.assertItemNotInCart('Sauce Labs Backpack');
  // Kontrol: Diğer ürün hala sepette olmalı
  await cartPage.assertItemInCart('Sauce Labs Bike Light');
  // Kontrol: Sepet badge'i 1 göstermeli
  await inventoryPage.assertCartBadgeCount('1');
});

test('SauceDemo remove all items from cart', async ({ authenticatedPage, inventoryPage, cartPage }) => {
  const page = authenticatedPage['page'];

  // Sepete 3 ürün ekle
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.addToCart('sauce-labs-bike-light');
  await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');
  await inventoryPage.assertCartBadgeCount('3');

  // Sepete git
  await inventoryPage.goToCart();

  // Tüm ürünleri kaldır
  await cartPage.removeItemFromCart('Sauce Labs Backpack');
  await cartPage.removeItemFromCart('Sauce Labs Bike Light');
  await cartPage.removeItemFromCart('Sauce Labs Bolt T-Shirt');

  // Kontrol: Sepet boş olmalı
  await cartPage.assertCartEmpty();
});

test('SauceDemo verify cart item count', async ({ authenticatedPage, inventoryPage, cartPage, page }) => {
  // Başlangıçta sepet boş
  await inventoryPage.goToCart();
  await cartPage.assertCartEmpty();

  // Inventory sayfasına git ve ürün ekle
  await page.goto('https://www.saucedemo.com/inventory.html');
  await inventoryPage.addToCart('sauce-labs-backpack');
  
  // Sepete git ve kontrol et
  await inventoryPage.goToCart();
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(1);

  // Inventory sayfasına geri git ve daha fazla ürün ekle
  await page.goto('https://www.saucedemo.com/inventory.html');
  await inventoryPage.addToCart('sauce-labs-bike-light');
  await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');

  // Sepete git ve kontrol et
  await inventoryPage.goToCart();
  const updatedCount = await cartPage.getCartItemCount();
  expect(updatedCount).toBe(3);
});

test('SauceDemo verify item prices in cart', async ({ authenticatedPage, inventoryPage, cartPage }) => {
  const page = authenticatedPage['page'];

  // Ürün ekle
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.goToCart();

  // Fiyat kontrol et
  const price = await cartPage.getItemPrice('Sauce Labs Backpack');
  expect(price).toBeTruthy();
  expect(price).toContain('$');
});

test('SauceDemo cart persistence after navigation', async ({ authenticatedPage, inventoryPage, cartPage, page }) => {
  // Sepete 2 ürün ekle
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.addToCart('sauce-labs-bike-light');
  await inventoryPage.assertCartBadgeCount('2');

  // Sepete git
  await inventoryPage.goToCart();
  await cartPage.assertCartNotEmpty();

  // Inventory sayfasına geri dön
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Sepet bilgisi hala orada olmalı
  await inventoryPage.assertCartBadgeCount('2');

  // Sepete tekrar git
  await inventoryPage.goToCart();
  await cartPage.assertItemInCart('Sauce Labs Backpack');
  await cartPage.assertItemInCart('Sauce Labs Bike Light');
});
