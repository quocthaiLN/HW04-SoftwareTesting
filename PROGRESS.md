# Session Log

## Session 001
- Date: 2026-11-12 (Asia/Ho_Chi_Minh)
- Goal: Trích yêu cầu HW04, xác định scope FR-02/09/17; xác minh SUT, thiết kế cases và khởi tạo Git trong submission/.
- Completed: Đọc đề PDF 8 trang, policies và SUT sources. Checklist 23 mục (22 mandatory, 1 optional); giữ IDs. Xác nhận sinh viên 23120352 — Le Nguyen Quoc Thai. FR-17 không có Update; loại khỏi scope theo user (ID 4). Thiết kế 36 cases, 12/feature (IDs 2–9). Đề xuất mock Vite CartContext request vì REST cart không được frontend đọc; login/coupon backend thật (ID 3). Tạo README, scope và Git repository cục bộ (IDs 16,19).
- Verification run: Parse hai JSON; IDs cases duy nhất, 12/feature, mỗi case map requirement IDs và 3 browsers. Source inspection UI/backend xác nhận không có Update coupon và cart chỉ trong React state. Chưa chạy automation hoặc proof-of-concept mock fixture. Không có runtime bug/report.
- Commits: 6ee2ee9 [REQ-02,03,04,06,16] Define scoped features and 36 UI test cases; commit tiếp theo ghi audit/progress (xem git-log.txt). Các commit tài liệu không tính vào >=8 test-script commits.
- Files or artifacts updated: requirements-list.json, scope.md, test-cases.json, README.md, .gitignore, PROGRESS.md, AI-Report-Audit.md, git-log.txt; AGENTS.md/policies.md được đưa vào Git.
- Known risk or unresolved issue: Chưa xác nhận HW02/group uniqueness; chưa có public GitHub remote; mock module fixture mới là thiết kế, phụ thuộc Vite dev server. Chưa có scripts/HTML/PDF/video, chưa human review. Git log là snapshot tại thời điểm export, cần xuất lại trước nộp.
- Next best step: Triển khai proof-of-concept Playwright FR-09 fixture và một case apply coupon qua backend thật; sau đó xây data-driven scripts theo test-cases.json, xác minh lockout và CRUD qua runtime. Commit từng bước test-script có ý nghĩa; cấu hình 3 browsers và HTML attribution 23120352 + ISO timestamp. Xác nhận HW02/group và public remote trước hoàn tất bài nộp.
