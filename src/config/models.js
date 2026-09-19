const PROVIDERS = {
  openrouter: [
    "openai/gpt-5.4",
    "anthropic/claude-sonnet-4-6",
    "google/gemini-3-flash"
  ],
  openai: [
    "gpt-5",
    "gpt-5-mini"
  ],
  xai: [
    "grok-4",
    "grok-4-fast"
  ],
  microsoft: [
    "gpt-5"
  ],
  google: [
    "gemini-3-flash-preview",
    "gemini-2.5-flash"
  ],
  "z.ai": [
    "glm-5",
    "glm-4.5"
  ],
  anthropic: [
    "claude-sonnet-4-6",
    "claude-haiku-4-5"
  ],
  perplexity: [
    "sonar-pro",
    "sonar"
  ]
};

module.exports = { PROVIDERS };