const { createInterface, ask } = require("./prompts");

async function interactive(prompt, handler) {
  const rl = createInterface();
  while (true) {
    const input = await ask(rl, prompt);
    if (input === "/exit") break;
    await handler(input);
  }
  rl.close();
}

module.exports = { interactive };