// events/applicationCommandUpdate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('applicationCommandUpdate', eventArgs);
}
