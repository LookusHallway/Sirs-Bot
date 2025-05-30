const { Channel, DiscordAPIError } = require('discord.js');
const Discord = require('discord.js');
const config = require('../../config.json');
const message = require('./message');

module.exports = {
    once: false,
    async execute(reaction, user) {

        if (user.bot) return;

        if (reaction.message.channel.id === config.CHANNEL.REPORTS) {
            // Get the message and save it in a variable
            const messageEmbed = reaction.message.embeds[0];

            // Make sure reaction is white checkmark & is not already marked as handled
            if (reaction._emoji.name === '✅');
            if (messageEmbed.color === 3066993) return;

            // Edit embed
            messageEmbed.color = "GREEN";
            messageEmbed.title = `Handled Report`;
            messageEmbed.fields[3] = { name: "Status", value: `Handled by <@${user.id}>`, inline: true };

            // Edit message
            reaction.message.edit({ embed: messageEmbed });
            await reaction.message.reactions.removeAll()
        } else {

            // Fun and Games Commands
            const messageEmbed = reaction.message.embeds[0]
            if (reaction._emoji.name === '🎮') {
                let messageEmbedEdit = new Discord.MessageEmbed()
                    .setTitle('Fun and Games Commands')
                    .setColor('#7289DA')
                    .addFields(
                        { name: "=8ball", value: "If you can't decide on something, roll this thing", inline: false },
                        { name: "=cat", value: "Pulls up a random picture of a cat", inline: false }
                    )

                reaction.message.edit(messageEmbedEdit);
                await reaction.message.reactions.removeAll()
                await reaction.message.react('⏪')
            }

            // Moderation commands
            if (reaction._emoji.name === '🚫') {
                let messageEmbedEdit = new Discord.MessageEmbed()
                    .setTitle('Moderation Commands')
                    .setColor('#7289DA')
                    .addFields(
                        { name: "=lock <seconds> <reason>", value: "Locks a channel so that members can see but not send messages", inline: false },
                        { name: "=restart", value: "Restarts the bot, Owner only", inline: false },
                        { name: "=purge <number>", value: "Deletes a given number of messages in a channel at once", inline: false }
                    )

                reaction.message.edit(messageEmbedEdit);
                await reaction.message.reactions.removeAll()
                await reaction.message.react('⏪')
            }
            // Utility commands
            if (reaction._emoji.name === '⚒️') {
                let messageEmbedEdit = new Discord.MessageEmbed()
                    .setTitle('Utility Commands')
                    .setColor('#7289DA')
                    .addFields(
                        { name: "=help", value: "Brings up the inital help page.", inline: false },
                        { name: "=report <@username> <reason>", value: "Reports a user to the staff team for the given reason", inline: false },
                    )

                reaction.message.edit(messageEmbedEdit);
                await reaction.message.reactions.removeAll()
                await reaction.message.react('⏪')
            }
            
            // Return reaction
            if (reaction._emoji.name === '⏪') {
                let helpEmbed = new Discord.MessageEmbed()
                    .setTitle(`SirBot`)
                    .setColor('#7289DA')
                    .setDescription('Click on the reaction that corresponds to the command category for a full list!\n')
                    .addField("Categories", "> 🎮 **Fun and Games** Commands to do if you're bored\n\n> 🚫 **Moderation** Commands for server staff\n\n> ⚒️ **Utility** Commands for general use", false)
                    .setFooter('Something missing or incorrect? -----')
                let helpMessage = await reaction.message.edit(helpEmbed)
                await reaction.message.reactions.removeAll();
                await helpMessage.react('🎮');
                await helpMessage.react('🚫');
                await helpMessage.react('⚒️');
            }
        }
    }
}