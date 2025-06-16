import logger from '@purinton/log';
import { path, pathUrl } from '@purinton/path';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';

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
    client,
    commandsDir,
    log = logger,
    msg,
    fsLib = { readdirSync, readFileSync, existsSync },
    importFn = (p) => import(p),
} = {}) => {
    const files = fsLib.readdirSync(commandsDir).filter(f => f.endsWith('.json'));
    const commandHandlers = {};
    const commandDefs = [];
    for (const file of files) {
        try {
            const def = JSON.parse(fsLib.readFileSync(path(commandsDir, file), 'utf8'));
            const cmdName = file.replace(/\.json$/, '');
            const handlerPath = path(commandsDir, cmdName + '.mjs');
            if (fsLib.existsSync(handlerPath)) {
                try {
                    const handlerUrl = pathUrl(handlerPath);
                    const mod = await importFn(handlerUrl);
                    if (typeof mod.default !== 'function') {
                        log.warn(`Handler for ${cmdName} does not export a default function.`);
                        continue;
                    }
                    commandDefs.push(def);
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
    return { commandDefs, commandHandlers };
};

/**
 * Registers Discord commands with the Discord API.
 * @param {Object} options
 * @param {Array} options.commandDefs - Array of command definitions
 * @param {string} options.clientId - Discord client ID
 * @param {string} options.token - Discord bot token
 * @param {Object} options.log - Logger instance
 * @param {Object} [options.restClass=REST] - REST class (for testing)
 * @param {Object} [options.routes=Routes] - Discord.js Routes (for testing)
 * @returns {Promise<boolean>} True if registration succeeded, false otherwise
 */
export const registerCommands = async ({
    commandDefs,
    clientId = process.env.DISCORD_CLIENT_ID,
    token = process.env.DISCORD_TOKEN,
    log = logger,
    restClass = REST,
    routes = Routes,
}) => {
    if (!token) {
        log.warn('DISCORD_TOKEN is not set. Skipping command registration.');
        return false;
    }
    if (!clientId) {
        log.warn('DISCORD_CLIENT_ID is not set. Skipping command registration.');
        return false;
    }
    if (!commandDefs.length) {
        log.warn('No commands to register.');
        return false;
    }

    try {
        const rest = new restClass({ version: '10' }).setToken(token);
        await rest.put(
            routes.applicationCommands(clientId),
            { body: commandDefs }
        );
        log.debug(`Registered ${commandDefs.length} commands successfully.`);
        return true;
    } catch (error) {
        log.error('Failed to register commands:', error);
        return false;
    }
};