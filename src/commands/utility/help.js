const config = require('../../../config')
const { embed } = require('../../util/util');
const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: 'List of commands',
    async execute(client, message, args) {

        let helpEmbed = new Discord.MessageEmbed()
            .setTitle(`SirBot`)
            .setColor('#7289DA')
            .setDescription('Click on the reaction that corresponds to the command category for a full list!\n')
            .addField("Categories", "> 🎮 **Fun and Games** Commands to do if you're bored\n\n> 🚫 **Moderation** Commands for server staff\n\n> ⚒️ **Utility** Commands for general use", false)
            .setFooter('Something missing or incorrect? Ping SirLava!')
        let helpMessage = await message.channel.send(helpEmbed)
        await helpMessage.react('🎮')
        await helpMessage.react('🚫')
        await helpMessage.react('⚒️')
    }
}