// events/applicationCommandCreate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('applicationCommandCreate', eventArgs);
}
