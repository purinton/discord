// events/messageReactionRemoveEmoji.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('messageReactionRemoveEmoji', eventArgs);
}
