// Compare by stable feature/browser/case IDs, independent of test order or title groups.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const [beforePath, afterPath] = process.argv.slice(2);
assert.ok(beforePath && afterPath, 'Usage: node scripts/compare-matrices.js <baseline.json> <candidate.json>');
function load(file) {
  const matrix = JSON.parse(fs.readFileSync(file, 'utf8'));
  assert.ok(matrix.endedAt && !matrix.error, `Incomplete matrix: ${file}`);
  const index = new Map();
  for (const run of matrix.runs) {
    assert.equal(run.cases.length, run.expected, `Missing cases: ${run.runId}`);
    for (const row of run.cases) {
      assert.ok(row.id && row.status, `Missing case identity/result: ${run.runId}`);
      const key = `${run.feature}/${run.browser}/${row.id}`;
      assert.ok(!index.has(key), `Duplicate: ${key}`);
      index.set(key, row.status);
    }
  }
  return index;
}
const before = load(beforePath), after = load(afterPath);
assert.deepEqual([...after.keys()].sort(), [...before.keys()].sort(), 'Case/browser coverage changed');
const differences = [...before].filter(([key, status]) => after.get(key) !== status)
  .map(([key, baseline]) => ({ key, baseline, candidate: after.get(key) }));
console.log(JSON.stringify({ baseline: beforePath, candidate: afterPath, compared: before.size, differences }, null, 2));
if (differences.length) process.exitCode = 1;
