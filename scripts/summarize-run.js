// Summarizes actual runner results; never synthesizes pass/fail evidence.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const file = process.argv[2];
if (!file) throw new Error('Usage: node scripts/summarize-run.js artifacts/<batch>/execution-matrix.json');
const matrix = JSON.parse(fs.readFileSync(path.resolve(root,file)));
assert.ok(matrix.endedAt, 'Batch not completed');
assert.equal(matrix.runs.length, 9);
assert.equal(new Set(matrix.runs.map(r => `${r.feature}/${r.browser}`)).size, 9);
const totals = { passed: 0, failed: 0, skipped: 0, executed: 0 };
const caseIndex = new Map();
for (const run of matrix.runs) {
  assert.equal(run.cases.length, run.expected, `Missing cases ${run.runId}`);
  assert.equal(new Set(run.cases.map(c => c.id)).size, run.expected, 'Duplicate case IDs');
  assert.ok(fs.existsSync(path.join(root,run.html)));
  for (const field of ['passed','failed','skipped']) totals[field] += run[field];
  for (const c of run.cases) {
    assert.ok(c.id && c.status, 'Case lacks identity/result');
    if (!caseIndex.has(c.id)) caseIndex.set(c.id, {});
    caseIndex.get(c.id)[run.browser] = { status: c.status, runId: run.runId, html: run.html, errors: c.errors?.map(e => e.message) || [] };
  }
}
totals.executed = totals.passed + totals.failed;
const design = JSON.parse(fs.readFileSync(path.join(root,'test-cases.json')));
assert.equal(caseIndex.size, design.cases.length);
for (const c of design.cases) {
  c.status = 'EXECUTED';
  c.execution_results = caseIndex.get(c.id);
  assert.equal(Object.keys(c.execution_results).length, c.browsers.length);
}
design.status = 'AUTOMATED AND EXECUTED — actual results per browser; failures remain';
design.execution_matrix = file;
fs.writeFileSync(path.join(root,'test-cases.json'),JSON.stringify(design,null,2)+'\n');
const summary = { batch: matrix.batch, revision: matrix.revision, startedAt: matrix.startedAt, endedAt: matrix.endedAt, automated: caseIndex.size, ...totals, featureBrowserRuns: matrix.runs.length, casesPassedOnAllBrowsers: [...caseIndex.values()].filter(results => Object.values(results).every(r => r.status === 'passed')).length };
fs.writeFileSync(path.join(root,'artifacts',matrix.batch,'summary.json'),JSON.stringify(summary,null,2)+'\n');
const table = matrix.runs.map(r => `| ${r.feature.toUpperCase().replace('FR','FR-')} | ${r.browser} | ${r.expected} | ${r.passed} | ${r.failed} | ${r.skipped} | [HTML](${r.html}) |`).join('\n');
const report = `# Automation execution — Session 003\n\nRun by: 23120352. Batch ${matrix.batch}; started ${matrix.startedAt}, ended ${matrix.endedAt}. Test-code revision: ${matrix.revision}.\n\n## Results\n\n${summary.automated} automated cases, ${totals.executed} matrix executions, ${totals.passed} passed, ${totals.failed} failed, ${totals.skipped} skipped; ${matrix.runs.length} feature-browser runs. ${summary.casesPassedOnAllBrowsers} cases passed on all three engines. Counts refer to this matrix; prior PoC/smoke/batch results are separate historical evidence.\n\n| Feature | Browser | Cases | Pass | Fail | Skip | Report |\n| --- | --- | --- | --- | --- | --- | --- |\n${table}\n\nAll reports are real Playwright output. Attribution and ISO timestamp come from runner configuration at runtime; no report contents were hand-edited. Open local html/index.html; reports contain screenshots/traces for failures.\n\n## Scope and interpretation\n\nFR-02/17 use the real unchanged SUT backend copied into an isolated runtime/SQLite. FR-09 mocks auth/cart/apply-coupon using page.route and a Vite CartContext module response; it proves UI/payload contracts with fixture responses, not backend coupon rules. No checkout. Permission cases exercise UI only, not direct endpoint role enforcement.\n\nFailures remain visible and are grouped in [bug-reports.md](bug-reports.md). Do not equate number of failed executions with number of unique defects. No GitHub Issues/publication or human review is claimed here. An earlier batch had one WebKit actionability timeout, documented separately; see original artifacts/session003-full/execution-matrix.json.\n\n## REQ-06–09 evidence\n\n- REQ-06: 68 cases mapped by stable IDs in tests/fr02-login.spec.js, fr09-apply-coupon.spec.js, fr17-coupons.spec.js; generated in small steps documented by script commits and AI audit.\n- REQ-07: data/shared.json and per-feature JSON hold inputs, setup, mock response and expected. Validator checks IDs/schema/handlers; dynamic values resolve templates/offsets. No inline test data in scripts/fixtures/helpers/POM.\n- REQ-08: [assertion-inventory.md](assertion-inventory.md) maps text, attribute/value, URL, state/count, polling and network patterns to actual scenarios.\n- REQ-09: this table and [matrix](${file}) record 9 real feature-browser runs and every case result. Versions/readiness/source hashes: [preflight](artifacts/preflight.json).\n\n## Process and review\n\n[RUNNING.md](RUNNING.md) covers setup/reproduction; [implementation-notes.md](implementation-notes.md) explains JSON → fixtures → UI/POM → assertions → reports/matrix. CLI snapshots in artifacts/cli-*.yaml show real locator discovery. Backend startup/DB reset is isolated; original source was not fixed to make tests pass. Browser lifecycle is sequential, workers=1, retries=0; no fixed UI sleeps. TC10 waits for a real 31-second business deadline.\n\nAI self-review strengthened currency checks from substring to exact text using external display oracles; improved visible report attribution; classified runtime defects separately from automation/environment failures. Student human review and final main-report/PDF/video/public GitHub work remain pending.\n`;
fs.writeFileSync(path.join(root,'automation-report.md'),report);
console.log(JSON.stringify(summary,null,2));
