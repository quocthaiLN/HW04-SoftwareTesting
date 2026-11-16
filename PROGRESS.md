# Session Log

## Session 001
- Date: 2026-11-12 (Asia/Ho_Chi_Minh)
- Goal: Trích yêu cầu HW04, xác định scope FR-02/09/17; xác minh SUT, thiết kế cases và khởi tạo Git trong submission/.
- Completed: Đọc đề PDF 8 trang, policies và SUT sources. Checklist 23 mục (22 mandatory, 1 optional); giữ IDs. Xác nhận sinh viên 23120352 — Le Nguyen Quoc Thai. FR-17 không có Update; loại khỏi scope theo user (ID 4). Thiết kế 36 cases, 12/feature (IDs 2–9). Đề xuất mock Vite CartContext request vì REST cart không được frontend đọc; quyết định cuối: FR-09 mock toàn phần bằng page.route, thay thế phương án backend thật (ID 3). Tạo README, scope và Git repository cục bộ (IDs 16,19).
- Verification run: Parse hai JSON; IDs cases duy nhất, 12/feature, mỗi case map requirement IDs và 3 browsers. Source inspection UI/backend xác nhận không có Update coupon và cart chỉ trong React state. Chưa chạy automation hoặc proof-of-concept mock fixture. Không có runtime bug/report.
- Commits: 6ee2ee9 [REQ-02,03,04,06,16] Define scoped features and 36 UI test cases; commit tiếp theo ghi audit/progress (xem git-log.txt). Các commit tài liệu không tính vào >=8 test-script commits.
- Files or artifacts updated: requirements-list.json, scope.md, test-cases.json, README.md, .gitignore, PROGRESS.md, AI-Report-Audit.md, git-log.txt; AGENTS.md/policies.md được đưa vào Git.
- Known risk or unresolved issue: Đã xác nhận HW02/group uniqueness theo sinh viên; chưa có public GitHub remote; mock module fixture mới là thiết kế, phụ thuộc Vite dev server. Chưa có scripts/HTML/PDF/video, chưa human review. Git log là snapshot tại thời điểm export, cần xuất lại trước nộp.
- Next best step: Triển khai proof-of-concept Playwright FR-09 fixture và một case apply coupon qua API giả lập; sau đó xây data-driven scripts theo test-cases.json, xác minh lockout và CRUD qua runtime. Commit từng bước test-script có ý nghĩa; cấu hình 3 browsers và HTML attribution 23120352 + ISO timestamp. Thiết lập public remote trước hoàn tất bài nộp. Công khai FR-09 chỉ có UI mocked coverage, chưa kiểm chứng backend.

### Tổng kết Session 001

- Đã chốt scope, danh tính sinh viên, HW02/group uniqueness và FR-09 mock hoàn toàn bằng page.route(). FR-17 chỉ Create/Read/Delete vì SUT không hỗ trợ Update.
- Đầu ra: checklist 23 requirements; 36 cases thiết kế; scope, README, audit/progress và Git cục bộ tại submission/.
- Verification: JSON hợp lệ; 12 cases/feature; source inspection. Chưa có script, browser run, runtime bug hoặc HTML/PDF/video.
- Git trước commit tổng kết: 6ee2ee9, c2b9c68, 0bbd805. Commit tài liệu không tính vào 8 test-script commits. git-log.txt là snapshot, cần xuất lại trước nộp.
- Bước đầu Session tiếp theo: proof-of-concept route fixtures FR-09 rồi triển khai data-driven tests. Giới hạn: mock toàn phần không kiểm chứng logic backend; public remote còn chờ.

## Session 002
- Date: 2026-11-12 (Asia/Ho_Chi_Minh)
- Goal: Review requirements 2, 3, 4; bắt đầu requirement 2 theo chỉ đạo sinh viên.
- Completed: [REQ-02] Giữ nguyên 12 cases được sinh viên chấp nhận; thêm FR-02-TC13 che mật khẩu và TC14 nhận diện trang Đăng nhập. Checklist REQ-02 DONE ở mức scope/thiết kế. Tổng 38 cases (14/12/12), dự kiến 114 executions trên 3 browsers.
- Verification run: JSON parse, IDs duy nhất, traceability/browser targets; so sánh 12 cases FR-02 cũ với Git HEAD để xác nhận không đổi. Static review Login.jsx có heading Đăng Ký và password type=text; chưa chạy runtime.
- Commits: Commit bước thiết kế REQ-02 trong lịch sử Git; docs/data-only, không tính vào >=8 test-script commits.
- Files or artifacts updated: test-cases.json, requirements-list.json, scope.md, README.md, PROGRESS.md, AI-Report-Audit.md, git-log.txt.
- Known risk or unresolved issue: Chưa có automation/runtime evidence; hai dấu hiệu lỗi UI chỉ từ source. Requirements 3/4 chưa review trong Session 002.
- Next best step: Review requirement 3 (FR-09), tiếp theo requirement 4 (FR-17); sau đó triển khai automation theo requirements 6–10.

### Requirement 3 — tiếp tục Session 002, 2026-11-13
- Completed: Chấp nhận và giữ nguyên FR-09-TC01–TC12. Đối chiếu 21 cases nguồn trong fr09-case-review.md, thêm TC13–TC18: trống, whitespace-only, lowercase payload, trim payload, giảm bằng tổng, giảm vượt tổng. TC18 chờ cap/reject; 43 DESIGNED + 1 pending toàn suite. REQ-03 vẫn IN PROGRESS; REQ-04 chưa review.
- Verification run: Parse JSON, uniqueness, mapping/browser targets, so sánh toàn bộ 38 cases trước với Git HEAD không đổi; diff whitespace check. Chưa chạy runtime/automation.
- Files or artifacts updated: test-cases.json, requirements-list.json, fr09-case-review.md, testcase FR09 do sinh viên mô tả, scope.md, README.md, PROGRESS.md, AI-Report-Audit.md, git-log.txt.
- Known risk or unresolved issue: Cần xác nhận Q1–Q6 trong review; mock chỉ chứng minh UI. Không dùng kết quả Pass/Fail của nguồn làm evidence suite.
- Next best step: Chốt cap/reject, normalization, rounding và phạm vi case bổ sung; sau đó review REQ-04.
- Commits: Bước thiết kế REQ-03 và export log trong Git history; không tính vào >=8 test-script commits.

