const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const search = require("yt-search");
const ytdl = require("ytdl-core-discord");

module.exports = {
    name: "play",
    aliases: ["tocar"],
    category: "music",
    description: "Toca uma música.",
    usage: "[comando | alias] <Link/Nome>",
    run: async (client, message, args) => {
        const s = args.join(" ");
		try{
			search(s, (err,result) => {
			if(err){
				console.log("Erro: " + err);
			}else if (result && result.videos.length > 0){
					const song = result.videos[0];
					//console.log(message.member.voiceChannel);
					playSong(client, message, song);
			}else{
				return message.reply("ERRO: não foi encontrado nenhum vídeo.");
			}
		});
		} catch(e) {
			console.error(e);
		}
		
    }
}

const playSong = async (client, message, song) => {
	let queue = client.queues.get(message.member.guild.id);
	
	if(!song){
		if(queue){
			queue.connection.disconnect();
			client.queues.delete(message.member.guild.id);
			message.reply("Nada para tocar, saindo do canal de voz.");
		}
	}

	if(!message.member.voiceChannel){
		return message.reply("Erro: você não está em um canal de voz !");
	}

	
	if(!queue){
		const conn = await message.member.voiceChannel.join();
		queue = {
			volume: 10,
			connection: conn,
			dispatcher: null,
			songs: [song]
		}
		//console.log(queue);
		//return;
		
		//normal
		queue.dispatcher = await queue.connection.playStream(await ytdl(song.url), {
			type: "opus"
		});
		
		//com buffer pra evitar travadas
		//ueue.dispatcher = await queue.connection.playStream(
		//	await ytdl(song.url, { highWaterMark: 1 << 25, filter: "audioonly" }),
		//	{
		//		type: "opus"
		//	});
		
		
		queue.dispatcher.on("finish", () =>{
			queue.songs.shift();
			playSong(client, message, queue.songs[0]);
		});
		
		client.queues.set(message.member.guild.id, queue);
		message.reply("Tocando música.");
		
	}else{
		queue.songs.push(song);
		client.queues.set(message.member.guild.id);
		message.reply("Troca de música.");
	}
	
};