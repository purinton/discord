// Type definitions for command setup
import type { Logger } from '@purinton/log';

export interface SetupCommandsOptions {
  commandsDir: string;
  log?: Logger;
  fsLib?: any;
  importFn?: (path: string) => Promise<any>;
}

export interface CommandDefs {
  [key: string]: any;
}

export interface CommandHandlers {
  [key: string]: (...args: any[]) => any;
}

export function setupCommands(options: SetupCommandsOptions): Promise<{
  commandDefs: CommandDefs;
  commandHandlers: CommandHandlers;
}>;
