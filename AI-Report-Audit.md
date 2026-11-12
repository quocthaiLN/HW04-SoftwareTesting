# AI Audit Report

- Date and time: 2026-11-12T23:11:55+07:00 (Asia/Ho_Chi_Minh)
- User prompt: |
    Session 01:
    - xac dinh scope cua cac tinh nang kiem thu:
    - FR-02: Login and account lockout
    - FR-09: Discount coupons (setup: login + giỏ hàng bằng API) → áp dụng coupon (test chính) (khong kiem tra ket qua thanh toan)
    - FR-17: Coupon management (CRUD) (full CRUD)
    - doc 2026.HW04.Automation Testing_En.pdf sau do liet ke nhung requirements duoc yeu cau (tu de bai, AI audit, log) vao requirements-list.json
- AI output: |
    Tool: OpenAI Codex. Declaration: I use AI tools for the following tasks: đọc và tổng hợp yêu cầu đề, xác định phạm vi kiểm thử, tạo checklist và cập nhật progress/audit.
    Đã tạo checklist JSON 23 mục (22 mandatory, 1 optional Agent Skill), với IDs, nguồn, đầu ra, acceptance criteria và trạng thái. Giữ IDs 1–3 từ placeholder, bổ sung từ 4; dùng JSON theo yêu cầu user.
    FR-02: login UI và khóa sau >=3 lần sai liên tiếp trong 30 giây. FR-09: API setup login/cart, UI apply coupon và discount/final amount; không kiểm tra kết quả thanh toán. FR-17: full CRUD và validation; Update đang có gap vì tài liệu/route đọc được chưa mô tả hỗ trợ.
    Đã ghi requirements cho >=12 cases/feature, external CSV/JSON, >=3 assertion patterns, mỗi feature chạy 3 browsers, HTML Run by StudentID + ISO timestamp, human review, bugs/issues/screenshots, demo thật >=5 phút, audit và critique 200–300 từ, >=8 commits thay đổi test scripts, text Git log, Markdown/PDF và ZIP.
    Chưa chạy tests, chưa tạo evidence runtime. HW04 hiện không phải Git repository nên chưa có commit. Cần sinh viên review checklist và xác nhận HW02/group; không tuyên bố bài nộp hoàn tất.

- Date and time: 2026-11-12T23:26:42+07:00
- User prompt: |
    Session 1
    - Check FR-17 yêu cầu full CRUD, neu sut khong co Update ta se khong thuc hien (chi can note ngan gon vi sao khong co Update)
    - Student ID: 23120352, Name: Le Nguyen Quoc Thai
    - Git: khoi tao git tai submission/ va cac tai lieu can nop se duoc dat tai day va theo doi boi git
    - API setup giỏ hàng FR-09: setup qua mock API request cua playwright
    - Va thuc hien Next best step
- AI output: |
    Tool: OpenAI Codex. Đã kiểm tra UI và backend FR-17 chỉ có Create/Read/Delete; bỏ Update theo user và ghi chú trong scope.md. Cập nhật student 23120352 — Le Nguyen Quoc Thai.
    Frontend cart nằm trong React state, không đọc REST cart; mock /api/cart không thể nạp UI. Thiết kế page.route mock request Vite CartContext module làm fixture; login bằng API thật, coupon API thật, không checkout. Đây là phương án chưa chạy proof-of-concept.
    Tạo test-cases.json 36 cases (12 mỗi feature), scope.md, README và cập nhật checklist/progress cùng Session 001. Khởi tạo Git trong submission/, commit scope/design 6ee2ee9 và commit audit/progress tiếp theo. Export git log text; chưa có public remote.
    Xác minh JSON, traceability, số cases và browser targets; chưa chạy automation, chưa có bug xác nhận runtime. Commit docs không tính vào >=8 test-script commits. Các điểm nghi lỗi source chỉ được ghi là cần kiểm chứng. Bước tiếp theo triển khai fixture proof-of-concept và automation data-driven, sau đó chạy 3 browsers với attribution thật.
