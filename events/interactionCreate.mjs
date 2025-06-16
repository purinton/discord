// events/interactionCreate.mjs
export default async function ({ client, log, msg, commandHandlers, ...eventArgs }) {
    log.debug('interactionCreate', eventArgs);
    const interaction = eventArgs[0];
    const locale = interaction.locale || interaction.guild?.preferredLocale || 'en-US';
    const localMsg = (key, defaultMsg) => msg(locale, key, defaultMsg, log);
    const handler = commandHandlers?.[interaction.commandName];
    if (handler) await handler({ client, log, localMsg, interaction });
}
