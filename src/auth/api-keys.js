const config = require("../config/config");

function getApiKey(provider) {
  return config.getConfig().apiKeys[provider] || null;
}

function setApiKey(provider, key) {
  const data = config.getConfig();
  data.apiKeys[provider] = key;
  require("node:fs").writeFileSync(config.CONFIG_FILE, JSON.stringify(data, null, 2), { mode: 0o600 });
}

module.exports = { getApiKey, setApiKey };