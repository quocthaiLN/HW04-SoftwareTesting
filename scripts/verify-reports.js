// Opens generated files directly; does not serve the artifacts directory.
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const assert = require('node:assert/strict');
const { chromium, expect } = require('@playwright/test');
const root = path.resolve(__dirname, '..');
(async () => {
  const file = process.argv[2];
  if (!file) throw new Error('Usage: node scripts/verify-reports.js artifacts/<batch>/execution-matrix.json');
  const matrix = JSON.parse(fs.readFileSync(path.join(root,file)));
  assert.ok(matrix.endedAt, 'Matrix not complete');
  const browser = await chromium.launch({ headless: process.env.PW_HEADLESS === 'true' });
  const checked = [];
  try {
    for (const run of matrix.runs) {
      const page = await browser.newPage();
      const report = JSON.parse(fs.readFileSync(path.join(root,'artifacts',run.runId,'results.json')));
      const timestamp = report.config.metadata.timestamp;
      const title = `Run by: ${require('../test-cases.json').student_id} | ${timestamp}`;
      await page.goto(pathToFileURL(path.join(root,run.html)).href);
      await expect(page.getByText(title, { exact: true })).toBeVisible();
      await expect(page.getByText(`Project: ${run.browser}`, { exact: true })).toBeVisible();
      await page.screenshot({ path: path.join(root,'artifacts',run.runId,'report-verified.png'), fullPage: true });
      checked.push({ runId: run.runId, attributionAndISOVisible: true, timestamp, title, checkedAt: new Date().toISOString() });
      await page.close();
    }
  } finally { await browser.close(); }
  fs.writeFileSync(path.join(root,'artifacts',matrix.batch,'report-verification.json'),JSON.stringify(checked,null,2)+'\n');
  console.log(`Verified ${checked.length} local reports with visible attribution + ISO`);
})().catch(error => { console.error(error); process.exitCode = 1; });
