// events/guildScheduledEventUpdate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('guildScheduledEventUpdate', eventArgs);
}
