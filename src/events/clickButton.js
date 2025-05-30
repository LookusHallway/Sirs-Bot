const config = require('../../config.json')
const { MessageButton, ButtonCollector } = require('discord-buttons');
const { embed } = require('../util/util');
const message = require('./message');


module.exports = {
    once: false,
    async execute(button, client) {
        button.defer(true);
        if (button.id === 'streams') {
            let streamRole = config.ROLES.SIGNUP.STREAMS;
            if (button.clicker.member.roles.cache.some(r => r.id=== config.ROLES.SIGNUP.STREAMS)) {
                button.clicker.member.roles.remove(streamRole);
                return button.clicker.member.send({ embed: embed('success', 'Removed you from stream notifications!') });

            } else {
                button.clicker.member.roles.add(streamRole);
                return button.clicker.member.send({ embed: embed('success', 'Signed you up for stream notifications!') });
            }
        } else if (button.id === 'events') {
            let eventRole = config.ROLES.SIGNUP.EVENTS;
            if (button.clicker.member.roles.cache.some(r => r.id === config.ROLES.SIGNUP.EVENTS)) {
                button.clicker.member.roles.remove(eventRole);
                return button.clicker.member.send({ embed: embed('success', 'Removed you from event notifications!') });
            } else {
                button.clicker.member.roles.add(eventRole);
                return button.clicker.member.send({ embed: embed('success', 'Signed you up for event notifications!') });
            }
        } else console.log('Something went wrong.')
    }
}