# Session 004 — REQ-11 human review: Conditional Test Logic

## Phản hồi của sinh viên và nguyên nhân

Sinh viên chỉ ra Conditional Test Logic theo xUnit Test Patterns (Meszaros): data-driven được dùng cả cho các kịch bản khác hành vi. Đây là phản hồi human review thực tế; phần refactor và kiểm chứng sau đó do AI thực hiện. Chưa suy rộng thành xác nhận sinh viên đã review mọi AI output.

AI trước đó ưu tiên một vòng lặp/dispatcher cho mỗi feature. Vì vậy test chọn hành động và assertion bằng scenario, và FR-17 còn chọn nhánh theo checkValidity() thực tế. Nguyên nhân thuộc cách AI tổ chức code, không phải yêu cầu data-driven hoặc lỗi SUT. Chuyển nguyên dispatcher sang helper sẽ không xử lý nguyên nhân này.

## Kế hoạch và tiêu chí

- Giữ 68 IDs, ba browser projects, JSON input/expected và scope đã chốt; không sửa SUT hay expected để xanh tests.
- Tách callback theo hành vi; chỉ lặp dữ liệu khi cùng chuỗi hành động/assertions.
- Helper chia sẻ thao tác cố định; fixture sở hữu setup/cleanup, không chọn assertion theo scenario.
- FR-02: success, wrong/missing credentials, từng validation control, mask, heading, two-then-success, unlock, reset và JWT là các callback riêng. Lock/lock-deadline hiện cùng chuỗi bước và oracle nên giữ một nhóm data-driven. wrong khác missing vì có thêm kiểm tra DB counter.
- FR-09: nhóm theo success/error/empty và auth valid/invalid/absent; mỗi nhóm có một callback cố định. Chấp nhận một ít duplication để dễ đọc và review.
- FR-17: create data-driven; read/delete/duplicate/uppercase/reset có callback riêng. reject tách HTML-only/server validation từ contract JSON lúc đăng ký, không dựa trạng thái SUT quan sát được. User/anonymous riêng.
- scripts/run-matrix.js vẫn điều phối feature × browser; vòng lặp process và phân loại kết quả không phải nhánh hành vi nghiệp vụ trong test nên giữ nguyên.
- Xác minh: validate JSON; enumerate đủ204; kiểm tra code; chạy batch mới và so từng feature/browser/ID với session003-final, không chỉ tổng counts.

## Thay đổi thực tế

- tests/fr02-login.spec.js: test-scoped login fixture; authenticated/wrongAttempts chỉ có luồng cố định. Vòng lặp wrongAttempts là lặp cùng thao tác theo số lần từ shared JSON.
- tests/fr09-apply-coupon.spec.js: nhóm callback tường minh, giữ mock exception và payload/auth assertions.
- tests/fr17-coupons.spec.js: coupon fixture cleanup trong finally, admin page fixture, seededCoupon fixture cho read/delete/duplicate; helpers createCoupon/persisted không nhận scenario để dispatch.
- scripts/compare-matrices.js: kiểm tra matrix hoàn tất, coverage không thiếu/trùng ID và so status bằng key feature/browser/ID.
- Request listeners còn if để lọc traffic, mock fixture còn endpoint dispatch; chúng không quyết định hành vi/assertion của test.

## Giới hạn và gap review

Không thêm/bỏ case. Phạm vi chưa automate vẫn như trước: FR-09 backend rules/checkout, FR-17 Update không được SUT hỗ trợ, endpoint permission trực tiếp ngoài UI scope. Selectors, business waits và expected giữ chính sách cũ; không tuyên bố toàn bộ selectors/assertions/waits đã được sinh viên review. REQ-11 tiếp tục IN PROGRESS.

## Kiểm chứng

Đang chạy batch session004-refactor trên test-code commit 3cd7cc6; evidence Session003 giữ nguyên. Kết quả được bổ sung sau khi batch thực sự hoàn tất.
