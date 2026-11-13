const { test: base, expect } = require('@playwright/test');
const path = require('node:path');
const fs = require('node:fs');
const sqlite = require(path.resolve(__dirname, '../../../eshop-sut/backend/node_modules/sqlite3'));
const { shared, unique, resolveTemplate } = require('../helpers/data');
const apiURL = process.env.API_URL || 'http://localhost:3000';
const adminURL = process.env.ADMIN_URL || 'http://localhost:5174';
const runtimeDir = process.env.SUT_RUNTIME_DIR || '/tmp/hw04-sut-session003';
function connect() {
  const owner = JSON.parse(fs.readFileSync(path.join(runtimeDir, 'owner.json'), 'utf8'));
  if (owner.db !== path.join(runtimeDir, 'database.sqlite')) throw new Error('DB ownership mismatch');
  const db = new sqlite.Database(owner.db, sqlite.OPEN_READWRITE);
  db.configure('busyTimeout', 5000);
  return {
    get: (sql, values = []) => new Promise((resolve, reject) => db.get(sql, values, (err, row) => err ? reject(err) : resolve(row))),
    all: (sql, values = []) => new Promise((resolve, reject) => db.all(sql, values, (err, rows) => err ? reject(err) : resolve(rows))),
    run: (sql, values = []) => new Promise((resolve, reject) => db.run(sql, values, function (err) { err ? reject(err) : resolve({ id: this.lastID, changes: this.changes }); })),
    close: () => new Promise((resolve, reject) => db.close(err => err ? reject(err) : resolve())),
  };
}
const test = base.extend({
  apiURL: [apiURL, { option: true }], adminURL: [adminURL, { option: true }],
  db: async ({}, use) => { const db = connect(); try { await use(db); } finally { await db.close(); } },
  adminUser: async ({ db }, use) => {
    const user = { ...shared.adminUser, email: resolveTemplate(shared.adminUser.emailTemplate, unique()) };
    const created = await db.run('INSERT INTO users(name,email,password,role,login_attempts,locked_until) VALUES(?,?,?,?,?,?)', [user.name, user.email, user.password, user.role, user.login_attempts, user.locked_until]);
    user.id = created.id;
    try { await use(user); } finally { await db.run('DELETE FROM users WHERE id=? AND email=?', [user.id, user.email]); }
  },
  testUser: async ({ db }, use) => {
    const user = { ...shared.user, email: resolveTemplate(shared.user.emailTemplate, unique()) };
    const created = await db.run('INSERT INTO users(name,email,password,role,login_attempts,locked_until) VALUES(?,?,?,?,?,?)', [user.name, user.email, user.password, user.role, user.login_attempts, user.locked_until]);
    user.id = created.id;
    try { await use(user); } finally { await db.run('DELETE FROM users WHERE id=? AND email=?', [user.id, user.email]); }
  },
});
module.exports = { test, expect, connect };
