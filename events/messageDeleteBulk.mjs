// events/messageDeleteBulk.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('messageDeleteBulk', eventArgs);
}
