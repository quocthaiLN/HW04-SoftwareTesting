# HW04 — Automation Testing

[Main report](main-report.md) — phạm vi, kết quả, review/gaps, assertion patterns và evidence hiện hành.

- Student ID: 23120352
- Name: Le Nguyen Quoc Thai
- Features: FR-02 Login/lockout; FR-09 Apply coupon; FR-17 Create/Read/Delete coupons (Update không có trong SUT).
- Scope: [scope.md](scope.md); cases: [test-cases.json](test-cases.json); requirements: [requirements-list.json](requirements-list.json).

## Test summary — Session 004 actual execution

| Metric | Current |
| --- | --- |
| Features selected | 3 |
| Cases automated | 68 (FR-02: 14; FR-09: 19; FR-17: 35) |
| Case-browser executions | 204 |
| Passed / failed / skipped | 150 / 54 / 0 |
| Cases passing all 3 engines | 50 / 68 |
| Feature-browser runs | 9 (Chromium/Firefox/WebKit × 3 features) |
| Runtime defect groups | 9; [GitHub Issues #1–#9](https://github.com/quocthaiLN/HW04-SoftwareTesting/issues), each with screenshot |
| Demo video | Pending |
| Public GitHub repository | Pending |

Final batch: session004-refactor. [Execution report](automation-report.md), [matrix](artifacts/session004-refactor/execution-matrix.json), [running instructions](RUNNING.md), [assertion inventory](main-report.md), [implementation explanation](main-report.md), [defects](bug-reports.md).

In historical Session004, FR-09 was UI mocked coverage; FR-02/17 use an unchanged isolated real backend. Counts above refer to the final matrix, excluding prior PoC/smoke and first-batch executions. Student human review completed in Session004 (REQ-11); bug reporting completed in Session005 (REQ-12).

## Self-assessment

| Criteria | Maximum | Self-assessed |
| --- | --- | --- |
| Feature A | 25 | 25 |
| Feature B | 25 | 25 |
| Feature C | 25 | 25 |
| Demo video | 15 | 15 |
| Agent Skills | 10 | 10 |
| Total | 100 | 100 |

Self-assessment: 100/100 theo sinh viên yêu cầu; xem main-report.md mục11. Điểm video/skill là mức tự chấm yêu cầu, video/demo thực tế còn thiếu; không coi điểm này là evidence hoàn tất. PDF/video và kiểm chứng publication vẫn theo checklist.

Session 001 đã tổng kết. HW02/group uniqueness được sinh viên xác nhận. Trong Session001, FR-09 dùng mock toàn phần bằng page.route(); kết quả chỉ chứng minh UI với API giả lập, không kiểm chứng backend. Xem scope.md.

## FR09 real UI + backend — 2026-11-16

All19FR09cases now use real product/cart UI and backend, replacing the mocked suite. Pilot INT01/INT02 are merged into TC01/TC02. See [current flow and results](fr09-integration.md). Start `npm run sut`, then run `PW_HEADLESS=true npm run test:fr09 -- --project=chromium` (or firefox/webkit). Omit project to run all3engines. Suite remains68cases/204registrations. TC09/TC10 verify the cart login guard; payment confirmation is outside FR09 scope.

Current FR09 result: **45 pass / 12 fail / 0 skipped** across Chromium, Firefox and WebKit (15/4 per engine). Failures: TC01, TC07, TC18, TC19, representing three backend defect groups. [Current matrix](artifacts/session006-fr09-real/execution-matrix.json). Original Session004 table remains historical.

FR09 real-backend defect publication (2026-11-16): [BUG-10/#10](https://github.com/quocthaiLN/HW04-SoftwareTesting/issues/10), [BUG-11/#11](https://github.com/quocthaiLN/HW04-SoftwareTesting/issues/11), [BUG-12/#12](https://github.com/quocthaiLN/HW04-SoftwareTesting/issues/12). All include actual runner screenshots; [details and evidence](bug-reports.md). Historical9groups plus3newFR09groups; no new runtime execution.
