# Assertion inventory — REQ-08

Inventory của code đã triển khai, không phải kế hoạch. Các vị trí theo tên scenario/method để tra bằng rg; script references nằm trong tests/.

| Pattern | Case thực sự dùng | Script / method | Oracle ngoài code |
| --- | --- | --- | --- |
| Text, exact | FR-02-TC02/03 lỗi chung; FR-09 success/error amounts; FR-17 Create/Read fields | fr02-login.spec.js wrong/missing; pages/coupons.js assertRow | shared.expected.error; fr09.expected và shared.ui display prefixes/suffixes; fr17 records + shared defaults/typeLabels |
| Attribute/value | FR-02-TC06 email; TC13 password; FR-17-TC15 uppercase/TC16 reset | fr02-login.spec.js format/mask; fr17-coupons.spec.js uppercase/reset | shared.expected.emailType/passwordType; shared.maskPassword; shared.resetExpected |
| URL | FR-02-TC01/07/10/11/12 login thành công, TC14 login page | fr02-login.spec.js success/lockout/heading | Route là contract kỹ thuật của app; test inputs trong JSON |
| State/count | FR-09-TC13/14 disabled/no request; FR-17-TC04 Delete, TC36/37 access | fr09-apply-coupon.spec.js empty; fr17-coupons.spec.js delete/permissions | fr09.expected.applyCount/checkoutCount; fr17.expected.rowCount; shared.expected.zero |
| Polling DB state | FR-02-TC02 mỗi lần sai +1, TC11 reset | fr02-login.spec.js wrong/reset | shared.expected.one/zero, shared.null |
| Network/payload equality | FR-09-TC15/16 normalization, FR-02-TC12 Bearer JWT, FR-17-TC05 duplicate status | fr09-apply-coupon.spec.js; fr02-login.spec.js jwt; fr17-coupons.spec.js duplicate | JSON expected.code/total/user_id; login result token; shared.duplicateStatuses |
| Time/date policy | FR-02-TC08/09 duration, TC10 unlock; FR-17 expiry | fr02-login.spec.js lock/lock-deadline/unlock; pages/coupons.js assertRow | shared.expected.lockSeconds/unlockWaitMs; JSON expiry offsets/past date |

Giá trị kỳ vọng đọc từ JSON, không lấy từ UI vừa đọc để làm chính oracle cho UI. So sánh JWT với token cấp sau login chỉ là kiểm tra propagation, không chứng minh JWT cryptographic validity. FR-09 mock response và expected được khai báo riêng trong JSON; không coi đây là kiểm chứng công thức backend.

Không đếm nhiều lần cùng matcher là nhiều patterns. Soft assertions chỉ dùng để thu thêm bằng chứng liên quan trong cùng case; mọi soft failure vẫn làm case failed.
