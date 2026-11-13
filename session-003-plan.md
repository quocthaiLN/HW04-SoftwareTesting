# Session 003 — Kế hoạch requirements 6–9

Ngày: 2026-11-13 (Asia/Ho_Chi_Minh). Trạng thái: kế hoạch, chưa triển khai scripts hoặc chạy browser.

## Mục tiêu và tiêu chí hoàn thành

| Requirement | Đầu ra | Nghiệm thu |
| --- | --- | --- |
| REQ-06 | Scripts cho FR-02/09/17, mapping từng case | 14/19/35 tests riêng biệt, tổng 68; giữ IDs và oracle đã chốt; ghi lại từng bước AI sinh/review/sửa script |
| REQ-07 | JSON dữ liệu thực thi tách riêng | Mỗi test đọc input/setup/expected từ file; không inline mảng/object dữ liệu nghiệp vụ trong script; kiểm tra schema, IDs, count và mapping |
| REQ-08 | Assertion inventory và vị trí trong script | Ít nhất 3 patterns khác nhau, mỗi assertion gắn với hành vi cần kiểm tra; đề xuất text, attribute, URL, state, numeric/payload |
| REQ-09 | Ma trận execution thực tế | Cả 3 features trên Chromium/Firefox/WebKit: 9 feature-browser runs, 204 case-browser executions dự kiến; phân biệt pass/fail/skipped/blocked, không coi browser launch là feature run |

68 cases là baseline đã chốt, không tự rút xuống 36. Fail do lỗi SUT vẫn là kết quả thực thi hợp lệ; DONE không đồng nghĩa mọi test pass. Case chưa automate hoặc bị block phải ghi nguyên nhân, không tính là pass. TC30/31 của FR-17 đã retired, không tái sử dụng.

Nguồn đối chiếu: đề HW04 §6 Task 1, §11–12; requirements-list.json; test-cases.json; scope.md. Không sửa application để làm tests xanh.

## Phân tích bộ skill mới (cập nhật 2026-11-13)

Bộ skill đang áp dụng tại skills/.agents/skills/: playwright-cli, playwright-core, playwright-pom. Phần này thay thế lựa chọn playwright-skill/run.js trước đó. Không cần dùng executor skill cũ hoặc helper detectDevServers làm điều kiện bắt buộc nữa.

| Skill | Vai trò trong lộ trình | Giới hạn |
| --- | --- | --- |
| playwright-cli | Khám phá UI thật bằng snapshot, thao tác theo refs hiện tại, quan sát request/console, ghi trace và lấy code khởi đầu | Không thay thế runner, không tự sinh oracle/assertions đầy đủ; refs e1/e2 chỉ thuộc snapshot/session, không lưu làm locator suite |
| playwright-core | Runner config, semantic locators, web-first assertions, fixtures, auth, data, React, network và debugging | Các defaults/ví dụ cần điều chỉnh theo đề và SUT; không áp dụng toàn bộ 50 guides hoặc mở rộng scope |
| playwright-pom | Phân chia UI actions, fixture lifecycle và helpers thuần | Không bắt buộc tạo class cho mọi trang; Login/Checkout có thể dùng helper/factory nhỏ, coupon form/table thích hợp page object khi đủ phức tạp |

### Những gì chưa khớp hoặc chưa đề cập đủ

