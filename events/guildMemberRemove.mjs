// events/guildMemberRemove.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('guildMemberRemove', eventArgs);
}
