import path from '@purinton/path';
import logger from '@purinton/log';
import { Client, GatewayIntentBits } from 'discord.js';
import { setupEvents } from './src/events.mjs';
import { setupCommands, registerCommands } from './src/commands.mjs';
import { setupLocales } from './src/locales.mjs';

/**
 * Creates and logs in a Discord client, allowing dependency injection for testability.
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.client_id] - Discord application client ID
 * @param {string} [options.token] - Discord app token
 * @param {Object} [options.log] - Logger instance
 * @param {string} [options.rootDir] - Root directory for events, commands, and locales
 * @param {string} [options.localesDir] - Directory path for locales (overrides rootDir)
 * @param {string} [options.commandsDir] - Directory path for commands (overrides rootDir)
 * @param {string} [options.eventsDir] - Directory path for events (overrides rootDir)
 * @param {Object} [options.intents] - Object with boolean flags for Discord Gateway Intents (e.g., { Guilds: true, GuildMessages: true })
 * @param {Array<string>} [options.partials] - Array of partials for the Discord client
 * @param {Object} [options.clientOptions] - Additional options for Discord client
 * @param {Function} [options.ClientClass] - Discord client class (for dependency injection/testing)
 * @param {Function} [options.setupEventsFn] - Function to set up events (for dependency injection/testing)
 * @param {Function} [options.setupCommandsFn] - Function to set up commands (for dependency injection/testing)
 * @param {Function} [options.registerCommandsFn] - Function to register commands (for dependency injection/testing)
 * @param {Function} [options.setupLocalesFn] - Function to set up locales (for dependency injection/testing)
 * @returns {Promise<import('discord.js').Client>} Discord client instance
 */
export const createDiscord = async ({
  client_id = process.env.DISCORD_CLIENT_ID,
  token = process.env.DISCORD_TOKEN,
  log = logger,
  rootDir = path(import.meta),
  localesDir = path(rootDir, 'locales'),
  commandsDir = path(rootDir, 'commands'),
  eventsDir = path(rootDir, 'events'),
  intents = {
    Guilds: true,
    GuildMessages: true,
    MessageContent: false,
    GuildMembers: false,
    GuildPresences: false,
    GuildVoiceStates: false
  },
  partials = ['MESSAGE', 'CHANNEL', 'REACTION'],
  clientOptions = {},
  ClientClass = Client,
  setupEventsFn = setupEvents,
  setupCommandsFn = setupCommands,
  registerCommandsFn = registerCommands,
  setupLocalesFn = setupLocales,
} = {}) => {
  if (!client_id) throw new Error('DISCORD_CLIENT_ID is not set. Please check your .env file.');
  if (!token) throw new Error('DISCORD_TOKEN is not set. Please check your .env file.');

  const INTENT_MAP = {
    Guilds: GatewayIntentBits.Guilds,
    GuildMessages: GatewayIntentBits.GuildMessages,
    MessageContent: GatewayIntentBits.MessageContent,
    GuildMembers: GatewayIntentBits.GuildMembers,
    GuildPresences: GatewayIntentBits.GuildPresences,
    GuildVoiceStates: GatewayIntentBits.GuildVoiceStates,
  };

  const resolvedIntents = Object.entries(intents)
    .filter(([key, value]) => value && INTENT_MAP[key])
    .map(([key]) => INTENT_MAP[key]);

  const client = new ClientClass({
    intents: resolvedIntents,
    partials,
    ...clientOptions
  });

  const { msg, loadedLocales } = await setupLocalesFn({ localesDir, log });
  log.info(`Loaded ${loadedLocales.length} locales...`);

  const { commandDefs, commandHandlers } = await setupCommandsFn({ client, commandsDir, log, msg });
  const registerSuccess = await registerCommandsFn({ commandDefs, client_id, token, log });
  if (!registerSuccess) throw new Error('Failed to register commands with Discord API. Please check your command definitions and token.');
  log.info(`Loaded ${commandDefs.length} commands...`);

  const { loadedEvents } = await setupEventsFn({ client, eventsDir, log, msg, commandHandlers });
  log.info(`Loaded ${loadedEvents.length} events...`);

  try {
    await client.login(token);
  } catch (error) {
    throw new Error(`Failed to log in to Discord: ${error.message}`);
  }
  return client;
};
