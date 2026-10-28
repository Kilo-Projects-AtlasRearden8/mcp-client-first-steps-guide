#!/usr/bin/env node
'use strict';

const { spawn } = require('child_process');
const path = require('path');

const serverPath = path.join(__dirname, 'server.js');
const serverRoot = path.join(__dirname, 'example-data');

let passed = 0;
let failed = 0;

function test(name, fn) {
  return Promise.resolve()
    .then(() => fn())
    .then(() => {
      passed += 1;
      process.stdout.write(`[test] PASS ${name}\n`);
    })
    .catch((err) => {
      failed += 1;
      process.stdout.write(`[test] FAIL ${name}: ${err.message}\n`);
    });
}

function startServer() {
  const proc = spawn(process.execPath, [serverPath, serverRoot], {
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  const buf = [];
  let buffer = '';
  proc.stdout.on('data', (chunk) => {
    buffer += chunk.toString();
    let idx;
    while ((idx = buffer.indexOf('\n')) !== -1) {
      buf.push(buffer.slice(0, idx));
      buffer = buffer.slice(idx + 1);
    }
  });

  proc.stderr.on('data', (chunk) => {
    process.stderr.write(chunk);
  });

  function send(message) {
    return new Promise((resolve, reject) => {
      const payload = JSON.stringify(message) + '\n';
      proc.stdin.write(payload);
      const check = () => {
        const line = buf.shift();
        if (line === undefined) {
          setTimeout(check, 10);
          return;
        }
        try {
          resolve(JSON.parse(line));
        } catch (err) {
          reject(new Error('Could not parse server response: ' + line));
        }
      };
      check();
    });
  }

  function stop() {
    try {
      proc.stdin.end();
    } catch (err) {
      // ignore
    }
    proc.kill();
  }

  return { send, stop, proc };
}

async function run() {
  const s = startServer();

  try {
    await test('initialize', async () => {
      const res = await s.send({
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: { name: 'test-client', version: '1.0.0' },
        },
      });
      if (res.jsonrpc !== '2.0' || res.id !== 1) throw new Error('bad response envelope');
      if (!res.result) throw new Error('missing result');
      if (res.result.protocolVersion !== '2024-11-05') throw new Error('bad protocolVersion');
      if (!res.result.serverInfo || res.result.serverInfo.name !== 'example-stdio-filesystem') {
        throw new Error('bad serverInfo');
      }
      if (!res.result.capabilities || !res.result.capabilities.tools) {
        throw new Error('missing tools capability');
      }
    });

    await test('tools/list', async () => {
      const res = await s.send({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} });
      const names = res.result.tools.map((t) => t.name);
      if (!names.includes('list_directory')) throw new Error('missing list_directory');
      if (!names.includes('read_file')) throw new Error('missing read_file');
    });

    await test('list_directory(root)', async () => {
      const res = await s.send({
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/call',
        params: { name: 'list_directory', arguments: { path: '.' } },
      });
      const text = res.result.content[0].text;
      if (!text.includes('welcome.txt')) throw new Error('welcome.txt not listed');
      if (!text.includes('notes.md')) throw new Error('notes.md not listed');
    });

    await test('read_file(welcome.txt)', async () => {
      const res = await s.send({
        jsonrpc: '2.0',
        id: 4,
        method: 'tools/call',
        params: { name: 'read_file', arguments: { path: 'welcome.txt' } },
      });
      const text = res.result.content[0].text;
      if (!text.includes('Welcome to your first MCP server!')) throw new Error('unexpected file contents');
    });

    await test('read_file(notes.md)', async () => {
      const res = await s.send({
        jsonrpc: '2.0',
        id: 5,
        method: 'tools/call',
        params: { name: 'read_file', arguments: { path: 'notes.md' } },
      });
      const text = res.result.content[0].text;
      if (!text.includes('Practice notes')) throw new Error('unexpected file contents');
    });

    await test('path traversal rejected', async () => {
      const res = await s.send({
        jsonrpc: '2.0',
        id: 6,
        method: 'tools/call',
        params: { name: 'read_file', arguments: { path: '../package.json' } },
      });
      if (!res.error) throw new Error('expected an error for path traversal');
      if (!res.error.message) throw new Error('error missing message');
    });

    await test('unknown tool rejected', async () => {
      const res = await s.send({
        jsonrpc: '2.0',
        id: 7,
        method: 'tools/call',
        params: { name: 'delete_file', arguments: {} },
      });
      if (!res.error) throw new Error('expected an error for unknown tool');
    });

    process.stdout.write(`[test] ${passed} passed, ${failed} failed\n`);
    if (failed === 0) {
      process.stdout.write('[test] ALL TESTS PASSED\n');
    } else {
      process.stdout.write('[test] SOME TESTS FAILED\n');
      process.exitCode = 1;
    }
  } finally {
    s.stop();
  }
}

run().catch((err) => {
  process.stderr.write('Test harness error: ' + err.message + '\n');
  process.exitCode = 1;
});
