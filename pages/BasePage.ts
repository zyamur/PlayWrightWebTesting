import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly baseUrl = 'https://www.saucedemo.com/';

    constructor(page: Page) {
    this.page = page;
    }
    async goto() {
        await this.page.goto(this.baseUrl, { 
        waitUntil: 'domcontentloaded' // Sayfa hazır olunca başla
        });
    }
    async waitForElement(selector: string) {
    await this.page.waitForSelector(selector);
    }
}
