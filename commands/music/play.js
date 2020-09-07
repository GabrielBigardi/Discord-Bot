const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "play",
    aliases: ["tocar"],
    category: "music",
    description: "Toca uma música.",
    usage: "[comando | alias] <Link/Nome>",
    run: async (client, message, args) => {
        console.log(args);
    }
}