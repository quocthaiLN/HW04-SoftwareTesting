# Runtime defect groups — Session 003

Local findings, chưa tạo GitHub Issues; không mở rộng sang kiểm tra backend coupon apply hoặc endpoint role enforcement. Expected dựa scope/cases đã duyệt. Evidence paths cuối cùng sẽ được liên kết trong automation-report.md và artifacts/session003-final/execution-matrix.json. Các nhóm dưới đã xuất hiện ở cả Chromium/Firefox/WebKit trong batch đầu.

| ID | Case IDs | Expected | Actual runtime | Mức ảnh hưởng |
| --- | --- | --- | --- | --- |
| BUG-01 | FR-02-TC02, TC07 | Mỗi lần sai tăng 1; hai lần sai chưa khóa | DB counter=2 sau một lần sai; login đúng sau hai lần sai trả 403 | Khóa account sớm |
| BUG-02 | FR-02-TC08–TC10 | Khóa theo policy 30 giây; login đúng ở mốc 31 giây thành công | locked_until xấp xỉ 180 giây; sau 31 giây vẫn 403 | Thời gian khóa sai |
| BUG-03 | FR-02-TC06 | Email HTML5 chặn abc, không POST login | type=text, validity.valid=true, form gửi login | Validation email thiếu |
| BUG-04 | FR-02-TC13 | type=password và glyph che | type=text; screenshot thấy nguyên mật khẩu test | Lộ mật khẩu khi nhập |
| BUG-05 | FR-02-TC14 | Heading nhận diện Đăng nhập | Heading Đăng Ký | Nhận diện luồng sai |
| BUG-06 | FR-17-TC05 | Duplicate HTTP400/409, lỗi nghiệp vụ thân thiện | HTTP500; alert chứa SQLITE_CONSTRAINT/UNIQUE constraint failed: coupons.code | Lộ lỗi nội bộ và sai contract lỗi |
| BUG-07 | FR-17-TC08/09/32–35 | Percent nguyên trong 1–100 | Các giá trị 0/-1/101/120/0.5/1.5 nhận HTTP200 và lưu sau reload | Dữ liệu percent sai |
| BUG-08 | FR-17-TC24/25 | Fixed phải dương | Fixed 0/-50000 nhận HTTP200 và persist | Dữ liệu fixed sai |
| BUG-09 | FR-17-TC10 | Min order không âm | Min=-1 nhận HTTP200 và persist | Dữ liệu min order sai |

## Tái hiện chung

FR-02: start SUT cô lập theo RUNNING.md, tạo test account qua fixture từ data/shared.json, chạy case tương ứng bằng --grep và --project. Login qua UI; counters/deadline đọc SQLite riêng, không sửa deadline trong bước đo. TC10 thực sự đợi 31 giây, không page.clock.

FR-17: fixture tạo admin test và login setup API thật, mở admin app/tab Mã Giảm Giá; điền dữ liệu từ data/fr17.json với shared defaults. Case duplicate seed một code riêng rồi tạo lại qua UI; invalid cases không bypass HTML validation. Đối chiếu HTTP response, bảng sau reload và SQLite read-only assertions. Cleanup xóa coupon/account thuộc case sau khi thu kết quả.

## Phân loại riêng lỗi thực thi

Batch session003-full có FR-09-TC07/WebKit timeout tại actionability click (8 giây), trước request apply. Chưa có bằng chứng đây là lỗi SUT; không cộng vào 9 defect groups. Trong batch đó có mở browser khác để kiểm tra report khi WebKit đang chạy; mất foreground/animation scheduling là giả thuyết, chưa xác minh nguyên nhân. Batch final không mở thêm browser quan sát trong lúc tests chạy; giữ kết quả gốc để đối chiếu.

## Review AI đã sửa

Assertion tiền ban đầu dùng toContainText có thể nhận nhầm số dài hơn hoặc chuỗi có 0. Đã sửa toHaveText với prefixes/suffixes từ JSON và chạy lại suite. Custom metadata trong reporter 1.65 mặc định ẩn fields khác nếu không bật show-metadata-other; đã cấu hình title có attribution và ISO ngay từ runtime. Đây là self-review AI, không phải xác nhận human review của sinh viên.

## Final evidence

Batch session003-final: 150 pass/54 fail/0 skipped. FR-09 đạt57/57; timeout batch đầu không lặp lại, nguyên nhân gốc vẫn chưa kết luận.

| Bug | Case | Screenshot | Report |
| --- | --- | --- | --- |
| BUG-01 | FR-02-TC02 / Chromium | [Actual screenshot](artifacts/evidence/BUG-01.png) | [Actual report](artifacts/session003-final-fr02-chromium/html/index.html) |
| BUG-02 | FR-02-TC10 / Chromium | [Actual screenshot](artifacts/evidence/BUG-02.png) | [Actual report](artifacts/session003-final-fr02-chromium/html/index.html) |
| BUG-03 | FR-02-TC06 / Chromium | [Actual screenshot](artifacts/evidence/BUG-03.png) | [Actual report](artifacts/session003-final-fr02-chromium/html/index.html) |
| BUG-04 | FR-02-TC13 / Chromium | [Actual screenshot](artifacts/evidence/BUG-04.png) | [Actual report](artifacts/session003-final-fr02-chromium/html/index.html) |
| BUG-05 | FR-02-TC14 / Chromium | [Actual screenshot](artifacts/evidence/BUG-05.png) | [Actual report](artifacts/session003-final-fr02-chromium/html/index.html) |
| BUG-06 | FR-17-TC05 / Chromium | [Actual screenshot](artifacts/evidence/BUG-06.png) | [Actual report](artifacts/session003-final-fr17-chromium/html/index.html) |
| BUG-07 | FR-17-TC32 / Chromium | [Actual screenshot](artifacts/evidence/BUG-07.png) | [Actual report](artifacts/session003-final-fr17-chromium/html/index.html) |
| BUG-08 | FR-17-TC24 / Chromium | [Actual screenshot](artifacts/evidence/BUG-08.png) | [Actual report](artifacts/session003-final-fr17-chromium/html/index.html) |
| BUG-09 | FR-17-TC10 / Chromium | [Actual screenshot](artifacts/evidence/BUG-09.png) | [Actual report](artifacts/session003-final-fr17-chromium/html/index.html) |

Screenshot duplicate được chụp sau alert đã được đóng; xem dialog text/response trong lỗi runner và trace, không suy ra nội dung alert từ ảnh bảng. Các ảnh được copy từ output runner, không tạo/sửa hình.
