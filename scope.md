# HW04 — Scope và thiết kế kiểm thử

Student: **23120352 — Le Nguyen Quoc Thai**. Session 001, 2026-11-12.

## Phạm vi (requirements 1–4)

| Feature | Kiểm thử chính | Không thuộc phạm vi |
| --- | --- | --- |
| FR-02 (Pool A) | Web login, email validation, token, counter, khóa sau 3 lần sai / 30 giây | Registration, reset password |
| FR-09 (Pool B) | Web apply coupon: C1–C5 và discount/final amount | Kết quả thanh toán, tạo order |
| FR-17 (Pool C) | Admin Create/Read/Delete và validation | Update: SUT không có UI hoặc API sửa coupon, nên không thực hiện theo chỉ đạo sinh viên |

Nguồn kiểm tra FR-17: `../eshop-sut/frontend-admin/src/App.jsx:612–777` chỉ có form tạo, bảng xem và nút Xóa; `../eshop-sut/backend/server.js:355–360,456–488` chỉ có GET/POST/DELETE coupon. `../eshop-sut/README.md` FR-17 và `../eshop-sut/api_specification.md` §6.4 thống nhất phạm vi này. Đây là kiểm tra source, chưa phải evidence chạy UI.

## Fixture FR-09

`CartContext.jsx` giữ giỏ hàng trong React useState, không gọi GET `/api/cart`; mock endpoint đơn thuần không nạp được UI. POST `/api/cart` chỉ cập nhật backend cart, không đồng bộ state React.

Quyết định cuối Session 001: **FR-09 mock hoàn toàn bằng Playwright `page.route()`**, gồm login/auth, giỏ hàng và response áp dụng coupon. Quyết định này thay thế phương án login/coupon backend thật ở các trao đổi trước. FR-02 và FR-17 vẫn kiểm thử SUT thật.

1. Đăng ký routes trước navigation; mock login và `/api/users/me`, chuẩn bị token giả phù hợp frontend. Nếu cần UI login để tạo auth state, response login cũng được fulfill bằng route, không dùng APIRequestContext gọi backend.
2. Mock request Vite module `/src/context/CartContext.jsx` (kể cả query), giữ exports CartProvider/useCart và khởi tạo cart từ JSON. Frontend không gọi REST cart nên chỉ mock `/api/cart` sẽ không đủ. Phương án module này phụ thuộc dev server Vite và cần proof-of-concept.
3. Mock `/api/apply-coupon` theo từng fixture JSON (success/error); click Áp dụng và assert request payload, UI lỗi hoặc discount/final amount. Expected response được thiết kế độc lập theo yêu cầu. Không xem việc mock trả đúng số tiền là bằng chứng backend tính đúng.
4. Assert cart và tổng tiền trước apply; không click thanh toán. Case quota/auth/expiry dùng response fixture, không seed DB hoặc chạy checkout.
5. Kết quả FR-09 chỉ chứng minh hành vi UI với API giả lập; không chứng minh backend thực thi C1–C5 hoặc công thức giảm giá. Không ghi lỗi backend từ mock là bug SUT. Báo cáo phải công khai giới hạn coverage này; chưa có xác nhận của giảng viên rằng mock toàn phần đáp ứng mức end-to-end mong đợi của đề.

Chưa triển khai hoặc chạy fixture. Case FR-09 trong JSON là thiết kế điều kiện và expected UI; precondition coupon/user/usage được mô phỏng bằng route fixtures.

## Thiết kế test (requirements 6–9)

`test-cases.json` có 44 records: FR-02 có 14, FR-09 có 18 (17 DESIGNED, 1 pending), FR-17 có 12; mỗi case dự kiến chạy Chromium/Firefox/WebKit (132 case executions nếu chốt toàn bộ 44 cases; hiện 129 cho 43 cases DESIGNED, 9 feature-browser combinations). Status DESIGNED không đồng nghĩa automated/passed. Dữ liệu JSON này là thiết kế; lúc triển khai phải bổ sung giá trị input/fixture cụ thể vào JSON riêng, không hardcode data vào scripts.

Ba nhóm assertion dự kiến: DOM state/visibility (lỗi, nút, dòng coupon), text/value hoặc numeric equality (số tiền/fields), URL/attribute/storage/network contract (navigation, type=email, token/header). Counter và persistence có thêm read-only DB/API assertions hỗ trợ; hành động chính vẫn là UI. Chọn locator theo role/placeholder và scope form/table row; label hiện chưa gắn htmlFor nên không mặc định getByLabel hoạt động.

Đọc source thấy các điểm cần kiểm chứng thực thi: login counter tăng 2, thời gian khóa 180 giây, email type=text; coupon dùng > thay vì >= và công thức percent khác README. Đây là nghi vấn từ static review, chưa phải bug được xác nhận bằng runtime; không tạo report/screenshot giả. Expected results trong cases dựa yêu cầu, không dựa lỗi implementation.

## Chưa xác nhận

Sinh viên đã xác nhận ba tính năng tương ứng HW02 và không trùng thành viên nhóm. Còn chờ public GitHub remote; bài giảng/AI review của sinh viên. Chưa có automation scripts, run reports, video, PDF hoặc submission hoàn chỉnh.

## Session 002 — Requirement 2

Sinh viên chấp nhận nguyên vẹn FR-02-TC01–TC12. Bổ sung TC13 kiểm tra mật khẩu được che bằng dấu chấm (type=password, giữ giá trị nhập; không submit), TC14 kiểm tra URL /login, tiêu đề Đăng nhập và form/nút Sign In hiển thị. Đây là hai tiêu chí do sinh viên bổ sung. TC13 cần quan sát trực quan khi chạy bên cạnh assertion type=password; glyph che cụ thể phụ thuộc browser/nền tảng.

Static review `../eshop-sut/frontend-web/src/pages/Login.jsx` cho thấy heading là Đăng Ký và password input có type=text. Đây là nghi vấn cần xác minh runtime, chưa phải bug đã chạy và chưa có screenshot. Requirement 2 hoàn thành ở mức scope/thiết kế; automation và execution theo dõi riêng ở requirements 6–10. Requirement 3 và 4 vẫn chờ review Session 002.

## Session 002 — Requirement 3

Giữ nguyên 12 cases FR-09 được user chấp nhận. Thêm TC13–TC18; TC18 chỉ chốt bất biến final_amount >=0, còn chờ cap/reject nên chưa sẵn sàng automate. Mapping và các quyết định cần xác nhận nằm tại fr09-case-review.md. REQ-03 vẫn IN PROGRESS. Chỉ kiểm thử UI với page.route, không kiểm chứng công thức backend. Tài liệu tham khảo chứa kết quả chạy của nguồn gửi vào, không phải evidence thực thi của bài này.
