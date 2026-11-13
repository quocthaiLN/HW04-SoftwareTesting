const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const read = name => JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../data', name + '.json'), 'utf8'));
const shared = read('shared');
function unique() { return crypto.randomUUID().replaceAll('-', ''); }
function resolveTemplate(template, id) { return template.replaceAll('{unique}', id); }
function couponData(record, id) {
  const data = { ...shared.couponDefaults, ...record.overrides };
  const date = new Date(); date.setDate(date.getDate() + data.expiryOffsetDays);
  const code = Object.hasOwn(data, 'code') ? data.code : resolveTemplate(data.codeTemplate, id);
  return { code, type: data.type, discount_value: data.discount_value, min_order_amount: data.min_order_amount, max_uses_per_user: data.max_uses_per_user, expired_at: Object.hasOwn(data, 'expired_at') ? data.expired_at : date.toISOString().slice(0, 10) };
}
const money = value => value.toLocaleString('vi-VN');
module.exports = { read, shared, unique, resolveTemplate, couponData, money };
