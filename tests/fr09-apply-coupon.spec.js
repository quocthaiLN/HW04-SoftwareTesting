const { test, expect } = require('./fixtures/coupon-routes');
const { read, shared, money } = require('./helpers/data');
for (const record of read('fr09')) {
  test(`${record.id} ${record.scenario} [UI mocked]`, async ({ page, couponFixture }) => {
    await couponFixture.install(record);
    await page.goto('/checkout');
    await expect(page.getByRole('listitem')).toContainText(record.cart.map(item => item.name));
    await expect(page.getByRole('spinbutton')).toHaveValue(String(record.input.total));
    if (record.authMode === 'valid') {
      await expect(page.getByRole('link', { name: new RegExp(record.user.name) })).toBeVisible();
    } else {
      await expect(page.getByRole('link', { name: 'Đăng nhập', exact: true })).toBeVisible();
      if (record.authMode === 'invalid') await expect.poll(() => page.evaluate(key => localStorage.getItem(key), shared.expected.tokenKey)).toBe(shared.null);
    }
    const input = page.getByPlaceholder('Nhập mã giảm giá...');
    const apply = page.getByRole('button', { name: 'Áp dụng', exact: true });
    await input.fill(record.input.code);
    if (record.scenario === 'empty') {
      await expect(apply).toBeDisabled();
      await expect(page.getByText('Tiết kiệm:')).toHaveCount(shared.expected.zero);
      await expect(page.getByText('Tổng thanh toán:')).toHaveText(shared.ui.totalPrefix + money(record.expected.final) + shared.ui.currencySuffix);
    } else {
      await apply.click();
      if (record.scenario === 'success') {
        await expect(page.getByText('Tiết kiệm:')).toHaveText(shared.ui.savingsPrefix + money(record.expected.discount) + shared.ui.currencySuffix);
        await expect(page.getByText('Thành tiền:')).toHaveText(shared.ui.finalPrefix + money(record.expected.final) + shared.ui.currencySuffix);
        await expect(page.getByText('Tổng thanh toán:')).toHaveText(shared.ui.totalPrefix + money(record.expected.final) + shared.ui.currencySuffix);
      } else if (record.scenario === 'error') {
        await expect(page.getByText(record.expected.error, { exact: true })).toBeVisible();
        await expect(page.getByText('Tiết kiệm:')).toHaveCount(shared.expected.zero);
        await expect(page.getByText('Tổng thanh toán:')).toHaveText(shared.ui.totalPrefix + money(record.expected.final) + shared.ui.currencySuffix);
      } else throw new Error(`Unimplemented scenario ${record.scenario}`);
      expect(couponFixture.calls.apply.map(call => call.body)).toEqual([{ code: record.expected.code, total_amount: record.expected.total, user_id: record.expected.user_id }]);
      if (record.authMode === 'valid') expect(couponFixture.calls.apply[shared.expected.zero].authorization).toBe(`Bearer ${record.token}`);
    }
    expect(couponFixture.calls.apply).toHaveLength(record.expected.applyCount);
    expect(couponFixture.calls.checkout).toHaveLength(record.expected.checkoutCount);
    await test.info().attach('coverage', { body: JSON.stringify({ id: record.id, coverage: 'UI mocked response, not backend rules', request: couponFixture.calls.apply.map(call => call.body), response: record.response }), contentType: 'application/json' });
  });
}
