const { test, expect } = require('./fixtures/real-sut');
const { CouponsPage } = require('./pages/coupons');
const { read, shared, unique, couponData } = require('./helpers/data');
for (const record of read('fr17')) {
  test(`${record.id} ${record.scenario}`, async ({ page, db, request, apiURL, adminURL, adminUser, testUser }) => {
    const data = couponData(record, unique());
    const savedCode = data.code.toUpperCase();
    try {
      if (['user-permission','anonymous'].includes(record.scenario)) {
        const before = await db.all('SELECT id,code FROM coupons ORDER BY id');
        const mutations = [];
        const dialogs = [];
        page.on('request', request => { if (new URL(request.url()).pathname.startsWith('/api/admin/coupons') && ['POST','DELETE'].includes(request.method())) mutations.push(request.method()); });
        page.on('dialog', async dialog => { dialogs.push(dialog.message()); await dialog.accept(); });
        await page.goto(adminURL);
        await expect(page.getByRole('heading', { name: 'Admin Login', exact: true })).toBeVisible();
        if (record.scenario === 'user-permission') {
          await page.getByPlaceholder('Email', { exact: true }).fill(testUser.email);
          await page.getByPlaceholder('Password', { exact: true }).fill(testUser.password);
          await page.getByRole('button', { name: 'Login', exact: true }).click();
          await expect.poll(() => dialogs).toContain(shared.ui.notAdminMessage);
        }
        await page.reload();
        await expect(page.getByRole('heading', { name: 'Admin Login', exact: true })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Tạo mã', exact: true })).toHaveCount(shared.expected.zero);
        await expect(page.getByRole('button', { name: 'Xóa', exact: true })).toHaveCount(shared.expected.zero);
        expect(await page.evaluate(key => localStorage.getItem(key), shared.expected.adminTokenKey)).toBe(shared.null);
        expect(mutations).toHaveLength(shared.expected.zero);
        expect(await db.all('SELECT id,code FROM coupons ORDER BY id')).toEqual(before);
        return;
      }
      const auth = await request.post(`${apiURL}/api/login`, { data: { email: adminUser.email, password: adminUser.password } });
      expect(auth.status()).toBe(shared.expected.successStatus);
      const { token } = await auth.json();
      await page.addInitScript(({ key, token }) => localStorage.setItem(key, token), { key: shared.expected.adminTokenKey, token });
      if (['read','duplicate','delete'].includes(record.scenario)) await db.run('INSERT INTO coupons(code,type,discount_value,min_order_amount,expired_at,max_uses_per_user) VALUES(?,?,?,?,?,?)', [savedCode, data.type, data.discount_value, data.min_order_amount, data.expired_at, data.max_uses_per_user]);
      const coupons = new CouponsPage(page, adminURL);
      await coupons.goto();
      if (record.scenario === 'delete') {
        const seed = await db.get('SELECT id FROM coupons WHERE code=?', [savedCode]);
        await expect(coupons.row(savedCode)).toHaveCount(shared.expected.one);
        const deletedPromise = page.waitForResponse(r => new URL(r.url()).pathname === `/api/admin/coupons/${seed.id}` && r.request().method() === 'DELETE');
        const listPromise = page.waitForResponse(r => new URL(r.url()).pathname === '/api/coupons' && r.request().method() === 'GET');
        await coupons.row(savedCode).getByRole('button', { name: 'Xóa', exact: true }).click();
        expect((await deletedPromise).status()).toBe(shared.expected.successStatus);
        expect((await (await listPromise).json()).map(c => c.id)).not.toContain(seed.id);
        await expect(coupons.row(savedCode)).toHaveCount(record.expected.rowCount);
        await coupons.reload();
        await expect(coupons.row(savedCode)).toHaveCount(record.expected.rowCount);
        return;
      }
      if (['reject','duplicate'].includes(record.scenario)) {
        const dialogs = [];
        page.on('dialog', async dialog => { dialogs.push(dialog.message()); await dialog.accept(); });
        const mutations = [];
        page.on('request', request => { if (new URL(request.url()).pathname === '/api/admin/coupons' && request.method() === 'POST') mutations.push(request); });
        await coupons.fill(data);
        const htmlValid = await coupons.form.evaluate(form => form.checkValidity());
        if (!htmlValid) {
          await coupons.create.click();
          expect(mutations).toHaveLength(shared.expected.zero);
        } else {
          const responsePromise = page.waitForResponse(r => new URL(r.url()).pathname === '/api/admin/coupons' && r.request().method() === 'POST');
          await coupons.create.click();
          const response = await responsePromise;
          await test.info().attach('creation-response', { body: JSON.stringify({ status: response.status(), body: await response.text() }), contentType: 'application/json' });
          expect.soft(record.scenario === 'duplicate' ? shared.duplicateStatuses : shared.invalidStatuses).toContain(response.status());
          if (record.scenario === 'duplicate') {
            await expect.poll(() => dialogs.length).toBe(shared.expected.one);
            expect.soft(dialogs.join(' ')).toMatch(new RegExp(shared.ui.duplicateMessagePattern, 'i'));
            expect.soft(dialogs.join(' ')).not.toMatch(new RegExp(shared.ui.forbiddenLeakPattern, 'i'));
          }
        }
        if (record.expected.htmlOnly) expect(htmlValid).toBeFalsy();
        await coupons.reload();
        const persisted = await db.all('SELECT id FROM coupons WHERE code=?', [savedCode]);
        expect.soft(persisted).toHaveLength(record.expected.rowCount);
        if (data.code !== shared.empty) await expect(coupons.row(savedCode)).toHaveCount(record.expected.rowCount);
        return;
      }
      if (record.scenario !== 'read') {
        await coupons.fill(data);
        if (record.scenario === 'uppercase') await expect(coupons.code).toHaveValue(savedCode);
        const responsePromise = page.waitForResponse(r => new URL(r.url()).pathname === '/api/admin/coupons' && r.request().method() === 'POST');
        await coupons.create.click();
        const response = await responsePromise;
        expect(response.status()).toBe(shared.expected.successStatus);
        expect(response.request().postDataJSON().code).toBe(savedCode);
      }
      await coupons.assertRow(data, record.expected);
      if (record.scenario === 'reset') {
        await expect(coupons.code).toHaveValue(shared.resetExpected.code);
        await expect(coupons.value).toHaveValue(shared.resetExpected.discount_value);
        await expect(coupons.expiry).toHaveValue(shared.resetExpected.expired_at);
        await expect(coupons.type).toHaveValue(shared.resetExpected.type);
        await expect(coupons.minimum).toHaveValue(shared.resetExpected.min_order_amount);
        await expect(coupons.uses).toHaveValue(shared.resetExpected.max_uses_per_user);
      }
      await coupons.reload();
      await coupons.assertRow(data, record.expected);
      const saved = await db.get('SELECT code,type,discount_value,min_order_amount,expired_at,max_uses_per_user FROM coupons WHERE code=?', [savedCode]);
      expect(saved).toEqual({ ...data, code: savedCode });
    } finally { await db.run('DELETE FROM coupons WHERE code=?', [savedCode]); }
  });
}
