const { MessageEmbed } = require("discord.js");
const { promptMessage, getMember } = require("../../functions.js");

module.exports = {
    name: "peepohey",
    category: "emojis",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        message.channel.send("<a:peepohey:785893220365107221>");
    }
}
