// events/messageCreate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('messageCreate', eventArgs);
}