### Chốt requirement 3 — tiếp tục Session 002, 2026-11-13
- Completed: User chốt cap discount bằng tổng, final=0; chỉ uppercase/trim payload; floor tiền giảm. TC18 DESIGNED, thêm TC19 floor. Không thêm tổng 0/âm hoặc khoảng trắng giữa mã; nghiệp vụ thanh toán/API trực tiếp ngoài scope. REQ-03 DONE ở mức thiết kế, REQ-04 chờ review. Tổng 45 DESIGNED (14/19/12), dự kiến 135 browser executions.
- Verification run: JSON parse, IDs/traceability/browser targets; FR-09 TC01–TC17 và toàn bộ cases ngoài FR-09 không đổi so với Git HEAD; oracle TC18/TC19 khớp cap/floor. diff --check. Chưa automate/run runtime.
- Files or artifacts updated: test-cases.json, requirements-list.json, fr09-case-review.md, scope.md, README.md, PROGRESS.md, AI-Report-Audit.md, git-log.txt.
- Commits: Commit thiết kế REQ-03 và log export trong Git history; không tính vào >=8 test-script commits.
- Known risk or unresolved issue: Mock chỉ xác minh UI với response giả lập, không xác minh backend cap/floor. Không còn policy pending cho thiết kế REQ-03.
- Next best step: Review requirement 4 (FR-17).

### Requirement 4 — tiếp tục Session 002, 2026-11-13
- Completed: Đối chiếu nguồn EP01–27 và BVA01–25; giữ nguyên TC01–12, thêm TC13–31 (19 UI cases): fixed min=0, expiry quá khứ, uppercase, reset, percent 1/2/50/99/100, fixed 1/2/0/âm, min=1, uses âm/thập phân/10, code dài 1/2. Tổng 64 DESIGNED (14/19/31), dự kiến 192 browser executions.
- Verification run: Parse JSON, unique IDs, traceability/browser targets, 45 cases trước giữ nguyên; mapping nguồn đủ 27 EP +25 BVA; kiểm tra lại chuỗi BVA24 có đúng 30 ký tự (sửa nhận định đếm ban đầu). diff --check. Chưa runtime.
- Files or artifacts updated: test-cases.json, requirements-list.json, fr17-case-review.md, testcase FR17 do sinh viên mô tả, scope.md, README.md, PROGRESS.md, AI-Report-Audit.md, git-log.txt.
- Known risk or unresolved issue: REQ-04 IN PROGRESS; Q1–Q6 trong review cần chốt (dialog, code domain/length, percent range, used coupon deletion, duplicate error, security scope). API-only không đưa vào UI suite; không dùng Pass/Fail nguồn làm evidence.
- Commits: Bước bổ sung testcase REQ-04 và export Git log; không tính vào >=8 test-script commits.
- Next best step: Sinh viên review Q1–Q6; sau đó chốt scope/thiết kế FR-17 trước automation.

### Chốt requirement 4 — tiếp tục Session 002, 2026-11-13
- Completed: User chốt Q1–Q6. Bỏ TC30/31 độ dài code (retire IDs); không dialog/code-format/used-coupon-delete. Percent nguyên 1–100: pin TC08/09 type, thêm TC32–35 (101/120/0.5/1.5). TC05 HTTP 400/409 + lỗi trùng thân thiện. TC36/37 kiểm tra quyền user thường/không token qua UI. REQ-04 DONE phần thiết kế; 68 DESIGNED (14/19/35), dự kiến 204 executions.
- Verification run: JSON/IDs/traceability/browser targets; so sánh với Git HEAD: chỉ bỏ 30/31, sửa 05/08/09, thêm 32–37; FR-02/09 và cases khác giữ nguyên. diff --check. Chưa runtime/automation.
- Files or artifacts updated: test-cases.json, requirements-list.json, fr17-case-review.md, scope.md, README.md, PROGRESS.md, AI-Report-Audit.md, git-log.txt.
- Commits: Commit chốt REQ-04 và export log trong Git; không tính vào >=8 test-script commits.
- Known risk or unresolved issue: Không còn policy pending của REQ-04; UI permission coverage không chứng minh endpoint role enforcement. Các yêu cầu automation/report/PDF/video/public remote còn chưa hoàn tất.
- Next best step: Triển khai automation data-driven theo REQ-06–10 khi chuyển sang bước thực thi.

### Tổng kết phiên — Session 002

- Date: 2026-11-13 (Asia/Ho_Chi_Minh). Giữ số Session 002 của cùng chat theo workflow; không tạo một session thực thi mới chỉ vì prompt tổng kết.
- Goal: Review và chốt thiết kế requirements 2, 3, 4.
- Completed: REQ-02 DONE thiết kế, FR-02 có 14 cases (thêm che mật khẩu/nhận diện trang login). REQ-03 DONE thiết kế, FR-09 có 19 cases, cap discount bằng tổng, final>=0, floor percent, normalization chỉ payload, mocked UI-only. REQ-04 DONE thiết kế, FR-17 có 35 cases Create/Read/Delete, percent nguyên 1–100, duplicate HTTP 400/409 + thông báo nghiệp vụ, quyền user/không token qua UI; loại dialog/code-format/length/used-coupon-delete. TC30/31 retired, không tái sử dụng IDs.
- Verification run: JSON/counts/IDs/traceability/browser targets, kiểm tra thay đổi approved và diff whitespace; 68 DESIGNED (14/19/35), dự kiến 204 executions, thực tế 0 automated/executed, chưa có runtime bug/HTML evidence.
- Commits: Các commit chính ad84d02 (REQ-02), b990bf9 và 99768c6 (REQ-03), 562f612 và d7cdc50 (REQ-04), cùng commits correction/audit/Git log. Tất cả là docs/data-only, chưa tính vào >=8 test-script commits.
- Files or artifacts updated: test-cases.json, requirements-list.json, scope.md, README.md, fr09-case-review.md, fr17-case-review.md, testcases do sinh viên mô tả, PROGRESS.md, AI-Report-Audit.md, git-log.txt.
- Known risk or unresolved issue: Mock FR-09 không xác minh backend cap/floor; UI permission không chứng minh endpoint role enforcement. Chưa automation/runtime/report/PDF/video/public remote; không tuyên bố bài nộp hoàn tất. Git log là snapshot trước commit export, cần xuất lại trước nộp.
- Next best step: Chuyển sang REQ-06–10: proof-of-concept FR-09 page.route fixture, rồi data-driven scripts với dữ liệu JSON riêng, ba browser targets và HTML attribution thật. Xác minh runtime và phân biệt lỗi SUT/script/setup khi có kết quả.


