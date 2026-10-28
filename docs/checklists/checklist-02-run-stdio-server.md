# Checklist 2 — Run Your First stdio MCP Server

Goal: Build and run the example stdio MCP server, and confirm it answers over stdio.

### Before you start
- [ ] Node.js is installed (`node --version` prints a version number)
- [ ] You are in the project folder: `mcp-client-first-steps-guide`

### Steps
- [ ] Look at `examples/stdio-server/server.js` — note it needs only Node.js
- [ ] Look at `examples/stdio-server/example-data/` — the safe demo folder
- [ ] Run the test script:

```bash
node examples/stdio-server/test-server.js
```

- [ ] Confirm output ends with `[test] ALL TESTS PASSED`
- [ ] (Optional) Start the server directly and send it messages by hand:

```bash
node examples/stdio-server/server.js
```

- [ ] (Optional) Send `initialize`, `tools/list`, and `tools/call` messages and check the replies
- [ ] Press `Ctrl+C` to stop the server

### What success looks like
- The test script starts the server, lists its tools, lists the demo folder, reads a file, and prints `ALL TESTS PASSED`.
- The server only reads from `example-data/` and rejects paths that try to escape it.

**If something fails:** confirm you ran the command from the project folder and that Node.js is installed. See `docs/03-running-first-stdio-server.md`.

---

**Credit:** Asdale Dynamics, LLC (Indiana, formed October 2026). MIT License — Copyright (c) 2026 Asdale Dynamics, LLC.
