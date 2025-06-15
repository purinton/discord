// events/guildMemberUpdate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('guildMemberUpdate', eventArgs);
}
