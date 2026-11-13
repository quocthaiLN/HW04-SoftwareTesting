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

- Date and time: 2026-11-13T00:53:21+07:00
- User prompt: |
    Session 3: Sử dụng playwright-skill để thực hiện requirement 6–9; nêu rõ những gì skill chưa đề cập/chưa khớp lộ trình; trình bày kế hoạch chi tiết. Skill được cung cấp đầy đủ trong prompt, nguồn /home/le-nguyen-quoc-thai/.agents/skills/playwright-skill/SKILL.md. Người dùng xác nhận phần chuẩn bị đã hoàn tất và không đưa phần đó vào báo cáo.
- AI output: |
    Tool: OpenAI Codex. I use AI tools for the following tasks: đọc/đối chiếu yêu cầu, skill và source; lập kế hoạch automation REQ-06–09, cập nhật hồ sơ.
    Đã tạo session-003-plan.md: 68 cases data-driven, 3 browsers, 204 executions dự kiến; gap inline data, executor vs runner, /tmp vs Git, browser setup, locator priorities, state/DB, Vite module mock, backend clock, evidence và review. Dùng run.js cho PoC, Playwright Test cho suite; >=3 assertion patterns, external JSON, ma trận và artifacts thực.
    Đã đối chiếu đề và source; Node v24.21.0. detectDevServers chưa chạy được vì thiếu playwright. Source có dấu hiệu login +2/180 giây và DB reset startup; chưa runtime nên không tuyên bố bug. Chưa cài dependency, viết test hoặc chạy browser. Cập nhật progress/checklist planning_reference, giữ REQ-06–09 NOT START triển khai. Không sửa dữ liệu test được duyệt hoặc thay đổi/xóa file có sẵn; chưa commit thay đổi lẫn với người dùng.

- Date and time: 2026-11-13T14:16:01+07:00
- User prompt: |
    Session 3:
    - Thuc hien requirement 5 voi skill moi
    - Phan tich skill playwright-cli (submission/skills/.agents/skills/playwright-cli/), playwright-core (submission/skills/.agents/skills/playwright-core/), playwright-pom (submission/skills/.agents/skills/playwright-pom/) de thuc hien requirement 6-9
      - Neu ro nhung gi skill chua de cap hoac chua khop voi lo trinh thuc hien hien tai
      - Trinh bay ke hoach chi tiet de thuc hien requirement 6-9
- AI output: |
    Tool: OpenAI Codex. I use AI tools for the following tasks: đọc/phân tích skill, chuẩn bị workflow và điều chỉnh kế hoạch requirements 5–9.
    Đọc ba SKILL.md và guides liên quan. Bổ sung preparation-notes.md; cập nhật REQ-05 DONE dựa trên xác nhận sinh viên trước đó, không tuyên bố AI đã đọc bài giảng vì workspace chưa có. Không tự thêm mục REQ-05 vào main report.
    Kế hoạch mới: CLI snapshot/discovery/debug → Core Playwright Test với external JSON/fixtures/assertions/3 browser projects → POM có chọn lọc cho UI, không đặt DB lifecycle trong POM. Nêu xung đột cấm mock own API với FR-09 và giữ scope user; inline data trái đề, retry/trace defaults, state leakage, clock backend, networkidle, cleanup khi process chết, global latest và link ../core sai đường dẫn.
    Giữ 68 cases/204 lượt dự kiến, 9 tổ hợp; baseline retries=0, trace retain-on-failure; 10 bước triển khai, files/inventory/acceptance/Git milestones trong session-003-plan.md. Chưa cài dependencies, chạy CLI/browser hoặc tạo runtime evidence; REQ-06–09 chưa triển khai. Cập nhật checklist/progress/audit và commit tài liệu riêng, không stage thay đổi/xóa file có sẵn của sinh viên.

- Date and time: 2026-11-13T14:36:45+07:00
- User prompt: |
    1. Giu ngoai le
    2. Yeu cau de bai la test data phai co trong file json/csv rieng, tuyet doi khong hardcode
    3. Dong y cac phan con lai