## Session 003
- Date: 2026-11-13 (Asia/Ho_Chi_Minh).
- Goal: Đối chiếu playwright-skill và lập kế hoạch chi tiết REQ-06–09.
- Completed: Tạo session-003-plan.md với gap analysis skill, kiến trúc data-driven, tệp dự kiến, 10 bước thực hiện, assertion inventory, ma trận 9 runs/204 lượt và mốc Git. Giữ baseline 68 cases (14/19/35).
- Verification run: Đọc skill/API reference và source; đối chiếu đề §6/11/12; JSON/counts/IDs; helper detectDevServers lỗi MODULE_NOT_FOUND: playwright, chưa discovery được server. Chưa browser run.
- Commits: Chưa tạo commit trong lượt lập kế hoạch; không gộp thay đổi người dùng có sẵn vào commit.
- Files or artifacts updated: session-003-plan.md, requirements-list.json (planning_reference), PROGRESS.md, AI-Report-Audit.md.
- Known risk or unresolved issue: Skill chưa có dependencies; Vite module mock cần PoC; database.js reset bảng khi backend startup; source login +2/180 giây cần runtime xác minh, chưa gọi bug. Có thay đổi/xóa file sẵn có trong workspace được giữ nguyên. REQ-06–09 vẫn NOT START ở mức triển khai.
- Next best step: Thực hiện preflight/dependency và kiểm soát DB lifecycle, rồi PoC FR-09 bằng skill executor trước khi mở rộng suite.

### Cập nhật bộ skill mới — tiếp tục Session 003
- Date: 2026-11-13 (Asia/Ho_Chi_Minh).
- Goal: REQ-05 với skill mới; phân tích playwright-cli/core/pom và điều chỉnh kế hoạch REQ-06–09.
- Completed: Ghi preparation-notes.md; REQ-05 DONE dựa trên xác nhận hoàn tất chuẩn bị của sinh viên, phân biệt ghi chú skill với việc ôn bài giảng (AI chưa có bài giảng). Viết lại gap analysis/roles và các bước kế hoạch sang CLI discovery + Playwright Test/Core + POM có chọn lọc. Giữ 68 cases và 204 lượt dự kiến.
- Verification run: Đọc 3 SKILL.md, guides generation/data/assertions/config/fixtures/clock/mock/POM; xác minh JSON/counts và diff --check. Chưa chạy CLI/browser.
- Commits: 6b8fba3 — commit tài liệu REQ-05–09; không tính vào >=8 test-script commits. Chỉ stage tài liệu do AI tạo/chỉnh, giữ PROGRESS.md ngoài commit để không gộp sửa header có sẵn của sinh viên.
- Files or artifacts updated: preparation-notes.md, session-003-plan.md, requirements-list.json, AI-Report-Audit.md, PROGRESS.md, git-log.txt.
- Known risk or unresolved issue: CLI/Core cấm mock own API trái scope user, đã ghi ngoại lệ FR-09; inline data/networkidle/default traces không sao chép; link ../core sai thư mục phải resolve thủ công; CLI API/version chưa xác minh bằng executable. Không thay đổi scope, không gọi source issue là runtime bug.
- Next best step: Preflight local CLI/runner, DB isolation, snapshot UI và PoC FR-09 trước mở rộng suite.

### Chốt kế hoạch — tiếp tục Session 003
- Date: 2026-11-13 (Asia/Ho_Chi_Minh).
- Completed: Sinh viên chấp nhận kế hoạch CLI/Core/POM, giữ ngoại lệ FR-09; siết REQ-07 toàn bộ test data JSON/CSV riêng, không hardcode ở bất kỳ tầng test code nào. Đã cập nhật acceptance/checklist và kế hoạch.
- Verification run: Parse checklist, diff --check; chưa thực thi browser/tests.
- Commits: Commit tài liệu chốt kế hoạch; không tính vào >=8 test-script commits.
- Next best step: Preflight và triển khai kế hoạch đã được chấp nhận, không hỏi duyệt lại các quyết định đã chốt.

