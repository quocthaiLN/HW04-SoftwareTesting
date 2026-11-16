// SUT labels lack htmlFor/id: scoped simple locators are deliberate fallbacks.
class LoginPage {
  constructor(page) {
    this.page = page;
    const form = page.locator('main form');
    this.email = form.locator('input').nth(0);
    this.password = form.locator('input').nth(1);
    this.submit = form.getByRole('button', { name: 'Sign In', exact: true });
  }
  async goto() { await this.page.goto('/login'); await this.submit.waitFor(); }
  async fill(email, password) { await this.email.fill(email); await this.password.fill(password); }
  async login(email, password) {
    await this.fill(email, password);
    const response = this.page.waitForResponse(r => new URL(r.url()).pathname === '/api/login' && r.request().method() === 'POST');
    await this.submit.click();
    return response;
  }
}
module.exports = { LoginPage };