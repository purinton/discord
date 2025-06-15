// events/messageUpdate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('messageUpdate', eventArgs);
}
