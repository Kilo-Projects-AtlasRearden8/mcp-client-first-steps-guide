# MCP Client First Steps

A beginner-friendly manual and static site for learning Model Context Protocol (MCP) clients: what they do, how to connect them to local files and folders, how to run your first stdio MCP server, and the safety rules for letting an AI access your files.

Written in plain English, step by step, never condescending — "like a friend would."

## Who this is for

This guide is written for Dylan Asdale, a registered nurse turned AI author and founder of **Asdale Dynamics, LLC** (Indiana, formed October 2026), and for anyone new to MCP who wants a hands-on, local-first introduction.

Asdale Dynamics, LLC focuses on beginner-friendly AI education, books and guides, and practical tools — including The Massive AI Manual and the hub site dylanasdale.github.io.

## What's inside

| Location | Contents |
|----------|----------|
| `docs/` | Beginner manual in Markdown: MCP client concepts, connecting to local files and folders, running a first stdio server, safety rules, step-by-step checklists, and a glossary. |
| `site/` | A small static HTML site mirroring the manual, with one CSS stylesheet. No build step required — open the `.html` files directly in your browser. |
| `examples/stdio-server/` | A dependency-free Node.js stdio MCP server you can run and test yourself, plus a test script that drives it over stdio. |

## Quick start

Read the manual in order:

1. `docs/01-what-is-an-mcp-client.md` — what MCP clients do
2. `docs/02-connecting-local-files-folders.md` — connecting to local files and folders
3. `docs/03-running-first-stdio-server.md` — running your first stdio server
4. `docs/04-safety-rules.md` — safety rules for letting AI access files
5. `docs/checklists/` — step-by-step checklists for each task

Or open the HTML site: `site/index.html` and the linked pages.

## Try the example server

```bash
cd examples/stdio-server
node test-server.js
```

The script launches the stdio MCP server, speaks the MCP protocol to it, and prints the results. No install needed beyond Node.js.

## Credit

Written and published by **Asdale Dynamics, LLC** (Indiana, formed October 2026).
Dylan Asdale — registered nurse, AI author, founder of Asdale Dynamics, LLC.
Book: *The Massive AI Manual* — hub site: dylanasdale.github.io

## License

MIT License. Copyright (c) 2026 Asdale Dynamics, LLC. See `LICENSE`.
