# FR-17 — Đối chiếu testcase Session 002

Nguồn nguyên văn: references/fr17-user-testcases.txt. Chỉ dùng thiết kế tham khảo; không dùng Actual Result/Pass/Fail của nguồn làm evidence. Chưa chạy automation. Giữ nguyên TC01–TC12; thêm 19 cases TC13–TC31. FR-17 có 31 DESIGNED; toàn suite 64 DESIGNED (14/19/31), dự kiến 192 executions trên 3 browsers.

## Mapping EP

| Nguồn TC_ADM_EP_* | Xử lý trong suite |
| --- | --- |
| 01 | TC01 create percent; TC16 bổ sung reset form |
| 02 | TC13 fixed/min=0/uses=3 (TC02 cũ min=300000) |
| 03 | TC14 tạo expiry quá khứ và nhãn Hết hạn |
| 04 | TC03 read fields; không phụ thuộc đúng 4 seed rows vì DB có thể có dữ liệu khác |
| 05 | TC04 delete/reload; không thêm bắt buộc dialog khi chưa chốt |
| 06 | Chờ quyết định dialog/cancel, Q1 |
| 07 | TC15 uppercase cả input value và payload trên admin (khác FR-09 chỉ payload) |
| 08 | TC05 duplicate đã có; HTTP status/message cụ thể chờ Q5 |
| 09 | TC06 code required |
| 10, 11 | Quy tắc khoảng trắng và ký tự mã chờ Q2 |
| 12 | API-only invalid type; không đưa vào UI suite, select chỉ có percent/fixed |
| 13 | TC08/09 cũ giá trị 0/âm; chưa cụ thể type trong thiết kế cũ, giữ nguyên; coverage percent cụ thể cần chốt Q3 rồi hoàn thiện data |
| 14 | Percent >100 chờ Q3 |
| 15 | TC07 discount required |
| 16 | TC24/25 fixed=0/-50000, bổ sung type cụ thể |
| 17 | TC10 min=-1 đã có |
| 18 | API-only min="abc", không inject bằng DOM/route để giả test UI |
| 19 | TC11 expiry required |
| 20 | API-only ngày vô nghĩa; không bypass date input trong UI suite |
| 21 | TC12 uses=0 đã có; TC27 uses=-1 bổ sung; không gán Fail API cho validation UI |
| 22 | TC28 uses=1.5 qua UI; không khẳng định đã kiểm tra endpoint trực tiếp |
| 23, 24 | API-only DELETE ID không tồn tại/sai; UI chỉ có nút trên dòng có ID thật |
| 25 | Xóa coupon có lịch sử chờ Q4 (từ chối hay soft delete) |
| 26, 27 | Access control FR-12/SEC-03: đề xuất xem xét riêng Q6; các case UI hiện dùng admin thật |

## Mapping BVA

| Nguồn TC_ADM_BVA_* | Xử lý |
| --- | --- |
| 01 | TC08 giá trị 0 đã có; cần pin type percent trong data khi triển khai |
| 02–06 | TC17–TC21 percent=1,2,50,99,100; chỉ tạo/lưu/hiển thị, không assert miễn phí checkout |
| 07 | Percent=101 chờ Q3 |
| 08 | TC24 fixed=0 |
| 09, 10 | TC22/23 fixed=1/2 đồng, dùng đúng đơn vị biên, không thay bằng 1000/2000 |
| 11 | TC02 fixed=50000 đã có |
| 12 | TC10 min=-1 |
| 13 | TC01 min=0 đã có, TC13 bổ sung fixed min=0 |
| 14 | TC26 min=1 |
| 15 | TC16 reset có min=200000 và xác minh dòng mới; danh định không cần case trùng |
| 16 | TC12 uses=0 |
| 17, 18 | TC01 uses=1 và TC02 uses=2 đã có |
| 19 | TC29 uses=10 |
| 20 | TC06 code rỗng; UI chặn không đồng nghĩa đã test backend HTTP 400 |
| 21, 22 | TC30/31 code A/AB; fixture DB cô lập để không trùng hoặc xóa mã của người khác |
| 23 | TC01 code unique danh định; không cố định SAVE20 có thể đã tồn tại |
| 24, 25 | Độ dài 30/256 chờ Q2: chưa có maxLength trong đặc tả; chuỗi nguồn SUPER_SALE_BLACK_FRIDAY_2026_X thực tế dài 29, không phải 30 |

## Cần xem xét/xác nhận trước khi thêm

| ID | Vấn đề | Đề xuất / căn cứ |
| --- | --- | --- |
| Q1 | Có bắt buộc confirm/cancel khi xóa coupon? | README FR-24 chỉ yêu cầu dialog khi xóa item khỏi giỏ. Không mặc định áp dụng cho coupon; nếu user muốn thêm, tạo hai case Confirm và Cancel. |
| Q2 | Code cho phép ký tự gì và dài tối đa bao nhiêu? | Nguồn EP11 chỉ cho chữ/số nhưng BVA24 dùng dấu _. Cần chốt khoảng trắng, dấu _, dấu -, min/max length; chưa có căn cứ coi 256 tự động invalid. Sau khi chốt mới thiết kế biên L-1/L/L+1 chính xác. |
| Q3 | Percent bắt buộc số nguyên 1–100 hay chỉ >0 như README FR-17? | Nguồn đề xuất 1–100. Cần chốt để thêm 101/120 bị từ chối và phân hoạch 0<x<1; không tự đặt giới hạn từ lỗi source. Các giá trị 1–100 đã thêm là hợp lệ dưới cả hai cách hiểu. |
| Q4 | Xóa coupon đã có coupon_usage: từ chối hay soft delete? | Chưa có chính sách trong FR-17. Đề xuất từ chối xóa vật lý để giữ lịch sử; cần user chốt trước khi thiết kế oracle cụ thể. Seed usage bằng fixture, không tự mở rộng test checkout. |
| Q5 | Duplicate cần lỗi nghiệp vụ thân thiện và HTTP 409/400 cụ thể? | TC05 hiện chỉ chốt từ chối, một dòng duy nhất. Không tự kết luận 500 là bug mới từ kết quả nguồn; có thể bổ sung contract nếu user muốn. |
| Q6 | Có thêm kiểm tra quyền user/không token qua UI vào scope FR-17? | Đây là FR-12/SEC-03. Nếu mở rộng, test navigation/redirect và không cho create/delete qua UI; endpoint trực tiếp là lớp bổ sung riêng cần chốt. |

## Quy tắc thực thi sau này

- Future expiry dùng ngày chạy +30; nguồn có 2026-10-30 đã qua thời điểm session. Không dùng ngày cũ cho positive case.
- Mỗi case negative dùng code riêng và kiểm tra không tồn tại sau reload/read-only API hỗ trợ; không thay tương tác chính bằng POST/DELETE trực tiếp.
- TC14 chấp nhận tạo coupon quá khứ để kiểm tra nhãn; nguồn user đề xuất và UI hỗ trợ. Không test apply/checkout ở đây.
- Không tạo Update vì SUT không hỗ trợ theo scope đã chốt. Không sửa SUT trong bước thiết kế testcase.
