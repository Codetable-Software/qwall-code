const readline = require("node:readline");
const fs = require("node:fs");
const path = require("node:path");
const { createInterface, ask, select, password } = require("./prompts");
const ui = require("./ui");
const config = require("../config/config");
const models = require("../config/models");
const { createProvider } = require("../providers");
const { runAgent } = require("../agent/agent");

async function setup() {
  const provider = await select("Choose an AI provider", Object.keys(models.PROVIDERS));
  const apiKey = await password(`API key for ${provider}`);
  if (!apiKey.trim()) throw new Error("API key cannot be empty.");

  const available = models.PROVIDERS[provider] || [];
  const model = await select("Choose a model", available.length ? available : ["custom"]);
  config.setProvider(provider, apiKey.trim(), model);

  ui.success(`Configured ${provider} / ${model}`);
}

function showProvider() {
  const c = config.getConfig();
  ui.info(`Provider: ${c.provider || "not configured"}`);
  ui.info(`Model: ${c.model || "not configured"}`);
  if (c.provider) ui.info(`API key: ${config.maskKey(c.apiKeys[c.provider])}`);
}

function showModels() {
  const c = config.getConfig();
  if (!c.provider) return ui.warn("No provider configured. Run: qwall setup");
  console.log(`\nModels for ${c.provider}:`);
  for (const m of (models.PROVIDERS[c.provider] || [])) console.log(`  ${m}`);
}

async function chat() {
  const c = config.getConfig();
  if (!c.provider || !c.apiKeys[c.provider]) {
    ui.warn("No AI provider configured. Run: qwall setup");
    return;
  }
  ui.header("Qwall Code");
  ui.info(`${c.provider} / ${c.model}`);
  console.log("Type /help for commands, /exit to quit.\n");

  const rl = createInterface();
  let history = [];
  while (true) {
    const input = await ask(rl, "You");
    if (!input.trim()) continue;
    if (input === "/exit" || input === "/quit") break;
    if (input === "/clear") {
      history = [];
      ui.success("Conversation cleared.");
      continue;
    }
    if (input === "/provider") {
      showProvider();
      continue;
    }
    if (input === "/model") {
      showModels();
      continue;
    }
    if (input === "/help") {
      console.log("\n/help   Show commands\n/clear  Clear conversation\n/provider Show provider\n/model  Show model\n/exit   Exit\n");
      continue;
    }

    try {
      process.stdout.write("\nQwall > ");
      const provider = createProvider(c.provider, c.apiKeys[c.provider]);
      const answer = await provider.chat(c.model, history, input);
      console.log(answer + "\n");
      history.push({ role: "user", content: input });
      history.push({ role: "assistant", content: answer });
    } catch (e) {
      console.log(`\n✖ ${e.message}\n`);
    }
  }
  rl.close();
}

async function code() {
  const c = config.getConfig();
  if (!c.provider || !c.apiKeys[c.provider]) {
    ui.warn("No AI provider configured. Run: qwall setup");
    return;
  }

  ui.header("Qwall Code Agent");
  ui.info(`Provider: ${c.provider} / ${c.model}`);
  ui.info(`Workspace: ${process.cwd()}`);
  console.log("Type /exit to stop.\n");

  const rl = createInterface();
  while (true) {
    const input = await ask(rl, "You");
    if (!input.trim()) continue;
    if (input === "/exit" || input === "/quit") break;
    try {
      await runAgent({
        providerName: c.provider,
        apiKey: c.apiKeys[c.provider],
        model: c.model,
        prompt: input,
        cwd: process.cwd()
      });
    } catch (e) {
      console.log(`\n✖ ${e.message}\n`);
    }
  }
  rl.close();
}

async function runCLI() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === "setup") return setup();
  if (command === "chat") return chat();
  if (command === "code" || command === "agent") return code();
  if (command === "provider") {
    if (args[1] === "list") return console.log(Object.keys(models.PROVIDERS).join("\n"));
    if (args[1] === "show" || !args[1]) return showProvider();
  }
  if (command === "model") return showModels();
  if (command === "config") {
    if (args[1] === "reset") {
      config.reset();
      return ui.success("Configuration reset.");
    }
    return showProvider();
  }
  if (command === "version" || command === "--version" || command === "-v") {
    console.log(require("../../package.json").version);
    return;
  }
  if (command === "help" || command === "--help" || command === "-h") return ui.help();

  if (!command) {
    ui.header("Qwall Code");
    ui.info("AI coding agent CLI");
    console.log("\n  qwall setup     Configure provider and API key");
    console.log("  qwall chat      Chat with AI in the terminal");
    console.log("  qwall code      Start the coding agent");
    console.log("  qwall provider  Show configured provider");
    console.log("  qwall model     Show configured model");
    console.log("  qwall config    Show configuration");
    console.log("  qwall help      Show help\n");
    return;
  }

  ui.error(`Unknown command: ${command}`);
  ui.help();
}

module.exports = { runCLI };