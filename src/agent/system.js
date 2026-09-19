function buildSystemPrompt(context) {
  return [
    "You are Qwall Code, an AI coding assistant.",
    "Be concise, accurate, and practical.",
    "The user is working in a local project.",
    `Workspace: ${context.cwd}`,
    `Visible project files: ${context.files.join(", ") || "(none)"}`
  ].join("\n");
}

module.exports = { buildSystemPrompt };