const { fetchJSON } = require("./_http");
class XAIProvider {
  constructor(apiKey) { this.apiKey = apiKey; }
  async chat(model, history, input) {
    const data = await fetchJSON("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({ model, messages: [...history, { role: "user", content: input }] })
    });
    return data.choices?.[0]?.message?.content || JSON.stringify(data);
  }
}
module.exports = XAIProvider;