| Điểm và nguồn | Khoảng cách | Quyết định áp dụng |
| --- | --- | --- |
| CLI Golden Rule 9; Core Golden Rule 10; core/when-to-mock.md | Cấm mock frontend/backend của chính app, trái FR-09 mock toàn phần đã được user chốt | User scope ưu tiên: giữ FR-09 mock login/auth/cart/apply; gắn nhãn UI mocked coverage; FR-02/17 backend thật. Không xin duyệt lại quyết định đã có |
| core/test-data-management.md, ví dụ POM/CLI | Cho phép/khuyến nghị inline data và factory chứa giá trị nghiệp vụ | REQ-07 ưu tiên: JSON ngoài chứa input/setup/response/expected; factory chỉ resolve template/ID/ngày động, không cất test data trong code |
| cli/test-generation.md | Code hành động là khởi đầu, assertions phải thêm; ví dụ Password textbox có thể không dùng được với input password thật | Snapshot xác minh accessible names; role/label ưu tiên, placeholder/CSS ngắn có scope khi thiếu label; không copy locator mù quáng hoặc tự sửa SUT |
| CLI persistent/state-save; Core authentication | Shared/persistent state có thể nhiễm login counter/token giữa cases | CLI dùng session riêng cho discovery; test runner context/account riêng. Không tái dùng auth cho cases đang đo login/lockout; admin auth fixture riêng |
| Core default retries=2 CI, traces on-first-retry | Retry có thể che fail; retries=0 sẽ không có trace với default này | Baseline retries=0, trace retain-on-failure, screenshot only-on-failure; diagnostic rerun lưu run ID mới, bảo tồn lần đầu |
| Core fullyParallel và ví dụ shared resources | SQLite/counters/coupons và startup reset DB có rủi ro tranh chấp | workers=1, ma trận tuần tự ban đầu; dữ liệu riêng theo run/browser/case; không import database.js trong DB helper vì module đó reset bảng |
| Core clock-and-time-mocking | page.clock chỉ thay đồng hồ trang, không đổi Date.now ở Node backend | TC10 chờ 31 giây từ lần sai thứ ba thật, không theo locked_until lỗi 180 giây; đọc deadline để assert/diagnose. Không sửa deadline trong case đang đo |
| POM decision guide vs ví dụ | Guide có tiêu chí 5+ interactions/3+ files nhưng ví dụ khuyến khích dùng đủ POM/fixtures/helpers | Áp dụng theo độ phức tạp và tái sử dụng; không tạo BasePage/generic framework chỉ để đủ pattern. Assertions nghiệp vụ nằm trong spec; assertion UI dùng lại phải có tên rõ và inventory |
| pom-vs-fixtures-vs-helpers.md | Có helper networkidle, không phù hợp chờ trạng thái nghiệp vụ ổn định | Chờ locator/URL/request hoặc expect.poll đọc state; không networkidle/fixed UI sleeps |
| Fixtures guides | Mô tả cleanup guaranteed quá mạnh nếu process bị kill/crash | Fixture teardown cho failures thông thường; try/finally, ghi ownership manifest và sweep dữ liệu mồ côi theo run ID; không hứa cleanup khi process bị SIGKILL |
| CLI installation | Ví dụ global @latest, install --skills; một số lệnh/API phụ thuộc version | Cài local, pin lockfile, xem --help/--version trước dùng; không cài lại/ghi đè skill đang phân tích. Không dùng WebMCP/agents vì ngoài scope |
| Link nội bộ skill | ../core/... trong CLI/POM không khớp thư mục playwright-core hiện tại; có tham chiếu ci không có trong bộ được cung cấp | Resolve guide vào ../playwright-core/... khi file tương ứng tồn tại; không coi link hỏng là đã đọc tài liệu |
| Cả ba skills | Chưa quy định 68 IDs, >=3 patterns, 9 feature-browser runs, HTML attribution/ISO và >=8 commits script của bài | Thêm validator, inventory, matrix, metadata runtime, milestones Git và hồ sơ AI/human review. CLI screenshot/video không thay HTML reporter hoặc demo sinh viên |
| Không có server discovery workflow tương đương helper cũ | CLI cần URL đã xác minh, SUT có hai frontends và API port hardcode | Đọc startup/Vite config, kiểm tra process/ports/readiness và nội dung trang trước CLI open; không dùng URL suy đoán |

## Chuẩn bị REQ-05

Xem preparation-notes.md: ghi chú đọc bộ skill mới, quyết định áp dụng cho SUT, quy trình và evidence cần thu. Phần ôn bài giảng được ghi nhận theo xác nhận hoàn tất trước đó của sinh viên; AI chưa nhận bài giảng và không tuyên bố đã đọc. Ghi chú chuẩn bị là hồ sơ nội bộ, không tự chèn mục riêng vào main report theo chỉ đạo trước.

## Kiến trúc và dữ liệu

Luồng: JSON bên ngoài → kiểm tra schema/traceability → fixture setup → thao tác UI bằng page objects nhỏ → assertions → runner results/attachments → execution matrix.

