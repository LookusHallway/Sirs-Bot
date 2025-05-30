const config = require('../../../config')
const { embed } = require('../../util/util');
const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'rolerequest',
    description: 'Requests overall duels title in correspondence to in-game statistics',
    roles: [config.ROLES.STAFF.OWNER],

    async execute(client, message, args) {

        let resMsg;
        let regEx = /^[a-zA-Z0-9_]*$/;

        if (message.channel.id = config.CHANNEL.ROLEREQUEST) {

            // Making sure it's a valid username
            if (args[0] && args[0].length >= 3 && args[0].length <= 16 && regEx.test(args[0])) {
                const player = await fetchHypixelPlayer(args[0])
                // Checking if the player exists
                if (player) {
                    // If they don't have discord set
                    if (!player?.socialMedia?.links?.DISCORD) { resMsg = await message.channel.send({embed: embed('error', `${player.displayname} does not have a discord set.\nYou can do this via /profile > Social Media`)}); } else {
                        if (player.socialMedia.links.DISCORD === message.author.tag) {
                            // If they have no duels wins
                            if (!player?.stats?.Duels?.wins) { resMsg = await message.channel.send({embed: embed('error', `${player.displayname} does not have any duels wins.`)}); } else {

                                // Checking which overall role they should have
                                if (await giveRoles(player.stats.Duels.wins, message.member)) {
                                    resMsg = await message.channel.send({embed: embed('success', `${message.author.tag} roles were succesfully added!`)})
                                } else {
                                    resMsg = await message.channel.send({embed: embed('error', `${message.author.tag} some error occured, please contact a developer.`)})
                                }
                            }
                        } else {
                            resMsg = await message.channel.send({embed: embed('error', `${player.displayname}'s discord is not ${message.author.tag}`)})
                        }
                    }
                } else {
                    resMsg = await message.channel.send({embed: embed('error', 'Please provide a valid username.')})
                }
            } else {
                resMsg = await message.channel.send({embed: embed('error', 'Please provide a valid username.')})
            }
            // Remove response msg after 5 seconds
            message.delete();
            setTimeout(() => { resMsg.delete() }, 5e3);
        }

        // Function giveRoles 
        async function giveRoles(wins, member) {

            // Rookie ----------
            if (wins < 100) {
                member.roles.add(config.ROLES.ROOKIE.ONE)
                return true
            }

            // Iron ----------
            if (wins >= 200 && wins < 500) {
                member.roles.add(config.ROLES.IRON.ONE)
                return true
            }

            // Gold ----------
            if (wins >= 500 && wins < 100) {
                member.roles.add(config.ROLES.GOLD.ONE)
                return true
            }

            // Diamond ----------
            if (wins >= 1000 && wins < 2000) {
                member.roles.add(config.ROLES.DIAMOND.ONE)
                return true
            }

            // Master ----------
            if (wins >= 2000 && wins < 2400) {
                member.roles.add(config.ROLES.MASTER.ONE)
                return true
            }

            if (wins >= 2400 && wins < 2800) {
                member.roles.add(config.ROLES.MASTER.TWO)
                return true
            }

            if (wins >= 2800 && wins < 3200) {
                member.roles.add(config.ROLES.MASTER.THREE)
                return true
            }

            if (wins >= 3200 && wins < 3600) {
                member.roles.add(config.ROLES.MASTER.FOUR)
                return true
            }

            if (wins >= 3600 && wins < 4000) {
                member.roles.add(config.ROLES.MASTER.FIVE)
                return true
            }

            // Legend ----------
            if (wins >= 4000 && wins < 5200) {
                member.roles.add(config.ROLES.LEGEND.ONE)
                return true
            }

            if (wins >= 5200 && wins < 6400) {
                member.roles.add(config.ROLES.LEGEND.TWO)
                return true
            }

            if (wins >= 6400 && wins < 7600) {
                member.roles.add(config.ROLES.LEGEND.THREE)
                return true
            }

            if (wins >= 7600 && wins < 8800) {
                member.roles.add(config.ROLES.LEGEND.FOUR)
                return true
            }

            if (wins >= 8800 && wins < 10000) {
                member.roles.add(config.ROLES.LEGEND.FIVE)
                return true
            }

            // Grandmaster ----------
            if (wins >= 10000 && wins < 12000) {
                member.roles.add(config.ROLES.GRANDMASTER.ONE)
                return true
            }

            if (wins >= 12000 && wins < 14000) {
                member.roles.add(config.ROLES.GRANDMASTER.TWO)
                return true
            }

            if (wins >= 14000 && wins < 16000) {
                member.roles.add(config.ROLES.GRANDMASTER.THREE)
                return true
            }

            if (wins >= 16000 && wins < 18000) {
                member.roles.add(config.ROLES.GRANDMASTER.FOUR)
                return true
            }

            if (wins >= 18000 && wins < 20000) {
                member.roles.add(config.ROLES.GRANDMASTER.FIVE)
                return true
            }

            // Godlike ----------
            if (wins >= 20000 && wins < 24000) {
                member.roles.add(config.ROLES.GODLIKE.ONE)
                return true
            }

            if (wins >= 24000 && wins < 28000) {
                member.roles.add(config.ROLES.GODLIKE.TWO)
                return true
            }

            if (wins >= 28000 && wins < 32000) {
                member.roles.add(config.ROLES.GODLIKE.THREE)
                return true
            }

            if (wins >= 32000 && wins < 36000) {
                member.roles.add(config.ROLES.GODLIKE.FOUR)
                return true
            }

            if (wins >= 36000 && wins < 40000) {
                member.roles.add(config.ROLES.GODLIKE.FIVE)
                return true
            }

            if (wins >= 40000 && wins < 44000) {
                member.roles.add(config.ROLES.GODLIKE.SIX)
                return true
            }

            if (wins >= 44000 && wins < 48000) {
                member.roles.add(config.ROLES.GODLIKE.SEVEN)
                return true
            }

            if (wins >= 48000 && wins < 52000) {
                member.roles.add(config.ROLES.GODLIKE.EIGHT)
                return true
            }

            if (wins >= 52000 && wins < 56000) {
                member.roles.add(config.ROLES.GODLIKE.NINE)
                return true
            }

            if (wins >= 56000) {
                member.roles.add(config.ROLES.GODLIKE.TEN)
                return true
            }

            return false
        }

        // Fetch API
        function fetchHypixelPlayer(username) {
            return new Promise((resolve, reject) => {
                // Get uuid from mojang api
                fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
                .then(res => res.json())
                .then(mcJson => {
                    // Get player from hypixel api
                    fetch(`https://api.hypixel.net/player?key=${config.API_KEY}&uuid=${mcJson.id}`)
                    .then(res => res.json())
                    .then(json => {
                        if (json.success) {
                            resolve(json.player)
                        } else {
                            reject(json.cause)
                        }
                    })
                })
            })
        }
    }
}