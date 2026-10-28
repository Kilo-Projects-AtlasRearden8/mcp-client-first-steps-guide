# 02. Connecting an MCP Client to Local Files and Folders

## The idea

You have folders of documents, notes, or books on your computer. You want an AI assistant to read them and answer questions — without you copying and pasting everything into the chat. An MCP **filesystem server** gives the AI controlled access to chosen folders on your machine.

This section shows you how to connect a client to local files and folders, step by step. We use a filesystem MCP server as the example, because it is the most common first server people run.

## Step 1: Pick the folders you want to share

Before installing anything, decide exactly which folders the AI may see. Good choices:

- A dedicated folder you create for this purpose, such as `~/ai-readable/`
- A specific project folder
- Your notes or drafts folder

Avoid sharing:

- Your whole home directory (`~` or `C:\Users\you`)
- Folders with passwords, tax documents, medical records, IDs, or bank statements
- System folders or folders belonging to other people on the computer

**Rule of thumb:** share only what you would be comfortable showing the AI. You can always add more folders later; removing access is harder once files have been read.

## Step 2: Install the MCP client app

If you do not already have an MCP client, install one. Examples of MCP-capable apps include desktop AI chat applications and AI-enabled code editors. Look in the app's settings for "MCP," "servers," "integrations," or "extensions."

Each client has its own way to add a server. The steps below describe the typical pattern; your app's help pages will have the exact menu names.

## Step 3: Add the filesystem server

In the client's MCP settings, add a new server. You will usually provide:

- A name for the server (for example, "My Files")
- The command to run the server (for example, `npx @modelcontextprotocol/server-filesystem` or the path to a local server program)
- The folders you want to share, passed as arguments to the server command

Example (exact syntax depends on your client):

```
Command: npx
Args: @modelcontextprotocol/server-filesystem /home/dylan/ai-readable
```

The client starts the server program, and the server opens only the folders you listed.

## Step 4: Confirm the connection

After adding the server, the client should show it as "connected" or list its available tools. Common tools from a filesystem server:

- `list_directory` — list the files and folders in a shared folder
- `read_file` — read the contents of a shared file

Try asking the AI: "List the files in my shared folder." If it replies with a file list, the connection works.

## Step 5: Try reading a file

Ask the AI to read a specific file in a shared folder:

> "Read `notes.txt` from my shared folder and summarize it."

The AI uses the `read_file` tool through the client, the server reads the file from disk, and the AI answers based on the contents.

## Step 6: Disconnect when you are done

When you no longer need the AI to see those files, remove the server in the client's MCP settings and stop the server process. The AI loses access immediately.

## What the connection looks like

```
You ask AI to read a file
    │
    ▼
AI app (MCP client)
    │ sends request over stdio
    ▼
Filesystem MCP server (runs on your computer)
    │ reads the file from your disk
    ▼
Your local folder
    │ sends file contents back
    ▼
Filesystem MCP server  ──►  MCP client  ──►  AI answer to you
```

The files stay on your computer. The server reads them and sends the contents to the client; nothing is uploaded to a third party just for this step (though the AI provider may still process the contents — see section 04).

## Troubleshooting

| Problem | Likely fix |
|---------|------------|
| Server won't start | Check the command and path are correct; make sure Node.js is installed if the server needs it |
| Client can't see the folder | Confirm the folder path is absolute and the folder exists |
| AI says it has no file tools | The server may not be connected; check the client's server status |
| "Permission denied" | The user account running the client needs read access to the folder |

## Next step

Continue to `03-running-first-stdio-server.md` to build and run your own tiny stdio MCP server from scratch.

---

**Credit:** Written and published by **Asdale Dynamics, LLC** (Indiana, formed October 2026). Dylan Asdale — registered nurse, AI author, founder of Asdale Dynamics, LLC. Book: *The Massive AI Manual* — hub site: dylanasdale.github.io

**License:** MIT License. Copyright (c) 2026 Asdale Dynamics, LLC.
