import logger from '@purinton/log';
import { path, pathUrl } from '@purinton/path';
import { readdirSync, readFileSync, existsSync } from 'fs';

/**
 * Loads and registers Discord commands from JSON files and their handlers.
 * @param {Object} options
 * @param {string} options.commandsDir - Directory path for commands
 * @param {Object} options.log - Logger instance
 * @param {Object} [options.fsLib] - File system library (for testing)
 * @param {Function} [options.importFn] - Function to import handlers (for testing)
 * @returns {Promise<Object>} Map of command names to handler functions
 */
export const setupCommands = async ({
    commandsDir,
    log = logger,
    fsLib = { readdirSync, readFileSync, existsSync },
    importFn = (p) => import(p),
} = {}) => {
    const files = fsLib.readdirSync(commandsDir).filter(f => f.endsWith('.json'));
    const commandDefs = {};
    const commandHandlers = {};
    for (const file of files) {
        try {
            const def = JSON.parse(fsLib.readFileSync(path(commandsDir, file), 'utf8'));
            const cmdName = file.replace(/\.json$/, '');
            const handlerPath = path(commandsDir, cmdName + '.mjs');
            if (fsLib.existsSync(handlerPath)) {
                try {
                    const mod = await importFn(pathUrl(handlerPath));
                    if (typeof mod.default !== 'function') {
                        log.warn(`Handler for ${cmdName} does not export a default function.`);
                        continue;
                    }
                    commandDefs[cmdName] = def;
                    commandHandlers[cmdName] = mod.default;
                } catch (e) {
                    log.warn(`Failed to load handler for ${cmdName}:`, e);
                }
            } else {
                log.warn(`No handler found for command ${cmdName}`);
            }
        } catch (err) {
            log.error(`Failed to load command definition for ${file}:`, err);
            continue;
        }
    }
    log.debug('Loaded commands: ' + Object.keys(commandDefs).join(', '));
    return { commandDefs, commandHandlers };
};
