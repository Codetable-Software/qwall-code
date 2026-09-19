const fs = require("node:fs");
const path = require("node:path");

const IGNORE = new Set(["node_modules", ".git", ".qwall", "dist", "build"]);

function walk(dir, root, result, depth = 0) {
  if (depth > 2) return;
  let entries = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }

  for (const entry of entries) {
    if (IGNORE.has(entry.name) || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full);
    if (entry.isDirectory()) walk(full, root, result, depth + 1);
    else result.push(rel);
    if (result.length >= 200) return;
  }
}

function getProjectContext(cwd) {
  const files = [];
  walk(cwd, cwd, files);
  return { cwd, files };
}

module.exports = { getProjectContext };