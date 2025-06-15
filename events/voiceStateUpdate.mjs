// events/voiceStateUpdate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('voiceStateUpdate', eventArgs);
}
