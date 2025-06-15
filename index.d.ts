// Type definitions for @purinton/discord
// Project: https://github.com/purinton/discord
// Definitions by: Russell Purinton <https://github.com/purinton>
// TypeScript Version: 4.5

import type { Client, ClientOptions } from 'discord.js';

export interface CreateDiscordOptions {
  client_id?: string;
  token?: string;
  log?: any;
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
  setupEventsFn?: Function;
  setupCommandsFn?: Function;
  setupLocalesFn?: Function;
}

export function createDiscord(options?: CreateDiscordOptions): Promise<Client>;