### Thực thi kế hoạch — tiếp tục Session 003
- Date: 2026-11-13T15:06:04+07:00 (Asia/Ho_Chi_Minh).
- Goal: Thực hiện REQ-06–09 theo kế hoạch đã chấp nhận; tạo evidence thực.
- Completed: Runner Playwright Test 1.65.0/CLI 0.1.24; đủ 68 cases (14/19/35) với JSON riêng; fixtures/POM nhỏ, validator và assertion inventory. Backend copy nguyên trạng/DB riêng /tmp, không sửa SUT. CLI snapshots thật. PoC FR-09 pass cả 3 engines. Ma trận final đủ 9 tổ hợp/204 executions: 150 pass/54 fail/0 skipped. REQ-06–09 DONE; REQ-10 cũng DONE theo 9 HTML reports có title attribution/ISO được browser xác minh.
- Verification run: npm validate; syntax checks scripts/tests; list=204 tests; preflight ghi engines Chromium158/Firefox159/WebKit27.2 và source hashes; final matrix trên revision 676a70eac061864b2779e26fe9efe55bc3ffbc9c. scripts/verify-reports.js mở 9 file HTML trực tiếp và chụp title thật; DB cleanup kiểm tra riêng. First batch 149pass/55fail giữ nguyên, một timeout WebKit không tính là defect SUT. Self-review sửa currency substring thành exact text và custom metadata hidden thành title runtime, không retry tự động.
- Commits: d995b45,622c221,3caf495,ae36e9e,661c1ae,ffe21bb,cf436b6,945cf44,ecad404 là 9 commits đổi .spec.js có ý nghĩa; các commits config/docs khác không tính vào tối thiểu 8. Commit evidence/docs bổ sung sau cùng; git-log.txt là snapshot.
- Files or artifacts updated: package/lock/config, data/, tests/, scripts/, RUNNING.md, assertion-inventory.md, implementation-notes.md, automation-report.md, bug-reports.md, artifacts/, checklist/cases/README/scope/progress/audit.
- Known risk or unresolved issue: 9 nhóm lỗi SUT runtime, chưa GitHub Issues; student human review/PDF/video/public remote chưa hoàn tất. FR-09 mocked không chứng minh backend; permission chỉ UI. WebKit system deps thiếu và sudo cần mật khẩu: dùng apt download/extract trong /tmp với launcher binary gốc, hướng dẫn tái tạo đã lưu. Automatic approval review từ chối phục vụ toàn bộ artifacts qua localhost vì có thể lộ token/credentials trace; đã dùng mở file report trực tiếp, không còn blocker kiểm tra report. Giữ nguyên file xóa và chỉnh header có sẵn của sinh viên.
- Next best step: Sinh viên human review suite và 9 nhóm lỗi; sau đó xử lý requirements báo cáo/Issues/public remote/PDF/video riêng. Không sửa SUT hoặc sửa expected để xanh tests.

### Tổng kết Session 003
- Date: 2026-11-13 (Asia/Ho_Chi_Minh).
- Goal: Chốt kết quả và bàn giao bước tiếp theo trong cùng Session 003.
- Completed: REQ-06–10 DONE, 68 cases automated, 204 executions/9 feature-browser runs; 150 pass/54 fail/0 skipped, 9 nhóm lỗi runtime. FR-09 UI mocked 57/57; FR-02 18/42, FR-17 75/105. Chi tiết tại session-003-summary.md. Reconcile REQ-12/14/18/19 IN PROGRESS; REQ-17 DONE snapshot export; REQ-16 còn chờ public remote.
- Verification run: Đối chiếu summary/matrix và Git history; 9 qualifying spec commits; 9 reports đã browser-verified. Không chạy lại tests trong lượt tổng kết. Cleanup sạch, servers của phiên đã dừng.
- Commits: Evidence 2866501; log 282c750; commit tổng kết là docs-only, không tính vào 9 script commits. Subject 282c750 ghi REQ-19 nhưng export log thuộc REQ-17; giữ lịch sử thật.
- Files or artifacts updated: session-003-summary.md, PROGRESS.md, AI-Report-Audit.md, requirements-list.json, git-log.txt.
- Known risk or unresolved issue: Human review, public remote/Issues, main report/PDF, critique/video, tự chấm/đóng gói còn chờ; không tuyên bố bài nộp hoàn tất. FR-09 không chứng minh backend rules; một WebKit timeout batch đầu không lặp ở final nhưng chưa kết luận nguyên nhân.
- Next best step: Sinh viên thực hiện REQ-11 human review rồi hoàn thiện Issues/publication và report deliverables theo checklist.

### Giải thích cấu trúc suite — Session 003
- Date: 2026-11-13T15:34:23+07:00.
- Goal: Giải thích vị trí data, entry points, output và các thành phần automation.
- Completed: Đối chiếu code thực tế và cung cấp sơ đồ luồng, lệnh chạy, đường dẫn outputs và ví dụ FR-09-TC01. Không thay đổi trạng thái checklist.
- Verification run: Chỉ đọc code/tài liệu; không chạy tests lại.
- Files or artifacts updated: AI-Report-Audit.md, PROGRESS.md.
- Next best step: Sinh viên dùng cấu trúc này để human review suite.

