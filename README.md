# Qwall Code

Qwall Code is a Node.js CLI for chatting with AI models and starting an AI coding-agent workflow directly from the terminal.

## Install

```bash
npm install -g qwall-code
```

Then:

```bash
qwall setup
```

Choose a provider, enter its API key, and choose a model.

## Commands

```bash
qwall
qwall setup
qwall chat
qwall code
qwall agent
qwall provider
qwall provider list
qwall model
qwall config
qwall config reset
qwall version
```

## Providers

- OpenRouter
- OpenAI
- xAI
- Microsoft
- Google
- Z.ai
- Anthropic
- Perplexity

Credentials are stored locally in `~/.qwall/config.json` with restrictive file permissions.

## Microsoft

For Azure OpenAI, configure the endpoint before using the Microsoft provider:

```bash
QWALL_MICROSOFT_ENDPOINT="https://YOUR-RESOURCE.openai.azure.com" qwall chat
```

The model value is treated as the Azure deployment name.

## Requirements

Node.js 18.17 or newer.

## License

MIT
