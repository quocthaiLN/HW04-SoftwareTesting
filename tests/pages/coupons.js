const { expect } = require('@playwright/test');
const { shared, money } = require('../helpers/data');
class CouponsPage {
  constructor(page, adminURL) {
    this.page = page; this.adminURL = adminURL;
    this.tab = page.getByRole('listitem').filter({ hasText: /^Mã Giảm Giá$/ });
    this.form = page.locator('form').filter({ has: page.getByRole('heading', { name: 'Tạo mã giảm giá mới' }) });
    this.code = this.form.getByPlaceholder('Mã coupon (VD: SAVE10)');
    this.type = this.form.getByRole('combobox');
    this.value = this.form.getByPlaceholder(/Giá trị %|Số tiền/);
    this.minimum = this.form.getByPlaceholder('Đơn tối thiểu (₫)');
    this.expiry = this.form.locator('input[type="date"]');
    this.uses = this.form.getByPlaceholder('Số lần dùng tối đa/người');
    this.create = this.form.getByRole('button', { name: 'Tạo mã', exact: true });
  }
  async openTab() { await this.tab.click(); await expect(this.create).toBeVisible(); }
  async goto() { await this.page.goto(this.adminURL); await this.openTab(); }
  row(code) { return this.page.getByRole('row').filter({ has: this.page.getByRole('cell', { name: code, exact: true }) }); }
  async fill(data) {
    await this.type.selectOption(data.type);
    await this.code.fill(data.code);
    await this.value.fill(String(data.discount_value));
    await this.minimum.fill(String(data.min_order_amount));
    await this.expiry.fill(data.expired_at);
    await this.uses.fill(String(data.max_uses_per_user));
  }
  async assertRow(data, expected) {
    const row = this.row(data.code.toUpperCase());
    await expect(row).toHaveCount(expected.rowCount);
    const cells = row.getByRole('cell');
    await expect(cells.nth(0)).toHaveText(data.code.toUpperCase());
    await expect(cells.nth(1)).toHaveText(shared.typeLabels[data.type]);
    await expect(cells.nth(2)).toHaveText(data.type === shared.couponDefaults.type ? `${data.discount_value}%` : `${money(Number(data.discount_value))} ₫`);
    await expect(cells.nth(3)).toHaveText(`${money(Number(data.min_order_amount))} ₫`);
    await expect(cells.nth(4)).toHaveText(expected.expired ? shared.ui.expiredLabel : data.expired_at);
    if (expected.expired) await expect(cells.nth(4).getByText(shared.ui.expiredLabel)).toHaveCSS('color', shared.ui.expiredColor);
    await expect(cells.nth(5)).toHaveText(`${data.max_uses_per_user} lần`);
  }
  async reload() { await this.page.reload(); await this.openTab(); }
}
module.exports = { CouponsPage };
