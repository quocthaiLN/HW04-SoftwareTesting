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

- Date and time: 2026-11-12T23:38:21+07:00
- User prompt: |
    Sesssion 1:
    - Xac nhan su dung Mock hoàn toàn bằng `page.route()`
    - xác nhận HW02/group la uniqueness
    - Tong ket session 01
- AI output: |
    Tool: OpenAI Codex. Đã cập nhật quyết định cuối Session 001: FR-09 mock hoàn toàn login/auth, cart và apply-coupon bằng page.route(), thay thế phương án backend thật trước đó; FR-02/FR-17 vẫn dùng SUT thật. Mock cart cần bridge module CartContext vì frontend không đọc REST cart. Evidence FR-09 chỉ chứng minh UI với API giả lập, không xác nhận backend C1–C5 hoặc phép tính.
    Ghi nhận sinh viên xác nhận ba feature tương ứng HW02 và không trùng nhóm; requirement 1 DONE theo xác nhận này. Giữ FR-17 Create/Read/Delete, bỏ Update vì không hỗ trợ. Cập nhật scope, checklist, cases metadata, README, PROGRESS và audit; tổng kết cùng Session 001, không mở session mới.
    Đầu ra phiên: 23 requirements, 36 cases thiết kế (12/feature), Git cục bộ trong submission/. Chưa chạy automation; chưa có runtime bug, HTML/PDF/video hoặc public remote. Bước tiếp theo là triển khai proof-of-concept route fixtures và data-driven scripts. Commit tổng kết là commit tài liệu, không tính vào >=8 test-script commits.

- Date and time: 2026-11-12T23:51:57+07:00
- User prompt: |
    Session 2:
    - Thuc hien requirements 2, 3, 4
    - Dau tien la requirement 2:
      - Chap nhan 12 test case hien tai
      - Bo sung test case: mat khau phai duoc an bang dau cham thay vi hien thi nhu plantext, giao dien phai hien thi dung la dang o trang Đăng nhập
- AI output: |
    Tool: OpenAI Codex. Giữ nguyên FR-02-TC01–TC12; bổ sung TC13 kiểm tra che mật khẩu và TC14 nhận diện trang Đăng nhập. Tổng 38 cases thiết kế: 14/12/12; dự kiến 114 executions. Cập nhật scope, checklist, README và Session 002 progress. REQ-02 DONE chỉ ở mức scope/thiết kế, automation chưa thực hiện.
    Static review Login.jsx thấy heading Đăng Ký và password type=text; chưa chạy runtime, chưa tuyên bố bug được xác nhận. JSON/traceability và so sánh 12 cases cũ được xác minh. Requirements 3/4 vẫn chờ bước review tiếp theo của cùng session. Commit thiết kế không tính vào >=8 test-script commits.

- Date and time: 2026-11-13T00:03:50+07:00 (thời điểm ghi audit cho chuỗi trao đổi)
- User prompt: |
    Session 2: Requirement 3 — Chap nhan 12 test case hien tai; Bo sung: de trong coupons, coupon chua khoan trang, gia tien duoc giam khong < 0
- AI output: |
    Tool: OpenAI Codex. Đã kiểm tra source; diễn giải ban đầu discount_amount >=0; chưa sửa file trước khi bị ngắt.

- Date and time: 2026-11-13T00:03:50+07:00 (thời điểm ghi audit cho chuỗi trao đổi)
- User prompt: |
    Session 2: Requirement 3 — Chap nhan 12 test case hien tai; Bo sung: de trong coupons, coupon chua khoan trang, gia tien sau khi ap dung khong < 0
- AI output: |
    Tool: OpenAI Codex. Đã sửa diễn giải thành final_amount >=0 theo user. Chưa sửa file trước khi bị ngắt.

- Date and time: 2026-11-13T00:03:50+07:00 (thời điểm ghi audit cho chuỗi trao đổi)
- User prompt: |
    Session 2: Requirment 3 — Chap nhan 12 testcase hien tai; Tham khao danh sach testcase sau va bo sung nhung edge case chua co, dong thoi dua ra nhung testcase can xem xet va xac nhan. Tệp đính kèm được lưu nguyên văn tại references/fr09-user-testcases.txt.
- AI output: |
    Tool: OpenAI Codex. Đã giữ 12 cases, thêm TC13–TC18; TC18 chờ cap/reject. Mapping 21 cases nguồn và Q1–Q6 tại fr09-case-review.md; 44 records toàn suite, 43 DESIGNED và 1 pending. Cập nhật checklist/progress/scope/README; REQ-03 IN PROGRESS. Kiểm tra JSON, IDs, browser targets và giữ nguyên 38 cases cũ; chưa chạy runtime. Kết quả nguồn không dùng làm evidence suite. Commit thiết kế và export log; docs/data không tính vào 8 test-script commits.

