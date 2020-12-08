const { MessageEmbed } = require("discord.js");
const { promptMessage, getMember } = require("../../functions.js");

module.exports = {
    name: "peepoarrive",
    category: "emojis",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        message.channel.send("<a:peepoarrive:785893056528121877>");
    }
}
