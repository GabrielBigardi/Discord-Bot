const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "online",
    aliases: ["uptime"],
    category: "info",
    description: "Checa o uptime do bot.",
    usage: "[comando | alias] <SteamID64>",
    run: async (client, message, args) => {
		let totalSeconds = client.uptime / 1000;
		let days = Math.floor(totalSeconds / 86400);
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;
		
		let uptime = `🗓️ ${hours.toFixed()} horas\n🗓️ ${minutes.toFixed()} minutos\n🗓️ ${seconds.toFixed()} segundos`;
		
		const embed = new MessageEmbed()
		.setTitle(`Tempo de atividade 🕰️`)
		.setThumbnail("https://imgur.com/WZMylbw.gif")
		.setColor("#2C2F33")
		.setDescription(`**Estou online há:**\n${uptime}`)
		
		message.channel.send(embed);
    }
}