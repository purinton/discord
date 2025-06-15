// events/guildIntegrationsUpdate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('guildIntegrationsUpdate', eventArgs);
}
