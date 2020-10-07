const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const search = require("yt-search");
const ytdl = require("ytdl-core-discord");

module.exports = {
    name: "skip",
    aliases: ["pular"],
    category: "music",
    description: "Pula a música atual.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
		const queue = client.queues.get(message.guild.id);
		if (!queue) {
			return message.reply("não existe nenhuma música sendo reproduzida");
		}
		queue.songs.shift();
		client.queues.set(message.guild.id, queue);
		playSong(client, message, queue.songs[0]);
	}
}

const playSong = async (client, message, song) => {
	let queue = client.queues.get(message.member.guild.id);
	if (!song) {
		if (queue) {
			queue.connection.disconnect();
			return client.queues.delete(message.member.guild.id);
		}
	}
	
	if (!message.member.voice.channel) {
		return message.reply("você precisa estar em um canal de voz para reproduzir uma música!");
	}
	
	if (!queue) {
		const conn = await message.member.voice.channel.join();
		queue = {
			volume: 10,
			connection: conn,
			dispatcher: null,
			songs: [song],
		};
	}
	
	queue.dispatcher = await queue.connection.play(
	await ytdl(song.url, { highWaterMark: 1 << 25, filter: "audioonly" }),
	{
	type: "opus",
	});
	
	queue.dispatcher.on("finish", () => {
		queue.songs.shift();
		playSong(client, message, queue.songs[0]);
	});
	
	client.queues.set(message.member.guild.id, queue);
}