// events/invalidated.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('invalidated', eventArgs);
}
