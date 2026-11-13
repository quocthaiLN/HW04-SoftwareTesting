# Tổng kết Session 003

Ngày: 2026-11-13 (Asia/Ho_Chi_Minh).

## Hoàn thành

- Phân tích và áp dụng playwright-cli/core/pom; chốt ngoại lệ FR-09 mock toàn phần và toàn bộ test data ở JSON riêng, không hardcode.
- REQ-06–09 DONE: automate đủ 68 cases theo IDs đã duyệt; data validator; fixtures/POM/helpers; assertion inventory; thực thi đủ ba browsers.
- REQ-10 DONE: 9 HTML reports do Playwright sinh từ chạy thật, title có Run by: 23120352 + ISO timestamp; mở trực tiếp từng file để xác minh và chụp bằng chứng.
- Backend copy nguyên trạng và SQLite riêng trong /tmp; không sửa SUT để làm xanh tests. Cleanup không còn account test; đã dừng đúng servers do phiên tạo.

## Kết quả batch cuối

| Feature | Cases | Lượt chạy 3 browsers | Pass | Fail |
| --- | --- | --- | --- | --- |
| FR-02 | 14 | 42 | 18 | 24 |
| FR-09 | 19 | 57 | 57 | 0 |
| FR-17 | 35 | 105 | 75 | 30 |
| Tổng | 68 | 204 | 150 | 54 |

0 skipped, 9 feature-browser runs; 50 cases pass trên cả ba engines, 18 cases fail được nhóm thành 9 defect groups. FR-09 chỉ chứng minh UI/payload với response giả lập, không chứng minh backend coupon rules. Permission cases chỉ qua UI.

Nguồn: [summary thực](artifacts/session003-final/summary.json), [matrix](artifacts/session003-final/execution-matrix.json), [báo cáo và 9 HTML links](automation-report.md), [defects/screenshots](bug-reports.md).

Batch đầu được giữ riêng: 149 pass/55 fail, bao gồm một WebKit actionability timeout; timeout không lặp trong batch cuối, nguyên nhân chưa kết luận. Không cộng timeout thành lỗi SUT hoặc trộn hai batch để báo kết quả cuối.

## Đầu ra và kiểm chứng

- Code/data: package/lock/config, data/, tests/, scripts/; CLI 0.1.24 và Playwright Test 1.65.0.
- Browser versions: Chromium 158.0.8127.18, Firefox 159.0, WebKit 27.2; preflight/source hashes và code hashes lưu trong artifacts/.
- [Cách chạy](RUNNING.md), [giải thích implementation](implementation-notes.md), [assertion inventory](assertion-inventory.md), [kế hoạch đã thực hiện](session-003-plan.md).
- Syntax checks và validator pass; toàn bộ matrix chạy thật với workers=1/retries=0. TC10 đợi thời gian backend thực 31 giây.
- Self-review AI sửa assertion tiền từ substring sang exact text và đưa attribution/ISO vào title reporter. Đây chưa phải human review của sinh viên.
- 9 commits thay đổi .spec.js có ý nghĩa: d995b45, 622c221, 3caf495, ae36e9e, 661c1ae, ffe21bb, cf436b6, 945cf44, ecad404. Commit evidence 2866501, export log 282c750; git-log.txt cần export lại trước đóng gói cuối. Subject commit 282c750 ghi REQ-19 nhưng nội dung export thuộc REQ-17; không sửa lại lịch sử thật.

## Phần còn chờ và bước tiếp theo

1. REQ-11: sinh viên human review scripts/oracles/9 nhóm lỗi và ghi gap analysis thực tế.
2. REQ-12/16: public GitHub repository và Issues có screenshots; local bug evidence và đủ script commits đã có.
3. REQ-13/15: video demo theo đề, AI critique 200–300 từ; REQ-14/18: hoàn thiện main report và các bản PDF/appendix.
4. REQ-19/20/22: tự chấm điểm, cập nhật summary/links/Git log, đối chiếu checklist và đóng gói. Chưa tuyên bố bài nộp hoàn tất.
5. REQ-23 là optional: sử dụng skill có sẵn chưa đồng nghĩa đã tạo reusable skill và video demo theo rubric.

## Giới hạn môi trường và lịch sử workspace

WebKit thiếu system libraries và sudo yêu cầu mật khẩu; đã dùng thư viện apt extract trong /tmp với launcher binary gốc, có hướng dẫn tái tạo. Automatic approval review từ chối server phục vụ toàn bộ artifacts do rủi ro trace tokens/credentials; mở report file trực tiếp đã hoàn tất kiểm tra, không còn blocker. HTML/trace output giữ nguyên, kể cả whitespace tự sinh; kiểm tra whitespace chỉ áp dụng code/tài liệu viết tay.

Giữ nguyên các thay đổi có trước của sinh viên: header Session 002 trong PROGRESS.md, file review/skills-lock bị xóa và thư mục skills chưa track; không gộp các thay đổi đó vào commits của AI.
