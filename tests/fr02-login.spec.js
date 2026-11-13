const { test, expect } = require('./fixtures/real-sut');
const { LoginPage } = require('./pages/login');
const { read, shared, unique, resolveTemplate } = require('./helpers/data');
for (const record of read('fr02').filter(r => ['success','wrong','missing','empty-email','empty-password','format','mask','heading'].includes(r.scenario))) {
  test(`${record.id} ${record.scenario}`, async ({ page, db, testUser }) => {
    const login = new LoginPage(page);
    const requests = [];
    page.on('request', request => { if (new URL(request.url()).pathname === '/api/login') requests.push(request.method()); });
    await login.goto();
    const scenario = record.scenario;
    if (scenario === 'success') {
      const response = await login.login(testUser.email, testUser.password);
      expect(response.status()).toBe(shared.expected.successStatus);
      await expect(page).toHaveURL('/');
      await expect(page.getByRole('link', { name: new RegExp(testUser.name) })).toBeVisible();
      expect(await page.evaluate(key => !!localStorage.getItem(key), shared.expected.tokenKey)).toBeTruthy();
    } else if (scenario === 'wrong' || scenario === 'missing') {
      const email = scenario === 'missing' ? resolveTemplate(shared.missingEmailTemplate, unique()) : testUser.email;
      const response = await login.login(email, shared.wrongPassword);
      expect(shared.expected.failureStatus).toContain(response.status());
      await expect(page.getByText(shared.expected.error, { exact: true })).toBeVisible();
      expect(await page.evaluate(key => localStorage.getItem(key), shared.expected.tokenKey)).toBe(shared.null);
      if (scenario === 'wrong') await expect.poll(async () => (await db.get('SELECT login_attempts FROM users WHERE id=?', [testUser.id])).login_attempts).toBe(shared.expected.one);
    } else if (['empty-email','empty-password','format'].includes(scenario)) {
      await login.fill(scenario === 'empty-email' ? shared.empty : (scenario === 'format' ? shared.invalidEmail : testUser.email), scenario === 'empty-password' ? shared.empty : testUser.password);
      await login.submit.click();
      const control = scenario === 'empty-password' ? login.password : login.email;
      if (scenario === 'format') await expect.soft(control).toHaveAttribute('type', shared.expected.emailType);
      expect(await control.evaluate(el => el.validity.valid)).toBeFalsy();
      expect(requests).toHaveLength(shared.expected.zero);
    } else if (scenario === 'mask') {
      await login.password.fill(shared.maskPassword);
      await expect.soft(login.password).toHaveValue(shared.maskPassword);
      await expect(login.password).toHaveAttribute('type', shared.expected.passwordType);
    } else if (scenario === 'heading') {
      await expect(page).toHaveURL('/login');
      await expect.soft(login.email).toBeVisible();
      await expect.soft(login.password).toBeVisible();
      await expect(page.getByRole('heading', { name: new RegExp(shared.expected.loginHeading, 'i'), exact: true })).toBeVisible();
    } else throw new Error(`Unimplemented scenario: ${scenario}`);
  });
}
