const { test, expect } = require('./fixtures/real-sut');
const { LoginPage } = require('./pages/login');
const { read, shared, unique, resolveTemplate } = require('./helpers/data');
for (const record of read('fr02')) {
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
    } else if (['two-then-success','lock','lock-deadline','unlock','reset','jwt'].includes(scenario)) {
      const attempts = scenario === 'two-then-success' ? shared.expected.two : (['reset','jwt'].includes(scenario) ? (scenario === 'reset' ? shared.expected.one : shared.expected.zero) : shared.expected.threshold);
      for (let i = 0; i < attempts; i++) {
        const response = await login.login(testUser.email, shared.wrongPassword);
        expect(shared.expected.failureStatus).toContain(response.status());
        await expect(page.getByText(shared.expected.error, { exact: true })).toBeVisible();
      }
      const thirdAttemptAt = Date.now();
      const before = await db.get('SELECT login_attempts,locked_until FROM users WHERE id=?', [testUser.id]);
      await test.info().attach('lock-state-before', { body: JSON.stringify({ ...before, observedAt: new Date(thirdAttemptAt).toISOString() }), contentType: 'application/json' });
      if (scenario === 'unlock') {
        // Real backend time: a specific business deadline, not a UI stabilization sleep.
        await new Promise(resolve => setTimeout(resolve, Math.max(shared.expected.zero, thirdAttemptAt + shared.expected.unlockWaitMs - Date.now())));
      }
      const response = await login.login(testUser.email, testUser.password);
      if (scenario === 'lock' || scenario === 'lock-deadline') {
        expect(shared.expected.unauthorizedStatus).toContain(response.status());
        await expect(page.getByText(shared.expected.error, { exact: true })).toBeVisible();
        expect(await page.evaluate(key => localStorage.getItem(key), shared.expected.tokenKey)).toBe(shared.null);
        const after = await db.get('SELECT login_attempts,locked_until FROM users WHERE id=?', [testUser.id]);
        expect.soft(after.locked_until).toBe(before.locked_until);
        // Allow request/SQLite scheduling jitter, without accepting a different duration policy.
        expect.soft(Math.round((new Date(before.locked_until).getTime() - thirdAttemptAt) / 1000)).toBe(shared.expected.lockSeconds);
      } else {
        expect(response.status()).toBe(shared.expected.successStatus);
        await expect(page).toHaveURL('/');
        await expect(page.getByRole('link', { name: new RegExp(testUser.name) })).toBeVisible();
        if (scenario === 'reset') {
          await expect.poll(() => db.get('SELECT login_attempts,locked_until FROM users WHERE id=?', [testUser.id])).toEqual({ login_attempts: shared.expected.zero, locked_until: shared.null });
        }
        if (scenario === 'jwt') {
          const token = await page.evaluate(key => localStorage.getItem(key), shared.expected.tokenKey);
          const requestPromise = page.waitForRequest(r => new URL(r.url()).pathname === '/api/users/me');
          await page.reload();
          const request = await requestPromise;
          expect(request.headers().authorization).toBe(`Bearer ${token}`);
          await expect(page.getByRole('link', { name: new RegExp(testUser.name) })).toBeVisible();
        }
      }
    } else throw new Error(`Unimplemented scenario: ${scenario}`);
  });
}
