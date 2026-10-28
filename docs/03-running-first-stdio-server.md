# 03. Running Your First stdio MCP Server

## The idea

In this section you will run a real, tiny MCP server that speaks over **stdio** (standard input/output). You will send it MCP messages and get real answers back — no AI app required yet.

The example server lives in `examples/stdio-server/`. It needs only Node.js — no npm install, no API keys, no internet after you have the files.

## What the example server does

It is a minimal filesystem-style MCP server with two tools:

- `list_directory` — lists the entries in a folder you choose
- `read_file` — reads the text contents of a file you choose

It only sees the folder you point it at (by default, an `example-data/` folder next to the server), so it is safe to experiment with.

## The files

```
examples/stdio-server/
├── server.js        # the stdio MCP server
├── test-server.js   # test script: starts the server and chats over stdio
├── example-data/    # safe demo files the server can read
│   ├── welcome.txt
│   └── notes.md
└── README.md
```

## Run the test

Open a terminal in the project folder and run:

```bash
node examples/stdio-server/test-server.js
```

You should see output like:

```
[test] initialize -> server accepted, capabilities: tools
[test] list tools -> list_directory, read_file
[test] list_directory(example-data) -> notes.md, welcome.txt
[test] read_file(example-data/welcome.txt) -> 'Welcome to your first MCP server!'
[test] ALL TESTS PASSED
```

If you see `ALL TESTS PASSED`, the server works.

## Try the server directly (optional)

You can also drive the server by hand. In one terminal, start the server:

```bash
node examples/stdio-server/server.js
```

It waits for JSON messages on standard input. In another terminal (or the same one, if you can send input to the process), send an initialize message:

```json
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0.0"}}}
```

The server replies with something like:

```json
{"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2024-11-05","capabilities":{"tools":{}},"serverInfo":{"name":"example-stdio-filesystem","version":"1.0.0"}}}
```

Then list tools:

```json
{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}
```

And call one:

```json
{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"read_file","arguments":{"path":"example-data/welcome.txt"}}}
```

Press `Ctrl+C` to stop the server when you are done.

## How the server works (short version)

`server.js` does four things:

1. Reads lines from standard input.
2. Parses each line as a JSON-RPC 2.0 message.
3. Handles three methods: `initialize`, `tools/list`, and `tools/call`.
4. Writes JSON-RPC responses to standard output.

For `tools/call`, it checks the requested path against the allowed folder, reads the file, and returns the text. Paths that try to escape the allowed folder (for example, with `..`) are rejected — that is one of the safety rules in section 04, built into the code.

## Next step

Now that you have seen a server run, read `04-safety-rules.md` before connecting any server to your personal folders. Then work through the checklists in `checklists/`.

---

**Credit:** Written and published by **Asdale Dynamics, LLC** (Indiana, formed October 2026). Dylan Asdale — registered nurse, AI author, founder of Asdale Dynamics, LLC. Book: *The Massive AI Manual* — hub site: dylanasdale.github.io

**License:** MIT License. Copyright (c) 2026 Asdale Dynamics, LLC.
