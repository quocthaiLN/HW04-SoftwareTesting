> Cập nhật 2026-11-16: FR09 đã thay toàn bộ19case mock bằng UI + backend thật. Các số liệu/mã mock Session004 trong tài liệu này là lịch sử. Xem [luồng và kết quả FR09 hiện tại](fr09-integration.md); không dùng57/57pass cũ để đánh giá suite mới.

# Automation execution — Session 004

Run by: 23120352. Batch `session004-refactor`; started 2026-11-13T09:24:37.173Z, ended 2026-11-13T09:32:10.786Z. Test revision `3cd7cc68e83c3f3417b31a02a47231df5f3e54e0`.

68 cases, 204 executions, 150 pass / 54 fail / 0 skipped; 9 feature-browser runs. 50 cases pass on all three engines.

| Feature | Browser | Cases | Pass | Fail | Skip | Report |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| FR02 | chromium | 14 | 6 | 8 | 0 | [HTML](artifacts/session004-refactor-fr02-chromium/html/index.html) |
| FR02 | firefox | 14 | 6 | 8 | 0 | [HTML](artifacts/session004-refactor-fr02-firefox/html/index.html) |
| FR02 | webkit | 14 | 6 | 8 | 0 | [HTML](artifacts/session004-refactor-fr02-webkit/html/index.html) |
| FR09 | chromium | 19 | 19 | 0 | 0 | [HTML](artifacts/session004-refactor-fr09-chromium/html/index.html) |
| FR09 | firefox | 19 | 19 | 0 | 0 | [HTML](artifacts/session004-refactor-fr09-firefox/html/index.html) |
| FR09 | webkit | 19 | 19 | 0 | 0 | [HTML](artifacts/session004-refactor-fr09-webkit/html/index.html) |
| FR17 | chromium | 35 | 25 | 10 | 0 | [HTML](artifacts/session004-refactor-fr17-chromium/html/index.html) |
| FR17 | firefox | 35 | 25 | 10 | 0 | [HTML](artifacts/session004-refactor-fr17-firefox/html/index.html) |
| FR17 | webkit | 35 | 25 | 10 | 0 | [HTML](artifacts/session004-refactor-fr17-webkit/html/index.html) |

[Matrix](artifacts/session004-refactor/execution-matrix.json); [main report](main-report.md); [bugs](bug-reports.md); [running instructions](RUNNING.md).

FR-02/17: unchanged real backend and isolated SQLite. FR-09: UI/payload with mocked auth/cart/apply-coupon, no backend formula or checkout coverage. UI permission cases do not establish direct endpoint enforcement. Failures remain genuine outcomes; no expected values changed to make tests green.

HTML/JSON/trace are real Playwright outputs. Session003 artifacts were removed at the student's request; Session004 is the sole retained runtime batch. GitHub Issues #1–#9 keep the screenshots originally uploaded in Session005; local BUG images now come from Session004.

FR09 real-backend defect publication (2026-11-16): [BUG-10/#10](https://github.com/quocthaiLN/HW04-SoftwareTesting/issues/10), [BUG-11/#11](https://github.com/quocthaiLN/HW04-SoftwareTesting/issues/11), [BUG-12/#12](https://github.com/quocthaiLN/HW04-SoftwareTesting/issues/12). All include actual runner screenshots; [details and evidence](bug-reports.md). Historical9groups plus3newFR09groups; no new runtime execution.
