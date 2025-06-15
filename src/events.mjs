import logger from '@purinton/log';
import { path, pathUrl } from '@purinton/path';
import { readdirSync } from 'fs';

/**
 * Loads and attaches all event handlers from the events directory to the Discord client.
 * @param {Object} options
 * @param {Object} options.client - The Discord client instance
 * @param {string} options.eventsDir - Directory path for events
 * @param {Object} options.log - Logger instance
 * @param {Function} [options.msg] - Localization function (optional)
 * @param {Object} [options.commands] - Commands map (optional)
 * @param {Object} [options.fsLib] - File system library (for testing)
 * @param {Function} [options.importFn] - Function to import handlers (for testing)
 * @returns {Promise<{ loadedEvents: string[] }>} Object with loadedEvents array
 */
export const setupEvents = async ({
    client,
    eventsDir,
    log = logger,
    msg = (locale, key, defaultMsg) => {
        log.warn(`Localization function not provided. Returning default message for ${key}.`);
        return defaultMsg || 'An error occurred.';
    },
    commandHandlers = {},
    fsLib = { readdirSync },
    importFn = (p) => import(p),
} = {}) => {
    const files = fsLib.readdirSync(eventsDir).filter(f => f.endsWith('.mjs'));
    const loadedEvents = [];
    for (const file of files) {
        const eventName = file.replace(/\.mjs$/, '');
        try {
            const mod = await importFn(pathUrl(eventsDir, file));
            if (!client) throw new Error('Discord client is undefined');
            if (typeof mod.default === 'function') {
                client.on(eventName, (...eventArgs) => {
                    // Pass the Discord client, logger, localization function, and commands to the handler context
                    mod.default({ client, log, msg, commandHandlers, ...eventArgs });
                });
            }
            loadedEvents.push(eventName);
        } catch (err) {
            log.error(`Failed to load event ${eventName}:`, err);
        }
    }
    return { loadedEvents };
};