- test-cases.json giữ thiết kế được duyệt; không biến mô tả tiếng Việt thành code bằng eval. Thêm data/fr02.json, fr09.json, fr17.json để chứa dữ liệu máy đọc được và liên kết bằng case ID.
- Mỗi record có scenario key, input, setup, expected; FR-09 có mocked response riêng. Dispatch theo scenario hữu hạn, báo lỗi nếu thiếu handler/data; không có default khiến case im lặng pass.
- Giá trị động (email/code riêng, ngày chạy +30) sinh từ template/offset trong JSON. Ghi lại giá trị đã resolve, run ID và thời điểm để tái hiện; mật khẩu/token che khỏi evidence.
- FR-02 và FR-17 dùng backend thật. Fixture SQLite chỉ setup/đọc state/cleanup dữ liệu test; hành vi chính đi qua UI. Không reset counters trong bước đang đo lockout.
- FR-09 mock toàn phần bằng page.route trước navigation. Response kỳ vọng khai báo tĩnh trong JSON; không viết lại backend rules trong mock rồi dùng chính kết quả đó làm oracle. Cap/floor chỉ chứng minh UI hiển thị response được cung cấp.
- Mỗi case context sạch, service workers bị chặn khi cần routing; locale/timezone nhất quán. Chưa bật parallel/retry tự động; diagnostic rerun có run ID riêng, không ghi đè lần fail gốc.

## Tệp cần xem/chỉnh sửa

Các đường dẫn dưới đây tương đối với submission/, trừ các nguồn ../eshop-sut/.

| Nhóm | Tệp | Trách nhiệm |
| --- | --- | --- |
| Xem | AGENTS.md, policies.md, scope.md, test-cases.json, requirements-list.json | Giữ phạm vi/oracles và quy định evidence |
| Xem | ../eshop-sut/{README.md,setup_guide.md,api_specification.md} | Startup, ports, contract và test accounts |
| Xem | ../eshop-sut/backend/{server.js,database.js}; ../eshop-sut/frontend-web/src/{pages/Login.jsx,pages/Checkout.jsx,context/CartContext.jsx,context/AuthContext.jsx}; ../eshop-sut/frontend-admin/src/App.jsx | DB lifecycle, timing, auth, fields và requests thực tế |
| Tạo mới | package.json, package-lock.json, playwright.config.js | Runner/dependencies, 3 projects, timeouts, output theo run |
| Tạo mới | data/{fr02,fr09,fr17}.json | Dữ liệu thực thi tách riêng |
| Tạo mới | tests/{fr02-login,fr09-apply-coupon,fr17-coupons}.spec.js | Tests riêng theo IDs và scenario handlers |
| Tạo mới | tests/fixtures/{db,auth,coupon-routes}.js; tests/pages/{login,checkout,coupons}.js | Setup/cleanup, route fixtures và UI thao tác dùng lại |
| Tạo mới | scripts/{validate-test-data,preflight,run-matrix}.js | Kiểm tra dữ liệu, readiness, orchestration/matrix; tên có thể chỉnh khi triển khai |
| Tạo mới | assertion-inventory.md, execution-matrix.json; artifacts/<run-id>/ | Mapping assertion và evidence từ runner; cấu trúc artifacts còn dự kiến |
| Chỉnh sửa | README.md, PROGRESS.md, AI-Report-Audit.md, requirements-list.json, .gitignore, git-log.txt | Cách chạy, tiến độ, audit, evidence và Git log; không track secrets/DB/dependencies |
| Có thể ảnh hưởng | skills/playwright-skill/ | Chỉ setup dependencies của copy trong workspace nếu cần; không sửa skill toàn cục |

## Thứ tự thực hiện

