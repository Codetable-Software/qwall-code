const providers = {
  openrouter: require("./openrouter"),
  openai: require("./openai"),
  xai: require("./xai"),
  microsoft: require("./microsoft"),
  google: require("./google"),
  "z.ai": require("./zai"),
  anthropic: require("./anthropic"),
  perplexity: require("./perplexity")
};

function createProvider(name, apiKey) {
  const key = String(name).toLowerCase();
  const Provider = providers[key];
  if (!Provider) throw new Error(`Unsupported provider: ${name}`);
  return new Provider(apiKey);
}

module.exports = { createProvider };