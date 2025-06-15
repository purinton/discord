// events/guildScheduledEventCreate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('guildScheduledEventCreate', eventArgs);
}
