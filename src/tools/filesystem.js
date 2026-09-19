const fs = require("node:fs");
const path = require("node:path");

function read(file) { return fs.readFileSync(path.resolve(file), "utf8"); }
function write(file, content) {
  const target = path.resolve(file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
}
function exists(file) { return fs.existsSync(path.resolve(file)); }

module.exports = { read, write, exists };