// events/typingStart.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('typingStart', eventArgs);
}
