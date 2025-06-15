// events/guildScheduledEventUserAdd.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('guildScheduledEventUserAdd', eventArgs);
}
