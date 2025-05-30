const config = require('../../../config')
const { embed } = require('../../util/util');
const Discord = require('discord.js')

module.exports = {
    name: 'purge',
    description: 'Purges x messages from a channel',
    roles: [config.ROLES.STAFF.STAFF],

    async execute(client, message, args) {

        if (isNaN(args[0])) {
            message.channel.send({embed: embed('error', 'Please do =purge <number of messages>.')})
            return;
        }
        
        let purgeNumber = Math.floor(args[0]) + 1;

        if ( purgeNumber < 1 || purgeNumber > 100 ) {
            message.channel.send({embed: embed('error', 'Please use a number between 1 and 100.')})
            return;
        }
        message.channel.bulkDelete(purgeNumber);

        const purgeMessage = await message.channel.send({embed: embed('success', `Purged ${purgeNumber - 1} messages in ${message.channel}.`)})

        setTimeout (() => { purgeMessage.delete()}, 2e3)
    }
}