# Glossary

Plain-English definitions for terms used in this manual.

**AI provider** — The company that runs the AI model you chat with (for example, the maker of your AI app). File contents you ask the AI to read may be sent to the provider to generate an answer.

**Client (MCP client)** — The part of an AI app that talks to MCP servers. It shows the AI which tools are available and carries messages back and forth.

**Folder** — Also called a directory. A container for files on your computer.

**JSON-RPC** — A simple message format used by MCP. Each message is a small piece of JSON with an ID, a method name, and optional data. The client and server send these messages back and forth.

**MCP** — Model Context Protocol. A shared language that lets AI apps connect to servers that provide tools and data.

**MCP server** — A small program that provides capabilities to an AI client, such as reading files from a folder.

**Server command** — The command you type (or paste into your MCP client settings) to start an MCP server.

**Stdio** — Standard input/output. A way for programs to exchange text. An stdio MCP server reads messages from standard input and writes replies to standard output.

**Tool** — A capability an MCP server offers, such as `read_file` or `list_directory`. The AI chooses which tool to use, and the client runs it.

**Universal plug** — A way to think about MCP: one standard connection instead of a different custom connection for every AI app and every data source.

---

**Credit:** Asdale Dynamics, LLC (Indiana, formed October 2026). MIT License — Copyright (c) 2026 Asdale Dynamics, LLC.
