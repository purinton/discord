// events/threadMembersUpdate.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('threadMembersUpdate', eventArgs);
}
