# FR-09 — Review cases Session 002

Nguồn: references/fr09-user-testcases.txt, do sinh viên cung cấp. Không nhập Actual Result/Pass/Fail của nguồn thành evidence của suite này. Chưa chạy automation.

## Đối chiếu

| Case nguồn TC_CP_EP_* | Case suite / quyết định |
| --- | --- |
| 01, 02 | Đã có TC01 percent và TC02 fixed |
| 03 | Đã có TC11 còn một lượt |
| 04 | Đã có TC07 đúng ngưỡng; TC06/08 bổ sung hai phía |
| 05, 06 | Đã có TC03 không tồn tại / TC04 inactive |
| 07, 16 | Thêm TC13 input rỗng; UI disabled, không gửi request nên không assert HTTP 400 |
| 08 | Thêm TC14 chỉ có khoảng trắng; UI disabled, không gửi request; API whitespace là lớp kiểm thử riêng |
| 09, 10 | Đã có TC05 hết hạn / TC06 dưới ngưỡng |
| 11 | Chờ xác nhận tổng 0/âm; nguồn chỉ dùng input 0 dù mục tiêu ghi cả âm |
| 12, 13 | Đã có TC09 chưa login / TC12 hết lượt; TC10 thêm JWT invalid |
| 14 | Thêm TC15 uppercase payload; thay đổi input value chờ xác nhận |
| 15 | Thêm TC16 trim payload; thay đổi input value chờ xác nhận |
| 17 | Ngoài scope: checkout và ghi coupon_usage; không thêm khi chưa được mở rộng scope |
| 18 | Ngoài scope hiện tại: read-only tổng tiền thuộc FR-08 |
| 19 | Thêm TC17: fixed=100000, total=100000, min=0 để không bị C3 che khuất biên |
| 20 | Thêm TC18 pending: fixed=100000, total=80000, min=0; chốt final>=0, cap/reject cần xác nhận |
| 21 | Chờ xác nhận quy tắc làm tròn; README không quy định Math.floor |

TC01–TC12 giữ nguyên. TC13–TC17 DESIGNED; TC18 PENDING POLICY CONFIRMATION. FR-09 có 18 records. Toàn suite 44 records: 43 DESIGNED, 1 pending. Scope vẫn mocked UI only.

## Các quyết định cần sinh viên xác nhận

| ID | Case / câu hỏi | Đề xuất |
| --- | --- | --- |
| Q1 | Giảm danh định vượt tổng tiền: chặn trần giảm về tổng và final=0, hay từ chối coupon? | Chặn trần: discount=min(nominal,total), final=0. Đây là quy tắc mới, chưa tự coi là đã duyệt. Nếu chốt cap, fixture trả discount=80000/final=0 chỉ chứng minh UI hiển thị; không chứng minh backend cap. |
| Q2 | Chữ thường / khoảng trắng đầu-cuối có bắt buộc sửa ngay value của ô nhập? | Chỉ assert payload uppercase/trim và kết quả. CSS uppercase không đồng nghĩa DOM value đổi; không tự gán Fail như nguồn. |
| Q3 | Với 333333 ×10%=33333.3: floor, round, hay giữ phần lẻ? | Floor xuống 33333, final=300000 nếu dùng VND nguyên; cần xác nhận vì đặc tả chỉ có công thức chia 100. |
| Q4 | Tổng 0/âm có thêm vào FR-09? | Nếu thêm, tách hai case; total=0 dùng cart có hàng giá 0 thay vì cart rỗng (có thể không tới form); total=-1 có thể phải sửa input tổng nên cần thống nhất scope. Coupon min=0 để cô lập validation. |
| Q5 | Khoảng trắng giữa mã, ví dụ BIG BUY: giữ nguyên hay loại bỏ? | Giữ nguyên, trả lỗi mã không tồn tại; không tự biến thành BIGBUY. Chưa có quy tắc định dạng mã rõ ràng. |
| Q6 | Có mở rộng kiểm thử API trực tiếp cho code rỗng/whitespace, hoặc checkout/usage/read-only tổng tiền? | Giữ ngoài scope FR-09 hiện tại; page.route UI không xác minh backend HTTP status/DB. |

## Lưu ý thiết kế

- TC17/18 dùng coupon riêng min=0; không sao chép VIP100 min=300000 với total=100000/80000 vì sẽ test lỗi ngưỡng thay vì biên số tiền.
- Với response giả lập, không xem con số trả về là bằng chứng backend tính đúng. Nếu muốn kiểm thử UI phòng vệ với response final_amount âm, cần case fault injection riêng và xác nhận UX (báo lỗi hay clamp); TC18 hiện chưa khẳng định cơ chế đó.
- Nghi vấn source, kết quả nguồn tham khảo và kết quả runtime của suite phải được phân biệt. Chưa có bug/runtime pass/fail mới được xác nhận.
