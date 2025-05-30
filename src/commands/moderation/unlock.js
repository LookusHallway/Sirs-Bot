const config = require('../../../config')
const { embed } = require('../../util/util');
const Discord = require('discord.js')

module.exports = {
    name: 'unlock',
    description: 'Unlocks channel',
    roles: [config.ROLES.STAFF.STAFF],

    async execute(client, message, args) {
        message.delete();

        await message.channel.updateOverwrite(message.channel.guild.roles.everyone, {SEND_MESSAGES: true });

        const unlockEmbed = new Discord.MessageEmbed()
            .setTitle('🔓 | Unlocked Channel')
            .setColor('GREEN')
            .addField("Channel", message.channel, true)
            .setTimestamp()

        message.channel.send({embed: unlockEmbed})
    }
}