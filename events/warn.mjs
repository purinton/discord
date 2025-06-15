// events/warn.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('warn', eventArgs);
}
