// Example usage for @purinton/discord
import 'dotenv/config';
import log from '@purinton/log';
import path from '@purinton/path';
import { createDiscord } from '@purinton/discord';

(async () => {
    try {
        await createDiscord({
            client_id: process.env.DISCORD_CLIENT_ID,
            token: process.env.DISCORD_TOKEN,
            rootDir: path(import.meta),
            intents: {
                Guilds: true,
                GuildMessages: true,
                MessageContent: true
            },
            log
        });
    } catch (err) {
        log.error('Failed to start app:', err);
    }
})();
