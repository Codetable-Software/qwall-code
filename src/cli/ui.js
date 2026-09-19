function header(title) {
  console.log(`\n╭──────────────────────────────────────╮`);
  console.log(`│ ${title.padEnd(36)} │`);
  console.log(`╰──────────────────────────────────────╯\n`);
}

function success(message) { console.log(`✓ ${message}`); }
function info(message) { console.log(`• ${message}`); }
function warn(message) { console.log(`⚠ ${message}`); }
function error(message) { console.error(`✖ ${message}`); }

function help() {
  console.log(`
Qwall Code - AI coding agent CLI

Commands:
  qwall setup       Configure provider, API key and model
  qwall chat        Chat with an AI in the terminal
  qwall code        Start the coding agent
  qwall agent       Alias for qwall code
  qwall provider    Show configured provider
  qwall model       Show configured model
  qwall config      Show configuration
  qwall config reset
  qwall version
  qwall help
`);
}

module.exports = { header, success, info, warn, error, help };