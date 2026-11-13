// Runs an unchanged backend copy: database.js resets only this disposable DB.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const root = path.resolve(__dirname, '../../eshop-sut');
const dir = process.env.SUT_RUNTIME_DIR || path.join(os.tmpdir(), 'hw04-sut-session003');
fs.mkdirSync(dir, { recursive: true });
if (fs.existsSync(path.join(dir, 'owner.json'))) throw new Error('Runtime already owned; stop its processes before restart');
for (const file of ['server.js', 'database.js']) fs.copyFileSync(path.join(root, 'backend', file), path.join(dir, file));
if (!fs.existsSync(path.join(dir, 'node_modules'))) fs.symlinkSync(path.join(root, 'backend/node_modules'), path.join(dir, 'node_modules'));
const children = [];
const shutdown = () => { for (const child of children) child.kill('SIGTERM'); fs.rmSync(path.join(dir, 'owner.json'), { force: true }); };
(async () => {
  for (const port of [3000, 5173, 5174]) {
    const net = require('node:net');
    await new Promise((resolve, reject) => {
      const server = net.createServer();
      server.once('error', reject);
      server.listen(port, () => server.close(resolve));
    });
  }
  children.push(spawn(process.execPath, ['server.js'], { cwd: dir, stdio: 'inherit' }));
  for (const [frontend, port] of [['frontend-web', 5173], ['frontend-admin', 5174]]) {
    children.push(spawn(process.execPath, [path.join(root, frontend, 'node_modules/vite/bin/vite.js'), '--host', 'localhost', '--port', String(port), '--strictPort'], { cwd: path.join(root, frontend), stdio: 'inherit' }));
  }
  fs.writeFileSync(path.join(dir, 'owner.json'), JSON.stringify({ pid: process.pid, children: children.map(c => c.pid), db: path.join(dir, 'database.sqlite') }));
  for (const child of children) child.on('exit', code => { if (code) { shutdown(); process.exitCode = code; } });
  console.log('Isolated SUT runtime:', dir);
})().catch(error => { shutdown(); console.error(error); process.exitCode = 1; });
process.on('SIGTERM', () => { shutdown(); process.exit(); });
process.on('SIGINT', () => { shutdown(); process.exit(); });
