# HW04 — Automation Testing

- Student ID: 23120352
- Name: Le Nguyen Quoc Thai
- Features: FR-02 Login/lockout; FR-09 Apply coupon; FR-17 Create/Read/Delete coupons (Update không có trong SUT).
- Scope: [scope.md](scope.md); cases: [test-cases.json](test-cases.json); requirements: [requirements-list.json](requirements-list.json).

## Test summary — Session 003 actual execution

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

Final batch: session003-final. [Execution report](automation-report.md), [matrix](artifacts/session003-final/execution-matrix.json), [running instructions](RUNNING.md), [assertion inventory](assertion-inventory.md), [implementation explanation](implementation-notes.md), [defects](bug-reports.md).

FR-09 is UI mocked coverage; FR-02/17 use an unchanged isolated real backend. Counts above refer to the final matrix, excluding prior PoC/smoke and first-batch executions. Student human review completed in Session004 (REQ-11); bug reporting completed in Session005 (REQ-12).

## Self-assessment

| Criteria | Maximum | Self-assessed |
| --- | --- | --- |
| Feature A | 25 | Pending |
| Feature B | 25 | Pending |
| Feature C | 25 | Pending |
| Demo video | 15 | Pending |
| Agent Skills | 10 | Pending |
| Total | 100 | Pending |

Execution evidence is available above; grading/self-assessment, final main report/PDF and video remain pending.

Session 001 đã tổng kết. HW02/group uniqueness được sinh viên xác nhận. FR-09 dùng mock toàn phần bằng page.route(); kết quả chỉ chứng minh UI với API giả lập, không kiểm chứng backend. Xem scope.md.
