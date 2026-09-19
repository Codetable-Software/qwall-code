const { fetchJSON } = require("./_http");
class OpenAIProvider {
  constructor(apiKey) { this.apiKey = apiKey; }
  async chat(model, history, input) {
    const messages = [...history, { role: "user", content: input }];
    const data = await fetchJSON("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${this.apiKey}` },
      body: JSON.stringify({ model, messages })
    });
    return data.choices?.[0]?.message?.content || JSON.stringify(data);
  }
}
module.exports = OpenAIProvider;