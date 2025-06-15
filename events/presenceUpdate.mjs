// events/presenceUpdate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('presenceUpdate', eventArgs);
}
