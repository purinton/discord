// Type definitions for locales setup
import type { Logger } from '@purinton/log';

export interface SetupLocalesOptions {
  localesDir?: string;
  log?: Logger;
  fsLib?: any;
}

export interface Locales {
  [locale: string]: Record<string, string>;
}

export interface SetupLocalesResult {
  msg: (locale: string, key: string, defaultValue?: string, log?: Logger) => string;
  loadedLocales: string[];
}

export function setupLocales(options?: SetupLocalesOptions): SetupLocalesResult;
export function clearLocales(): void;
export function msg(locale: string, key: string, defaultValue?: string, log?: Logger): string;
export const locales: Locales;
