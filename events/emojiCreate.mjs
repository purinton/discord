// events/emojiCreate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('emojiCreate', eventArgs);
}
