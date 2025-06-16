// Example usage for @purinton/discord
import 'dotenv/config';
import { log, path, registerHandlers, registerSignals } from '@purinton/common';
import { createDiscord } from '@purinton/discord';

(async () => {
    registerHandlers({ log });
    registerSignals({ log });
    const client = await createDiscord({
        log,
        rootDir: path(import.meta),
        intents: {
            Guilds: true,
            GuildMessages: true,
            MessageContent: true
        },
        context: {
            presence: { activities: [{ name: 'example', type: 4 }], status: 'online' },
            // Add your context options here (db, redis, etc.)
        }
    });
    registerSignals({
        shutdownHook: async () => {
            await client.destroy()
            // clean up any other resources here (db, redis, etc.)
        }
    });
})();