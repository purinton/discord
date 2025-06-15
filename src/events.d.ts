// Type definitions for event setup
import type { Client } from 'discord.js';
import type { Logger } from '@purinton/log';

export interface SetupEventsOptions {
  client: Client;
  eventsDir: string;
  log?: Logger;
  msg?: (locale: string, key: string, defaultMsg?: string) => string;
  commandHandlers?: Record<string, (...args: any[]) => any>;
  fsLib?: any;
  importFn?: (path: string) => Promise<any>;
}

export interface SetupEventsResult {
  loadedEvents: string[];
}

export function setupEvents(options: SetupEventsOptions): Promise<SetupEventsResult>;
