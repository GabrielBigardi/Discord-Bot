const { MessageEmbed } = require("discord.js");
const { promptMessage, getMember } = require("../../functions.js");

module.exports = {
    name: "pepehappy",
    category: "fun",
    description: "pepehappy.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        message.channel.send("<a:teste:784167380468760576>");
    }
}
