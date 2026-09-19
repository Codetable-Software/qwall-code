const { fetchJSON } = require("./_http");
class GoogleProvider {
  constructor(apiKey) { this.apiKey = apiKey; }
  async chat(model, history, input) {
    const contents = [...history, { role: "user", content: input }].map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(this.apiKey)}`;
    const data = await fetchJSON(url, {
      method: "POST",
      body: JSON.stringify({ contents })
    });
    return data.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("") || JSON.stringify(data);
  }
}
module.exports = GoogleProvider;