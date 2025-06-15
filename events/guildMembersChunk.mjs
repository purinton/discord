// events/guildMembersChunk.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('guildMembersChunk', eventArgs);
}
