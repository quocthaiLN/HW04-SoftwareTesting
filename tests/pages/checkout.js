class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.code = page.getByPlaceholder('Nhập mã giảm giá...');
    this.apply = page.getByRole('button', { name: 'Áp dụng', exact: true });
    this.total = page.getByRole('spinbutton');
    this.savings = page.getByText('Tiết kiệm:');
    this.final = page.getByText('Thành tiền:');
    this.payable = page.getByText('Tổng thanh toán:');
  }
  async applyCoupon(code) {
    await this.code.fill(code);
    const response = this.page.waitForResponse(r =>
      new URL(r.url()).pathname === '/api/apply-coupon' && r.request().method() === 'POST');
    await this.apply.click();
    return response;
  }
}
module.exports = { CheckoutPage };
