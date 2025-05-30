const config = require('../../../config')
const { embed } = require('../../util/util');
const Discord = require('discord.js')

module.exports = {
    name: 'report',
    description: 'Sends message to desired channel',
    async execute(client, message, args) {
        const msgChannel = message.mentions.channels.first();

        const suspect = args[0];
        const reportReason = args.slice(1).join(" ");
        const reporter = message.author

        if (suspect) {
            message.delete();
            const reportEmbed = new Discord.MessageEmbed()
                .setTitle(`:scales: New Report!`)
                .setColor('#ff0000')
                .addField("Reported User", suspect, true)
                .addField("Reported By", reporter, true)
                .addField("Reason", reportReason, true)
                .addField("Status:", "Pending review", true)
                .setFooter(`Report`)
                .setTimestamp()
            const reportMessage = await client.channels.cache.get(config.CHANNEL.REPORTS).send(reportEmbed)

            reportMessage.react('✅');

            
        }
    }
}