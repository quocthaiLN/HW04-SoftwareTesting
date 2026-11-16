# FR09 — real UI and backend replacement

Approved 2026-11-16: replace all19mocked FR09 cases with real UI flows and real backend. Retain TC01–TC19 and business expectations. INT01/INT02 pilot is merged into TC01/TC02; pilot code/data and coupon-routes mock fixture removed. Old report artifacts remain historical.

## Execution

Authenticated cases: create a unique real user, product, coupon and usage records in the disposable SQLite database → LoginPage UI login → HomePage fetch actual product and click add → CartPage verify product quantity/amount → UI checkout → verify actual cart total → CheckoutPage apply coupon → assert real HTTP request/status/body and UI savings/final/payable.

No page.route mocking, no edited checkout total, no reload after adding the item, no final payment confirmation. Cart remains real React state, not a backend-persisted cart. Home is used because ProductDetail has a known first-click defect. Every case has an isolated browser context and unique seeded data; owned rows are deleted in fixture teardown, including test failures.

TC09 anonymous and TC10 invalid-token: Home → add → cart → checkout attempt → login-required alert → /login; assert no apply/payment requests. TC10 also sends an actual invalid JWT to /users/me, verifies403 and cleared token. These two cases establish the UI guard, not direct apply API authentication enforcement. They deliberately do not bypass the UI via direct checkout navigation.

## Files and ownership

- `data/fr09.json`: external product/input/policy/expected for all19IDs. Coupon policy controls actual DB setup; no canned response/token/user IDs.
- `tests/fixtures/coupon-real.js`: uses real-sut DB and user fixtures; seeds own product/coupon/usage. A non-existent coupon is not inserted. Adds unique suffix to code while retaining lowercase/padding input scenarios. Observes requests without interception, attaches actual response and request metadata with bearer value omitted, cleans owned rows.
- `tests/fr09-apply-coupon.spec.js`: separate callbacks for success, rejection, empty input, anonymous and invalid token; shared fixed UI preparation. Failures do not switch expected behavior.
- `tests/pages/home.js`, `cart.js`, `checkout.js`, existing `login.js`: locators/actions. CheckoutPage registers response wait before clicking apply.

Money/status assertions are soft to retain UI evidence even when the real backend is wrong; a mismatch still fails the test. Exact UI text asserts expected amounts, not response-derived amounts. Error assertions match the required reason rather than exact mock wording. Apply request checks uppercase/trim, real user ID, original total and actual bearer. Usage remains at its seeded count; no checkout/coupon-usage request may occur. Empty inputs disable apply and preserve total.

## Run

```bash
npm run sut
```

In another terminal:

```bash
PW_HEADLESS=true npm run test:fr09 -- --project=chromium
PW_HEADLESS=true npm run test:fr09 -- --project=firefox
PW_HEADLESS=true npm run test:fr09 -- --project=webkit
```

Omit project to run all3engines. `npm run matrix` automatically uses the replaced FR09 spec; `npm test` still discovers68cases×3=204. `npm run validate` checks IDs, total=price×quantity and expected floor/cap formula. Runtime defaults to /tmp/hw04-sut-session003; launcher/tests must share SUT_RUNTIME_DIR if overriding.

## Case coverage

| IDs | Purpose |
| --- | --- |
| TC01/TC02 | Percent/fixed formula |
| TC03/TC04 | Missing/inactive coupon |
| TC05 | Expired coupon |
| TC06/TC07/TC08 | Below/equal/above minimum |
| TC09/TC10 | Anonymous/invalid-token cart checkout guard |
| TC11/TC12 | Usage below/at maximum |
| TC13/TC14 | Empty/whitespace input; no apply request |
| TC15/TC16 | Lowercase/padded input; uppercase/trim payload |
| TC17/TC18 | Discount equal/greater than total; expected final0 and discount capped |
| TC19 | Floor percentage discount to integer VND |

## Historical evidence

Session004's57/57 FR09 passes were mocked and do not describe current implementation. Pilot session006-fr09-integration-* had2cases (fixed pass, percent fail on Chromium/Firefox; WebKit launch failure before dependency installation). These artifacts must not be merged with current19case execution results.

Current real-suite results are recorded below after execution.

## Current verification — 2026-11-16

| Engine | Passed | Failed | Skipped |
| --- | ---: | ---: | ---: |
| Chromium | 15 | 4 | 0 |
| Firefox | 15 | 4 | 0 |
| WebKit | 15 | 4 | 0 |
| Total | 45 | 12 | 0 |

All engines failed exactly TC01/TC07/TC18/TC19. No setup/environment failures in this run. WebKit launched after system dependencies became available. Matrix: [actual execution](artifacts/session006-fr09-real/execution-matrix.json). HTML reports: [Chromium](artifacts/session006-fr09-real-chromium/html/index.html), [Firefox](artifacts/session006-fr09-real-firefox/html/index.html), [WebKit](artifacts/session006-fr09-real-webkit/html/index.html). No full FR02/17 rerun; do not combine their historical results into a claimed current full matrix.

| Case | Expected | Actual backend response |
| --- | --- | --- |
| TC01 percent10%, total500,000 | discount50,000; final450,000 | HTTP200; discount-4,500,000; final5,000,000 |
| TC07 total=min300,000 | HTTP200; discount50,000; final250,000 | HTTP400; minimum value rejection |
| TC18 fixed100,000 on total80,000 | capped discount80,000; final0 | HTTP200; discount100,000; final-20,000 |
| TC19 percent10%, total333,333 | floored discount33,333; final300,000 | HTTP200; discount-2,999,997; final3,333,330 |

These are three backend defect groups: wrong percentage formula, strict `>` minimum check, no discount cap. SUT and business expected values were not changed to make tests pass. Current test-cases.json records these actual runs, with old mock results preserved under historical_mock_execution_results.

Cleanup verified: zero products with owned fixture marker, zero generated test users, zero coupon_usage rows and only four original seed coupons remaining. Validator passes68cases and registration check reports57FR09tests. Failed test screenshots/traces and actual-response attachments are in runner artifacts; GitHub publication was pending at execution time; see the subsequent publication below.

## GitHub publication

BUG-10 (former FR09-REAL-01): [#10 percentage formula](https://github.com/quocthaiLN/HW04-SoftwareTesting/issues/10). BUG-11 (former FR09-REAL-02): [#11 minimum equality](https://github.com/quocthaiLN/HW04-SoftwareTesting/issues/11). BUG-12 (former FR09-REAL-03): [#12 negative payable](https://github.com/quocthaiLN/HW04-SoftwareTesting/issues/12). All Open, created and UI-verified on2026-11-16 with unchanged runner screenshots; [local detailed report](bug-reports.md).
