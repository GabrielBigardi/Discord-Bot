const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "multiserver",
    aliases: ["multiservers"],
    category: "info",
    description: "multiserver.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
		let teste = args.slice(0).join(' ')
		
		let canal = client.channels.cache.get('745493180442476665');
		canal.send(teste);
    }
}