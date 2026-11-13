require('./validate-test-data');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { read } = require('../tests/helpers/data');
const root = path.resolve(__dirname, '..');
const batch = process.env.PW_BATCH_ID || new Date().toISOString().replace(/[:.]/g, '-');
const matrixPath = path.join(root, 'artifacts', batch, 'execution-matrix.json');
fs.mkdirSync(path.dirname(matrixPath), { recursive: true });
const { execFileSync } = require('node:child_process');
const revision = execFileSync('git', ['rev-parse','HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const matrix = { batch, revision, startedAt: new Date().toISOString(), studentId: '23120352', expectedCases: 0, runs: [] };
const write = () => fs.writeFileSync(matrixPath, JSON.stringify(matrix, null, 2) + '\n');
const specs = { fr02: 'fr02-login.spec.js', fr09: 'fr09-apply-coupon.spec.js', fr17: 'fr17-coupons.spec.js' };
function collect(suite, result = []) {
  for (const spec of suite.specs || []) for (const test of spec.tests || []) result.push({ id: spec.title.match(/FR-\d+-TC\d+/)?.[0], title: spec.title, outcome: test.status, status: test.results.at(-1)?.status, duration: test.results.at(-1)?.duration, errors: test.results.at(-1)?.errors, attachments: test.results.at(-1)?.attachments });
  for (const child of suite.suites || []) collect(child, result);
  return result;
}
(async () => {
  for (const [feature, spec] of Object.entries(specs)) for (const browser of ['chromium','firefox','webkit']) {
    const runId = `${batch}-${feature}-${browser}`;
    const dir = path.join(root, 'artifacts', runId);
    fs.mkdirSync(dir, { recursive: true });
    const log = fs.createWriteStream(path.join(dir, 'console.log'));
    console.log(`Starting ${runId}`);
    const start = new Date().toISOString();
    const exitCode = await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [require.resolve('@playwright/test/cli'), 'test', `tests/${spec}`, `--project=${browser}`], { cwd: root, env: { ...process.env, PW_RUN_ID: runId }, stdio: ['ignore','pipe','pipe'] });
      child.stdout.pipe(log); child.stderr.pipe(log);
      child.once('error', reject); child.once('close', resolve);
    });
    log.end();
    const resultPath = path.join(dir, 'results.json');
    const report = fs.existsSync(resultPath) ? JSON.parse(fs.readFileSync(resultPath)) : null;
    const cases = report ? collect(report) : [];
    const run = { feature, browser, runId, startedAt: start, endedAt: new Date().toISOString(), exitCode, expected: read(feature).length, passed: cases.filter(c => c.status === 'passed').length, failed: cases.filter(c => ['failed','timedOut','interrupted'].includes(c.status)).length, skipped: cases.filter(c => c.status === 'skipped').length, cases, html: path.relative(root, path.join(dir,'html/index.html')), infrastructureErrors: report?.errors || [] };
    matrix.expectedCases += run.expected; matrix.runs.push(run); write();
    console.log(JSON.stringify({ feature, browser, passed: run.passed, failed: run.failed, skipped: run.skipped, exitCode }));
  }
  matrix.endedAt = new Date().toISOString(); write();
  console.log('Matrix:', matrixPath);
  if (matrix.runs.some(r => r.exitCode !== 0)) process.exitCode = 1;
})().catch(error => { matrix.error = error.stack; write(); console.error(error); process.exitCode = 1; });
