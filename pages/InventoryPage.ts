import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly cartBadge = '.shopping_cart_badge';
  readonly cartLink = '.shopping_cart_link';

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
}
