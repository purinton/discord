// events/interactionCreate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('interactionCreate', eventArgs);
    const locale = interaction.locale || interaction.guild?.preferredLocale || 'en-US';
    const localMsg = (key, defaultMsg) => msg(locale, key, defaultMsg, log);
    const handler = global.discord_commands[interaction.commandName];
    if (handler) await handler({ client, log, localMsg, ...eventArgs });
}
