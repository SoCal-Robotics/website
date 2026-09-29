import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://127.0.0.1:8080', channel: 'chrome', headless: true },
  webServer: { command: 'npm run dev', url: 'http://127.0.0.1:8080', reuseExistingServer: true },
  reporter: 'list'
});