- AI output: |
    Tool: OpenAI Codex. Ghi nhận giữ ngoại lệ FR-09 và chấp nhận các phần còn lại của kế hoạch. Cập nhật REQ-07: toàn bộ test data JSON/CSV riêng, không hardcode trong spec/fixtures/helpers/POM/PoC; dữ liệu động resolve từ quy tắc/template bên ngoài, không fallback hardcode. Bổ sung nghiệm thu validator và review nguồn dữ liệu. Cập nhật kế hoạch/checklist/progress/audit; chưa chạy browser/tests trong lượt chốt quyết định.

- Date and time: 2026-11-13T15:06:04+07:00
- User prompt: |
    Bat dau thuc hien ke hoach
- AI output: |
    Tool: OpenAI Codex. I use AI tools for the following tasks: triển khai automation theo playwright-cli/core/pom, tạo dữ liệu JSON, fixtures/POM/helpers/config/runner, chạy và phân tích tests, cập nhật hồ sơ.
    Cài local Playwright Test1.65.0/CLI0.1.24, mở Chromium/Firefox/WebKit; dùng backend source copy nguyên trạng/DB riêng vì database.js reset bảng. Không dùng run_servers.sh killall node. WebKit thiếu libs/sudo yêu cầu mật khẩu; tải/extract libs vào /tmp và dùng launcher với binary gốc. CLI snapshots login/checkout/admin login; PoC FR-09 pass ba engines.
    Đã automate đủ 68 cases/204 registrations, external shared/per-feature JSON, validator, >=3 assertion patterns. 9 commits thay đổi spec có ý nghĩa. Matrix final 9 tổ hợp: 150 pass/54 fail/0 skipped, 9 nhóm lỗi runtime. FR-09 chỉ UI mock; FR-02/17 thật, không checkout hoặc direct endpoint security tests.
    Batch đầu giữ nguyên149pass/55fail, gồm một WebKit actionability timeout chưa gọi lỗi SUT. Self-review siết currency substring thành exact text và sửa title HTML có attribution/ISO runtime; chạy final trên code chốt. Mở 9 reports cục bộ để xác minh/chụp screenshot. Automatic approval review từ chối broad localhost artifacts server vì rủi ro trace credentials/tokens; dùng local file inspection thành công, không bypass bằng server khác.
    Cập nhật checklist6–10 DONE theo evidence, test cases per-browser results, README/scope/progress/audit và tài liệu chạy/giải thích/defects. Không tự nhận student human review, GitHub publication/Issues/PDF/video hoặc toàn bộ bài nộp hoàn tất. Giữ thay đổi/xóa file sẵn có.

- Date and time: 2026-11-13T15:10:10+07:00
- User prompt: |
    Tổng kết session 3
- AI output: |
    Tool: OpenAI Codex. Đã tổng kết cùng Session 003 tại session-003-summary.md và PROGRESS.md. REQ-06–10 DONE, 68 cases/204 executions/9 runs, 150pass/54fail/0skipped; 9 HTML reports verified và 9 nhóm lỗi runtime. FR-09 chỉ UI mocked. Giữ riêng batch đầu149/55 có một WebKit timeout. Có9 qualifying spec commits; evidence2866501/log282c750.
    Đối chiếu checklist: REQ-12/14/18/19 IN PROGRESS vì có local outputs nhưng thiếu phần còn lại; REQ-17 DONE theo log export; REQ-16 còn chờ public remote. Subject282c750 ghi REQ-19 nhưng nội dung thuộc REQ-17, ghi correction không rewrite history. Human review, Issues/publication, PDF/main report, critique/video, tự chấm/đóng gói còn chờ. Không chạy tests lại; cập nhật audit/checklist/progress/Git log và commit docs-only; giữ thay đổi sinh viên có sẵn.

- Date and time: 2026-11-13T15:34:23+07:00
- User prompt: |
    Giai thich cau truc bo test: Data duoc luu o dau, su dung nhu the nao; Script chay test chinh; Ket qua duoc xuat tai dau; Va cac thanh phan khac tao nen bo test.
