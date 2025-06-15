// events/messageReactionRemove.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('messageReactionRemove', eventArgs);
}
