const { MessageButton } = require('discord-buttons')
const Discord = require('discord.js')
const config = require('../../../config')

module.exports = {
    name: 'roles',
    roles: [config.ROLES.STAFF.STAFF],
    async execute(client, message, args) {

        const embed = new Discord.MessageEmbed()
            .setTitle('Role Signup')
            .setThumbnail('https://i.imgur.com/aDFG7iB.png')
            .setDescription('Click the button of the role you wish to sign up for or remove!')
            .addFields(
                { name: 'Stream', value: 'People with the Twitch Follower role receive notifications on any upcoming or current streams!'},
                { name: 'Events', value: 'People with the Parties role receive notifications on any upcoming or current events!'}
            )
            .setFooter('Something broken? Contact ----!')

        let button1 = new MessageButton()
            .setStyle('green')
            .setLabel('Streams')
            .setID('streams')

        let button2 = new MessageButton()
            .setStyle('red')
            .setLabel('Events')
            .setID('events')
        
        message.channel.send({ embed: embed, buttons: [button1, button2] })
    }
}