const {
  test: base,
  expect
} = require('./fixtures/real-sut');
const {
  LoginPage
} = require('./pages/login');
const {
  read,
  shared,
  unique,
  resolveTemplate
} = require('./helpers/data');
const records = read('fr02');
const title = scenario => {
  const record = records.find(r => r.scenario === scenario);
  return `${record.id} ${record.scenario}`;
};
const test = base.extend({
  login: async ({
    page
  }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    await use(login);
  }
});
test.describe('FR02 - Login', () => {
  async function authenticated(page, testUser, response) {
    expect(response.status()).toBe(shared.expected.successStatus);
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('link', {
      name: new RegExp(testUser.name)
    })).toBeVisible();
  }
  async function wrongAttempts(login, page, testUser, count) {
    for (let i = 0; i < count; i++) {
      const response = await login.login(testUser.email, shared.wrongPassword);
      expect(shared.expected.failureStatus).toContain(response.status());
      await expect(page.getByText(shared.expected.error, {
        exact: true
      })).toBeVisible();
    }
  }
  test(title('success'), async ({
    page,
    db,
    testUser,
    login
  }) => {
    const response = await login.login(testUser.email, testUser.password);
    expect(response.status()).toBe(shared.expected.successStatus);
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('link', {
      name: new RegExp(testUser.name)
    })).toBeVisible();
    expect(await page.evaluate(key => !!localStorage.getItem(key), shared.expected.tokenKey)).toBeTruthy();
  });
  test(title('wrong'), async ({
    page,
    db,
    testUser,
    login
  }) => {
    const response = await login.login(testUser.email, shared.wrongPassword);
    expect(shared.expected.failureStatus).toContain(response.status());
    await expect(page.getByText(shared.expected.error, {
      exact: true
    })).toBeVisible();
    expect(await page.evaluate(key => localStorage.getItem(key), shared.expected.tokenKey)).toBe(shared.null);
    await expect.poll(async () => (await db.get('SELECT login_attempts FROM users WHERE id=?', [testUser.id])).login_attempts).toBe(shared.expected.one);
  });
  test(title('missing'), async ({
    page,
    db,
    testUser,
    login
  }) => {
    const response = await login.login(resolveTemplate(shared.missingEmailTemplate, unique()), shared.wrongPassword);
    expect(shared.expected.failureStatus).toContain(response.status());
    await expect(page.getByText(shared.expected.error, {
      exact: true
    })).toBeVisible();
    expect(await page.evaluate(key => localStorage.getItem(key), shared.expected.tokenKey)).toBe(shared.null);
  });
  test(title('empty-email'), async ({
    page,
    db,
    testUser,
    login
  }) => {
    const requests = [];
    page.on('request', request => {
      if (new URL(request.url()).pathname === '/api/login') requests.push(request.method());
    });
    await login.fill(shared.empty, testUser.password);
    await login.submit.click();
    expect(await login.email.evaluate(el => el.validity.valid)).toBeFalsy();
    expect(requests).toHaveLength(shared.expected.zero);
  });
  test(title('empty-password'), async ({
    page,
    db,
    testUser,
    login
  }) => {
    const requests = [];
    page.on('request', request => {
      if (new URL(request.url()).pathname === '/api/login') requests.push(request.method());
    });
    await login.fill(testUser.email, shared.empty);
    await login.submit.click();
    expect(await login.password.evaluate(el => el.validity.valid)).toBeFalsy();
    expect(requests).toHaveLength(shared.expected.zero);
  });
  test(title('format'), async ({
    page,
    db,
    testUser,
    login
  }) => {
    const requests = [];
    page.on('request', request => {
      if (new URL(request.url()).pathname === '/api/login') requests.push(request.method());
    });
    await login.fill(shared.invalidEmail, testUser.password);
    await login.submit.click();
    await expect.soft(login.email).toHaveAttribute('type', shared.expected.emailType);
    expect(await login.email.evaluate(el => el.validity.valid)).toBeFalsy();
    expect(requests).toHaveLength(shared.expected.zero);
  });
  test(title('mask'), async ({
    page,
    db,
    testUser,
    login
  }) => {
    await login.password.fill(shared.maskPassword);
    await expect.soft(login.password).toHaveValue(shared.maskPassword);
    await expect(login.password).toHaveAttribute('type', shared.expected.passwordType);
  });
  test(title('heading'), async ({
    page,
    db,
    testUser,
    login
  }) => {
    await expect(page).toHaveURL('/login');
    await expect.soft(login.email).toBeVisible();
    await expect.soft(login.password).toBeVisible();
    await expect(page.getByRole('heading', {
      name: new RegExp(shared.expected.loginHeading, 'i'),
      exact: true
    })).toBeVisible();
  });
  test(title('two-then-success'), async ({
    page,
    db,
    testUser,
    login
  }) => {
    await wrongAttempts(login, page, testUser, shared.expected.two);
    await authenticated(page, testUser, await login.login(testUser.email, testUser.password));
  });
  test(title('unlock'), async ({
    page,
    db,
    testUser,
    login
  }) => {
    await wrongAttempts(login, page, testUser, shared.expected.threshold);
    const thirdAttemptAt = Date.now();
    const before = await db.get('SELECT login_attempts,locked_until FROM users WHERE id=?', [testUser.id]);
    await test.info().attach('lock-state-before', {
      body: JSON.stringify({
        ...before,
        observedAt: new Date(thirdAttemptAt).toISOString()
      }),
      contentType: 'application/json'
    });
    await new Promise(resolve => setTimeout(resolve, Math.max(shared.expected.zero, thirdAttemptAt + shared.expected.unlockWaitMs - Date.now())));
    await authenticated(page, testUser, await login.login(testUser.email, testUser.password));
  });
  test(title('reset'), async ({
    page,
    db,
    testUser,
    login
  }) => {
    await wrongAttempts(login, page, testUser, shared.expected.one);
    await authenticated(page, testUser, await login.login(testUser.email, testUser.password));
    await expect.poll(() => db.get('SELECT login_attempts,locked_until FROM users WHERE id=?', [testUser.id])).toEqual({
      login_attempts: shared.expected.zero,
      locked_until: shared.null
    });
  });
  test(title('jwt'), async ({
    page,
    db,
    testUser,
    login
  }) => {
    await wrongAttempts(login, page, testUser, shared.expected.zero);
    await authenticated(page, testUser, await login.login(testUser.email, testUser.password));
    const token = await page.evaluate(key => localStorage.getItem(key), shared.expected.tokenKey);
    const requestPromise = page.waitForRequest(r => new URL(r.url()).pathname === '/api/users/me');
    await page.reload();
    const request = await requestPromise;
    expect(request.headers().authorization).toBe(`Bearer ${token}`);
    await expect(page.getByRole('link', {
      name: new RegExp(testUser.name)
    })).toBeVisible();
  });
  test.describe('lockout', () => {
    for (const record of records.filter(r => ['lock', 'lock-deadline'].includes(r.scenario))) {
      test(`${record.id} ${record.scenario}`, async ({
        page,
        db,
        testUser,
        login
      }) => {
        await wrongAttempts(login, page, testUser, shared.expected.threshold);
        const thirdAttemptAt = Date.now();
        const before = await db.get('SELECT login_attempts,locked_until FROM users WHERE id=?', [testUser.id]);
        await test.info().attach('lock-state-before', {
          body: JSON.stringify({
            ...before,
            observedAt: new Date(thirdAttemptAt).toISOString()
          }),
          contentType: 'application/json'
        });
        const response = await login.login(testUser.email, testUser.password);
        expect(shared.expected.unauthorizedStatus).toContain(response.status());
        await expect(page.getByText(shared.expected.error, {
          exact: true
        })).toBeVisible();
        expect(await page.evaluate(key => localStorage.getItem(key), shared.expected.tokenKey)).toBe(shared.null);
        const after = await db.get('SELECT login_attempts,locked_until FROM users WHERE id=?', [testUser.id]);
        expect.soft(after.locked_until).toBe(before.locked_until);
        // Allow request/SQLite scheduling jitter, without accepting a different duration policy.
        expect.soft(Math.round((new Date(before.locked_until).getTime() - thirdAttemptAt) / 1000)).toBe(shared.expected.lockSeconds);
      });
    }
  });
});
