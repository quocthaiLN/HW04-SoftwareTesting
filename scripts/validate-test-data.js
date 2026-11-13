const assert = require('node:assert/strict');
const { read, shared } = require('../tests/helpers/data');
const design = require('../test-cases.json').cases;
const rows = ['fr02', 'fr09', 'fr17'].flatMap(read);
assert.equal(rows.length, design.length);
assert.equal(new Set(rows.map(r => r.id)).size, rows.length);
assert.deepEqual(rows.map(r => r.id).sort(), design.map(r => r.id).sort());
const handlers = {
  'FR-02': new Set(['success','wrong','missing','empty-email','empty-password','format','two-then-success','lock','lock-deadline','unlock','reset','jwt','mask','heading']),
  'FR-09': new Set(['success','empty','error']),
  'FR-17': new Set(['create','read','delete','duplicate','reject','uppercase','reset','user-permission','anonymous']),
};
function requireKeys(object, keys, label) {
  for (const key of keys) assert.ok(Object.hasOwn(object,key) && object[key] !== undefined, `${label}: missing ${key}`);
}
requireKeys(shared, ['user','adminUser','wrongPassword','missingEmailTemplate','empty','invalidEmail','maskPassword','expected','couponDefaults','resetExpected','ui','duplicateStatuses','invalidStatuses','null','emptyArray','typeLabels'], 'shared');
requireKeys(shared.expected, ['zero','one','two','threshold','lockSeconds','unlockWaitMs','tokenKey','adminTokenKey','passwordType','emailType','loginHeading','error','failureStatus','unauthorizedStatus','successStatus'], 'shared.expected');
requireKeys(shared.ui, ['savingsPrefix','finalPrefix','totalPrefix','currencySuffix','percentSuffix','usesSuffix','expiredLabel','expiredColor','duplicateMessagePattern','forbiddenLeakPattern','notAdminMessage'], 'shared.ui');
for (const name of ['user','adminUser']) requireKeys(shared[name], ['name','emailTemplate','password','role','login_attempts','locked_until'], name);
requireKeys(shared.couponDefaults,['codeTemplate','type','discount_value','min_order_amount','max_uses_per_user','expiryOffsetDays'],'couponDefaults');
for (const row of rows) {
  assert.ok(handlers[row.feature]?.has(row.scenario), `${row.id}: unsupported scenario`);
  if (row.feature === 'FR-17') {
    requireKeys(row,['overrides','expected'],row.id);
    requireKeys(row.expected,['persist','expired','htmlOnly','rowCount'],row.id);
  }
  if (row.feature === 'FR-09') {
    for (const key of ['input', 'cart', 'user', 'response', 'expected', 'authMode']) assert.ok(Object.hasOwn(row, key), `${row.id}: missing ${key}`);
    requireKeys(row.input,['code','total'],row.id);
    requireKeys(row.response,['status','body'],row.id);
    requireKeys(row.expected,['code','total','user_id','discount','final','error','applyCount','checkoutCount','authStatus'],row.id);
    assert.equal(typeof row.input.total, 'number');
    if (row.scenario === 'success') {
      assert.equal(row.response.body.discount_amount, row.expected.discount);
      assert.equal(row.response.body.final_amount, row.expected.final);
    }
  }
}
console.log(JSON.stringify({ cases: rows.length, counts: Object.fromEntries(['FR-02', 'FR-09', 'FR-17'].map(f => [f, rows.filter(r => r.feature === f).length])), executions: rows.length * 3 }));
