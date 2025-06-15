// events/threadCreate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('threadCreate', eventArgs);
}
