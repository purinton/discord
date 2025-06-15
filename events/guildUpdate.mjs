// events/guildUpdate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('guildUpdate', eventArgs);
}
