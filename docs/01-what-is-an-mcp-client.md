# 01. What Is an MCP Client?

## The short answer

An **MCP client** is the part of an AI application that knows how to talk to **MCP servers**.

MCP stands for **Model Context Protocol**. Think of it like a universal plug: instead of every AI tool inventing its own way to reach your files, your calendar, or a database, MCP gives them one shared language. The **client** lives inside the AI app you use (for example, a desktop AI chat app, a code editor with AI features, or a custom assistant). The **server** is a small program that provides access to something useful — your local files, a folder of documents, a website, etc.

Client and server talk to each other over a simple connection. The most common one for beginners is called **stdio**: the server runs as a regular process on your computer, and the client sends it messages over standard input/output (the same streams programs use to print text and read input).

```
You  ──►  AI app (MCP client)  ──►  MCP server  ──►  your files/folders
```

## What the client actually does

When you ask an AI assistant to "read my notes" or "list the files in this folder," here is what happens under the hood:

1. **The client tells the AI what tools are available.** It asks the MCP server, "What can you do?" The server answers with a list of capabilities, called **tools** (for example, `read_file`, `list_directory`). The client shares those tool names and descriptions with the AI model.
2. **The AI decides which tool to use.** If you ask to read a file, the AI picks the `read_file` tool and tells the client which file to open.
3. **The client sends the request to the server.** It packages the request as a small JSON message and sends it to the server over the connection.
4. **The server does the work.** It reads the file from your disk, for example.
5. **The client hands the result back to the AI.** The AI reads the result and writes its answer to you.

The client never changes your files on its own. It only carries messages between the AI and the server, and it only does what you (through the AI) ask it to.

## Why this matters for beginners

Before MCP, if you wanted an AI to read your local files, you usually had to paste the file contents into the chat yourself, or use a custom integration built by the AI app's maker. MCP changes that:

- **One standard.** Many AI apps can use the same MCP servers.
- **Local-first.** Servers run on your computer and access your files directly — nothing has to be uploaded to a third-party server just so an AI can read it.
- **You stay in control.** You choose which servers to install, which folders they can see, and you can remove them at any time.

## Clients vs. servers (keep these straight)

| | MCP Client | MCP Server |
|---|---|---|
| Lives in | The AI app you use | A small program you run |
| Job | Carries messages, shows tools to the AI | Does the actual work (reads files, etc.) |
| Example | Desktop AI chat app, AI code editor | Filesystem server, local document server |
| You install | Comes with the AI app | You choose and add it |

## What you need for this guide

- A computer (Windows, Mac, or Linux)
- Node.js (to run the example server in section 03) — download from nodejs.org
- An MCP client app of your choice. We will use examples that work with any stdio-capable MCP client, and we will also test the example server directly with a small script so you do not even need a client app to get started.

## Safety preview

Letting an AI read your files is convenient, but it deserves care. Section 04 covers safety rules in detail, and `checklists/checklist-03-safety-review.md` gives you a quick safety review to do before connecting any server to your folders.

## Next step

Continue to `02-connecting-local-files-folders.md` to connect an MCP client to local files and folders.

---

**Credit:** Written and published by **Asdale Dynamics, LLC** (Indiana, formed October 2026). Dylan Asdale — registered nurse, AI author, founder of Asdale Dynamics, LLC. Book: *The Massive AI Manual* — hub site: dylanasdale.github.io

**License:** MIT License. Copyright (c) 2026 Asdale Dynamics, LLC.
