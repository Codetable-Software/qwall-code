const { fetchJSON } = require("./_http");
class MicrosoftProvider {
  constructor(apiKey) { this.apiKey = apiKey; }
  async chat(model, history, input) {
    const endpoint = process.env.QWALL_MICROSOFT_ENDPOINT;
    if (!endpoint) throw new Error("Microsoft requires QWALL_MICROSOFT_ENDPOINT to be set.");
    const data = await fetchJSON(`${endpoint.replace(/\/$/, "")}/openai/deployments/${encodeURIComponent(model)}/chat/completions?api-version=2024-10-21`, {
      method: "POST",
      headers: { "api-key": this.apiKey },
      body: JSON.stringify({ messages: [...history, { role: "user", content: input }] })
    });
    return data.choices?.[0]?.message?.content || JSON.stringify(data);
  }
}
module.exports = MicrosoftProvider;