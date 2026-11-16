# HW04 — Automation Testing

23120352 — Lê Nguyễn Quốc Thái.

- [Main report](Main-Report.md): phạm vi, kiến trúc, cách chạy, 68 cases, kết quả, 12 bugs, video và AI Critique.
- [AI audit](AI-Report-Audit.md), [AI Critique](AI-Critique.md), [Git log](git-log.txt).
- [Test cases](test-cases.json), [requirement checklist](requirements-list.json), [progress](PROGRESS.md).
- [Evidence matrix](artifacts/execution-matrix.json): 9 runs, 204 executions; 138 pass / 66 fail / 0 skip, tổng hợp FR02/17 Session004 và FR09 Session006, không phải một full-suite run.

## Test summary

| Chỉ số | Giá trị |
| --- | --- |
| Features | 3 (FR02, FR09, FR17) |
| Cases automated / executed | 68 / 68 |
| Case IDs pass / fail cả 3 engines | 46 / 22 |
| Executions pass / fail / skip | 138 / 66 / 0 (204 lượt) |
| Browser runs | 9; hai phiên riêng, không phải full-suite rerun |
| Bugs | 12 groups, Issues #1–#12 có screenshot |
| Demo video | [YouTube](https://youtu.be/-32746b5iEI?si=RqwYGPSNndiy2B_h) — sinh viên xác nhận hoàn tất |
| Public repository | [quocthaiLN/HW04-SoftwareTesting](https://github.com/quocthaiLN/HW04-SoftwareTesting) |

## Self-assessment

| Tiêu chí | Tối đa | Sinh viên tự chấm |
| --- | ---: | ---: |
| Feature A | 25 | 25 |
| Feature B | 25 | 25 |
| Feature C | 25 | 25 |
| Demo video | 15 | 15 |
| Agent Skills | 10 | 10 |
| **Tổng** | **100** | **100** |

Điểm theo tự đánh giá của sinh viên; review FR09 mới/báo cáo/video/demo được sinh viên xác nhận ngày 16/11/2026. Repository đã public và đã push bản chốt. Gói nộp: `23120352_HW04_AI_Automation_100.zip` (nếu chia nhiều phần, tải đủ các phần).

## Chạy lại

Cần SUT tại `../eshop-sut/` và dependencies của backend/hai frontends. Trong thư mục submission:

```bash
npm ci
npx playwright install
npm run validate
npm run sut
```

Terminal khác cùng thư mục:

```bash
PW_HEADLESS=true npm run test:fr09 -- --project=chromium
# Hoặc chạy đủ ma trận mới:
PW_HEADLESS=true npm run matrix
```
