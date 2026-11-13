const assert = require('node:assert/strict');
const { read } = require('../tests/helpers/data');
const design = require('../test-cases.json').cases;
const rows = ['fr02', 'fr09', 'fr17'].flatMap(read);
assert.equal(rows.length, design.length);
assert.equal(new Set(rows.map(r => r.id)).size, rows.length);
assert.deepEqual(rows.map(r => r.id).sort(), design.map(r => r.id).sort());
for (const row of rows) {
  assert.ok(row.scenario && row.feature);
  if (row.feature === 'FR-09') {
    for (const key of ['input', 'cart', 'user', 'response', 'expected', 'authMode']) assert.ok(Object.hasOwn(row, key), `${row.id}: missing ${key}`);
    assert.equal(typeof row.input.total, 'number');
    if (row.scenario === 'success') {
      assert.equal(row.response.body.discount_amount, row.expected.discount);
      assert.equal(row.response.body.final_amount, row.expected.final);
    }
  }
}
console.log(JSON.stringify({ cases: rows.length, counts: Object.fromEntries(['FR-02', 'FR-09', 'FR-17'].map(f => [f, rows.filter(r => r.feature === f).length])), executions: rows.length * 3 }));
