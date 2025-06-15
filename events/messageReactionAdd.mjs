// events/messageReactionAdd.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('messageReactionAdd', eventArgs);
}
