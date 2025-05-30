const config = require('../../config.json')

module.exports = {
    once: false,
    async execute(member) {
        let peopleInDisc = client.guilds.cache.get(config.CHANNEL.SERVER).memberCount
        client.user.setPresence({ activity: {name: `${peopleInDisc} minemen`, type: 'WATCHING'} })
    }
}