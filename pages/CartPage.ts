import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly inventoryItemName = '.inventory_item_name';
  readonly checkoutButton = '[data-test="checkout"]';
  readonly cartItem = '.cart_item';
  readonly removeButton = '[data-test*="remove"]';
  readonly quantityInput = '.cart_quantity';
  readonly cartContents = '.cart_list';
  readonly itemPrice = '.inventory_item_price';

  constructor(page: Page) {
    super(page);
  }

  async getItemName() {
    return await this.page.locator(this.inventoryItemName).textContent();
  }

  async assertItemInCart(itemName: string) {
    // Filter kullan: Ambiguous selector problemini çöz
    // Multiple elements varsa, hasText filtresi ile specific ürünü seç
    await expect(
      this.page.locator(this.inventoryItemName).filter({ hasText: itemName })
    ).toBeVisible();
  }

  async removeItemFromCart(itemName: string) {
    // Öğeyi bul ve sil
    const item = this.page.locator(this.cartItem).filter({ has: this.page.locator(this.inventoryItemName, { hasText: itemName }) });
    await item.locator(this.removeButton).click();
  }

  async assertItemNotInCart(itemName: string) {
    await expect(
      this.page.locator(this.inventoryItemName).filter({ hasText: itemName })
    ).not.toBeVisible();
  }

  async getCartItemCount() {
    return await this.page.locator(this.cartItem).count();
  }

  async assertCartEmpty() {
    const count = await this.getCartItemCount();
    expect(count).toBe(0);
  }

  async assertCartNotEmpty() {
    const count = await this.getCartItemCount();
    expect(count).toBeGreaterThan(0);
  }

  async getItemPrice(itemName: string) {
    const price = await this.page.locator(this.cartItem)
      .filter({ has: this.page.locator(this.inventoryItemName, { hasText: itemName }) })
      .locator(this.itemPrice)
      .textContent();
    return price;
  }

  async clickCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async isCheckoutVisible() {
    return await this.page.locator(this.checkoutButton).isVisible();
  }
}
