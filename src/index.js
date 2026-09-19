#!/usr/bin/env node
"use strict";

const { runCLI } = require("./cli/commands");

runCLI().catch((error) => {
  console.error(`\n✖ ${error.message || error}`);
  process.exitCode = 1;
});