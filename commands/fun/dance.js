const { MessageEmbed } = require("discord.js");
const { promptMessage, getMember } = require("../../functions.js");

module.exports = {
    name: "dance",
    category: "fun",
    description: "Ri de alguém.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        message.channel.send("?  ?(?o?)?  ?  ? ( ?o?) ?  ?");
    }
}
