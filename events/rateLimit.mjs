// events/rateLimit.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('rateLimit', eventArgs);
}
