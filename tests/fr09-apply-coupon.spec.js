const { test, expect } = require('./fixtures/coupon-real');
const { LoginPage } = require('./pages/login');
const { HomePage } = require('./pages/home');
const { CartPage } = require('./pages/cart');
const { CheckoutPage } = require('./pages/checkout');
const { read, shared, money } = require('./helpers/data');
const records = read('fr09');
const currency = value => money(value) + shared.ui.currencySuffix;

async function addCart(page, state, record) {
  const home = new HomePage(page);
  await home.addToCart(state.name);
  await home.openCart();
  await expect(page).toHaveURL('/cart');
  const cart = new CartPage(page);
  await expect(cart.row(state.name).getByRole('cell').nth(2)).toHaveText(String(record.product.quantity));
  await expect(cart.row(state.name).getByRole('cell').nth(3)).toHaveText(currency(record.input.total));
  return cart;
}
async function authenticatedCheckout(page, state, record, user) {
  const login = new LoginPage(page);
  await login.goto();
  expect((await login.login(user.email, user.password)).status()).toBe(200);
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('link', { name: `Chào, ${user.name}`, exact: true })).toBeVisible();
  const cart = await addCart(page, state, record);
  await cart.checkout();
  await expect(page).toHaveURL('/checkout');
  await expect(page.getByRole('listitem')).toContainText([`${state.name} x ${record.product.quantity}`]);
  const checkout = new CheckoutPage(page);
  await expect(checkout.total).toHaveValue(String(record.input.total));
  return checkout;
}
async function apply(checkout, state, record, page, user) {
  const response = await checkout.applyCoupon(state.typedCode);
  const body = await response.json();
  state.responses.push({ status: response.status(), body });
  expect.soft(record.expected.statuses).toContain(response.status());
  expect(state.calls.apply.map(call => call.body)).toEqual([{ code: state.code, total_amount: record.input.total, user_id: user.id }]);
  const token = await page.evaluate(key => localStorage.getItem(key), shared.expected.tokenKey);
  expect(state.calls.apply[0].authorization).toBe(`Bearer ${token}`);
  expect(state.calls.apply).toHaveLength(record.expected.applyCount);
  await expect(checkout.code).toHaveValue(state.typedCode);
  return body;
}
async function noPayment(db, state, record) {
  expect(state.calls.checkout).toHaveLength(record.expected.checkoutCount);
  const usage = await db.get('SELECT COUNT(*) AS count FROM coupon_usage WHERE coupon_id=?', [state.couponId]);
  expect(usage.count).toBe(record.policy.uses);
}

for (const record of records.filter(r => r.scenario === 'success')) {
  test.describe(record.id, () => {
    test.use({ couponRecord: record });
    test(`${record.id} success [real UI + backend]`, async ({ page, testUser, db, couponState: state }) => {
      const checkout = await authenticatedCheckout(page, state, record, testUser);
      const body = await apply(checkout, state, record, page, testUser);
      expect.soft(body).toMatchObject({ success: true, coupon_id: state.couponId, discount_amount: record.expected.discount, final_amount: record.expected.final });
      await expect.soft(checkout.savings).toHaveText(shared.ui.savingsPrefix + currency(record.expected.discount));
      await expect.soft(checkout.final).toHaveText(shared.ui.finalPrefix + currency(record.expected.final));
      await expect.soft(checkout.payable).toHaveText(shared.ui.totalPrefix + currency(record.expected.final));
      await noPayment(db, state, record);
    });
  });
}
for (const record of records.filter(r => r.scenario === 'error')) {
  test.describe(record.id, () => {
    test.use({ couponRecord: record });
    test(`${record.id} rejection [real UI + backend]`, async ({ page, testUser, db, couponState: state }) => {
      const checkout = await authenticatedCheckout(page, state, record, testUser);
      const body = await apply(checkout, state, record, page, testUser);
      expect.soft(body.error).toMatch(new RegExp(record.expected.errorPattern, 'i'));
      expect.soft(body.success).not.toBe(true);
      await expect.soft(page.locator('main p').filter({ hasText: new RegExp(record.expected.errorPattern, 'i') })).toBeVisible();
      await expect.soft(checkout.savings).toHaveCount(0);
      await expect.soft(checkout.payable).toHaveText(shared.ui.totalPrefix + currency(record.expected.final));
      await noPayment(db, state, record);
    });
  });
}
for (const record of records.filter(r => r.scenario === 'empty')) {
  test.describe(record.id, () => {
    test.use({ couponRecord: record });
    test(`${record.id} empty input [real UI + backend]`, async ({ page, testUser, db, couponState: state }) => {
      const checkout = await authenticatedCheckout(page, state, record, testUser);
      await checkout.code.fill(state.typedCode);
      await expect(checkout.apply).toBeDisabled();
      await expect(checkout.savings).toHaveCount(0);
      await expect(checkout.payable).toHaveText(shared.ui.totalPrefix + currency(record.expected.final));
      expect(state.calls.apply).toHaveLength(0);
      await noPayment(db, state, record);
    });
  });
}
async function blockedCart(page, state, record, db) {
  await expect(page.getByRole('link', { name: 'Đăng nhập', exact: true })).toBeVisible();
  const cart = await addCart(page, state, record);
  const dialogPromise = page.waitForEvent('dialog');
  const click = cart.checkout();
  const dialog = await dialogPromise;
  expect(dialog.message()).toContain('Bạn cần đăng nhập');
  await dialog.accept();
  await click;
  await expect(page).toHaveURL('/login');
  await expect(page.getByPlaceholder('Nhập mã giảm giá...')).toHaveCount(0);
  expect(state.calls.apply).toHaveLength(0);
  await noPayment(db, state, record);
}
for (const record of records.filter(r => r.authMode === 'absent')) {
  test.describe(record.id, () => {
    test.use({ couponRecord: record });
    test(`${record.id} anonymous checkout blocked [real UI + backend]`, async ({ page, db, couponState: state }) => {
      await page.goto('/');
      await blockedCart(page, state, record, db);
    });
  });
}
for (const record of records.filter(r => r.authMode === 'invalid')) {
  test.describe(record.id, () => {
    test.use({ couponRecord: record });
    test(`${record.id} invalid token checkout blocked [real UI + backend]`, async ({ page, db, couponState: state }) => {
      await page.addInitScript(key => localStorage.setItem(key, 'invalid-jwt-for-fr09'), shared.expected.tokenKey);
      const me = page.waitForResponse(r => new URL(r.url()).pathname === '/api/users/me');
      await page.goto('/');
      expect((await me).status()).toBe(403);
      await expect.poll(() => page.evaluate(key => localStorage.getItem(key), shared.expected.tokenKey)).toBeNull();
      await blockedCart(page, state, record, db);
    });
  });
}
