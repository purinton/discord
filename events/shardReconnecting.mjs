// events/shardReconnecting.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('shardReconnecting', eventArgs);
}
