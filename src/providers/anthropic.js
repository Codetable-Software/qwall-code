const { fetchJSON } = require("./_http");
class AnthropicProvider {
  constructor(apiKey) { this.apiKey = apiKey; }
  async chat(model, history, input) {
    const messages = [...history, { role: "user", content: input }].map(m => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content
    }));
    const data = await fetchJSON("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({ model, max_tokens: 4096, messages })
    });
    return data.content?.map(x => x.text || "").join("") || JSON.stringify(data);
  }
}
module.exports = AnthropicProvider;