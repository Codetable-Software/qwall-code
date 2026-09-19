const fs = require("node:fs");
const { QWALL_DIR, CONFIG_FILE } = require("./paths");

const defaults = {
  provider: null,
  model: null,
  apiKeys: {}
};

function ensureDir() {
  fs.mkdirSync(QWALL_DIR, { recursive: true, mode: 0o700 });
}

function getConfig() {
  ensureDir();
  if (!fs.existsSync(CONFIG_FILE)) return { ...defaults, apiKeys: {} };
  try {
    const data = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));
    return { ...defaults, ...data, apiKeys: { ...(data.apiKeys || {}) } };
  } catch {
    throw new Error(`Invalid Qwall config: ${CONFIG_FILE}`);
  }
}

function save(data) {
  ensureDir();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2), { mode: 0o600 });
}

function setProvider(provider, apiKey, model) {
  const data = getConfig();
  data.provider = provider;
  data.model = model;
  data.apiKeys[provider] = apiKey;
  save(data);
}

function reset() {
  ensureDir();
  if (fs.existsSync(CONFIG_FILE)) fs.rmSync(CONFIG_FILE);
}

function maskKey(key) {
  if (!key) return "not configured";
  if (key.length <= 8) return "********";
  return `${key.slice(0, 4)}${"*".repeat(Math.max(4, key.length - 8))}${key.slice(-4)}`;
}

module.exports = { getConfig, setProvider, reset, maskKey, CONFIG_FILE };