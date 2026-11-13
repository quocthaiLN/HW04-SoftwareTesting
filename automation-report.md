# Automation execution — Session 003

Run by: 23120352. Batch session003-final; started 2026-11-13T07:57:22.707Z, ended 2026-11-13T08:04:59.793Z. Test-code revision: 676a70eac061864b2779e26fe9efe55bc3ffbc9c.

## Results

68 automated cases, 204 matrix executions, 150 passed, 54 failed, 0 skipped; 9 feature-browser runs. 50 cases passed on all three engines. Counts refer to this matrix; prior PoC/smoke/batch results are separate historical evidence.

| Feature | Browser | Cases | Pass | Fail | Skip | Report |
| --- | --- | --- | --- | --- | --- | --- |
| FR-02 | chromium | 14 | 6 | 8 | 0 | [HTML](artifacts/session003-final-fr02-chromium/html/index.html) |
| FR-02 | firefox | 14 | 6 | 8 | 0 | [HTML](artifacts/session003-final-fr02-firefox/html/index.html) |
| FR-02 | webkit | 14 | 6 | 8 | 0 | [HTML](artifacts/session003-final-fr02-webkit/html/index.html) |
| FR-09 | chromium | 19 | 19 | 0 | 0 | [HTML](artifacts/session003-final-fr09-chromium/html/index.html) |
| FR-09 | firefox | 19 | 19 | 0 | 0 | [HTML](artifacts/session003-final-fr09-firefox/html/index.html) |
| FR-09 | webkit | 19 | 19 | 0 | 0 | [HTML](artifacts/session003-final-fr09-webkit/html/index.html) |
| FR-17 | chromium | 35 | 25 | 10 | 0 | [HTML](artifacts/session003-final-fr17-chromium/html/index.html) |
| FR-17 | firefox | 35 | 25 | 10 | 0 | [HTML](artifacts/session003-final-fr17-firefox/html/index.html) |
| FR-17 | webkit | 35 | 25 | 10 | 0 | [HTML](artifacts/session003-final-fr17-webkit/html/index.html) |

All reports are real Playwright output. Attribution and ISO timestamp come from runner configuration at runtime; no report contents were hand-edited. Open local html/index.html; reports contain screenshots/traces for failures.

## Scope and interpretation

FR-02/17 use the real unchanged SUT backend copied into an isolated runtime/SQLite. FR-09 mocks auth/cart/apply-coupon using page.route and a Vite CartContext module response; it proves UI/payload contracts with fixture responses, not backend coupon rules. No checkout. Permission cases exercise UI only, not direct endpoint role enforcement.

Failures remain visible and are grouped in [bug-reports.md](bug-reports.md). Do not equate number of failed executions with number of unique defects. No GitHub Issues/publication or human review is claimed here. An earlier batch had one WebKit actionability timeout, documented separately; see original artifacts/session003-full/execution-matrix.json.

## REQ-06–09 evidence

- REQ-06: 68 cases mapped by stable IDs in tests/fr02-login.spec.js, fr09-apply-coupon.spec.js, fr17-coupons.spec.js; generated in small steps documented by script commits and AI audit.
- REQ-07: data/shared.json and per-feature JSON hold inputs, setup, mock response and expected. Validator checks IDs/schema/handlers; dynamic values resolve templates/offsets. No inline test data in scripts/fixtures/helpers/POM.
- REQ-08: [assertion-inventory.md](assertion-inventory.md) maps text, attribute/value, URL, state/count, polling and network patterns to actual scenarios.
- REQ-09: this table and [matrix](artifacts/session003-final/execution-matrix.json) record 9 real feature-browser runs and every case result. Versions/readiness/source hashes: [preflight](artifacts/preflight.json).

## Process and review

[RUNNING.md](RUNNING.md) covers setup/reproduction; [implementation-notes.md](implementation-notes.md) explains JSON → fixtures → UI/POM → assertions → reports/matrix. CLI snapshots in artifacts/cli-*.yaml show real locator discovery. Backend startup/DB reset is isolated; original source was not fixed to make tests pass. Browser lifecycle is sequential, workers=1, retries=0; no fixed UI sleeps. TC10 waits for a real 31-second business deadline.

AI self-review strengthened currency checks from substring to exact text using external display oracles; improved visible report attribution; classified runtime defects separately from automation/environment failures. Student human review and final main-report/PDF/video/public GitHub work remain pending.
