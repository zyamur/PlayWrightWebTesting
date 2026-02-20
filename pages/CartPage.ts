import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly inventoryItemName = '.inventory_item_name';
  readonly checkoutButton = '[data-test="checkout"]';

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

  async clickCheckout() {
    await this.page.click(this.checkoutButton);
  }

  async isCheckoutVisible() {
    return await this.page.locator(this.checkoutButton).isVisible();
  }
}
