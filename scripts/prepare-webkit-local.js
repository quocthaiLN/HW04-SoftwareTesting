// Optional Ubuntu workaround when sudo is unavailable. Does not modify system dirs.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const runtime = path.join(os.tmpdir(), 'hw04-webkit-deps');
const target = path.join(runtime, 'root');
fs.mkdirSync(runtime, { recursive: true });
const run = (command, args) => { const result = spawnSync(command, args, { cwd: runtime, stdio: 'inherit' }); if (result.status !== 0) throw new Error(`${command} failed: ${result.status}`); };
run('apt-get', ['download','libevent-2.1-7t64','libavif16','libmanette-0.2-0','libyuv0','libgav1-2','libhidapi-hidraw0']);
for (const name of fs.readdirSync(runtime).filter(n => n.endsWith('.deb'))) run('dpkg-deb', ['-x', path.join(runtime,name), target]);
const executable = require('@playwright/test').webkit.executablePath();
const bundle = path.join(path.dirname(executable), 'minibrowser-gtk');
const libraries = path.join(target, 'usr/lib/x86_64-linux-gnu');
const launcher = path.join(os.tmpdir(), 'hw04-webkit-launch.sh');
const quote = s => "'" + s.replaceAll("'", "'\\''") + "'";
fs.writeFileSync(launcher, `#!/bin/sh\nexport WEBKIT_EXEC_PATH=${quote(path.join(bundle,'bin'))}\nexport WEBKIT_INJECTED_BUNDLE_PATH=${quote(path.join(bundle,'lib'))}\nexport LD_LIBRARY_PATH=${quote([path.join(bundle,'lib'),path.join(bundle,'sys/lib'),libraries].join(':'))}\nexport WEBKIT_FORCE_COMPLEX_TEXT=1\nexec ${quote(path.join(bundle,'bin/MiniBrowser'))} "$@"\n`, { mode: 0o755 });
console.log(`WEBKIT_EXECUTABLE_PATH=${launcher}`);
