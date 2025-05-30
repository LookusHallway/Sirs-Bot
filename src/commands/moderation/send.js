const { embed } = require('../../util/util');
const config = require('../../../config')

module.exports = {
    name: 'send',
    roles: [config.ROLES.STAFF.STAFF],
    description: 'Reports user for a reason',
    async execute(client, message, args) {
        const msgChannel = message.mentions.channels.first();

        if (msgChannel) {
            msgChannel.send(message.content.replace(`=send ${msgChannel}`,''))
            message.channel.send({embed: embed(`success`, `Posted \`${message.content.replace(`=send ${msgChannel} `,'')}\` in ${msgChannel}`)})
        } else {
            message.channel.send({embed: embed('error', 'Do =send @channel <message>')})
        }
    }
}