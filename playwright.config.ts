import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Testleri seri çalıştır
  workers: 1, // Sadece 1 worker (browser instance)
  timeout: 60000, // Test timeout: 60 saniye
  expect: {
    timeout: 10000, // Assertion timeout: 10 saniye
  },
  use: {
    headless: true,
    navigationTimeout: 30000, // Page navigation timeout
    actionTimeout: 10000, // Action timeout (click, fill vs)
    baseURL: 'https://www.saucedemo.com/',
  },
  webServer: undefined,
  reporter: 'html',
});
