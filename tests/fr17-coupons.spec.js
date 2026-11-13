const {
  test,
  expect
} = require('./fixtures/real-sut');
const {
  CouponsPage
} = require('./pages/coupons');
const {
  read,
  shared,
  unique,
  couponData
} = require('./helpers/data');
const records = read('fr17');
const base = test;
const couponTest = base.extend({
  record: [null, {
    option: true
  }],
  coupon: async ({
    db,
    record
  }, use) => {
    const data = couponData(record, unique());
    const savedCode = data.code.toUpperCase();
    try {
      await use({
        data,
        savedCode
      });
    } finally {
      await db.run('DELETE FROM coupons WHERE code=?', [savedCode]);
    }
  },
  coupons: async ({
    page,
    request,
    apiURL,
    adminURL,
    adminUser
  }, use) => {
    const auth = await request.post(`${apiURL}/api/login`, {
      data: {
        email: adminUser.email,
        password: adminUser.password
      }
    });
    expect(auth.status()).toBe(shared.expected.successStatus);
    const {
      token
    } = await auth.json();
    await page.addInitScript(({
      key,
      token
    }) => localStorage.setItem(key, token), {
      key: shared.expected.adminTokenKey,
      token
    });
    const coupons = new CouponsPage(page, adminURL);
    await coupons.goto();
    await use(coupons);
  },
  seededCoupon: async ({
    db,
    coupon
  }, use) => {
    const {
      data,
      savedCode
    } = coupon;
    await db.run('INSERT INTO coupons(code,type,discount_value,min_order_amount,expired_at,max_uses_per_user) VALUES(?,?,?,?,?,?)', [savedCode, data.type, data.discount_value, data.min_order_amount, data.expired_at, data.max_uses_per_user]);
    await use(await db.get('SELECT id FROM coupons WHERE code=?', [savedCode]));
  }
});
async function createCoupon(page, coupons, data, savedCode) {
  await coupons.fill(data);
  const responsePromise = page.waitForResponse(r => new URL(r.url()).pathname === '/api/admin/coupons' && r.request().method() === 'POST');
  await coupons.create.click();
  const response = await responsePromise;
  expect(response.status()).toBe(shared.expected.successStatus);
  expect(response.request().postDataJSON().code).toBe(savedCode);
}
async function persisted(coupons, db, data, savedCode, expected) {
  await coupons.assertRow(data, expected);
  await coupons.reload();
  await coupons.assertRow(data, expected);
  const saved = await db.get('SELECT code,type,discount_value,min_order_amount,expired_at,max_uses_per_user FROM coupons WHERE code=?', [savedCode]);
  expect(saved).toEqual({
    ...data,
    code: savedCode
  });
}
couponTest.describe('FR17 - create', () => {
  for (const record of records.filter(r => r.scenario === 'create')) {
    couponTest.describe(record.id, () => {
      couponTest.use({
        record
      });
      couponTest(`${record.id} ${record.scenario}`, async ({
        page,
        db,
        coupons,
        coupon
      }) => {
        const {
          data,
          savedCode
        } = coupon;
        await createCoupon(page, coupons, data, savedCode);
        await persisted(coupons, db, data, savedCode, record.expected);
      });
    });
  }
});
couponTest.describe('FR17 - read', () => {
  for (const record of records.filter(r => r.scenario === 'read')) {
    couponTest.describe(record.id, () => {
      couponTest.use({
        record
      });
      couponTest(`${record.id} ${record.scenario}`, async ({
        page,
        db,
        coupons,
        coupon,
        seededCoupon
      }) => {
        const {
          data,
          savedCode
        } = coupon;
        expect(seededCoupon.id).toBeTruthy();
        await coupons.reload();
        await persisted(coupons, db, data, savedCode, record.expected);
      });
    });
  }
});
couponTest.describe('FR17 - uppercase', () => {
  for (const record of records.filter(r => r.scenario === 'uppercase')) {
    couponTest.describe(record.id, () => {
      couponTest.use({
        record
      });
      couponTest(`${record.id} ${record.scenario}`, async ({
        page,
        db,
        coupons,
        coupon
      }) => {
        const {
          data,
          savedCode
        } = coupon;
        await coupons.fill(data);
        await expect(coupons.code).toHaveValue(savedCode);
        await createCoupon(page, coupons, data, savedCode);
        await persisted(coupons, db, data, savedCode, record.expected);
      });
    });
  }
});
couponTest.describe('FR17 - reset', () => {
  for (const record of records.filter(r => r.scenario === 'reset')) {
    couponTest.describe(record.id, () => {
      couponTest.use({
        record
      });
      couponTest(`${record.id} ${record.scenario}`, async ({
        page,
        db,
        coupons,
        coupon
      }) => {
        const {
          data,
          savedCode
        } = coupon;
        await createCoupon(page, coupons, data, savedCode);
        await coupons.assertRow(data, record.expected);
        await expect(coupons.code).toHaveValue(shared.resetExpected.code);
        await expect(coupons.value).toHaveValue(shared.resetExpected.discount_value);
        await expect(coupons.expiry).toHaveValue(shared.resetExpected.expired_at);
        await expect(coupons.type).toHaveValue(shared.resetExpected.type);
        await expect(coupons.minimum).toHaveValue(shared.resetExpected.min_order_amount);
        await expect(coupons.uses).toHaveValue(shared.resetExpected.max_uses_per_user);
        await persisted(coupons, db, data, savedCode, record.expected);
      });
    });
  }
});
couponTest.describe('FR17 - delete', () => {
  for (const record of records.filter(r => r.scenario === 'delete')) {
    couponTest.describe(record.id, () => {
      couponTest.use({
        record
      });
      couponTest(`${record.id} ${record.scenario}`, async ({
        page,
        db,
        coupons,
        coupon,
        seededCoupon
      }) => {
        const {
          data,
          savedCode
        } = coupon;
        await coupons.reload();
        await expect(coupons.row(savedCode)).toHaveCount(shared.expected.one);
        const deletedPromise = page.waitForResponse(r => new URL(r.url()).pathname === `/api/admin/coupons/${seededCoupon.id}` && r.request().method() === 'DELETE');
        const listPromise = page.waitForResponse(r => new URL(r.url()).pathname === '/api/coupons' && r.request().method() === 'GET');
        await coupons.row(savedCode).getByRole('button', {
          name: 'Xóa',
          exact: true
        }).click();
        expect((await deletedPromise).status()).toBe(shared.expected.successStatus);
        expect((await (await listPromise).json()).map(c => c.id)).not.toContain(seededCoupon.id);
        await expect(coupons.row(savedCode)).toHaveCount(record.expected.rowCount);
        await coupons.reload();
        await expect(coupons.row(savedCode)).toHaveCount(record.expected.rowCount);
      });
    });
  }
});
couponTest.describe('FR17 - duplicate', () => {
  for (const record of records.filter(r => r.scenario === 'duplicate')) {
    couponTest.describe(record.id, () => {
      couponTest.use({
        record
      });
      couponTest(`${record.id} ${record.scenario}`, async ({
        page,
        db,
        coupons,
        coupon,
        seededCoupon
      }) => {
        const {
          data,
          savedCode
        } = coupon;
        expect(seededCoupon.id).toBeTruthy();
        const dialogs = [];
        page.on('dialog', async dialog => {
          dialogs.push(dialog.message());
          await dialog.accept();
        });
        await coupons.fill(data);
        const responsePromise = page.waitForResponse(r => new URL(r.url()).pathname === '/api/admin/coupons' && r.request().method() === 'POST');
        await coupons.create.click();
        const response = await responsePromise;
        await couponTest.info().attach('creation-response', {
          body: JSON.stringify({
            status: response.status(),
            body: await response.text()
          }),
          contentType: 'application/json'
        });
        expect.soft(shared.duplicateStatuses).toContain(response.status());
        await expect.poll(() => dialogs.length).toBe(shared.expected.one);
        expect.soft(dialogs.join(' ')).toMatch(new RegExp(shared.ui.duplicateMessagePattern, 'i'));
        expect.soft(dialogs.join(' ')).not.toMatch(new RegExp(shared.ui.forbiddenLeakPattern, 'i'));
        await coupons.reload();
        const persisted = await db.all('SELECT id FROM coupons WHERE code=?', [savedCode]);
        expect.soft(persisted).toHaveLength(record.expected.rowCount);
        await expect(coupons.row(savedCode)).toHaveCount(record.expected.rowCount);
      });
    });
  }
});
couponTest.describe('FR17 - HTML validation', () => {
  for (const record of records.filter(r => r.scenario === 'reject' && r.expected.htmlOnly)) {
    couponTest.describe(record.id, () => {
      couponTest.use({
        record
      });
      couponTest(`${record.id} ${record.scenario}`, async ({
        page,
        db,
        coupons,
        coupon
      }) => {
        const {
          data,
          savedCode
        } = coupon;
        const mutations = [];
        page.on('request', request => {
          if (new URL(request.url()).pathname === '/api/admin/coupons' && request.method() === 'POST') mutations.push(request);
        });
        await coupons.fill(data);
        expect(await coupons.form.evaluate(form => form.checkValidity())).toBeFalsy();
        await coupons.create.click();
        expect(mutations).toHaveLength(shared.expected.zero);
        await coupons.reload();
        const persisted = await db.all('SELECT id FROM coupons WHERE code=?', [savedCode]);
        expect.soft(persisted).toHaveLength(record.expected.rowCount);
      });
    });
  }
});
couponTest.describe('FR17 - server validation', () => {
  for (const record of records.filter(r => r.scenario === 'reject' && !r.expected.htmlOnly)) {
    couponTest.describe(record.id, () => {
      couponTest.use({
        record
      });
      couponTest(`${record.id} ${record.scenario}`, async ({
        page,
        db,
        coupons,
        coupon
      }) => {
        const {
          data,
          savedCode
        } = coupon;
        const dialogs = [];
        page.on('dialog', async dialog => {
          dialogs.push(dialog.message());
          await dialog.accept();
        });
        await coupons.fill(data);
        expect(await coupons.form.evaluate(form => form.checkValidity())).toBeTruthy();
        const responsePromise = page.waitForResponse(r => new URL(r.url()).pathname === '/api/admin/coupons' && r.request().method() === 'POST');
        await coupons.create.click();
        const response = await responsePromise;
        await couponTest.info().attach('creation-response', {
          body: JSON.stringify({
            status: response.status(),
            body: await response.text()
          }),
          contentType: 'application/json'
        });
        expect.soft(shared.invalidStatuses).toContain(response.status());
        await coupons.reload();
        const persisted = await db.all('SELECT id FROM coupons WHERE code=?', [savedCode]);
        expect.soft(persisted).toHaveLength(record.expected.rowCount);
        await expect(coupons.row(savedCode)).toHaveCount(record.expected.rowCount);
      });
    });
  }
});
test.describe('FR17 - user-permission', () => {
  const record = records.find(r => r.scenario === 'user-permission');
  test(`${record.id} ${record.scenario}`, async ({
    page,
    db,
    adminURL,
    testUser
  }) => {
    const before = await db.all('SELECT id,code FROM coupons ORDER BY id');
    const mutations = [];
    const dialogs = [];
    page.on('request', request => {
      if (new URL(request.url()).pathname.startsWith('/api/admin/coupons') && ['POST', 'DELETE'].includes(request.method())) mutations.push(request.method());
    });
    page.on('dialog', async dialog => {
      dialogs.push(dialog.message());
      await dialog.accept();
    });
    await page.goto(adminURL);
    await expect(page.getByRole('heading', {
      name: 'Admin Login',
      exact: true
    })).toBeVisible();
    await page.getByPlaceholder('Email', {
      exact: true
    }).fill(testUser.email);
    await page.getByPlaceholder('Password', {
      exact: true
    }).fill(testUser.password);
    await page.getByRole('button', {
      name: 'Login',
      exact: true
    }).click();
    await expect.poll(() => dialogs).toContain(shared.ui.notAdminMessage);
    await page.reload();
    await expect(page.getByRole('heading', {
      name: 'Admin Login',
      exact: true
    })).toBeVisible();
    await expect(page.getByRole('button', {
      name: 'Tạo mã',
      exact: true
    })).toHaveCount(shared.expected.zero);
    await expect(page.getByRole('button', {
      name: 'Xóa',
      exact: true
    })).toHaveCount(shared.expected.zero);
    expect(await page.evaluate(key => localStorage.getItem(key), shared.expected.adminTokenKey)).toBe(shared.null);
    expect(mutations).toHaveLength(shared.expected.zero);
    expect(await db.all('SELECT id,code FROM coupons ORDER BY id')).toEqual(before);
  });
});
test.describe('FR17 - anonymous', () => {
  const record = records.find(r => r.scenario === 'anonymous');
  test(`${record.id} ${record.scenario}`, async ({
    page,
    db,
    adminURL,
    testUser
  }) => {
    const before = await db.all('SELECT id,code FROM coupons ORDER BY id');
    const mutations = [];
    const dialogs = [];
    page.on('request', request => {
      if (new URL(request.url()).pathname.startsWith('/api/admin/coupons') && ['POST', 'DELETE'].includes(request.method())) mutations.push(request.method());
    });
    page.on('dialog', async dialog => {
      dialogs.push(dialog.message());
      await dialog.accept();
    });
    await page.goto(adminURL);
    await expect(page.getByRole('heading', {
      name: 'Admin Login',
      exact: true
    })).toBeVisible();
    await page.reload();
    await expect(page.getByRole('heading', {
      name: 'Admin Login',
      exact: true
    })).toBeVisible();
    await expect(page.getByRole('button', {
      name: 'Tạo mã',
      exact: true
    })).toHaveCount(shared.expected.zero);
    await expect(page.getByRole('button', {
      name: 'Xóa',
      exact: true
    })).toHaveCount(shared.expected.zero);
    expect(await page.evaluate(key => localStorage.getItem(key), shared.expected.adminTokenKey)).toBe(shared.null);
    expect(mutations).toHaveLength(shared.expected.zero);
    expect(await db.all('SELECT id,code FROM coupons ORDER BY id')).toEqual(before);
  });
});
