// events/ready.mjs
export default async function ({ client, log, msg, ...eventArgs }) {
    log.debug('ready', eventArgs);
    log.info(`Logged in as ${client.user.tag}`);
    client.user.setPresence({ activities: [{ name: 'App Template', type: 4 }], status: 'online' });
}