1. **Preflight và dependency (CLI/Core).** Xác minh Node/npm/display và packages đang có. Cài local @playwright/cli và @playwright/test với phiên bản tương thích, pin lockfile; kiểm tra --help/--version trước dùng. Cài Chromium/Firefox/WebKit và system dependencies nếu thiếu. Đọc startup/config rồi xác minh web/admin/API bằng readiness checks; không phụ thuộc helper skill cũ. CLI discovery dùng named session, snapshot trước thao tác và đóng đúng session do mình tạo; không close-all/kill-all tác động phiên khác. Không tuyên bố setup thành công trước khi launch từng browser được.
2. **Bảo vệ state trước startup.** database.js gọi initDatabase ngay khi import và DROP TABLE. Nếu phải khởi động backend, dùng bản chạy cô lập từ source SUT nguyên trạng trong /tmp với DB riêng; quản lý đúng process sở hữu và API port 3000 do frontend hardcode. Nếu port đang được dùng, xác định server/DB trước, không kill hoặc reset tùy tiện. Frontend cần Vite dev mode cho module interception.
3. **REQ-07: dữ liệu và validator.** Chuyển 68 mô tả thành records máy đọc được, giữ oracle đã chốt. Kiểm tra count 14/19/35, IDs duy nhất, không retired IDs, đầy đủ data/handler/expected/browser. Runtime date tính từ ngày chạy, không dùng ngày cố định đã cũ.
4. **Khám phá CLI và PoC FR-09 (CLI/Core).** Snapshot login, checkout, admin coupon UI thật; lưu locator/request observations, bắt đầu trace trước lỗi và thu code hành động làm draft. Chuyển code thành PoC Playwright Test có assertions độc lập. Một case percent hợp lệ: route CartContext, login/users-me/apply, cartTotal đúng trước apply; bắt request code/total/user và response; assert giảm/final từ JSON. Chạy Chromium trước, rồi kiểm tra module routing trên Firefox/WebKit. Nếu Vite module bridge không hoạt động, ghi blocker và điều chỉnh fixture trước khi nhân 19 cases; không lặng lẽ sửa Checkout hoặc đổi sang backend thật.
5. **REQ-06/08: FR-02, 14 cases (Core + UI helpers/POM nhỏ).** Account riêng, requests count và đọc DB counters/locked_until; UI login, validation, reset, JWT reload, password attribute và heading. TC10 dùng thời gian thật; dành timeout >31 giây cộng thời gian thao tác. Giữ expected +1/3 lần/30 giây dù source hiện có +2/180 giây; xác nhận runtime trước gọi bug. Nếu lỗi ngưỡng làm hỏng precondition case sau, ghi fail ở bước precondition, không bỏ qua assertion.
6. **REQ-06/08: FR-09, 19 cases (Core routing + fixtures).** Mở rộng fixture cho success/error/auth/usage/boundary/normalization. Empty/whitespace kiểm tra nút disabled và không POST; normalization kiểm tra payload; cap/floor kiểm tra response-to-UI. Không checkout hoặc ghi coupon usage. Không mô tả mock success là kiểm chứng backend.
7. **REQ-06/08: FR-17, 35 cases (Core + coupon POM).** Auth admin thật, coupon riêng, Create/Read/Delete; kiểm tra bảng sau reload cho persistence. Validation quan sát HTML constraints hoặc UI business error; duplicate vừa kiểm tra HTTP 400/409 vừa kiểm tra lỗi thân thiện. Nếu browser chặn decimal trước network thì ghi đúng tầng chặn, không bypass HTML để ép API. Quyền user/không token đi qua UI, không tự mở rộng sang direct API security tests. Cleanup kể cả khi assertion fail, chỉ xóa dữ liệu thuộc run.
8. **Review và inventory (Core/POM).** Đối chiếu 68 IDs với 68 tests; lập inventory ghi case, matcher, file/line và oracle. Review locator uniqueness, missing assertions, route leakage, false positives, state cleanup. Sinh viên review các thay đổi nhỏ và ghi lỗi AI thực tế, không tự nhận đã human-reviewed.
9. **REQ-09: chạy ma trận.** Smoke mỗi feature/browser trước; sau đó chạy đầy đủ 9 tổ hợp tuần tự, artifacts riêng. Một tổ hợp fail vẫn phải tiếp tục các tổ hợp còn lại và trả trạng thái tổng lỗi. Trích kết quả thật từ runner; lưu browser version, start/end, case status, failures, screenshots/traces và HTML thực. Chạy lại chỉ khi có fix hoặc cần chẩn đoán, bảo tồn kết quả cũ.
10. **Nghiệm thu và hồ sơ.** Đối chiếu 204 lượt dự kiến với executed/skipped/blocked; kiểm tra >=3 patterns đã thực sự dùng, dữ liệu ngoài, artifacts đọc được. Phân loại lỗi SUT/script/setup dựa trên tái hiện và evidence, cập nhật REQ-06–09 theo kết quả. Chuẩn bị report integration cho bước tiếp theo; chưa tuyên bố toàn bộ bài nộp hoàn tất.

