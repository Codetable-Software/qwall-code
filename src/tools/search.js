const fs = require("node:fs");
const path = require("node:path");

function search(root, term) {
  const matches = [];
  function walk(dir, depth = 0) {
    if (depth > 3 || matches.length >= 100) return;
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      if (["node_modules", ".git", "dist", "build"].includes(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full, depth + 1);
      else {
        try {
          const text = fs.readFileSync(full, "utf8");
          if (text.includes(term)) matches.push(path.relative(root, full));
        } catch {}
      }
    }
  }
  walk(root);
  return matches;
}

module.exports = { search };