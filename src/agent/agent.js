const { createProvider } = require("../providers");
const { buildSystemPrompt } = require("./system");
const { getProjectContext } = require("./context");

async function runAgent({ providerName, apiKey, model, prompt, cwd }) {
  const provider = createProvider(providerName, apiKey);
  const context = getProjectContext(cwd);
  const system = buildSystemPrompt(context);
  const history = [
    { role: "system", content: system },
    { role: "user", content: prompt }
  ];

  process.stdout.write("\nQwall Agent > ");
  const answer = await provider.chat(model, history.slice(0, -1), prompt);
  console.log(answer + "\n");
  return answer;
}

module.exports = { runAgent };