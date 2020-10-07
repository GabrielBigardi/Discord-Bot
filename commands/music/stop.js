const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stop",
    aliases: ["parar"],
    category: "music",
    description: "Parar as músicas.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
		const queue = client.queues.get(message.guild.id);
		if (!queue) {
			return message.reply("não existe nenhuma música sendo reproduzida");
		}
		queue.songs = [];
		client.queues.set(message.guild.id, queue);
		queue.dispatcher.end();
	}
}