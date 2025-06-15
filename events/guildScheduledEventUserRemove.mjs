// events/guildScheduledEventUserRemove.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('guildScheduledEventUserRemove', eventArgs);
}
