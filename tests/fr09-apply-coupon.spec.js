const {
  test,
  expect
} = require('./fixtures/coupon-routes');
const {
  read,
  shared,
  money
} = require('./helpers/data');
const records = read('fr09');
test.describe('FR09 - success / valid', () => {
  for (const record of records.filter(r => r.scenario === 'success' && r.authMode === 'valid')) {
    test(`${record.id} ${record.scenario} [UI mocked]`, async ({
      page,
      couponFixture
    }) => {
      await couponFixture.install(record);
      await page.goto('/checkout');
      await expect(page.getByRole('listitem')).toContainText(record.cart.map(item => item.name));
      await expect(page.getByRole('spinbutton')).toHaveValue(String(record.input.total));
      await expect(page.getByRole('link', {
        name: new RegExp(record.user.name)
      })).toBeVisible();
      const input = page.getByPlaceholder('Nhập mã giảm giá...');
      const apply = page.getByRole('button', {
        name: 'Áp dụng',
        exact: true
      });
      await input.fill(record.input.code);
      await apply.click();
      await expect(page.getByText('Tiết kiệm:')).toHaveText(shared.ui.savingsPrefix + money(record.expected.discount) + shared.ui.currencySuffix);
      await expect(page.getByText('Thành tiền:')).toHaveText(shared.ui.finalPrefix + money(record.expected.final) + shared.ui.currencySuffix);
      await expect(page.getByText('Tổng thanh toán:')).toHaveText(shared.ui.totalPrefix + money(record.expected.final) + shared.ui.currencySuffix);
      expect(couponFixture.calls.apply.map(call => call.body)).toEqual([{
        code: record.expected.code,
        total_amount: record.expected.total,
        user_id: record.expected.user_id
      }]);
      expect(couponFixture.calls.apply[shared.expected.zero].authorization).toBe(`Bearer ${record.token}`);
      expect(couponFixture.calls.apply).toHaveLength(record.expected.applyCount);
      expect(couponFixture.calls.checkout).toHaveLength(record.expected.checkoutCount);
      await test.info().attach('coverage', {
        body: JSON.stringify({
          id: record.id,
          coverage: 'UI mocked response, not backend rules',
          request: couponFixture.calls.apply.map(call => call.body),
          response: record.response
        }),
        contentType: 'application/json'
      });
    });
  }
});
test.describe('FR09 - error / valid', () => {
  for (const record of records.filter(r => r.scenario === 'error' && r.authMode === 'valid')) {
    test(`${record.id} ${record.scenario} [UI mocked]`, async ({
      page,
      couponFixture
    }) => {
      await couponFixture.install(record);
      await page.goto('/checkout');
      await expect(page.getByRole('listitem')).toContainText(record.cart.map(item => item.name));
      await expect(page.getByRole('spinbutton')).toHaveValue(String(record.input.total));
      await expect(page.getByRole('link', {
        name: new RegExp(record.user.name)
      })).toBeVisible();
      const input = page.getByPlaceholder('Nhập mã giảm giá...');
      const apply = page.getByRole('button', {
        name: 'Áp dụng',
        exact: true
      });
      await input.fill(record.input.code);
      await apply.click();
      await expect(page.getByText(record.expected.error, {
        exact: true
      })).toBeVisible();
      await expect(page.getByText('Tiết kiệm:')).toHaveCount(shared.expected.zero);
      await expect(page.getByText('Tổng thanh toán:')).toHaveText(shared.ui.totalPrefix + money(record.expected.final) + shared.ui.currencySuffix);
      expect(couponFixture.calls.apply.map(call => call.body)).toEqual([{
        code: record.expected.code,
        total_amount: record.expected.total,
        user_id: record.expected.user_id
      }]);
      expect(couponFixture.calls.apply[shared.expected.zero].authorization).toBe(`Bearer ${record.token}`);
      expect(couponFixture.calls.apply).toHaveLength(record.expected.applyCount);
      expect(couponFixture.calls.checkout).toHaveLength(record.expected.checkoutCount);
      await test.info().attach('coverage', {
        body: JSON.stringify({
          id: record.id,
          coverage: 'UI mocked response, not backend rules',
          request: couponFixture.calls.apply.map(call => call.body),
          response: record.response
        }),
        contentType: 'application/json'
      });
    });
  }
});
test.describe('FR09 - error / invalid', () => {
  for (const record of records.filter(r => r.scenario === 'error' && r.authMode === 'invalid')) {
    test(`${record.id} ${record.scenario} [UI mocked]`, async ({
      page,
      couponFixture
    }) => {
      await couponFixture.install(record);
      await page.goto('/checkout');
      await expect(page.getByRole('listitem')).toContainText(record.cart.map(item => item.name));
      await expect(page.getByRole('spinbutton')).toHaveValue(String(record.input.total));
      await expect(page.getByRole('link', {
        name: 'Đăng nhập',
        exact: true
      })).toBeVisible();
      await expect.poll(() => page.evaluate(key => localStorage.getItem(key), shared.expected.tokenKey)).toBe(shared.null);
      const input = page.getByPlaceholder('Nhập mã giảm giá...');
      const apply = page.getByRole('button', {
        name: 'Áp dụng',
        exact: true
      });
      await input.fill(record.input.code);
      await apply.click();
      await expect(page.getByText(record.expected.error, {
        exact: true
      })).toBeVisible();
      await expect(page.getByText('Tiết kiệm:')).toHaveCount(shared.expected.zero);
      await expect(page.getByText('Tổng thanh toán:')).toHaveText(shared.ui.totalPrefix + money(record.expected.final) + shared.ui.currencySuffix);
      expect(couponFixture.calls.apply.map(call => call.body)).toEqual([{
        code: record.expected.code,
        total_amount: record.expected.total,
        user_id: record.expected.user_id
      }]);
      expect(couponFixture.calls.apply).toHaveLength(record.expected.applyCount);
      expect(couponFixture.calls.checkout).toHaveLength(record.expected.checkoutCount);
      await test.info().attach('coverage', {
        body: JSON.stringify({
          id: record.id,
          coverage: 'UI mocked response, not backend rules',
          request: couponFixture.calls.apply.map(call => call.body),
          response: record.response
        }),
        contentType: 'application/json'
      });
    });
  }
});
test.describe('FR09 - error / absent', () => {
  for (const record of records.filter(r => r.scenario === 'error' && r.authMode === 'absent')) {
    test(`${record.id} ${record.scenario} [UI mocked]`, async ({
      page,
      couponFixture
    }) => {
      await couponFixture.install(record);
      await page.goto('/checkout');
      await expect(page.getByRole('listitem')).toContainText(record.cart.map(item => item.name));
      await expect(page.getByRole('spinbutton')).toHaveValue(String(record.input.total));
      await expect(page.getByRole('link', {
        name: 'Đăng nhập',
        exact: true
      })).toBeVisible();
      const input = page.getByPlaceholder('Nhập mã giảm giá...');
      const apply = page.getByRole('button', {
        name: 'Áp dụng',
        exact: true
      });
      await input.fill(record.input.code);
      await apply.click();
      await expect(page.getByText(record.expected.error, {
        exact: true
      })).toBeVisible();
      await expect(page.getByText('Tiết kiệm:')).toHaveCount(shared.expected.zero);
      await expect(page.getByText('Tổng thanh toán:')).toHaveText(shared.ui.totalPrefix + money(record.expected.final) + shared.ui.currencySuffix);
      expect(couponFixture.calls.apply.map(call => call.body)).toEqual([{
        code: record.expected.code,
        total_amount: record.expected.total,
        user_id: record.expected.user_id
      }]);
      expect(couponFixture.calls.apply).toHaveLength(record.expected.applyCount);
      expect(couponFixture.calls.checkout).toHaveLength(record.expected.checkoutCount);
      await test.info().attach('coverage', {
        body: JSON.stringify({
          id: record.id,
          coverage: 'UI mocked response, not backend rules',
          request: couponFixture.calls.apply.map(call => call.body),
          response: record.response
        }),
        contentType: 'application/json'
      });
    });
  }
});
test.describe('FR09 - empty / valid', () => {
  for (const record of records.filter(r => r.scenario === 'empty' && r.authMode === 'valid')) {
    test(`${record.id} ${record.scenario} [UI mocked]`, async ({
      page,
      couponFixture
    }) => {
      await couponFixture.install(record);
      await page.goto('/checkout');
      await expect(page.getByRole('listitem')).toContainText(record.cart.map(item => item.name));
      await expect(page.getByRole('spinbutton')).toHaveValue(String(record.input.total));
      await expect(page.getByRole('link', {
        name: new RegExp(record.user.name)
      })).toBeVisible();
      const input = page.getByPlaceholder('Nhập mã giảm giá...');
      const apply = page.getByRole('button', {
        name: 'Áp dụng',
        exact: true
      });
      await input.fill(record.input.code);
      await expect(apply).toBeDisabled();
      await expect(page.getByText('Tiết kiệm:')).toHaveCount(shared.expected.zero);
      await expect(page.getByText('Tổng thanh toán:')).toHaveText(shared.ui.totalPrefix + money(record.expected.final) + shared.ui.currencySuffix);
      expect(couponFixture.calls.apply).toHaveLength(record.expected.applyCount);
      expect(couponFixture.calls.checkout).toHaveLength(record.expected.checkoutCount);
      await test.info().attach('coverage', {
        body: JSON.stringify({
          id: record.id,
          coverage: 'UI mocked response, not backend rules',
          request: couponFixture.calls.apply.map(call => call.body),
          response: record.response
        }),
        contentType: 'application/json'
      });
    });
  }
});