## Assertion inventory dự kiến

| Pattern | Ví dụ áp dụng | Mục đích |
| --- | --- | --- |
| Text | toHaveText/toContainText: heading/login, error, tiền giảm/final | Đúng nội dung người dùng nhìn thấy |
| Attribute/value | toHaveAttribute('type','password'), toHaveValue | Mật khẩu che và input đúng |
| Navigation | toHaveURL | Login điều hướng đúng |
| State/count | toBeDisabled, toBeVisible, toHaveCount | Empty code, permission, create/delete row |
| Data/network | toEqual/toBe, expect.poll trên DB/read-only state | Payload normalize/JWT, attempts tăng 1, lock deadline; so sánh oracle độc lập |

Không đếm ba lần dùng cùng một matcher là ba patterns. Assertion phải kiểm tra kết quả sau hành động, không chỉ page load hoặc HTTP 200.

## Các mốc Git dự kiến

Commit từng bước thực chất: (1) FR-09 PoC spec, (2) FR-02 login/HTML validation, (3) FR-02 lockout/JWT, (4) FR-09 valid/boundaries, (5) FR-09 auth/error/normalization, (6) FR-17 Create/Read, (7) FR-17 validation/boundaries, (8) FR-17 Delete/permissions, rồi review fixes nếu có. Mỗi mốc phải đổi test-script files có ý nghĩa và có verification, không tạo commit rỗng hay tách giả lịch sử. Commit kế hoạch/data-only không tính vào tối thiểu 8 test-script commits.

## Xác minh đã làm trong lượt lập kế hoạch

Đã đọc skill chính/API reference, checklist/progress/cases và source SUT; đối chiếu text đề §6/11/12. Helper discovery chưa chạy được do thiếu playwright. Chưa cài package, chưa khởi động server, chưa chạy browser; chưa có runtime bug/HTML evidence. Các dấu hiệu lỗi từ source chỉ là mục cần xác minh. Giữ nguyên thay đổi sẵn có trong workspace và các file đã bị xóa trước lượt này.

## Thay đổi so với bản kế hoạch trước

CLI discovery → Playwright Test suite thay cho run.js của skill cũ. Core quản lý fixtures/assertions/config; POM chỉ khi đủ lợi ích. Các baseline, IDs, scope mock, 10 bước và tiêu chí nghiệm thu giữ nguyên. Lỗi thiếu playwright của helper cũ là evidence lịch sử, không phải kết quả preflight bộ mới. Chưa chạy CLI hoặc browser trong lượt phân tích này.

## Quyết định sinh viên đã chốt — 2026-11-13

1. Giữ ngoại lệ FR-09 mock toàn phần dù CLI/Core khuyến nghị không mock API nội bộ. Evidence chỉ chứng minh UI với response giả lập.
2. Toàn bộ test data bắt buộc nằm trong JSON/CSV riêng; tuyệt đối không hardcode trong spec, fixture, helper, POM hoặc script PoC. Bao gồm input, dữ liệu seed, mock response, expected, credentials test, các giá trị biên và tham số thời gian nghiệp vụ. Không dùng inline defaults hoặc factory để lách yêu cầu. Dữ liệu động chỉ resolve từ template/quy tắc khai báo trong file ngoài; lưu giá trị đã resolve để tái hiện. Locator và cấu hình kỹ thuật không phải test data nghiệp vụ; không dùng sự phân biệt này để giấu input/expected trong code.
3. Các phần còn lại của kế hoạch được sinh viên chấp nhận. Không còn quyết định scope/phương án cần xác nhận trước preflight và triển khai.

Nghiệm thu REQ-07 bổ sung: đối chiếu mọi giá trị input/setup/mock/expected trong code với file dữ liệu; validator kiểm tra trường bắt buộc và mapping; review thủ công để phát hiện hardcode kể cả trong helpers/POM. Thiếu dữ liệu phải báo lỗi, không fallback về giá trị hardcode.
