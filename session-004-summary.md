# Tổng kết Session 004

Ngày: 2026-11-13. Phạm vi: REQ-11 — human review và xử lý Conditional Test Logic.

Sinh viên phát hiện anti-pattern và đã xác nhận đồng ý với phần refactor. Hạng mục sửa Conditional Test Logic đã hoàn tất và được chấp nhận. REQ-11 tổng thể vẫn IN PROGRESS vì xác nhận này giới hạn ở thay đổi vừa review, chưa xác nhận review mọi AI output/selectors/assertions/waits.

## Kết quả thay đổi

- FR-02: tách callback theo hành vi đăng nhập, validation, unlock, reset và JWT; lock/lock-deadline có cùng hình dạng giữ data-driven.
- FR-09: nhóm cùng hành vi theo success/error/empty và trạng thái auth.
- FR-17: tách create/read/delete/duplicate/uppercase/reset/permission; HTML validation và server validation có đường kiểm tra cố định từ contract JSON, không chọn theo trạng thái SUT quan sát được.
- Fixture quản lý lifecycle; helper chia sẻ chuỗi bước cố định, không che dispatcher scenario. Request filtering và endpoint routing vẫn là logic hạ tầng phù hợp.
- Giữ 68 IDs, test data JSON riêng, phạm vi mock đã chốt và SUT nguyên trạng. Không sửa expected để xanh tests.

## Kiểm chứng thực tế

| Feature | Lượt chạy trên 3 browser | Pass | Fail | Skip |
| --- | ---: | ---: | ---: | ---: |
| FR-02 | 42 | 18 | 24 | 0 |
| FR-09 | 57 | 57 | 0 | 0 |
| FR-17 | 105 | 75 | 30 | 0 |
| Tổng | 204 | 150 | 54 | 0 |

Validate JSON và exact ID enumeration đạt: 68 cases mỗi engine, 204 registrations. Batch session004-refactor chạy đủ 9 tổ hợp Chromium/Firefox/WebKit trên test-code revision 3cd7cc68e83c3f3417b31a02a47231df5f3e54e0. So từng feature/browser/ID với session003-final: 204 keys khớp, 0 khác biệt trạng thái. Kết luận giới hạn trong các ca đã chạy; cùng status không chứng minh tương đương mọi hành vi.

Evidence mới giữ riêng tại artifacts/session004-refactor/summary.json, comparison.json, execution-matrix.json và các thư mục report tương ứng. Batch Session003, automation-report.md và execution_results của test-cases.json vẫn là lịch sử baseline, không ghi đè. Không tuyên bố browser-verify 9 HTML mới. Cleanup chỉ còn 2 users/4 coupons seed; SUT do phiên tạo đã dừng.

## Hồ sơ và commits

- 3cd7cc6: refactor ba specs theo hành vi.
- af7b682: human-review notes và script so sánh matrix theo ID/browser.
- e1a4116: evidence hồi quy và tài liệu giải thích/chạy suite.
- 7930901: Git log snapshot sau kiểm chứng.
- session-004-review.md ghi feedback sinh viên, nguyên nhân tổ chức code của AI, thay đổi, gaps và giới hạn.

Không phát sinh case mới hoặc nhóm defect mới từ so sánh hồi quy này. FR-09 vẫn chỉ UI mocked; permission chỉ UI; FR-17 Update không được SUT hỗ trợ.

## Bàn giao

Phần sửa Conditional Test Logic đã được sinh viên chấp nhận. Tiếp tục REQ-11 ở các nội dung chưa xác nhận review toàn bộ; sau đó hoàn thiện Issues/public Git, main report/PDF, AI critique, demo/video, tự chấm và đóng gói theo checklist. Không tuyên bố toàn bộ bài nộp hoàn tất. Giữ nguyên các thay đổi/xóa file có sẵn của sinh viên.