## Session 004
- Date: 2026-11-13T16:33:13+07:00.
- Goal: REQ-11 xử lý human review về Conditional Test Logic.
- Completed: Tách callbacks theo hành vi trên3specs, data-driven chỉ cùng hình dạng; bỏ branch theo observed validity. Fixtures/helper luồng cố định, không chuyển scenario dispatcher. REQ-11 IN PROGRESS; chưa xác nhận review mọi output.
- Verification run: validate; exact68IDs×3; batch session004-refactor9runs204executions150pass54fail0skip. Case/browser comparison với session003-final0differences. DB cleanup chỉ seed2users4coupons; dừng đúng SUT owner. Giới hạn kết luận theo các ca đã chạy.
- Commits: 3cd7cc6 code; af7b682 review/comparison; evidence/docs commit sau kiểm chứng.
- Files or artifacts updated: tests/*.spec.js, scripts/compare-matrices.js, session-004-review.md, implementation-notes.md, RUNNING.md, artifacts/session004-refactor*, checklist/audit/progress.
- Known risk or unresolved issue: Lỗi SUT giữ nguyên; human review chưa toàn bộ; FR09 UI mock và permission UI scope giữ nguyên. Không thêm/bỏ case, không sửa SUT/data. Giữ user changes sẵn có.
- Next best step: Sinh viên review các callback đã tách và gap analysis trong session-004-review.md để tiếp tục REQ-11.

### Tổng kết Session 004 — đã chấp nhận refactor
- Date: 2026-11-13T16:40:44+07:00.
- Goal: Ghi nhận sinh viên chấp nhận chỉnh sửa và tổng kết phiên.
- Completed: Conditional Test Logic refactor được sinh viên chấp nhận; summary tại session-004-summary.md. REQ-11 tổng thể IN PROGRESS do phạm vi xác nhận chỉ phần sửa này.
- Verification run: Đối chiếu evidence batch204executions150pass54fail0skip, so ID/browser0differences; không chạy lại tests trong lượt tổng kết.
- Commits: 3cd7cc6/af7b682/e1a4116; log7930901; summary docs commit riêng.
- Files or artifacts updated: session-004-summary.md, session-004-review.md, requirements-list.json, PROGRESS.md, AI-Report-Audit.md, git-log.txt.
- Known risk or unresolved issue: Human review toàn bộ và các deliverables cuối còn chờ; scope UI mock/permission UI giữ nguyên.
- Next best step: Tiếp tục review/gap analysis còn lại của REQ-11.

### Chốt REQ-11 — Session 004
- Date: 2026-11-13T16:50:15+07:00.
- Goal: Ghi nhận xác nhận human review còn lại của sinh viên.
- Completed: Sinh viên đồng ý selectors/assertions/waits/missing cases/gap analysis và xác nhận đã bổ sung ở testcase design. Kết hợp refactor đã chấp nhận, REQ-11 DONE. Trạng thái IN PROGRESS trước đó là lịch sử.
- Verification run: Đối chiếu xác nhận user với test-cases.json và review notes; không thay đổi/chạy lại tests. Evidence hồi quy150pass54fail0skip giữ nguyên.
- Files or artifacts updated: checklist, session-004-review.md, session-004-summary.md, audit/progress và Git log.
- Known risk or unresolved issue: Coverage FR09 mocked/permission UI giữ nguyên; các requirements khác không tự chuyển DONE.
- Next best step: Tiếp tục các deliverables báo cáo/publication còn lại theo checklist.


## Session 005
- Date: 2026-11-13T17:11:43+07:00 (Asia/Ho_Chi_Minh).
- Goal: Thực hiện REQ-12 — bug evidence trong Markdown và GitHub Issues có screenshot.
- Completed: 9 báo cáo chi tiết với steps/input/expected/actual/severity đề xuất/giới hạn evidence; tạo Issues #1–#9 trên quocthaiLN/HW04-SoftwareTesting, upload ảnh runner gốc và UI-verify từng Issue có ảnh. REQ-12 DONE. Phân loại riêng timeout/script/report/setup.
- Verification run: Đọc đề gốc/policies/instructions và evidence Session003/004; 18 failing IDs ×3 browsers=54 executions được mapping đủ vào 9 groups; SHA256 của cả 9 ảnh khớp file runner gốc; npm run validate đạt68cases/204registrations, git diff --check đạt; browser xác minh từng issue và danh sách cuối. Không chạy lại suite; giữ150pass54fail0skip.
- Commits: 4696f64 — REQ-12 báo cáo/evidence/checklist; commit xuất Git log riêng sau đó. Docs-only, không tính vào >=8 test-script commits. git-log.txt là snapshot trước commit export.
- Files or artifacts updated: bug-reports.md, artifacts/evidence/session005-bug-evidence.json, session005-github-issues.png, requirements-list.json, README.md, automation-report.md, AI-Report-Audit.md, PROGRESS.md, git-log.txt.
- Known risk or unresolved issue: BUG-06 ảnh sau alert; BUG-07–09 ảnh không thấy row ngoài viewport, runner/trace là bằng chứng quyết định và giới hạn đã ghi trên Issue. Git remote publication là REQ-16 riêng, chưa kiểm chứng; git ls-remote bị lỗi quyền SSH config hệ thống, không ảnh hưởng tạo Issues qua browser. Giữ sửa header PROGRESS và các xóa/skills sẵn có của sinh viên.
- Next best step: Tiếp tục yêu cầu báo cáo/PDF/public repository/video theo checklist; không tự nhận hoàn tất cả bài.

### Dọn submission và tạo main report — tiếp tục Session005
- Date: 2026-11-13T17:24:42+07:00.
- Goal: Xóa tài liệu phiên trung gian/artifacts Session003, dùng Session004 và tạo main report Markdown.
- Completed: Xóa session-00x-*.md, implementation-notes.md, assertion-inventory.md; gom kiến trúc/assertion/review/gaps vào main-report.md. Chỉ giữ runtime batch Session004; giữ evidence GitHub publication Session005. test-cases.json lấy execution records thật Session004; local BUG images copy từ Session004, manifest phân biệt hash ảnh GitHub lịch sử. Cập nhật links/checklist/README/RUNNING/automation report.
- Verification run: 9 HTML Session004 browser-verified Run by+ISO; validate68cases/204registrations; mapping54failures/ảnh/links kiểm tra riêng. Không chạy lại SUT tests hoặc chỉnh report HTML.
- Commits: Commit cleanup/report riêng và snapshot Git log sau đó; docs/evidence-only.
- Known risk or unresolved issue: Audit/progress và comparison.json giữ lịch sử file/baseline đã xóa; muốn tái so baseline phải khôi phục Git. GitHub Issues giữ ảnh upload ban đầu, không tự thay bằng ảnh local mới. PDF/video/publication/self-assessment chưa tự hoàn tất.
- Next best step: Sinh viên review main-report.md; hoàn thiện các deliverables còn lại theo checklist.

### Cấu trúc main report theo mẫu sinh viên — tiếp tục Session005
- Date: 2026-11-13T17:35:40+07:00.
- Goal: Cập nhật main-report.md theo trang bìa +12mục và Appendix.
- Completed: 68case rows có loại/data/assertion/status;3feature×7tiểu mục; ảnh report/bugs và9Issues; mô tả4skill/flow;10spec commits từ Git; đo tỷ lệ token giữ/sửa baseline676a70e→current theo3specs; before/after Conditional Test Logic. Self-assessment100/100 theo yêu cầu, nêu rõ video/demo còn thiếu. git-log.txt định dạng pretty riêng, README đồng bộ điểm.
- Verification run: Đủ12sections/68case rows; local links tồn tại; code/data excerpts lấy file thật. Không chạy lại suite, không tự điền ngày nộp/YouTube/độ dài video.
- Known risk or unresolved issue: Public repo chưa xác minh; video/AI Critique/kết luận để thực hiện sau theo user. Tỷ lệ token là text change metric, không là tỷ lệ công sức; review cuối khác giai đoạn AI self-review đã ghi rõ.
- Next best step: Sinh viên review báo cáo và bổ sung các mục để sau.

## Session 006
- Date: 2026-11-16T09:57:02+07:00.
- Goal: REQ-03/06–09 mở rộng FR09 với giỏ hàng UI và backend thật theo user đồng ý.
- Completed: Thêm pilot INT01/INT02, 3 POM Home/Cart/Checkout, fixture DB ownership cleanup, data JSON và lệnh test riêng; giữ nguyên 19 mock cases và lịch sử matrix. Xem fr09-integration.md.
- Verification run: Chromium và Firefox mỗi engine 1 pass fixed/1 fail percent; backend trả discount=-4500000/final=5000000 thay expected 50000/450000. WebKit 2 launch failures do thiếu libevent-2.1.so.7, chưa tới SUT. Validator đạt68 historical+2 supplemental; list210 registrations. DB cleanup: 0 owned products/coupons/users. Diff check trên toàn workspace báo whitespace ở git-log.txt có sẵn; không sửa user changes.
- Commits: Chưa commit; workspace có nhiều thay đổi sẵn có của sinh viên.
- Files or artifacts updated: tests/fr09-integration.spec.js, tests/pages/home.js/cart.js/checkout.js, data/fr09-integration.json, package.json, playwright.config.js, scripts/validate-test-data.js, fr09-integration.md, README.md, checklist, audit/progress; artifacts/session006-fr09-integration-*.
- Known risk or unresolved issue: Backend formula bug giữ nguyên. WebKit thiếu dependency hệ thống; chưa migrate đủ19case sang backend thật. Các báo cáo/matrix cũ giữ nguyên mốc lịch sử.
- Next best step: Cài dependency WebKit và mở rộng các backend rules theo từng case.

### Kế hoạch thay toàn bộ FR09 — tiếp tục Session 006
- Date: 2026-11-16 (Asia/Ho_Chi_Minh).
- Goal: Theo yêu cầu user, thay19case mock bằng UI + backend thật; giữ TC01–TC19 và expected nghiệp vụ; kết thúc ở áp coupon, không xác nhận tạo đơn.
- Plan: (1) Chuyển data/fr09.json sang product/coupon/usage thực, thêm mã unique và giữ normalization. (2) Fixture chuẩn bị DB riêng, ghi nhận request/response thụ động và cleanup. (3) Viết lại fr09-apply-coupon.spec.js dùng Login/Home/Cart/Checkout POM, kiểm tra cart/tổng/API/UI. TC09/10 kiểm tra chặn checkout khi không xác thực; không tuyên bố kiểm chứng bảo vệ API từ các case này. (4) Bỏ mock fixture và gộp pilot vào19case chính. (5) Cập nhật validator/config/package/design/checklist/tài liệu; giữ evidence cũ là lịch sử. (6) Chạy19case trên3engine, phân loại lỗi SUT/setup/environment, kiểm tra cleanup và lưu kết quả thật.
- Acceptance: Không mock module/API, không sửa tổng tại checkout, không reload sau thêm hàng, không sửa SUT/expected để xanh; mỗi case có product/user/coupon riêng, cleanup sau cả failure. 19 IDs ×3=57registrations FR09, suite tổng68×3=204.
- Files: tests/fr09-apply-coupon.spec.js; tests/fixtures/coupon-real.js (mới); tests/pages/checkout.js; data/fr09.json; scripts/validate-test-data.js; package.json; playwright.config.js; test-cases.json; requirements-list.json; README.md; fr09-integration.md; PROGRESS.md; AI-Report-Audit.md. Bỏ tests/fixtures/coupon-routes.js, tests/fr09-integration.spec.js, data/fr09-integration.json sau khi gộp.
- Verification: npm run validate; playwright --list; FR09 chromium/firefox/webkit; kiểm tra DB owned rows và review report JSON. Chưa chạy lại ở thời điểm ghi kế hoạch.

### Hoàn tất thay toàn bộ FR09 — Session 006
- Date: 2026-11-16T10:13:51+07:00.
- Goal: Thực thi kế hoạch đã ghi theo user, thay19mockcases bằng real UI cart → checkout → apply coupon.
- Completed: REQ-03 scope cập nhật DONE. Giữ TC01–TC19; fixture coupon-real seed user/product/coupon/usage thật, cleanup; Login/Home/Cart/Checkout POM. Bỏ coupon-routes và pilot2cases khỏi discovery. TC09/10 kiểm tra chặn cart→login, không bypass hoặc tuyên bố API auth được bảo vệ. Dừng trước xác nhận thanh toán.
- Verification run: Validator68cases/204registrations; FR09list57. Chromium/Firefox/WebKit mỗi15pass4fail0skip, tổng45pass12fail0skip. Fail đúng TC01/TC07/TC18/TC19, 3nhóm lỗi backend formula/min equality/discount cap. WebKit đã chạy được, không còn launch failure trong batch này. Actual JSON/HTML/screenshot/trace trong artifacts/session006-fr09-real-*. Matrix tổng hợp artifacts/session006-fr09-real/execution-matrix.json. DB cleanup0ownedproducts,0testusers,0usage; chỉ4seedcoupons. Không chạy lại FR02/17.
- Commits: 83bc1ae — thay code/data FR09; docs/evidence commit riêng. Không stage sửa login POM, các file xóa hoặc thay đổi tài liệu có sẵn của sinh viên.
- Files or artifacts updated: Các file trong kế hoạch; test-cases.json lưu kết quả thật và tách historical_mock_execution_results; fr09-integration.md/bug-reports.md ghi3nhóm lỗi mới; README/main-report/automation-report nêu rõ Session004 là lịch sử; checklist/audit/progress.
- Known risk or unresolved issue: 12fail là lỗi SUT giữ nguyên expected nghiệp vụ; chưa tạo Issues mới. C4 chỉ kiểm tra UI guard và /users/me invalid403, không chứng minh direct apply API auth. Human review bộFR09mới cần làm lại; kết quả review cũ thuộc mocked suite. Các thay đổi có sẵn của sinh viên được giữ nguyên.
- Next best step: Sinh viên review FR09mới và3nhóm lỗi backend, rồi cập nhật deliverables/Issues khi được yêu cầu.

### Cập nhật Bug Report và GitHub Issues — Session 006
- Date: 2026-11-16T10:23:36+07:00.
- Goal: User yêu cầu cập nhật Bug Report/GitHub theo FR09 real run.
- Completed: REQ-12: BUG-10(formula TC01/19), BUG-11(min equality TC07), BUG-12(cap TC18); chi tiết preconditions/steps/expected/actual/severity đề xuất và giới hạn. Đã tạo Issues#10–12, mỗiIssue có runner screenshot nguyên bản, UI xác minh body/ảnh và danh sách12Open. Các Issue#1–9 giữ nguyên.
- Verification run: Source/target SHA256 của3ảnh khớp; xem cả3ảnh gốc; mapping đúng4IDs fail×3engines=12executions/3groups. Không chạy lại tests; giữ45pass12fail0skip FR09. No SUT fixes.
- Files or artifacts updated: bug-reports.md, fr09-integration.md, checklist, README/automation-report, artifacts/evidence/BUG-10.png/BUG-11.png/BUG-12.png/session006-bug-evidence.json/session006-github-issues.png; audit/progress.
- Known risk or unresolved issue: Severity là đề xuất; chưa triage/fix. Cap theo testcase student-approved; chưa thử downstream payment.
- Next best step: Review/triage3Issue mới; các deliverables khác theo checklist.


## Session 007
- Date: 2026-11-16T11:37:13+07:00 (Asia/Ho_Chi_Minh).
- Goal: Đọc lại tiến độ và dọn artifacts không cần thiết (REQ-18/22).
- Completed: Xóa 13 thư mục thử/pilot (345 files, 35,846,252 bytes). Giữ nguyên Session004 lịch sử đủ9runs, Session006 fr09-real hiện tại và evidence/; giữ mọi HTML dependency/trace/attachment của các batch này.
- Removed directories: 2026-11-16T02-55-59-162Z, 2026-11-16T02-59-02-847Z, 2026-11-16T02-59-03-136Z, 2026-11-16T02-59-09-551Z, 2026-11-16T03-08-47-778Z, my-new-batch, my-new-batch-fr02-chromium, my-new-batch-fr02-firefox, my-new-batch-fr02-webkit, my-new-batch-fr09-chromium, session006-fr09-integration-chromium, session006-fr09-integration-firefox, session006-fr09-integration-webkit.
- Verification run: Đối chiếu PROGRESS/checklist/reports/matrices/manifests;12 HTML reports còn đủ, JSON results parse được, các ảnh/trace được manifest tham chiếu tồn tại; SHA256 BUG-10–12 khớp cả source và copy. Không chạy lại SUT tests. my-new-batch chỉ có matrix3runs FR02 và FR09 Chromium rời; pilot2cases đã được thay bằng19cases thật.
- Commits: Chưa tạo commit; giữ nguyên thay đổi có sẵn của sinh viên.
- Files or artifacts updated: artifacts/, fr09-integration.md, PROGRESS.md, AI-Report-Audit.md, requirements-list.json.
- Known risk or unresolved issue: Audit/progress/Git giữ ghi nhận lịch sử pilot đã xóa. Session004 vẫn là lịch sử, không gộp thành lượt chạy chung với FR09 mới.
- Next best step: Hoàn thiện deliverables còn thiếu theo checklist.

### Thay evidence FR09 refactor — tiếp tục Session007
- Date: 2026-11-16T11:39:34+07:00.
- Completed: Theo yêu cầu user xóa3thư mục session004-refactor-fr09-*. Matrix/summary Session004 chỉ giữ FR02/17:147executions93pass54fail; report-verification giữ6records. Tạo artifacts/execution-matrix.json làm index9runs từ2phiên:204executions138pass66fail0skip. Cập nhật HTML links/bảng kết quả/checklist; bỏ ảnh attribution FR09 mock.
- Verification run: Kiểm tra9HTML và references tới3thư mục bị xóa; không chạy lại tests, không sửa HTML runner. Giữ comparison/registration lịch sử gốc với giới hạn đã ghi.
- Commits: Chưa commit.


## Session 008 — Đối chiếu AI audit với 7 chat tham chiếu
- Date: 2026-11-16T11:48:37+07:00 (Asia/Ho_Chi_Minh).
- Goal: Bổ sung AI-Report-Audit.md nếu còn thiếu tương tác.
- Completed: Đọc đủ 7 chat và phân trang; bổ sung 6 lượt lịch sử cùng lượt yêu cầu audit hiện tại. Giữ nguyên lịch sử đã có, phân biệt lời khuyên/API proposal với triển khai UI thật và kịch bản với video đã quay.
- Verification run: Đối chiếu prompt/output từ read_thread; kiểm tra mỗi entry bổ sung đúng 3 thành phần Date and time, User prompt, AI output. Không chạy SUT hoặc browser tests.
- Commits: Chưa tạo commit; workspace có thay đổi sẵn có của sinh viên.
- Files or artifacts updated: AI-Report-Audit.md, PROGRESS.md.
- Known risk or unresolved issue: Audit là bản tóm tắt; timestamp hồi cứu là thời điểm bắt đầu lượt chat. Không có evidence video mới; trạng thái checklist giữ nguyên.
- Next best step: Tiếp tục hoàn thiện deliverables còn thiếu theo requirements-list.json.

### Dọn tài liệu chuẩn bị nộp — tiếp tục Session008
- Date: 2026-11-16T11:52:24+07:00.
- Goal: Gộp tài liệu vào main report và xóa file thừa/theo yêu cầu sinh viên.
- Completed: Gộp Automation-Report.md, fr09-integration.md, bug-reports.md và youtube.txt vào main-report.md; xóa 4 file nguồn sau gộp, references và .playwright-cli khám phá cũ. README thành chỉ mục ngắn; testcase nguồn ghi do sinh viên mô tả. Giữ AI Critique riêng và các artifacts thực.
- Verification run: Kiểm tra links tài liệu chính: 0 liên kết file hỏng; JSON parse đạt; validator đạt 68 cases/204 registrations; 19 dòng FR09 và đủ 12 báo cáo bug chi tiết. Cập nhật Git log từ lịch sử thật (11 spec commits); không chạy lại SUT/tests, không thay runner reports.
- Commits: Chưa tạo commit; giữ nguyên thay đổi có sẵn của sinh viên.
- Files or artifacts updated: main-report.md, README.md, AI-Report-Audit.md, PROGRESS.md, requirements-list.json, test-cases.json; các file/thư mục đã gộp hoặc xóa nêu trên.
- Known risk or unresolved issue: PDF/ZIP chưa tạo; video đã có URL nhưng chưa xác minh nội dung/quyền xem/thời lượng. Lịch sử audit/progress/Git có tên tài liệu đã gộp, không phải liên kết hiện hành.
- Next best step: Hoàn tất các mục chưa nghiệm thu trong checklist trước đóng gói.

### Rà soát đề và chốt gói nộp — tiếp tục Session008
- Date: 2026-11-16T11:58:42+07:00.
- Goal: REQ-13–23 đối chiếu đề gốc và chuẩn bị bài nộp cuối.
- Completed: Đọc đủ8trang đề; sửa checklist cũ, README có rubric/summary/video. Sinh viên xác nhận toàn bộ review/video/demo đã hoàn thành. Giữ tên Main-Report.md do sinh viên đổi và sửa live links. Critique274whitespace words;11qualifying spec commits.
- Verification run: 9HTML mở trực tiếp, attribution+ISO+Project đều visible; artifacts/evidence/final-report-verification.json và9ảnh. 12bug screenshots hash khớp manifests; không chạy lại SUT. Skill executor thiếu dependency nên dùng Playwright đã cài trong submission; sandbox chặn Chromium launch, escalation read-only file inspection được cho phép.
- Commits: Chờ final local commit và export log; public remote hiện e1064e2 còn cũ, local HEAD2fe3457.
- Files or artifacts updated: Main-Report.md, README.md, requirements-list.json, AI-Report-Audit.md, PROGRESS.md; final report-verification evidence; PDF/ZIP đang chuẩn bị.
- Known risk or unresolved issue: Public repo đã xác minh nhưng bản cuối cần sync; Moodle chưa nộp. Video/demo theo xác nhận sinh viên, không nhận AI đã xem/nghe.
- Next best step: Xuất/kiểm tra PDF, đóng gói giới hạn20MB/part; chốt sync public repo trước nộp.

### Chốt PDF/package và đồng bộ Git — tiếp tục Session008
- Date: 2026-11-16T12:03:23+07:00.
- Completed: Main-Report.pdf33trang, AI-Report-Audit.pdf9trang, AI-Critique.pdf1trang, README.pdf1trang; render toàn bộ và xem contact sheets/sample, không ký tự ngoài safe bounds. ZIP thử731files,68637502bytes; testzip/hash PASS; chia4parts19MiB/19MiB/19MiB/phầnzip còn lại, mỗifile<20MB. Sinh viên cho phép commit/push bản cuối lên public repo.
- Verification run: 9HTML có visible attribution/ISO/project;12bug images hash; validator68cases và playwright list204tests. Không chạy SUT lại. Local links/JSON và format audit43interactions đạt trước entry push mới.
- Commits: Commit bản cuối và commit snapshot Git log/manifest theo sau; test-script history vẫn11commits, không tính commit tài liệu.
- Files or artifacts updated: PDF/Markdown/checklist/progress/audit, final report verification, submission-manifest.json; gói cuối ngoài submission/ tại final-submission/.
- Known risk or unresolved issue: Chưa nộp Moodle; deadline theo link lớp. Video/skill/review theo xác nhận sinh viên. ZIP/manifest sẽ tạo lại sau cập nhật cuối để không đóng gói snapshot cũ.
- Next best step: Push được user cho phép, xác minh remote; xuất lại log/manifest/package và kiểm tra4parts.

### Kết quả chốt bản nộp — Session008
- Date: 2026-11-16T12:04:57+07:00.
- Completed: Public origin/main đã push từe1064e2 tới3a18c52 (bản báo cáo/evidence cuối). README/checklist/publication notes cập nhật; REQ14/15/16/18/19/21/22/23 DONE theo evidence/xác nhận sinh viên. REQ20 giữINPROGRESS chỉ vì Moodle chưa submit; local ZIP đã chuẩn bị.
- Verification run: 4PDF đã render và kiểm tra không tràn safe bounds (Main33/Audit9/Critique1/README1trang); ZIP thử731files/68637502bytes có testzip/hashPASS,9HTML. Final log/manifest/package xuất lại từ working tree cuối và kiểm tra split/rejoin; kết quả checksum bàn giao tại final-submission/.
- Commits: 3a18c52 — bản nộp cuối; commit snapshot/log/manifest/PDF tiếp theo. git-log.txt xuất sau3a18c52 nên không chứa chính commit export theo sau. Git history vẫn11qualifying .spec.js commits, docs-only commits không cộng.
- Files or artifacts updated: Main-Report.md/.pdf, AI-Report-Audit.md/.pdf, AI-Critique.pdf, README.md/.pdf, requirements-list.json, git-log.txt, submission-manifest.json, final-submission-validation.json, gói splitZIP.
- Known risk or unresolved issue: Chưa thực hiện upload Moodle hoặc xác minh deadline lớp; sinh viên upload đủ4parts. Video/skill/human review theo xác nhận sinh viên, AI không nhận đã xem/nghe video. Khi mở gói đặt4parts cùng thư mục, mở .zip bằng7-Zip/WinRAR.
- Next best step: Sinh viên nộp Moodle đúng hạn; không cần chạy lại SUT để tạo thêm evidence.
