# HW04 — Main report: Automation Testing

- Student ID: **23120352**
- Họ tên: **Le Nguyen Quoc Thai**
- Công cụ AI: OpenAI Codex; quá trình tương tác tại [AI Audit](AI-Report-Audit.md).
- Phạm vi: FR-02 (Pool A), FR-09 (Pool B), FR-17 (Pool C); tương ứng HW02 và không trùng nhóm theo xác nhận sinh viên Session001.
- Repository/Issues: [quocthaiLN/HW04-SoftwareTesting](https://github.com/quocthaiLN/HW04-SoftwareTesting). Việc xuất bản đầy đủ scripts/data/reports vẫn cần kiểm chứng riêng (REQ-16).

## Phạm vi và thiết kế

FR-02 kiểm thử login, validation, JWT propagation, counter, khóa sau ba lần sai và mở sau30giây; thêm che mật khẩu và heading. FR-09 có19cases, chỉ kiểm tra UI/payload với response mock; cap/floor/normalization theo policy đã chốt không được coi là kiểm chứng backend. FR-17 có35cases Create/Read/Delete và validation/quyền qua UI; không Update vì SUT không hỗ trợ. FR-02 có14cases; tổng68cases, IDs retired không tái sử dụng.

Thiết kế chi tiết, precondition, steps và expected tự chứa tại [test-cases.json](test-cases.json); [scope](scope.md), [checklist](requirements-list.json).

## Quy trình thực hiện

Sinh viên chốt scope và expected theo từng feature; AI triển khai từng bước data-driven, fixtures/POM và ba browser projects. Sinh viên review Conditional Test Logic; AI tách callback theo hành vi và chạy hồi quy Session004. Sinh viên chấp nhận refactor lúc16:40 và xác nhận selectors/assertions/waits/missing cases/gap analysis lúc16:50 ngày2026-11-13. REQ-11 DONE theo xác nhận đó. Lịch sử thật lưu trong PROGRESS.md, AI-Report-Audit.md và git-log.txt; không suy AI self-review thành review của sinh viên.

## Kết quả chạy thực tế

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

## Kiến trúc và dữ liệu



Luồng: JSON → validate-test-data → fixtures setup → thao tác LoginPage/CouponsPage hoặc UI checkout → assertions → Playwright results/HTML/trace → run-matrix tổng hợp.

- `data/shared.json`: user/admin test templates, các giá trị input/expected dùng chung và policy lockout. `fr02/fr09/fr17.json`: scenario records theo IDs đã duyệt. Không có credentials người dùng thật. Dữ liệu generated chỉ resolve templates/offset trong JSON; không đọc code SUT để tính expected.
- `tests/helpers/data.js`: đọc JSON bắt buộc; resolve identifiers/ngày; format hiển thị. Không fallback test data khi thiếu file.
- `tests/fixtures/real-sut.js`: mở SQLite của runtime có owner.json, không import database.js; tạo/xóa account riêng. FR-17 tự cleanup coupon của case trong finally. API login chỉ setup cho admin; main action vẫn qua UI.
- `tests/fixtures/coupon-routes.js`: FR-09 được user chấp nhận ngoại lệ mock own API. Route CartContext module cung cấp cart cho Checkout thật, route auth/apply-coupon từ JSON; abort API ngoài contract và fail nếu có unexpected call. Mọi case khẳng định không checkout/coupon usage.
- `tests/pages/login.js`: fallback scoped input index vì labels SUT không gắn htmlFor/id. `tests/pages/coupons.js`: form/table locators, fill, reload và kiểm tra row. POM không quản lý DB.
- `playwright.config.js`: Chromium/Firefox/WebKit, visible mặc định, retries=0, workers=1; screenshot và trace khi fail. HTML/JSON output riêng run ID; metadata runtime có Run by: 23120352 và ISO timestamp.
- `scripts/start-sut.js`: kiểm tra ports trước startup, copy backend source nguyên trạng và symlink dependencies vào runtime /tmp; giữ PID ownership. Không gọi run_servers.sh của SUT vì file đó killall node và đường dẫn máy khác.
- `scripts/run-matrix.js`: chạy 9 process runner tuần tự; một feature fail vẫn tiếp tục các tổ hợp khác. Ma trận được cập nhật sau từng run; exit 1 nếu có fail, không xóa kết quả cũ.

Human review đã được sinh viên xác nhận hoàn tất ngày 2026-11-13 (REQ-11). Cleanup của fixture không bảo đảm khi process bị kill cứng; runtime disposable cho phép cô lập và tái tạo sau khi dừng đúng owner process. Không thay đổi SUT để làm xanh tests.

### Tách hành vi sau human review

Ba spec hiện đăng ký callback riêng theo hành vi; các vòng lặp đăng ký chỉ chứa records cùng chuỗi thao tác/assertions. Không còn dispatcher scenario bên trong callback hoặc helper. FR-02 login là test-scoped fixture; wrongAttempts chỉ lặp một thao tác sai mật khẩu. FR-09 nhóm theo outcome/auth contract. FR-17 coupon/admin-page/seed fixtures sở hữu lifecycle; HTML-only và server rejection được chọn từ expected contract khi đăng ký test, không chọn từ form.checkValidity() quan sát lúc chạy. Helpers createCoupon/persisted luôn thực hiện một luồng cố định.

Chi tiết review được tổng hợp trong báo cáo này. Giữ nguyên dữ liệu JSON và phạm vi backend thật/mocked. Một ít duplication giữa các hành vi được giữ để người đọc nhìn thấy luồng cụ thể, thay vì tạo một helper điều phối nhiều nhánh.

## Assertion patterns



Inventory của code đã triển khai, không phải kế hoạch. Các vị trí theo tên scenario/method để tra bằng rg; script references nằm trong tests/.

| Pattern | Case thực sự dùng | Script / method | Oracle ngoài code |
| --- | --- | --- | --- |
| Text, exact | FR-02-TC02/03 lỗi chung; FR-09 success/error amounts; FR-17 Create/Read fields | fr02-login.spec.js wrong/missing; pages/coupons.js assertRow | shared.expected.error; fr09.expected và shared.ui display prefixes/suffixes; fr17 records + shared defaults/typeLabels |
| Attribute/value | FR-02-TC06 email; TC13 password; FR-17-TC15 uppercase/TC16 reset | fr02-login.spec.js format/mask; fr17-coupons.spec.js uppercase/reset | shared.expected.emailType/passwordType; shared.maskPassword; shared.resetExpected |
| URL | FR-02-TC01/07/10/11/12 login thành công, TC14 login page | fr02-login.spec.js success/lockout/heading | Route là contract kỹ thuật của app; test inputs trong JSON |
| State/count | FR-09-TC13/14 disabled/no request; FR-17-TC04 Delete, TC36/37 access | fr09-apply-coupon.spec.js empty; fr17-coupons.spec.js delete/permissions | fr09.expected.applyCount/checkoutCount; fr17.expected.rowCount; shared.expected.zero |
| Polling DB state | FR-02-TC02 mỗi lần sai +1, TC11 reset | fr02-login.spec.js wrong/reset | shared.expected.one/zero, shared.null |
| Network/payload equality | FR-09-TC15/16 normalization, FR-02-TC12 Bearer JWT, FR-17-TC05 duplicate status | fr09-apply-coupon.spec.js; fr02-login.spec.js jwt; fr17-coupons.spec.js duplicate | JSON expected.code/total/user_id; login result token; shared.duplicateStatuses |
| Time/date policy | FR-02-TC08/09 duration, TC10 unlock; FR-17 expiry | fr02-login.spec.js lock/lock-deadline/unlock; pages/coupons.js assertRow | shared.expected.lockSeconds/unlockWaitMs; JSON expiry offsets/past date |

Giá trị kỳ vọng đọc từ JSON, không lấy từ UI vừa đọc để làm chính oracle cho UI. So sánh JWT với token cấp sau login chỉ là kiểm tra propagation, không chứng minh JWT cryptographic validity. FR-09 mock response và expected được khai báo riêng trong JSON; không coi đây là kiểm chứng công thức backend.

Không đếm nhiều lần cùng matcher là nhiều patterns. Soft assertions chỉ dùng để thu thêm bằng chứng liên quan trong cùng case; mọi soft failure vẫn làm case failed.

## Review AI và gap analysis

AI ban đầu dùng dispatcher scenario cho các hành vi khác nhau; FR-17 còn chọn oracle theo validity thực tế. Đây là lỗi tổ chức code của AI, không phải yêu cầu data-driven. Đã tách callbacks theo hành vi, nhóm dữ liệu chỉ khi cùng chuỗi thao tác/assertion; helpers có luồng cố định và fixtures quản lý lifecycle. Không chuyển dispatcher sang helper. Giữ68IDs và JSON/SUT nguyên trạng.

AI self-review sửa assertion tiền từ substring sang exact text, tránh số dài hơn nhận nhầm; title runtime thể hiện Run by và ISO. Selectors ưu tiên role/form/table; login dùng scoped input index vì label SUT không gắn id/htmlFor. Chờ theo locator/response/poll; TC10 đợi31giây thật cho business policy. Không tự thay deadline DB.

Batch Session004 ghi204executions:150pass54fail0skip. So sánh lịch sử với batch trước ghi204keys/0statusdifferences; baseline đã xóa theo yêu cầu dọn thư mục nên comparison.json chỉ là bản ghi lịch sử, không thể chạy lại phép so đó nếu không khôi phục Git. Cùng status không chứng minh tương đương ngoài suite.

Các phần chưa automate: backend coupon apply/checkout, Update FR-17 không được SUT hỗ trợ, direct endpoint permission ngoài scope. Timeout WebKit ở batch cũ chưa rõ nguyên nhân được tách khỏi defect SUT; artifact cũ đã xóa.

## Bug report

9 defect groups, tương ứng18caseIDs×3engines=54failures: counter tăng đôi, lock180thay30giây, email/password type sai, heading sai, duplicate HTTP500/lộ SQLite, percent ngoài1–100, fixed không dương, minimum âm. [Bug reports](bug-reports.md) chứa bước tái hiện/expected/actual/ảnh; [GitHub Issues #1–#9](https://github.com/quocthaiLN/HW04-SoftwareTesting/issues) có ảnh đính kèm. Lỗi script/report/setup được phân loại riêng. Manifest lưu nguồn ảnh Session004 và hash ảnh upload ban đầu; không tuyên bố đã thay ảnh trên GitHub.

## Tái lập và bằng chứng

[RUNNING.md](RUNNING.md) hướng dẫn dependencies/SUT và chạy feature/browser. `npm run validate` kiểm tra dữ liệu; `npm run matrix` tạo batch mới, không ghi đè evidence hiện hành. JSON kết quả trong test-cases.json lấy từ matrix Session004. 9 HTML reports Session004 đã được mở cục bộ và kiểm tra attribution/ISO; xem artifacts/session004-refactor/report-verification.json và report-verified.png trong từng run. Reports là output Playwright nguyên bản; không chỉnh HTML/JSON để đổi kết quả.

## Hạng mục còn lại

Bản này là main report Markdown, chưa phải bộ nộp hoàn chỉnh: PDF cần render/kiểm tra riêng; video ít nhất5phút với giọng sinh viên và authorship, AI Critique200–300words, self-assessment và đóng gói vẫn theo checklist. GitHub publication chưa tự coi DONE. [README](README.md) giữ bảng tự chấm chưa điền; [Git log](git-log.txt) là snapshot thật.
