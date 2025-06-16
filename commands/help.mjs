// commands/help.mjs
export default async function ({ log, localMsg, interaction }) {
    log.debug(`${interaction.commandName} Request`, { interaction });
    const response = {
        content: localMsg('help', 'This is the default help text.'),
        flags: 1 << 6, // EPHEMERAL
    };
    log.debug(`${interaction.commandName} Response`, { response });
    await interaction.reply(response);
}
