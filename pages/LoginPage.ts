import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameField = '[data-test="username"]';
  readonly passwordField = '[data-test="password"]';
  readonly loginButton = '[data-test="login-button"]';
  readonly errorMessage = '[data-test="error"]';

// id kullanırsan böyle olur
  /*readonly usernameField = '#user-name';        // CSS selector
  readonly passwordField = '#password';
  readonly loginButton = '#login-button';
  readonly errorMessage = '#error-msg';
*/

  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    return await this.page.locator(this.errorMessage).textContent();
  }

  async isErrorMessageVisible() {
    return await this.page.locator(this.errorMessage).isVisible();
  }
}
