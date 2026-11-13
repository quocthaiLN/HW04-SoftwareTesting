const { defineConfig, devices } = require('@playwright/test');
const path = require('node:path');
const runId = process.env.PW_RUN_ID || new Date().toISOString().replace(/[:.]/g, '-');
const artifactDir = path.resolve(__dirname, 'artifacts', runId);
module.exports = defineConfig({
  testDir: './tests', testMatch: '**/*.spec.js', fullyParallel: false,
  workers: 1, retries: 0, forbidOnly: true, timeout: 60000,
  expect: { timeout: 3000 },
  metadata: { 'Run by': '23120352', attribution: 'Run by: 23120352', timestamp: new Date().toISOString(), runId, coverage: 'FR-09 UI mocked; FR-02/17 real isolated backend' },
  outputDir: path.join(artifactDir, 'test-results'),
  reporter: [['list'], ['html', { outputFolder: path.join(artifactDir, 'html'), open: 'never' }], ['json', { outputFile: path.join(artifactDir, 'results.json') }]],
  use: { baseURL: process.env.WEB_URL || 'http://localhost:5173', headless: process.env.PW_HEADLESS === 'true', locale: 'vi-VN', timezoneId: 'Asia/Ho_Chi_Minh', serviceWorkers: 'block', trace: 'retain-on-failure', screenshot: 'only-on-failure', actionTimeout: 8000 },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'], ...(process.env.WEBKIT_EXECUTABLE_PATH ? { launchOptions: { executablePath: process.env.WEBKIT_EXECUTABLE_PATH } } : {}) } },
  ],
});
