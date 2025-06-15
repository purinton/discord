import { setupCommands } from '../src/commands.mjs';
import { jest, test, expect, describe, beforeEach } from '@jest/globals';

describe('setupCommands', () => {
  let mockFs, log, importFn;
  beforeEach(() => {
    log = { warn: jest.fn(), error: jest.fn(), debug: jest.fn() };
    mockFs = {
      readdirSync: jest.fn(() => ['ping.json', 'pong.json']),
      readFileSync: jest.fn((file) => {
        if (file.includes('ping')) return '{"name":"ping"}';
        if (file.includes('pong')) return '{"name":"pong"}';
        throw new Error('File not found');
      }),
      existsSync: jest.fn((file) => file.includes('ping') || file.includes('pong')),
    };
    importFn = jest.fn(async (file) => ({ default: jest.fn() }));
  });

  test('loads command definitions and handlers', async () => {
    const { commandDefs, commandHandlers } = await setupCommands({
      commandsDir: '/commands',
      log,
      fsLib: mockFs,
      importFn,
    });
    expect(commandDefs.ping).toBeDefined();
    expect(typeof commandHandlers.ping).toBe('function');
    expect(commandDefs.pong).toBeDefined();
    expect(typeof commandHandlers.pong).toBe('function');
  });

  test('warns if handler is not a function', async () => {
    importFn = jest.fn(async () => ({ default: 123 }));
    await setupCommands({
      commandsDir: '/commands',
      log,
      fsLib: mockFs,
      importFn,
    });
    expect(log.warn).toHaveBeenCalledWith(expect.stringContaining('does not export a default function.'));
  });

  test('warns if handler missing', async () => {
    mockFs.existsSync = jest.fn(() => false);
    await setupCommands({
      commandsDir: '/commands',
      log,
      fsLib: mockFs,
      importFn,
    });
    expect(log.warn).toHaveBeenCalledWith(expect.stringContaining('No handler found for command'));
  });

  test('logs error for bad JSON', async () => {
    mockFs.readFileSync = jest.fn(() => '{bad json');
    await setupCommands({
      commandsDir: '/commands',
      log,
      fsLib: mockFs,
      importFn,
    });
    expect(log.error).toHaveBeenCalledWith(expect.stringContaining('Failed to load command definition for'), expect.any(Error));
  });
});
