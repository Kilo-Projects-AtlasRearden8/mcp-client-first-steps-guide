# STATUS.md

## What was built

A beginner manual and static HTML site on MCP (Model Context Protocol) clients, plus a runnable example stdio MCP server. Published by **Asdale Dynamics, LLC** (Indiana, formed October 2026).

### Contents

| Location | Contents |
|----------|----------|
| `README.md` | Project overview, quick start, example-server instructions, credit, license |
| `LICENSE` | MIT License, copyright line exactly `Copyright (c) 2026 Asdale Dynamics, LLC` |
| `docs/index.md` | Manual landing page: who it's for, how to use it, credit |
| `docs/01-what-is-an-mcp-client.md` | What MCP clients do (client vs. server, stdio, why it matters) |
| `docs/02-connecting-local-files-folders.md` | Connecting a client to local files and folders (6 steps, troubleshooting) |
| `docs/03-running-first-stdio-server.md` | Running your first stdio server |
| `docs/04-safety-rules.md` | Safety rules for letting AI access files (golden rules, quick checklist) |
| `docs/checklists/checklist-01-connect-local-folder.md` | Checklist: connect a local folder |
| `docs/checklists/checklist-02-run-stdio-server.md` | Checklist: run your first stdio server |
| `docs/checklists/checklist-03-safety-review.md` | Checklist: safety review before connecting files |
| `docs/glossary.md` | Plain-English glossary |
| `site/index.html` | Static HTML landing page |
| `site/01-what-is-an-mcp-client.html` | HTML: section 1 |
| `site/02-connecting-local-files-folders.html` | HTML: section 2 |
| `site/03-running-first-stdio-server.html` | HTML: section 3 |
| `site/04-safety-rules.html` | HTML: section 4 |
| `site/glossary.html` | HTML: glossary |
| `site/style.css` | Single stylesheet for the static site |
| `examples/stdio-server/server.js` | Dependency-free Node.js stdio MCP server (read-only, path-traversal guarded) |
| `examples/stdio-server/test-server.js` | Test script driving the server over stdio |
| `examples/stdio-server/example-data/welcome.txt` | Demo file |
| `examples/stdio-server/example-data/notes.md` | Demo file |
| `examples/stdio-server/README.md` | Example-server README |
| `STATUS.md` | This file |

### Style & compliance

- Plain English, step by step, never condescending ("like a friend would")
- Local-first: all examples run on the user's computer
- No secrets, API keys, or personal data in any file
- No `.github/workflows` files
- MIT LICENSE with exact copyright line `Copyright (c) 2026 Asdale Dynamics, LLC`
- Asdale Dynamics, LLC credited in README and every doc/HTML page
- Credit: Dylan Asdale, registered nurse, AI author, founder of Asdale Dynamics, LLC; book *The Massive AI Manual*; hub site dylanasdale.github.io

## How to run it

### Read the manual

Open the Markdown files in `docs/` directly, or open the static HTML site in any browser — no build step required:

```
site/index.html
```

### Try the example server

Requires Node.js (tested with Node v20.19.2). No `npm install` needed.

```bash
node examples/stdio-server/test-server.js
```

Expected output:

```
[test] PASS initialize
[test] PASS tools/list
[test] PASS list_directory(root)
[test] PASS read_file(welcome.txt)
[test] PASS read_file(notes.md)
[test] PASS path traversal rejected
[test] PASS unknown tool rejected
[test] 7 passed, 0 failed
[test] ALL TESTS PASSED
```

The server only reads from `examples/stdio-server/example-data/` and rejects path-traversal attempts.

## Verification results

- `node examples/stdio-server/test-server.js` → **7 passed, 0 failed, ALL TESTS PASSED**
- Server handles `initialize`, `tools/list`, `tools/call` (list_directory + read_file)
- Path traversal (`../package.json`) correctly rejected with an error
- Unknown tool (`delete_file`) correctly rejected with an error
- HTML files are static and open directly in a browser (no build step)
- No lint/typecheck tooling configured in this project (single-file Node.js script + Markdown + HTML/CSS)

## Known gaps

- No automated test runner / lint / typecheck tooling configured (project is intentionally minimal: Markdown, HTML/CSS, one Node.js script)
- The static HTML site covers sections 01–04 and the glossary; the checklists remain as Markdown (intentionally printable/copyable checklists)
- No real MCP client app is bundled; the examples demonstrate stdio directly so no client app is required to get started
- Windows path handling in `server.js` uses Node `path` module, which is cross-platform, but the example was only verified on Linux
- Not yet committed to git (git init + commit is the next step)

## Next step

Initialize git and commit all work (plain commit messages, no Co-authored-by trailers, no push, no remote).
