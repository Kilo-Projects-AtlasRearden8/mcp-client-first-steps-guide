# 04. Safety Rules for Letting AI Access Your Files

## Why safety comes first

An MCP server that reads your files can read *everything* in the folders you give it. The AI does not know which files are private unless you limit the server's access. These rules help you share files without sharing secrets.

## The golden rules

1. **Share specific folders, never your whole computer.** Point the server at one dedicated folder (for example, `~/ai-readable/`), not your home directory or entire drive.
2. **Never share folders with secrets.** Keep out of scope: passwords, API keys, tax returns, medical records, IDs, bank statements, and anything with other people's personal data.
3. **Read-only is safer.** Prefer servers that can only read files. If a server can write, rename, or delete, one mistake by the AI can damage your data.
4. **You are in charge.** You choose which servers to add, which folders they see, and you can remove them at any time. Access ends when you remove the server.
5. **Assume the AI provider sees what you send.** File contents the AI reads may be sent to the AI provider's servers to generate an answer. Do not put sensitive files in an MCP-shared folder unless you are comfortable with that.
6. **Review before you connect.** Read a server's description and check what it can do before installing it. Prefer open-source servers you can inspect.
7. **Keep a "demo" folder separate.** Use `examples/stdio-server/example-data/` style folders for practice. Never practice with real documents you cannot afford to lose or share.

## Safety checklist (quick)

Before connecting a server to local files:

- [ ] I chose a single, specific folder to share
- [ ] The folder contains no passwords, keys, IDs, tax, medical, or bank documents
- [ ] The folder contains no other people's personal data
- [ ] The server is read-only (or I understand and accept write access)
- [ ] I know how to remove the server in my client's settings
- [ ] I understand the AI provider may see the file contents I ask it to read

If you cannot check every box, stop and adjust before connecting.

## What the example server does for safety

The example server in `examples/stdio-server/server.js`:

- Only sees the folder you launch it with (default: `example-data/`)
- Rejects paths that try to escape that folder using `..` or absolute paths outside it
- Only implements `list_directory` and `read_file` — no write, delete, or rename

It is a safe sandbox for learning. Treat real servers with more caution.

## If something goes wrong

- Remove the server from your MCP client settings immediately.
- Stop the server process if it is still running.
- Review which files were in the shared folder. If sensitive files were there, treat them as potentially exposed: rotate any passwords or keys found in them, and do not use them again.

## Next step

Work through the checklists in `checklists/` to practice connecting a folder, running a server, and reviewing safety.

---

**Credit:** Written and published by **Asdale Dynamics, LLC** (Indiana, formed October 2026). Dylan Asdale — registered nurse, AI author, founder of Asdale Dynamics, LLC. Book: *The Massive AI Manual* — hub site: dylanasdale.github.io

**License:** MIT License. Copyright (c) 2026 Asdale Dynamics, LLC.
