const { execFileSync } = require("node:child_process");

function run(command, args = [], options = {}) {
  return execFileSync(command, args, {
    cwd: options.cwd || process.cwd(),
    encoding: "utf8",
    stdio: options.stdio || ["ignore", "pipe", "pipe"],
    timeout: options.timeout || 120000
  });
}

module.exports = { run };