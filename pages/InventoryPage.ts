import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly cartBadge = '.shopping_cart_badge';
  readonly cartLink = '.shopping_cart_link';
  readonly sortDropdown = '.product_sort_container';
  readonly sortOption = '[data-test="product_sort_option"]';
  readonly inventoryItem = '.inventory_item';
  readonly inventoryItemName = '.inventory_item_name';
  readonly inventoryItemPrice = '.inventory_item_price';
  readonly inventoryItemDesc = '.inventory_item_desc';
  readonly inventoryItemImg = '.inventory_item_img';
  readonly filterButton = '.product_filter_btn';

  constructor(page: Page) {
    super(page);
  }

  async addToCart(productId: string) {
    await this.page.click(`[data-test="add-to-cart-${productId}"]`);
  }

  async getCartBadgeCount() {
    return await this.page.locator(this.cartBadge).textContent();
  }

  async goToCart() {
    await this.page.click(this.cartLink);
  }

  async isCartBadgeVisible() {
    return await this.page.locator(this.cartBadge).isVisible();
  }

  async assertCartBadgeCount(count: string) {
    await expect(this.page.locator(this.cartBadge)).toHaveText(count);
  }

  // Sıralama metodları
  async sortBy(sortOption: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.selectOption(this.sortDropdown, { value: `${sortOption}` });
  }

  async sortByNameAZ() {
    await this.sortBy('az');
  }

  async sortByNameZA() {
    await this.sortBy('za');
  }

  async sortByPriceLowToHigh() {
    await this.sortBy('lohi');
  }

  async sortByPriceHighToLow() {
    await this.sortBy('hilo');
  }

  // Ürün bilgisi alma
  async getProductNames(): Promise<string[]> {
    const names = await this.page.locator(this.inventoryItemName).allTextContents();
    return names;
  }

  async getProductPrices(): Promise<string[]> {
    const prices = await this.page.locator(this.inventoryItemPrice).allTextContents();
    return prices;
  }

  // Sıralama doğrulaması
  async assertProductsAreNameSortedAZ() {
    const names = await this.getProductNames();
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
  }

  async assertProductsAreNameSortedZA() {
    const names = await this.getProductNames();
    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
  }

  async assertProductsAreSortedPriceLowToHigh() {
    const prices = await this.getProductPrices();
    const priceNumbers = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...priceNumbers].sort((a, b) => a - b);
    expect(priceNumbers).toEqual(sortedPrices);
  }

  async assertProductsAreSortedPriceHighToLow() {
    const prices = await this.getProductPrices();
    const priceNumbers = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...priceNumbers].sort((a, b) => b - a);
    expect(priceNumbers).toEqual(sortedPrices);
  }
}
