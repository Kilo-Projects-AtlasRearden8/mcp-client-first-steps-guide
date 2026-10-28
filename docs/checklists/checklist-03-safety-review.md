# Checklist 3 — Safety Review Before Connecting a Server to Files

Goal: Confirm it is safe to let an MCP server read files on your computer.

### Before connecting any server to local files
- [ ] I chose ONE specific folder to share, not my whole computer
- [ ] The shared folder has no passwords, API keys, or secret tokens
- [ ] The shared folder has no tax returns, medical records, IDs, or bank statements
- [ ] The shared folder has no other people's personal data
- [ ] The server is read-only, or I understand and accept its write access
- [ ] I read the server's description and know what it can do
- [ ] I know how to remove the server in my MCP client's settings
- [ ] I understand the AI provider may see the file contents I ask it to read
- [ ] I am practicing with demo files first (like `examples/stdio-server/example-data/`)

### After connecting
- [ ] The server only sees the folder I chose
- [ ] I asked the AI to read only files inside that folder
- [ ] I removed the server when I no longer needed it

### If you cannot check every box
Stop. Move sensitive files out of the folder, pick a different folder, or choose a different server. Never connect secrets to an MCP server.

---

**Credit:** Asdale Dynamics, LLC (Indiana, formed October 2026). MIT License — Copyright (c) 2026 Asdale Dynamics, LLC.
