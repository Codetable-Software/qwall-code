const { run } = require("./terminal");

function status(cwd = process.cwd()) {
  return run("git", ["status", "--short"], { cwd });
}

module.exports = { status };