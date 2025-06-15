// events/shardReady.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('shardReady', eventArgs);
}
