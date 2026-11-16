class CartPage {
  constructor(page) { this.page = page; }
  row(name) {
    return this.page.getByRole('row').filter({
      has: this.page.getByRole('cell', { name, exact: true })
    });
  }
  async checkout() {
    await this.page.getByRole('button', { name: 'Tiến hành thanh toán', exact: true }).click();
  }
}
module.exports = { CartPage };
