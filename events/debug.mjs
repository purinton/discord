// events/debug.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('debug', eventArgs);
}
