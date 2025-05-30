const config = require('../../../config')
const { embed } = require('../../util/util')

module.exports = {
    name: 'restart',
    description: 'restart',
    roles: [config.ROLES.STAFF.OWNER],
    async execute(client, message, args) {
        await message.channel.send(embed('success', 'Restarting the bot momentarily.'));
        process.exit();
    }
}