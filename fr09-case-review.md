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
| 11 | Không thêm tổng 0/âm theo user; chỉ test kết quả coupon |
| 12, 13 | Đã có TC09 chưa login / TC12 hết lượt; TC10 thêm JWT invalid |
| 14 | Thêm TC15 uppercase payload; không yêu cầu thay đổi input value, user đã chốt |
| 15 | Thêm TC16 trim payload; không yêu cầu thay đổi input value, user đã chốt |
| 17 | Ngoài scope: checkout và ghi coupon_usage; không thêm theo scope user đã chốt |
| 18 | Ngoài scope hiện tại: read-only tổng tiền thuộc FR-08 |
| 19 | Thêm TC17: fixed=100000, total=100000, min=0 để không bị C3 che khuất biên |
| 20 | TC18: fixed=100000, total=80000, min=0; cap discount=80000, final=0 |
| 21 | TC19: user chốt floor, discount=33333, final=300000 với total=333333 và 10% |

TC01–TC12 giữ nguyên. FR-09 có 19 cases DESIGNED; toàn suite 45 cases DESIGNED. Scope vẫn mocked UI only.

## Quyết định đã được sinh viên xác nhận — 2026-11-13

| ID | Quyết định |
| --- | --- |
| Q1 | Chặn trần discount=min(nominal,total); final=0 khi nominal>total. TC18 fixture discount=80000/final=0; UI-only không chứng minh backend cap. |
| Q2 | Chỉ chuẩn hóa uppercase/trim trong payload; không yêu cầu thay đổi input value. |
| Q3 | Floor tiền giảm: floor(333333*10/100)=33333; final=300000. Thêm TC19. |
| Q4 | Không thêm case tổng 0/âm; chỉ test kết quả coupon, không validation đầu vào tổng tiền của thanh toán. |
| Q5 | Không thêm khoảng trắng giữa mã theo câu trả lời mục 4 của user; không tự đặt quy tắc xử lý. |
| Q6 | API trực tiếp, checkout, coupon_usage và read-only tổng tiền ngoài scope hiện tại. |

Không còn quyết định pending cho requirement 3 ở mức thiết kế.

## Lưu ý thiết kế

- TC17/18 dùng coupon riêng min=0; không sao chép VIP100 min=300000 với total=100000/80000 vì sẽ test lỗi ngưỡng thay vì biên số tiền.
- Với response giả lập, không xem con số trả về là bằng chứng backend tính đúng. Nếu muốn kiểm thử UI phòng vệ với response final_amount âm, cần case fault injection riêng và xác nhận UX (báo lỗi hay clamp); TC18 chỉ kiểm tra response hợp lệ theo chính sách cap đã chốt; không thêm fault injection.
- Nghi vấn source, kết quả nguồn tham khảo và kết quả runtime của suite phải được phân biệt. Chưa có bug/runtime pass/fail mới được xác nhận.
