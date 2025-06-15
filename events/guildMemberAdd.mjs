// events/guildMemberAdd.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('guildMemberAdd', eventArgs);
}
