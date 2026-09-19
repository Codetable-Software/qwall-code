const { fetchJSON } = require("./_http");
class OpenRouterProvider {
  constructor(apiKey) { this.apiKey = apiKey; }
  async chat(model, history, input) {
    const data = await fetchJSON("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://qwall.dev",
        "X-Title": "Qwall Code"
      },
      body: JSON.stringify({ model, messages: [...history, { role: "user", content: input }] })
    });
    return data.choices?.[0]?.message?.content || JSON.stringify(data);
  }
}
module.exports = OpenRouterProvider;