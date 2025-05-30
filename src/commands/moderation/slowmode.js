const { embed } = require('../../util/util');
const config = require('../../../config')

module.exports = {
    name: 'slowmode',
    roles: [config.ROLES.STAFF.STAFF],
    description: 'Changes the channel slowmode',

    async execute(client, message, args) {

        const time = Math.floor(args[0]);

        if (time < 0 || time > 21600) return message.channel.send({embed: embed('error', 'Please choose a time between 1 second and 21,600 seconds (6 hours).')})

        try {
            message.channel.setRateLimitPerUser(time).then(() => {
                if (time === 0) {
                    message.channel.send({embed: embed('success', 'Successfully removed the slowmode!')})
                } else {
                    message.channel.send({embed: embed('success', `Successfully changed the slowmode to ${time} seconds!`)})
                }
            })
        } catch (error) {
            message.channel.send({embed: embed('error', 'Incorrect usage or something broke. Please try again.')})
        }
    }
}