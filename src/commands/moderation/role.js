const { embed } = require('../../util/util');
const config = require('../../../config')
const Discord = require('discord.js');

module.exports = {
    name: 'role',
    roles: [config.ROLES.STAFF.STAFF],
    description: 'Adds role to a user',
    async execute(client, message, args) {
        const member = message.mentions.members.first()
        console.log(member)
        const roleRequestName = args.splice(1).join(" ");
        let roleName = message.guild.roles.cache.find((role) => role.name === roleRequestName)

        if (!member || !roleRequestName) {
            return message.channel.send({embed: embed('error', 'Please make sure that you tagged someone and provided the exact name of the role.')})
        }

        member.roles.add(roleName).catch(() => {
            return message.channel.send({embed: embed('error', 'The bot does not have permission to give this role.')});
        });
    }
}