import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstNameField = '[data-test="firstName"]';
  readonly lastNameField = '[data-test="lastName"]';
  readonly postalCodeField = '[data-test="postalCode"]';
  readonly continueButton = '[data-test="continue"]';
  readonly finishButton = '[data-test="finish"]';
  readonly completeHeader = '.complete-header';

  constructor(page: Page) {
    super(page);
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameField, firstName);
    await this.page.fill(this.lastNameField, lastName);
    await this.page.fill(this.postalCodeField, postalCode);
  }

  async clickContinue() {
    await this.page.click(this.continueButton);
  }

  async clickFinish() {
    await this.page.click(this.finishButton);
  }

  async getCompletionMessage() {
    return await this.page.locator(this.completeHeader).textContent();
  }

  async assertOrderComplete(message: string) {
    await expect(this.page.locator(this.completeHeader)).toHaveText(message);
  }
}
