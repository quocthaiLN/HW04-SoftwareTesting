const { test: base, expect } = require('./real-sut');
const { unique } = require('../helpers/data');
const test = base.extend({
  couponRecord: [null, { option: true }],
  couponState: async ({ db, testUser, couponRecord: record, page }, use) => {
    const suffix = unique().toUpperCase();
    const code = `${record.expected.code || 'EMPTY'}${suffix}`;
    const inputCode = record.input.code.replace(record.input.code.trim(), code);
    // Preserve original case and padding for normalization cases.
    const typedCode = record.input.code.trim() === record.input.code.trim().toLowerCase()
      ? inputCode.toLowerCase() : inputCode;
    const state = { name: `${record.product.name} ${suffix}`, code,
      typedCode: record.scenario === 'empty' ? record.input.code : typedCode,
      productId: null, couponId: null, calls: { apply: [], checkout: [] }, responses: [] };
    const requestListener = request => {
      const pathname = new URL(request.url()).pathname;
      if (pathname === '/api/apply-coupon') state.calls.apply.push({ body: request.postDataJSON(), authorization: request.headers().authorization });
      if (['/api/checkout', '/api/coupon-usage'].includes(pathname)) state.calls.checkout.push(pathname);
    };
    page.on('request', requestListener);
    try {
      state.productId = (await db.run('INSERT INTO products(name,price,description,imageUrl) VALUES(?,?,?,?)',
        [state.name, record.product.price, 'FR09 real flow fixture', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='])).id;
      const p = record.policy;
      if (p.exists) {
        state.couponId = (await db.run('INSERT INTO coupons(code,type,discount_value,min_order_amount,expired_at,is_active,max_uses_per_user) VALUES(?,?,?,?,?,?,?)',
          [code, p.kind, p.value, p.min, p.expiry, Number(p.active), p.maxUses])).id;
        for (let i = 0; i < p.uses; i++) await db.run('INSERT INTO coupon_usage(coupon_id,user_id) VALUES(?,?)', [state.couponId, testUser.id]);
      }
      await use(state);
    } finally {
      page.off('request', requestListener);
      await base.info().attach('real-coupon-coverage', { body: JSON.stringify({ id: record.id, coverage: 'real cart UI and backend; stops before order confirmation', calls: { apply: state.calls.apply.map(call => ({ body: call.body, hasAuthorization: Boolean(call.authorization) })), checkout: state.calls.checkout }, responses: state.responses }), contentType: 'application/json' });
      if (state.couponId !== null) {
        await db.run('DELETE FROM coupon_usage WHERE coupon_id=?', [state.couponId]);
        await db.run('DELETE FROM coupons WHERE id=?', [state.couponId]);
      }
      if (state.productId !== null) await db.run('DELETE FROM products WHERE id=?', [state.productId]);
    }
  }
});
module.exports = { test, expect };
