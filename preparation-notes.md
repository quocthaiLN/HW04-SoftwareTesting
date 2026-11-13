# Ghi chú chuẩn bị nội bộ — REQ-05

Ngày 2026-11-13, Session 003. Đây là ghi chú chuẩn bị từ skill mới, không phải báo cáo thực thi hay bằng chứng AI đã ôn bài giảng môn học.

## Trạng thái và nguồn

Sinh viên đã xác nhận phần chuẩn bị hoàn tất ở đầu Session 003. Checklist ghi nhận xác nhận đó; lượt này bổ sung việc đọc/phân tích playwright-cli, playwright-core, playwright-pom. Workspace chỉ có đề HW04, chưa có bài giảng automation để AI đối chiếu. Không dùng skill thay thế hoặc gán danh nghĩa bài giảng của giảng viên. Theo chỉ đạo trước, không thêm mục riêng về REQ-05 vào main report; vẫn ghi quy trình và evidence của các task thực thi tại bước báo cáo.

## Nội dung đã đọc và quyết định áp dụng

| Nội dung | Nguồn trong skills/.agents/skills/ | Áp dụng vào bài |
| --- | --- | --- |
| Khám phá UI, snapshot refs và sinh code | playwright-cli/SKILL.md; test-generation.md | CLI dùng cho khám phá/debug; refs không tồn tại trong suite, code sinh ra phải review và thêm assertions |
| Oracle và đồng bộ | playwright-core/assertions-and-waiting.md; SKILL.md | Web-first DOM assertions, URL và polling state; expected lấy từ spec/JSON độc lập, không từ UI vừa đọc |
| Dữ liệu/isolation | playwright-core/test-data-management.md; fixtures-and-hooks.md | JSON ngoài theo đề; account/coupon riêng, fixture lifecycle; không dùng inline data của ví dụ |
| Ranh giới mock | playwright-core/when-to-mock.md; SKILL.md của CLI/Core | FR-09 là ngoại lệ theo user: UI mock toàn phần; FR-02/17 dùng thật; công khai giới hạn evidence |
| Thời gian | playwright-core/clock-and-time-mocking.md | Không dùng clock của browser để giả 30 giây trên backend |
| Runner và evidence | playwright-core/configuration.md | 3 browser projects, baseline retries=0, giữ trace khi fail, run metadata; tránh default trace chỉ on-first-retry |
| Tổ chức code | playwright-pom/SKILL.md và hai guides | UI actions trong helper/POM nhỏ, resource setup/cleanup trong fixture, utilities thuần trong helpers; không tạo abstraction thừa |

## Quy trình chuẩn bị cho từng task

1. Lấy case ID và expected đã duyệt → external JSON → validator mapping.
2. Snapshot UI thật, xác minh locator/request, tách setup khỏi hành vi chính.
3. AI sinh từng nhóm script nhỏ, thêm assertions và fixtures; review diffs và chạy kiểm tra phù hợp.
4. Smoke ba browsers rồi chạy 9 tổ hợp với artifacts riêng.
5. Phân loại SUT/script/setup failures; chỉ ghi bug khi có runtime evidence; cập nhật progress/audit và Git theo bước.

Evidence tương lai cần thu: CLI observations đã che secrets; JSON validation; tên test có IDs; matcher inventory; browser versions/start-end timestamps; runner results; screenshot/trace khi fail; HTML có Run by: 23120352 và ISO time thật; review corrections thực tế.

## Tự kiểm tra thiết kế trước thực thi

- 68 cases (14/19/35), 204 lượt dự kiến; 9 tổ hợp không đồng nghĩa 9 lần launch browser.
- Pass của FR-09 không chứng minh backend normalization/cap/floor. Không checkout.
- Login dùng oracle +1/3 lần/30 giây, không sửa expected theo lỗi source. TC10 đợi 31 giây kể từ lần sai thứ ba, không đợi deadline lỗi của SUT.
- Không import database.js từ fixture vì module có reset bảng; startup phải kiểm soát DB/process riêng.
- Không biến CLI action logs thành report Pass/Fail; không nhận là human review thay sinh viên.

## Kết quả chuẩn bị

Đã có đối chiếu ba skill với phạm vi và kế hoạch chi tiết tại session-003-plan.md. Chưa cài package, chạy CLI/browser hoặc tạo runtime evidence trong lượt này.
