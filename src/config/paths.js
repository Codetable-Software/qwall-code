const os = require("node:os");
const path = require("node:path");

const QWALL_DIR = path.join(os.homedir(), ".qwall");
const CONFIG_FILE = path.join(QWALL_DIR, "config.json");

module.exports = { QWALL_DIR, CONFIG_FILE };