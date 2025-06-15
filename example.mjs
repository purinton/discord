// Example usage for @purinton/discord
import 'dotenv/config';
import log from '@purinton/log';
import path from '@purinton/path';
import { createDiscord } from '@purinton/discord';

(async () => {
    try {
        const client = await createDiscord({
            client_id: process.env.DISCORD_CLIENT_ID,
            token: process.env.DISCORD_TOKEN,
            log,
            localesDir: path(import.meta, 'locales'),
            commandsDir: path(import.meta, 'commands'),
            eventsDir: path(import.meta, 'events'),
            intents: {
                Guilds: true,
                GuildMessages: true
            },
        });
        console.log('Bot started:', client.user?.tag);
    } catch (err) {
        console.error('Failed to start bot:', err);
    }
})();
