# Example stdio MCP Server

A tiny, dependency-free Model Context Protocol (MCP) server you can run and test yourself. It speaks MCP over stdio (standard input/output) and needs only Node.js.

## What it does

Two tools, both read-only and limited to one folder:

- `list_directory` — list the entries in a folder
- `read_file` — read the text contents of a file

The server only sees the folder you give it (default: `example-data/`). It rejects paths that try to escape that folder. It cannot write, rename, or delete anything.

## Files

| File | Purpose |
|------|---------|
| `server.js` | The stdio MCP server (Node.js, no dependencies) |
| `test-server.js` | Test script: starts the server and exchanges MCP messages over stdio |
| `example-data/` | Safe demo files (`welcome.txt`, `notes.md`) |
| `README.md` | This file |

## Run it

```bash
node test-server.js
```

Expected output ends with:

```
[test] ALL TESTS PASSED
```

## Try it by hand

```bash
node server.js
```

Then paste JSON-RPC messages and press Enter:

```json
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}
```

Press `Ctrl+C` to stop the server.

## Safety

This example is a read-only sandbox for learning. Before connecting any server to your personal folders, read `docs/04-safety-rules.md` and work through `docs/checklists/checklist-03-safety-review.md`.

## Credit

Written and published by **Asdale Dynamics, LLC** (Indiana, formed October 2026).
MIT License — Copyright (c) 2026 Asdale Dynamics, LLC.
