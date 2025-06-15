import { createDiscord } from '../index.mjs';
import { jest, test, expect, describe, beforeEach } from '@jest/globals';

const mockClient = { login: jest.fn().mockResolvedValue('logged-in') };
const MockClientClass = jest.fn(() => mockClient);

const mockSetupLocales = jest.fn(async () => ({
  msg: jest.fn(),
  loadedLocales: ['en-US', 'fr']
}));
const mockSetupCommands = jest.fn(async () => ({
  commandDefs: { ping: {}, pong: {} },
  commandHandlers: { ping: jest.fn(), pong: jest.fn() }
}));
const mockSetupEvents = jest.fn(async () => ({
  loadedEvents: ['ready', 'messageCreate']
}));

const baseOptions = {
  client_id: '123',
  token: 'abc',
  log: { debug: jest.fn() },
  localesDir: '/locales',
  commandsDir: '/commands',
  eventsDir: '/events',
  ClientClass: MockClientClass,
  setupLocalesFn: mockSetupLocales,
  setupCommandsFn: mockSetupCommands,
  setupEventsFn: mockSetupEvents,
};

describe('createDiscord', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('throws if client_id is missing', async () => {
    await expect(createDiscord({ ...baseOptions, client_id: undefined })).rejects.toThrow('DISCORD_CLIENT_ID is not set');
  });

  test('throws if token is missing', async () => {
    await expect(createDiscord({ ...baseOptions, token: undefined })).rejects.toThrow('DISCORD_TOKEN is not set');
  });

  test('calls setup functions and returns client', async () => {
    const client = await createDiscord(baseOptions);
    expect(mockSetupLocales).toHaveBeenCalledWith({ localesDir: '/locales', log: baseOptions.log });
    expect(mockSetupCommands).toHaveBeenCalledWith({ client: mockClient, commandsDir: '/commands', log: baseOptions.log, msg: expect.any(Function) });
    expect(mockSetupEvents).toHaveBeenCalledWith({ client: mockClient, eventsDir: '/events', log: baseOptions.log, msg: expect.any(Function), commandHandlers: expect.any(Object) });
    expect(mockClient.login).toHaveBeenCalledWith('abc');
    expect(client).toBe(mockClient);
  });

  test('throws if client.login fails', async () => {
    mockClient.login.mockRejectedValueOnce(new Error('fail'));
    await expect(createDiscord(baseOptions)).rejects.toThrow('Failed to log in to Discord: fail');
  });
});
