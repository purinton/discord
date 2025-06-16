// Example usage for @purinton/discord
import 'dotenv/config';
import log from '@purinton/log';
import path from '@purinton/path';
import { createDiscord } from '@purinton/discord';

(async () => {
    try {
        await createDiscord({
            log,
            rootDir: path(import.meta),
            intents: {
                Guilds: true,
                GuildMessages: true,
                MessageContent: true
            }
        });
    } catch (err) {
        log.error('Failed to start app:', err);
    }
})();
