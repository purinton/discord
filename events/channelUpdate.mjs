// events/channelUpdate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('channelUpdate', eventArgs);
}