- Date and time: 2026-11-13T00:12:20+07:00
- User prompt: |
    1. chặn trần mức giảm bằng tổng tiền, trả **0**
    2. chỉ payload.
    3. Dong y
    4. Khong (do ngoai tong tien la cua API thanh toan), ta chi test ket qua cua coupon
    5. Dong y, nhung nghiep vu tren ngoai scope hien tai
- AI output: |
    Tool: OpenAI Codex. Chốt TC18 cap discount=80000/final=0 cho tổng 80000 và fixed 100000; chuyển DESIGNED. Thêm TC19 floor percent: 333333*10/100 thành discount=33333, final=300000. Chỉ assert normalization payload. Không thêm tổng 0/âm, khoảng trắng giữa mã hoặc nghiệp vụ ngoài scope. REQ-03 DONE phần thiết kế; 45 DESIGNED toàn suite, dự kiến 135 executions. Cập nhật review, checklist, scope, README và Session 002 progress; xác minh JSON/oracles/cases cũ, chưa chạy automation/runtime. Mock không chứng minh backend cap/floor. Commit thiết kế và export Git log; tiếp theo review REQ-04.

- Date and time: 2026-11-13T00:16:47+07:00
- User prompt: |
    Session 2
    - Requirement 4:
      - Tham khao cac testcase sau va bo sung vao danh sach testcase hien tai
    Tệp nguồn lưu nguyên văn tại references/fr17-user-testcases.txt.
- AI output: |
    Tool: OpenAI Codex. Giữ nguyên 12 cases FR-17, thêm 19 cases TC13–TC31. Đối chiếu 27 EP và 25 BVA trong fr17-case-review.md; tách API-only khỏi UI suite, ghi Q1–Q6 cần xem xét thay vì tự đặt policy. FR-17 có 31 cases, toàn suite 64 DESIGNED (14/19/31), dự kiến 192 executions. Phát hiện mâu thuẫn code alphabet với dấu _ trong nguồn; chuỗi length 30 được xác minh đúng 30 sau khi sửa nhận định đếm ban đầu. FR-24 chỉ yêu cầu dialog xóa item khỏi giỏ, chưa đủ áp cho coupon. Cập nhật checklist/scope/progress/README và Git; REQ-04 IN PROGRESS. Xác minh JSON, IDs, giữ nguyên cases cũ, traceability và mapping; chưa chạy runtime, không sao chép Pass/Fail nguồn thành evidence.

- Date and time: 2026-11-13T00:21:26+07:00
- User prompt: |
    1. Khong
    2. Loai bo testcase nay vi spec khong yeu cau
    3. Co
    4. Loai bo testcase nay
    5. Co
    6. Co
- AI output: |
    Tool: OpenAI Codex. Chốt REQ-04 theo xác nhận: không dialog, loại code format/length và used-coupon deletion; retire TC30/31. Percent nguyên 1–100, thêm TC32–35 và pin TC08/09 type=percent. Cụ thể hóa TC05 duplicate HTTP 400/409 + thông báo thân thiện, không SQL/stack trace. Thêm TC36/37 quyền user thường/không token qua UI. FR-17 có 35 cases; toàn suite 68 DESIGNED, dự kiến 204 executions. REQ-04 DONE phần thiết kế; cập nhật review/scope/checklist/progress/README, xác minh dữ liệu và diff, commit và export log. Chưa chạy automation/runtime; UI quyền không chứng minh endpoint role enforcement.

- Date and time: 2026-11-13T00:23:25+07:00
- User prompt: |
    tong ket session 3
- AI output: |
    Tool: OpenAI Codex. Tổng kết phần việc của chat đang ghi Session 002, đồng thời ghi nhận user gọi phần tổng kết là Session 3; giữ lịch sử session nhất quán. Requirements 2–4 DONE phần thiết kế; FR-02/09/17 tương ứng 14/19/35 cases, tổng 68 DESIGNED, dự kiến 204 executions trên 3 browsers. Chốt cap/floor/normalization FR-09 và percent/duplicate/UI permission FR-17; TC30/31 retired. Đã xác minh dữ liệu/Git status và cập nhật tổng kết progress/audit, commit và export Git log. Chưa có automation/runtime evidence/HTML/PDF/video/public remote; docs/data commits không tính vào 8 test-script commits. Bước tiếp theo REQ-06–10, bắt đầu proof-of-concept fixture FR-09.
