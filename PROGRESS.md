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
- Files or artifacts updated: test-cases.json, requirements-list.json, fr09-case-review.md, references/fr09-user-testcases.txt, scope.md, README.md, PROGRESS.md, AI-Report-Audit.md, git-log.txt.
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
- Files or artifacts updated: test-cases.json, requirements-list.json, fr17-case-review.md, references/fr17-user-testcases.txt, scope.md, README.md, PROGRESS.md, AI-Report-Audit.md, git-log.txt.
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
