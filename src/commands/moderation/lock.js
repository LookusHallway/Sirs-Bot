const config = require('../../../config')
const { embed } = require('../../util/util');
const Discord = require('discord.js')

module.exports = {
    name: 'lock',
    description: 'Locks channel for x seconds',
    roles: [config.ROLES.STAFF.STAFF],

    async execute(client, message, args) {
        message.delete();

        const lockTime = (Math.floor(args[0]) * 1000);
        const lockReason = args.slice(1).join(" ")

        if (isNaN(lockTime) || lockTime < 0 || !lockReason) return message.channel.send({ embed: embed('error', 'Please do =lock <seconds> <reason>.') })

        await message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false });

        const lockEmbed = new Discord.MessageEmbed()
            .setTitle('🔒 | Locked Channel')
            .setColor('GREEN')
            .addField("Channel", message.channel, true)
            .addField("Duration", `${args[0]} seconds`, true)
            .addField("Reason", lockReason, true)
            .setTimestamp()

        message.channel.send(lockEmbed)
        setTimeout(() => { message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: true }) }, lockTime)
    }
}