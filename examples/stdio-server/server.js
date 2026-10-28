#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const SERVER_NAME = 'example-stdio-filesystem';
const SERVER_VERSION = '1.0.0';
const PROTOCOL_VERSION = '2024-11-05';

// The folder this server may read. First argument wins, otherwise the
// example-data/ folder next to this file. Only this folder and its contents
// are ever accessible.
const allowedRoot = path.normalize(process.argv[2] || path.resolve(__dirname, 'example-data'));

function isPathAllowed(requestedPath) {
  const resolved = path.resolve(allowedRoot, requestedPath);
  if (resolved === allowedRoot) {
    return true;
  }
  const relative = path.relative(allowedRoot, resolved);
  return !relative.startsWith('..') && !path.isAbsolute(relative);
}

function listDirectory(requestedPath) {
  if (!isPathAllowed(requestedPath)) {
    throw new Error('Path is outside the allowed folder');
  }
  const fullPath = path.resolve(allowedRoot, requestedPath);
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  return entries.map((entry) => ({
    name: entry.name,
    type: entry.isDirectory() ? 'directory' : 'file',
  }));
}

function readFile(requestedPath) {
  if (!isPathAllowed(requestedPath)) {
    throw new Error('Path is outside the allowed folder');
  }
  const fullPath = path.resolve(allowedRoot, requestedPath);
  const stat = fs.statSync(fullPath);
  if (!stat.isFile()) {
    throw new Error('Not a file');
  }
  return fs.readFileSync(fullPath, 'utf8');
}

const tools = [
  {
    name: 'list_directory',
    description: 'List the files and folders inside a folder within the allowed root.',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Folder path relative to the allowed root (default: root)' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'read_file',
    description: 'Read the text contents of a file within the allowed root.',
    inputSchema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'File path relative to the allowed root' },
      },
      required: ['path'],
      additionalProperties: false,
    },
  },
];

function handleRequest(message) {
  const id = message.id;
  const method = message.method;
  const params = message.params || {};

  try {
    if (method === 'initialize') {
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: PROTOCOL_VERSION,
          capabilities: { tools: {} },
          serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
        },
      };
    }

    if (method === 'tools/list') {
      return { jsonrpc: '2.0', id, result: { tools } };
    }

    if (method === 'tools/call') {
      const name = params.name;
      const args = params.arguments || {};
      let resultText;

      if (name === 'list_directory') {
        const entries = listDirectory(args.path || '.');
        resultText = entries.length === 0 ? '(empty)' : entries.map((e) => (e.type === 'directory' ? `[dir] ${e.name}` : `[file] ${e.name}`)).join('\n');
      } else if (name === 'read_file') {
        resultText = readFile(args.path);
      } else {
        throw new Error('Unknown tool: ' + name);
      }

      return {
        jsonrpc: '2.0',
        id,
        result: { content: [{ type: 'text', text: resultText }] },
      };
    }

    throw new Error('Unknown method: ' + method);
  } catch (err) {
    return {
      jsonrpc: '2.0',
      id,
      error: { code: -32603, message: err.message },
    };
  }
}

const rl = readline.createInterface({ input: process.stdin });

process.stdout.write('');

rl.on('line', (line) => {
  const trimmed = line.trim();
  if (trimmed.length === 0) {
    return;
  }
  let message;
  try {
    message = JSON.parse(trimmed);
  } catch (err) {
    process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }) + '\n');
    return;
  }
  const response = handleRequest(message);
  process.stdout.write(JSON.stringify(response) + '\n');
});
