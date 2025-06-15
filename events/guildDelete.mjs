// events/guildDelete.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('guildDelete', eventArgs);
}
