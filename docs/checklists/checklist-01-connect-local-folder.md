# Checklist 1 — Connect a Local Folder to an MCP Client

Goal: Connect an MCP client to one local folder so an AI can read files in it.

### Before you start
- [ ] I have an MCP-capable AI app installed (desktop AI chat or AI code editor)
- [ ] I have picked ONE specific folder to share
- [ ] The folder contains no secrets (passwords, keys, IDs, tax, medical, bank data)
- [ ] The folder contains no other people's personal data

### Steps
- [ ] Open the app's MCP settings (look for "MCP," "servers," or "integrations")
- [ ] Add a new filesystem server
- [ ] Enter the server command (per your app's docs, e.g. a filesystem server)
- [ ] Pass my chosen folder as an argument to the server
- [ ] Save and confirm the server shows as "connected"
- [ ] Ask the AI: "List the files in my shared folder"
- [ ] Confirm the AI lists only files from my chosen folder
- [ ] Ask the AI to read one file and summarize it
- [ ] Confirm the answer matches the file contents

### When you are done
- [ ] Remove the server from the app's MCP settings, or keep it if you still need it
- [ ] Stop the server process if it is still running

**If any step fails:** check the folder path, confirm the folder exists, and check the app's server status page. See `docs/02-connecting-local-files-folders.md`.

---

**Credit:** Asdale Dynamics, LLC (Indiana, formed October 2026). MIT License — Copyright (c) 2026 Asdale Dynamics, LLC.
