const { MessageEmbed } = require("discord.js");
const { promptMessage, getMember } = require("../../functions.js");

module.exports = {
    name: "ridele",
    category: "emojis",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        message.channel.send("<:KEKW:733838409877028956>");
    }
}
