// FR-09 exception approved by student: UI contract coverage, not backend integration.
const { test: base, expect } = require('@playwright/test');
const { shared } = require('../helpers/data');
const test = base.extend({
  couponFixture: async ({ page }, use) => {
    const calls = { apply: [], checkout: [], unexpected: [] };
    const install = async record => {
      await page.route('**/src/context/CartContext*', async route => {
        // Serve browser-native JS, preserving the real Checkout component.
        const body = `export const CartProvider = ({children}) => children;
          export const useCart = () => (${JSON.stringify({ cart: record.cart, cartTotal: record.input.total })});`;
        await route.fulfill({ contentType: 'text/javascript', body });
      });
      await page.route('**/api/**', async route => {
        const request = route.request();
        const pathname = new URL(request.url()).pathname;
        if (pathname === '/api/users/me') return route.fulfill({ status: record.expected.authStatus, json: record.authMode === 'invalid' ? record.response.body : record.user });
        if (pathname === '/api/login') return route.fulfill({ status: record.expected.authStatus, json: { token: record.token, user: record.user } });
        if (pathname === '/api/apply-coupon') {
          calls.apply.push({ body: request.postDataJSON(), authorization: request.headers().authorization });
          return route.fulfill({ status: record.response.status, json: record.response.body });
        }
        if (pathname === '/api/checkout' || pathname === '/api/coupon-usage') calls.checkout.push(pathname);
        else calls.unexpected.push(pathname);
        await route.abort();
      });
      if (record.authMode !== 'absent') {
        await page.addInitScript(({ key, token }) => localStorage.setItem(key, token), { key: shared.expected.tokenKey, token: record.authMode === 'invalid' ? record.invalidToken : record.token });
      }
    };
    await use({ install, calls });
    expect(calls.unexpected, 'FR-09 must never leak to real API').toEqual(shared.emptyArray);
    await page.unrouteAll({ behavior: 'wait' });
  },
});
module.exports = { test, expect };
