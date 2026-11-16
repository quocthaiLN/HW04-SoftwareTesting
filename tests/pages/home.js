class HomePage {
  constructor(page) { this.page = page; }
  product(name) {
    return this.page.locator('main div').filter({
      has: this.page.getByRole('heading', { name, exact: true })
    }).filter({ has: this.page.getByRole('button', { name: 'Thêm vào giỏ', exact: true }) }).last();
  }
  async addToCart(name) {
    await this.product(name).getByRole('button', { name: 'Thêm vào giỏ', exact: true }).click();
  }
  async openCart() { await this.page.getByRole('link', { name: 'Giỏ hàng', exact: true }).click(); }
}
module.exports = { HomePage };
