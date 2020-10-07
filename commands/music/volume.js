const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    aliases: ["alto"],
    category: "music",
    description: "Altera o volume de uma música.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
		const queue = client.queues.get(message.guild.id);
		if (!queue) {
			return message.reply("não existe nenhuma música sendo reproduzida");
		}
		const volume = Number(args.join(" "));
		if (isNaN(volume) || volume < 0 || volume > 10) {
			return message.reply("o volume deve ser um valor entre 0 e 10");
		}
		queue.dispatcher.setVolume(volume / 10);
		queue.volume = volume;
		client.queues.set(message.guild.id, queue);
	}
}