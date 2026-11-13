const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const pw = require('@playwright/test');
(async () => {
  const evidence = { timestamp: new Date().toISOString(), node: process.version, runner: require('@playwright/test/package.json').version, cli: require('@playwright/cli/package.json').version, platform: process.platform, display: process.env.DISPLAY, browsers: {}, services: {}, sourceHashes: {} };
  for (const [name,url] of Object.entries({ web: process.env.WEB_URL || 'http://localhost:5173/login', admin: process.env.ADMIN_URL || 'http://localhost:5174', api: (process.env.API_URL || 'http://localhost:3000') + '/api/products' })) {
    const response = await fetch(url); if (!response.ok) throw new Error(`${name} not ready: ${response.status}`);
    evidence.services[name] = { url, status: response.status };
  }
  for (const name of ['chromium','firefox','webkit']) {
    const options = { headless: process.env.PW_HEADLESS === 'true' };
    if (name === 'webkit' && process.env.WEBKIT_EXECUTABLE_PATH) options.executablePath = process.env.WEBKIT_EXECUTABLE_PATH;
    const browser = await pw[name].launch(options);
    evidence.browsers[name] = { version: browser.version(), executable: options.executablePath || pw[name].executablePath() };
    await browser.close();
  }
  for (const file of ['server.js','database.js']) {
    const original = fs.readFileSync(path.resolve(__dirname,'../../eshop-sut/backend',file));
    const copy = fs.readFileSync(path.join(process.env.SUT_RUNTIME_DIR || '/tmp/hw04-sut-session003',file));
    if (!original.equals(copy)) throw new Error(`Backend copy changed: ${file}`);
    evidence.sourceHashes[file] = crypto.createHash('sha256').update(copy).digest('hex');
  }
  fs.mkdirSync(path.resolve(__dirname,'../artifacts'), { recursive: true });
  fs.writeFileSync(path.resolve(__dirname,'../artifacts/preflight.json'), JSON.stringify(evidence,null,2)+'\n');
  console.log(JSON.stringify(evidence,null,2));
})().catch(error => { console.error(error); process.exitCode = 1; });
