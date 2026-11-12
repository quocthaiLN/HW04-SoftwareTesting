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

Phương án triển khai ở bước automation:

1. Login bằng Playwright `request.post('/api/login')` tới backend thật; đưa token vào browser localStorage trước khi mở trang. Chờ `/api/users/me` xác nhận auth sẵn sàng.
2. Cài `page.route` trước navigation, match chính xác Vite module `/src/context/CartContext.jsx` (kể cả query). Fulfill module fixture giữ cùng exports CartProvider/useCart; khởi tạo cart từ JSON test data. Chỉ áp dụng cho dev server Vite và test FR-09. Đây là mock module request để setup React state, không phải mock REST cart đã được SUT sử dụng. Nếu chuyển sang production build cần đổi fixture, không coi setup này portable.
3. Assert danh sách hàng và tổng trước khi apply. Cài fixture trước khi Checkout mount vì editableTotal chỉ nhận cartTotal lúc khởi tạo.
4. `/api/apply-coupon` phải đi backend thật; click Áp dụng và assert số tiền/error trên UI. Không fulfill response coupon. Không click thanh toán hoặc gọi checkout/usage để thực hiện flow chính.
5. Seed coupon/usage bằng DB fixture cục bộ trước case, cleanup sau case; usage đã dùng là precondition, không phải evidence checkout. Mỗi worker/browser có account/code riêng; nếu chưa có isolation DB thì chạy serial.

Cần proof-of-concept fixture này trước khi mở rộng scripts; hiện mới là thiết kế, chưa khẳng định đã hoạt động.

## Thiết kế test (requirements 6–9)

`test-cases.json` có 36 case: 12 mỗi feature; mỗi case dự kiến chạy Chromium/Firefox/WebKit (108 case executions, 9 feature-browser combinations). Status DESIGNED không đồng nghĩa automated/passed. Dữ liệu JSON này là thiết kế; lúc triển khai phải bổ sung giá trị input/fixture cụ thể vào JSON riêng, không hardcode data vào scripts.

Ba nhóm assertion dự kiến: DOM state/visibility (lỗi, nút, dòng coupon), text/value hoặc numeric equality (số tiền/fields), URL/attribute/storage/network contract (navigation, type=email, token/header). Counter và persistence có thêm read-only DB/API assertions hỗ trợ; hành động chính vẫn là UI. Chọn locator theo role/placeholder và scope form/table row; label hiện chưa gắn htmlFor nên không mặc định getByLabel hoạt động.

Đọc source thấy các điểm cần kiểm chứng thực thi: login counter tăng 2, thời gian khóa 180 giây, email type=text; coupon dùng > thay vì >= và công thức percent khác README. Đây là nghi vấn từ static review, chưa phải bug được xác nhận bằng runtime; không tạo report/screenshot giả. Expected results trong cases dựa yêu cầu, không dựa lỗi implementation.

## Chưa xác nhận

Lựa chọn tương ứng HW02 và không trùng thành viên nhóm; public GitHub remote; bài giảng/AI review của sinh viên. Chưa có automation scripts, run reports, video, PDF hoặc submission hoàn chỉnh.
