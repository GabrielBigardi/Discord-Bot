const { MessageEmbed } = require("discord.js");
const { promptMessage, getMember } = require("../../functions.js");

module.exports = {
    name: "feelsrainman",
    category: "emojis",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        message.channel.send("<a:feelsrainman:785893128166572052>");
    }
}
