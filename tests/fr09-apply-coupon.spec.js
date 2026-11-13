const { test, expect } = require('./fixtures/coupon-routes');
const { read, shared, money } = require('./helpers/data');
for (const record of read('fr09').filter(record => record.scenario === 'success')) {
  test(`${record.id} ${record.scenario} [UI mocked]`, async ({ page, couponFixture }) => {
    await couponFixture.install(record);
    await page.goto('/checkout');
    await expect(page.getByRole('listitem')).toContainText(record.cart.map(item => item.name));
    await expect(page.getByRole('spinbutton')).toHaveValue(String(record.input.total));
    await expect(page.getByRole('link', { name: new RegExp(record.user.name) })).toBeVisible();
    await page.getByPlaceholder('Nhập mã giảm giá...').fill(record.input.code);
    await page.getByRole('button', { name: 'Áp dụng', exact: true }).click();
    await expect(page.getByText('Tiết kiệm:')).toContainText(money(record.expected.discount));
    await expect(page.getByText('Thành tiền:')).toContainText(money(record.expected.final));
    await expect(page.getByText('Tổng thanh toán:', { exact: false })).toContainText(money(record.expected.final));
    await test.info().attach('coverage', { body: JSON.stringify({ id: record.id, coverage: 'UI mocked response, not backend rules', request: couponFixture.calls.apply.map(call => call.body) }), contentType: 'application/json' });
    expect(couponFixture.calls.apply.map(call => call.body)).toEqual([{ code: record.expected.code, total_amount: record.expected.total, user_id: record.expected.user_id }]);
    expect(couponFixture.calls.checkout).toHaveLength(record.expected.checkoutCount);
  });
}
