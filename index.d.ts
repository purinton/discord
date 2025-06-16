// Type definitions for @purinton/discord
// Project: https://github.com/purinton/discord
// Definitions by: Russell Purinton <https://github.com/purinton>
// TypeScript Version: 4.5

import type { Client, ClientOptions } from 'discord.js';
import type { Logger } from '@purinton/log';

export interface CreateDiscordOptions {
  client_id?: string;
  token?: string;
  log?: Logger;
  rootDir?: string;
  localesDir?: string;
  commandsDir?: string;
  eventsDir?: string;
  intents?: {
    Guilds?: boolean;
    GuildMessages?: boolean;
    MessageContent?: boolean;
    GuildMembers?: boolean;
    GuildPresences?: boolean;
    GuildVoiceStates?: boolean;
    [key: string]: boolean | undefined;
  };
  partials?: string[];
  clientOptions?: ClientOptions;
  ClientClass?: typeof Client;
  setupEventsFn?: (options: any) => Promise<any>;
  setupCommandsFn?: (options: any) => Promise<any>;
  registerCommandsFn?: (options: any) => Promise<boolean>;
  setupLocalesFn?: (options: any) => any;
}

/**
 * Creates and logs in a Discord client, allowing dependency injection for testability.
 * @param options Configuration options for the Discord client
 * @returns Promise resolving to a Discord.js Client instance
 */
export function createDiscord(options?: CreateDiscordOptions): Promise<Client>;
