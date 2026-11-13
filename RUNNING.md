# Chạy automation

Node.js >=20, npm, SUT dependencies và ba browser engines cần có. Suite dùng Playwright Test 1.65.0; CLI discovery 0.1.24 (pin trong lockfile). Đọc artifacts/preflight.json để biết browser versions của lần chạy đã lưu.

```bash
cd submission
npm ci
npx playwright install chromium firefox webkit
npm run validate
```

Một terminal riêng chạy `npm run sut`. Lệnh này cần các ports 3000/5173/5174 còn trống; không reuse hoặc kill server không thuộc mình. Backend là bản sao nguyên trạng ở /tmp/hw04-sut-session003, SQLite riêng; frontends chạy Vite từ source gốc. Không dùng eshop-sut/run_servers.sh vì script gốc killall node. Dừng bằng Ctrl+C ở terminal sở hữu; nếu runtime còn owner.json sau kill cứng, kiểm tra PID đã chết trước khi xóa file ownership hoặc tạo runtime mới qua SUT_RUNTIME_DIR.

Trên Ubuntu thiếu thư viện WebKit nhưng không có sudo, có thể chạy `node scripts/prepare-webkit-local.js`: tải/extract packages vào /tmp, tạo launcher giữ nguyên binary WebKit và truyền bundled/local libraries. Workaround đã dùng trên Ubuntu 26.04. Máy khác nên dùng dependencies hệ thống phù hợp, không áp dụng script apt mù quáng.

```bash
export WEBKIT_EXECUTABLE_PATH=/tmp/hw04-webkit-launch.sh  # chỉ khi dùng workaround
node scripts/preflight.js
npm run matrix
```

Mặc định visible browsers; PW_HEADLESS=true chỉ dùng ở máy không display hoặc khi được yêu cầu. Matrix chạy tuần tự 9 tổ hợp, lưu từng run ở artifacts/<batch>-<feature>-<browser>/ và summary ở artifacts/<batch>/execution-matrix.json. Exit 1 nếu có assertion fail là kết quả hợp lệ; không sửa expected theo lỗi SUT. Có thể đặt PW_BATCH_ID để tên batch ổn định, nhưng phải dùng ID mới cho rerun để bảo tồn kết quả cũ.

Chạy một feature/browser:

```bash
PW_RUN_ID=my-fr09-run npx playwright test tests/fr09-apply-coupon.spec.js --project=chromium
```

HTML report là output thật của Playwright, không chỉnh tay. Mở file html/index.html trực tiếp để xem summary; attachment/trace một số tính năng cần viewer của Playwright. Reports mới có attribution + ISO trong title; reports trước khi sửa config có custom metadata, xem bằng hash `#?show-metadata-other` rồi mở Metadata. Không phục vụ toàn bộ artifacts qua localhost. Traces chỉ có account test giả lập/tạo riêng, nhưng vẫn cần review nội dung trước public publication.

CLI discovery: cấu hình browserName chromium và executablePath từ require('@playwright/test').chromium.executablePath() trong file local .playwright/cli.config.json; dùng named session riêng. Snapshot trước mỗi thao tác, không copy refs vào spec; đóng session của mình khi xong. Các snapshots quan sát thật được lưu artifacts/cli-*.yaml.

Giới hạn: FR-09 là UI mocked coverage; FR-02/17 backend thật. Code/fixtures/POM không chứa test data hardcode; JSON ngoài là nguồn dữ liệu. Human review, public remote/Issues, main report/PDF/video là các bước riêng chưa được tự nhận hoàn tất.
