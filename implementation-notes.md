# Cấu trúc automation thực tế

Luồng: JSON → validate-test-data → fixtures setup → thao tác LoginPage/CouponsPage hoặc UI checkout → assertions → Playwright results/HTML/trace → run-matrix tổng hợp.

- `data/shared.json`: user/admin test templates, các giá trị input/expected dùng chung và policy lockout. `fr02/fr09/fr17.json`: scenario records theo IDs đã duyệt. Không có credentials người dùng thật. Dữ liệu generated chỉ resolve templates/offset trong JSON; không đọc code SUT để tính expected.
- `tests/helpers/data.js`: đọc JSON bắt buộc; resolve identifiers/ngày; format hiển thị. Không fallback test data khi thiếu file.
- `tests/fixtures/real-sut.js`: mở SQLite của runtime có owner.json, không import database.js; tạo/xóa account riêng. FR-17 tự cleanup coupon của case trong finally. API login chỉ setup cho admin; main action vẫn qua UI.
- `tests/fixtures/coupon-routes.js`: FR-09 được user chấp nhận ngoại lệ mock own API. Route CartContext module cung cấp cart cho Checkout thật, route auth/apply-coupon từ JSON; abort API ngoài contract và fail nếu có unexpected call. Mọi case khẳng định không checkout/coupon usage.
- `tests/pages/login.js`: fallback scoped input index vì labels SUT không gắn htmlFor/id. `tests/pages/coupons.js`: form/table locators, fill, reload và kiểm tra row. POM không quản lý DB.
- `playwright.config.js`: Chromium/Firefox/WebKit, visible mặc định, retries=0, workers=1; screenshot và trace khi fail. HTML/JSON output riêng run ID; metadata runtime có Run by: 23120352 và ISO timestamp.
- `scripts/start-sut.js`: kiểm tra ports trước startup, copy backend source nguyên trạng và symlink dependencies vào runtime /tmp; giữ PID ownership. Không gọi run_servers.sh của SUT vì file đó killall node và đường dẫn máy khác.
- `scripts/run-matrix.js`: chạy 9 process runner tuần tự; một feature fail vẫn tiếp tục các tổ hợp khác. Ma trận được cập nhật sau từng run; exit 1 nếu có fail, không xóa kết quả cũ.

Giới hạn review: đây là giải thích và self-review của AI, chưa phải human review của sinh viên. Cleanup của fixture không bảo đảm khi process bị kill cứng; runtime disposable cho phép cô lập và tái tạo sau khi dừng đúng owner process. Không thay đổi SUT để làm xanh tests.

## Session 004 — tách hành vi sau human review

Ba spec hiện đăng ký callback riêng theo hành vi; các vòng lặp đăng ký chỉ chứa records cùng chuỗi thao tác/assertions. Không còn dispatcher scenario bên trong callback hoặc helper. FR-02 login là test-scoped fixture; wrongAttempts chỉ lặp một thao tác sai mật khẩu. FR-09 nhóm theo outcome/auth contract. FR-17 coupon/admin-page/seed fixtures sở hữu lifecycle; HTML-only và server rejection được chọn từ expected contract khi đăng ký test, không chọn từ form.checkValidity() quan sát lúc chạy. Helpers createCoupon/persisted luôn thực hiện một luồng cố định.

Chi tiết human feedback, nguyên nhân AI, giới hạn review và regression evidence: session-004-review.md. Giữ nguyên dữ liệu JSON và phạm vi backend thật/mocked. Một ít duplication giữa các hành vi được giữ để người đọc nhìn thấy luồng cụ thể, thay vì tạo một helper điều phối nhiều nhánh.
