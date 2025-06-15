import { setupEvents } from '../src/events.mjs';
import { jest, test, expect, describe, beforeEach } from '@jest/globals';

describe('setupEvents', () => {
  let mockFs, log, importFn, client;
  beforeEach(() => {
    log = { warn: jest.fn(), error: jest.fn() };
    mockFs = {
      readdirSync: jest.fn(() => ['ready.mjs', 'messageCreate.mjs'])
    };
    client = { on: jest.fn() };
    importFn = jest.fn(async (file) => ({ default: jest.fn() }));
  });

  test('loads event handlers and attaches to client', async () => {
    const loadedEvents = await setupEvents({
      client,
      eventsDir: '/events',
      log,
      fsLib: mockFs,
      importFn,
    });
    expect(loadedEvents).toContain('ready');
    expect(loadedEvents).toContain('messageCreate');
    expect(client.on).toHaveBeenCalledTimes(2);
  });

  test('attaches handler with msg/commandHandlers if function expects 2+ args', async () => {
    importFn = jest.fn(async () => ({ default: function(a, b) { return a + b; } }));
    client = { on: jest.fn() };
    await setupEvents({
      client,
      eventsDir: '/events',
      log,
      fsLib: mockFs,
      importFn,
      msg: jest.fn(),
      commandHandlers: { foo: jest.fn() },
    });
    expect(client.on).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function)
    );
  });

  test('logs error if import fails', async () => {
    importFn = jest.fn(async () => { throw new Error('fail'); });
    await setupEvents({
      client,
      eventsDir: '/events',
      log,
      fsLib: mockFs,
      importFn,
    });
    expect(log.error).toHaveBeenCalledWith(expect.stringContaining('Failed to load event'), expect.any(Error));
  });
});
