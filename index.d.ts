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
    GuildMembers?: boolean; // privileged
    GuildModeration?: boolean;
    GuildBans?: boolean; // deprecated alias
    GuildExpressions?: boolean;
    GuildEmojisAndStickers?: boolean; // deprecated alias
    GuildIntegrations?: boolean;
    GuildWebhooks?: boolean;
    GuildInvites?: boolean;
    GuildVoiceStates?: boolean; // privileged
    GuildPresences?: boolean; // privileged
    GuildMessages?: boolean;
    GuildMessageReactions?: boolean;
    GuildMessageTyping?: boolean;
    DirectMessages?: boolean;
    DirectMessageReactions?: boolean;
    DirectMessageTyping?: boolean;
    MessageContent?: boolean; // privileged
    GuildScheduledEvents?: boolean;
    AutoModerationConfiguration?: boolean;
    AutoModerationExecution?: boolean;
    GuildMessagePolls?: boolean;
    DirectMessagePolls?: boolean;
    [key: string]: boolean | undefined;
  };
  partials?: string[];
  context?: Record<string, any>;
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
