import logger from '@purinton/log';
import { path } from '@purinton/path';
import { readdirSync, readFileSync } from 'fs';

export const locales = {};

export const msg = (locale, key, defaultValue = 'A serious error occurred.', log = logger) => {
    if (!locales[locale]) {
        log.warn(`Locale "${locale}" not found, falling back to default.`);
        locale = 'en-US';
    }
    if (!locales[locale]) {
        log.error(`Default locale "en-US" not found. Returning default value.`);
        return defaultValue;
    }
    const message = locales[locale][key];
    if (message === undefined) {
        log.warn(`Key "${key}" not found in locale "${locale}", returning default value.`);
        return defaultValue;
    }
    return message;
};

export const setupLocales = ({
    localesDir = path(import.meta, '..', 'locales'),
    log = logger,
    fsLib = { readdirSync, readFileSync },
} = {}) => {
    let loadedLocales = [];
    try {
        let files;
        try {
            files = fsLib.readdirSync(localesDir).filter(f => f.endsWith('.json'));
        } catch (err) {
            log.error(`Failed to read locales directory: ${localesDir}`, err);
            return { msg, loadedLocales };
        }
        for (const file of files) {
            try {
                const content = fsLib.readFileSync(path(localesDir, file), 'utf8');
                locales[file.replace(/\.json$/, '')] = JSON.parse(content);
            } catch (err) {
                log.error(`Failed to load or parse locale file ${file}:`, err);
            }
        }
        loadedLocales = Object.keys(locales);
    } catch (err) {
        log.error('Unexpected error in loadLocales:', err);
    }
    return { msg, loadedLocales };
};

export const clearLocales = () => {
    Object.keys(locales).forEach(key => delete locales[key]);
};
