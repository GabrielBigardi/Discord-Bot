const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pause",
    aliases: ["pausar"],
    category: "music",
    description: "Pausa uma música.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
		const queue = client.queues.get(message.guild.id);
		if (!queue) {
			return message.reply("não existe nenhuma música sendo reproduzida");
		}
		queue.dispatcher.pause();
	}
}