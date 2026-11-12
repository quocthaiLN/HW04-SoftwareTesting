# FR-17 — Đối chiếu testcase Session 002

Nguồn nguyên văn: references/fr17-user-testcases.txt. Chỉ dùng thiết kế tham khảo; không dùng Actual Result/Pass/Fail của nguồn làm evidence. Chưa chạy automation. Sau xác nhận: TC05/08/09 cụ thể hóa oracle/type; TC30/31 bị loại và retire IDs. Thêm TC32–37. FR-17 có 35 DESIGNED; toàn suite 68 DESIGNED (14/19/35), dự kiến 204 executions trên 3 browsers.

## Mapping EP

| Nguồn TC_ADM_EP_* | Xử lý trong suite |
| --- | --- |
| 01 | TC01 create percent; TC16 bổ sung reset form |
| 02 | TC13 fixed/min=0/uses=3 (TC02 cũ min=300000) |
| 03 | TC14 tạo expiry quá khứ và nhãn Hết hạn |
| 04 | TC03 read fields; không phụ thuộc đúng 4 seed rows vì DB có thể có dữ liệu khác |
| 05 | TC04 delete/reload; không yêu cầu dialog theo user |
| 06 | Loại theo user, không dialog/cancel |
| 07 | TC15 uppercase cả input value và payload trên admin (khác FR-09 chỉ payload) |
| 08 | TC05 duplicate đã có; chốt HTTP 400/409 và thông báo nghiệp vụ thân thiện, không SQL/stack trace |
| 09 | TC06 code required |
| 10, 11 | Loại kiểm thử định dạng mã theo user |
| 12 | API-only invalid type; không đưa vào UI suite, select chỉ có percent/fixed |
| 13 | TC08/09 pin type=percent: 0/-1 bị từ chối |
| 14 | TC32/33 percent=101/120; TC34/35 percent=0.5/1.5 bị từ chối |
| 15 | TC07 discount required |
| 16 | TC24/25 fixed=0/-50000, bổ sung type cụ thể |
| 17 | TC10 min=-1 đã có |
| 18 | API-only min="abc", không inject bằng DOM/route để giả test UI |
| 19 | TC11 expiry required |
| 20 | API-only ngày vô nghĩa; không bypass date input trong UI suite |
| 21 | TC12 uses=0 đã có; TC27 uses=-1 bổ sung; không gán Fail API cho validation UI |
| 22 | TC28 uses=1.5 qua UI; không khẳng định đã kiểm tra endpoint trực tiếp |
| 23, 24 | API-only DELETE ID không tồn tại/sai; UI chỉ có nút trên dòng có ID thật |
| 25 | Loại xóa coupon có lịch sử theo user |
| 26, 27 | TC36/37 chặn user thường/không token qua UI; không test endpoint trực tiếp |

## Mapping BVA

| Nguồn TC_ADM_BVA_* | Xử lý |
| --- | --- |
| 01 | TC08 percent=0 |
| 02–06 | TC17–TC21 percent=1,2,50,99,100; chỉ tạo/lưu/hiển thị, không assert miễn phí checkout |
| 07 | TC32 percent=101 bị từ chối |
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
| 21, 22 | TC30/31 bị loại theo user vì không kiểm thử độ dài mã; IDs retired |
| 23 | TC01 code unique danh định; không cố định SAVE20 có thể đã tồn tại |
| 24, 25 | Loại kiểm thử độ dài mã theo user |

## Quyết định đã chốt — 2026-11-13

| ID | User xác nhận / tác động |
| --- | --- |
| Q1 | Không dialog khi xóa coupon; không thêm confirm/cancel. |
| Q2 | Loại kiểm thử định dạng/độ dài mã vì spec không yêu cầu; retire TC30/31. Code required/unique và uppercase vẫn giữ. |
| Q3 | Percent là số nguyên 1–100. Thêm TC32–35 cho 101/120/0.5/1.5; TC08/09 pin percent 0/-1. |
| Q4 | Loại case xóa coupon đã có lịch sử. |
| Q5 | TC05 duplicate: HTTP 400 hoặc 409, thông báo nghiệp vụ rõ trùng mã, không lộ SQL/stack trace, dữ liệu không nhân đôi. Chấp nhận hai status theo đề xuất đã duyệt; không chốt chuỗi thông báo nguyên văn. |
| Q6 | Thêm TC36 user thường / TC37 không token qua UI: chặn quyền quản lý coupon, không create/delete; không mở rộng API trực tiếp. |

Không còn policy pending cho thiết kế REQ-04. Quyền qua UI không chứng minh endpoint kiểm tra role đúng; giới hạn này phải được công khai khi báo cáo.

## Quy tắc thực thi sau này

- Future expiry dùng ngày chạy +30; nguồn có 2026-10-30 đã qua thời điểm session. Không dùng ngày cũ cho positive case.
- Mỗi case negative dùng code riêng và kiểm tra không tồn tại sau reload/read-only API hỗ trợ; không thay tương tác chính bằng POST/DELETE trực tiếp.
- TC14 chấp nhận tạo coupon quá khứ để kiểm tra nhãn; nguồn user đề xuất và UI hỗ trợ. Không test apply/checkout ở đây.
- Không tạo Update vì SUT không hỗ trợ theo scope đã chốt. Không sửa SUT trong bước thiết kế testcase.