- AI output: |
    Tool: OpenAI Codex. Đối chiếu package/config, helpers/specs, matrix/summarizer và tài liệu hiện tại. Giải thích JSON → helper → fixture → UI/POM → assertions → reports; phân biệt npm test (Playwright) với npm run matrix (9 tổ hợp), SUT chạy riêng. Chỉ rõ artifacts theo run/batch, HTML/JSON/log/trace/screenshot và script tổng hợp riêng. Ví dụ FR-09-TC01 dùng input/response/expected ngoài JSON; nêu giới hạn UI mocked. Không chạy lại tests hoặc thay đổi code test.

- Date and time: 2026-11-13T16:33:13+07:00
- User prompt: |
    Session 4: Requirements 11: mã nguồn hiện tại của script điều phối chạy test đang rơi vào anti pattern Conditional Test Logic (theo xUnit Test Patterns (Meszaros)). Giữ data-driven cho các kịch bản cùng hình dạng, tách test riêng cho các kịch bản khác hành vi. Ví dụ chỉ là gợi ý và cần đánh giá cách triển khai phù hợp.
- AI output: |
    Tool: OpenAI Codex. Áp dụng task-planning, playwright-core/pom và implementation-explain. Phát hiện dispatcher cả3specs và FR17 chọn nhánh theo validity thực tế. Refactor callback theo hành vi, nhóm homogeneous records lúc đăng ký; không chuyển dispatcher sang helper. Fixture login/coupon/admin/seed quản lý lifecycle; helper chỉ luồng cố định. JSON và SUT không đổi. REQ11 IN PROGRESS theo feedback human thật, không nhận đã review hết outputs.
    Commit code3cd7cc6; review/comparison af7b682. Validate và exact enumeration68 IDs×3 đạt. Batch session004-refactor 9runs/204executions:150pass54fail0skip; so từng ID/browser với session003-final:0 khác biệt status. Lỗi SUT giữ expected. DB cleanup2users4coupons seed, dừng owner PID. Lưu matrix/summary/comparison/HTML/logs/attachments mới, giữ nguyên evidence Session003; không tuyên bố browser-verify HTML mới. Tài liệu session-004-review.md ghi nguyên nhân AI, thay đổi, giới hạn, gaps. Giữ thay đổi/xóa file có sẵn của sinh viên.

- Date and time: 2026-11-13T16:40:44+07:00
- User prompt: |
    Dong y voi chinh sua nay, tong ket session 4
- AI output: |
    Tool: OpenAI Codex. Ghi nhận sinh viên đồng ý refactor Conditional Test Logic; tổng kết Session004 trong session-004-summary.md và cập nhật review/progress/checklist. Hạng mục sửa đã được chấp nhận; REQ11 tổng thể IN PROGRESS vì chưa xác nhận review mọi output. Kết quả đã chạy:68cases204executions150pass54fail0skip,204 ID/browser keys khớp baseline0status differences. Không chạy tests lại; giữ evidence Session003/004 riêng, source/data SUT và thay đổi sinh viên. Xuất Git log và commit docs-only. Các bước report/publication/PDF/video/đóng gói còn chờ.

- Date and time: 2026-11-13T16:50:15+07:00
- User prompt: |
    Hoan thanh requirement nay chua?
- AI output: |
    Tool: OpenAI Codex. Trả lời REQ-11 còn IN PROGRESS ở thời điểm hỏi: refactor Conditional Test Logic đã chấp nhận, còn xác nhận review selectors/assertions/waits/missing cases/gap analysis.

- Date and time: 2026-11-13T16:50:15+07:00
- User prompt: |
    Dong y voi cac thanh phan selectors, assertions, waits, missing cases và gap analysis do da duoc toi bo sung o phan testcase design roi
- AI output: |
    Tool: OpenAI Codex. Ghi nhận xác nhận human review của sinh viên đối với các thành phần còn lại và testcase design. Cập nhật REQ-11 DONE, reconcile summary/review/progress/checklist; giữ lịch sử IN PROGRESS có chú thích. Không sửa hoặc chạy lại suite, không mở rộng coverage. Commit tài liệu và xuất Git log; giữ user changes có sẵn.


