// events/messageReactionRemoveAll.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('messageReactionRemoveAll', eventArgs);
}
