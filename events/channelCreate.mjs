// events/channelCreate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('channelCreate', eventArgs);
}
