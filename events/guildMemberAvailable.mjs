// events/guildMemberAvailable.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('guildMemberAvailable', eventArgs);
}
