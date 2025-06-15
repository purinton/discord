// events/shardError.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('shardError', eventArgs);
}
