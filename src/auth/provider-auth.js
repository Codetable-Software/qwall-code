function validateApiKey(apiKey) {
  if (typeof apiKey !== "string" || !apiKey.trim()) {
    throw new Error("API key is required.");
  }
  return apiKey.trim();
}

module.exports = { validateApiKey };