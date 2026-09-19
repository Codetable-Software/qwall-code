const readline = require("node:readline");

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
  });
}

function ask(rl, label) {
  return new Promise((resolve) => {
    rl.question(`${label} > `, resolve);
  });
}

function select(message, choices) {
  return new Promise((resolve) => {
    console.log(`\n${message}:`);
    choices.forEach((choice, i) => console.log(`  ${i + 1}) ${choice}`));
    const rl = createInterface();
    rl.question("Select: ", (answer) => {
      rl.close();
      const n = Number.parseInt(answer, 10);
      if (!Number.isInteger(n) || n < 1 || n > choices.length) {
        console.log("Invalid selection.");
        return resolve(select(message, choices));
      }
      resolve(choices[n - 1]);
    });
  });
}

function password(message) {
  return new Promise((resolve) => {
    if (!process.stdin.isTTY) {
      const rl = createInterface();
      rl.question(`${message}: `, (answer) => {
        rl.close();
        resolve(answer);
      });
      return;
    }

    process.stdout.write(`${message}: `);
    const stdin = process.stdin;
    const wasRaw = stdin.isRaw;
    let value = "";

    const cleanup = () => {
      stdin.setRawMode(wasRaw || false);
      stdin.pause();
      stdin.removeListener("data", onData);
    };

    const onData = (chunk) => {
      const key = String(chunk);
      if (key === "\r" || key === "\n") {
        process.stdout.write("\n");
        cleanup();
        resolve(value);
      } else if (key === "\u0003") {
        cleanup();
        process.stdout.write("\n");
        process.exit(130);
      } else if (key === "\u007f") {
        if (value.length) value = value.slice(0, -1);
      } else {
        value += key;
      }
    };

    stdin.resume();
    stdin.setRawMode(true);
    stdin.on("data", onData);
  });
}

module.exports = { createInterface, ask, select, password };