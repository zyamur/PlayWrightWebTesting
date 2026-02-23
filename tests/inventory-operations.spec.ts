import { test, expect } from './baseTest';

test('SauceDemo sort products by name A-Z', async ({ authenticatedPage, inventoryPage }) => {
  // Sırlama işlemi yapmadan önce ürünleri al
  let names = await inventoryPage.getProductNames();
  console.log('İlk sıralama:', names);

  // A-Z'ye göre sırala
  await inventoryPage.sortByNameAZ();
  
  // Sıralama yapıldıktan sonra yeniden al
  names = await inventoryPage.getProductNames();
  console.log('A-Z Sıralaması:', names);
  
  // Sıralamanın doğru olduğunu kontrol et
  await inventoryPage.assertProductsAreNameSortedAZ();
});

test('SauceDemo sort products by name Z-A', async ({ authenticatedPage, inventoryPage }) => {
    let names = await inventoryPage.getProductNames();
  // Z-A'ya göre sırala
  await inventoryPage.sortByNameZA();

  // Sıralama yapıldıktan sonra yeniden al
  names = await inventoryPage.getProductNames();
  console.log('A-Z Sıralaması:', names);
  
  // Sıralamanın doğru olduğunu kontrol et
  await inventoryPage.assertProductsAreNameSortedZA();
});

test('SauceDemo sort products by price low to high', async ({ authenticatedPage, inventoryPage }) => {
  // Düşük fiyattan yüksek fiyata sırala
  await inventoryPage.sortByPriceLowToHigh();
  
  const prices = await inventoryPage.getProductPrices();
  console.log('Fiyat Düşük→Yüksek:', prices);
  
  // Sıralamanın doğru olduğunu kontrol et
  await inventoryPage.assertProductsAreSortedPriceLowToHigh();
});

test('SauceDemo sort products by price high to low', async ({ authenticatedPage, inventoryPage }) => {
  // Yüksek fiyattan düşük fiyata sırala
  await inventoryPage.sortByPriceHighToLow();
  
  const prices = await inventoryPage.getProductPrices();
  console.log('Fiyat Yüksek→Düşük:', prices);
  
  // Sıralamanın doğru olduğunu kontrol et
  await inventoryPage.assertProductsAreSortedPriceHighToLow();
});