- Date and time: 2026-11-13T17:11:43+07:00
- User prompt: |
    Session 5:

    - Thuc hien requirement 12
- AI output: |
    Tool: OpenAI Codex; áp dụng task-planning. Đọc repo instructions/policies/đề gốc và evidence Session003/004. Hoàn thiện 9 bug reports tự chứa (steps, input, expected, actual, proposed severity, evidence limits); tạo GitHub Issues #1–#9 trên quocthaiLN/HW04-SoftwareTesting qua browser đã đăng nhập, upload mỗi Issue một screenshot runner gốc và UI-verify ảnh. Lưu ảnh danh sách và manifest case/browser/issue/attachment/SHA256; 18caseIDs×3=54failures mapping đủ 9groups. Tách timeout WebKit và lỗi AI test/report khỏi SUT defects. Không chạy lại tests/sửa SUT/đổi expected; baseline150pass54fail0skip giữ nguyên. REQ-12 DONE; README/automation-report/checklist/progress cập nhật, commit docs/evidence riêng và xuất log thật. Giới hạn BUG06 ảnh sau alert, BUG07–09 row ngoài viewport đã ghi ngay trên Issues; runner/trace xác minh chi tiết. Public remote/PDF/video và yêu cầu khác vẫn tách riêng, không tự đánh DONE. Giữ thay đổi sinh viên có sẵn.

- Date and time: 2026-11-13T17:24:42+07:00
- User prompt: |
    Session 5
    - Lam sach thu muc submission
      - Loai bo cac file session-00x-<name>.md, implementation-notes.md, assertion-inventory.md
      - Loai bo cac artifact cua session 3, chi su dung cac artifact cua session 4
      - Tao file main report .md
- AI output: |
    Tool: OpenAI Codex. Xóa tài liệu phiên và artifact Session003/PoC/smoke; giữ runtime Session004 và evidence publication Session005. Gom nội dung kiến trúc/assertions/review/gaps vào main-report.md; cập nhật test-cases bằng record Session004 thật, local BUG screenshots bằng ảnh runner Session004, giữ riêng hash ảnh upload GitHub cũ. Cập nhật current links/README/automation report/checklist; audit/progress giữ lịch sử. Mở 9 HTML Session004 xác minh attribution/ISO đạt; validate và mapping/link/hash checks. Không sửa SUT hoặc tạo kết quả mới. Commit cleanup/report và xuất log; PDF/video và các yêu cầu khác chưa tự đánh hoàn tất.

- Date and time: 2026-11-13T17:35:40+07:00
- User prompt: |
    Session 5: Cap nhat main report co cau truc nhu sau
    Trang bìa/thông tin chung;1Executive Summary;2Feature selection;3Environment/architecture;4AI-First với skill playwright;5Mỗi feature có mô tả,>=12cases,data,code,results,reports,ảnh,gaps,bugs;6Human review (không có selector/assertion/wait/data/browser issues, thiếuBVA do sinh viên bổ sung), before/after,tỷ lệgiữ/sửa;7Bug Report;8Video thực hiện sau;9Agent Skill;10Git log pretty;11Self-assessment100/100;12Kết luận để sau.
- AI output: |
    Tool: OpenAI Codex. Đối chiếu4SKILL.md CLI/Core/POM/QA và code/data/Git/evidence thật; tổ chức main-report.md đủ12mục+cover+Appendix. Tạo68case rows,3feature×7subsections,ảnhreports/bugs,9Issues;10commits chạm.spec.js. Đo tokenSequenceMatcher baseline676a70e/current để nêu giữ/sửa có phương pháp; giữ lịch sử AI self-review tách review cuối sinh viên. Điểm100theo yêu cầu, nêu video/demo còn thiếu; không đánh checklistDONE theo điểm. Ngày nộp/YouTube/video/AI Critique/kết luận để sau. Tạo git_log.txtpretty, READMEđồng bộ. Kiểm tra12sections/68rows/currentlinks đạt; không rerun SUT.
