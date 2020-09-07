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
	if(!song){
		
	}

	if(!message.member.voiceChannel){
		return message.reply("Erro: você não está em um canal de voz !");
	}
	
	let queue = client.queues.get(message.member.guild.id);
	
	if(!queue){
		const conn = await message.member.voiceChannel.join();
		queue = {
			volume: 10,
			connection: conn,
			dispatcher: null,
			songs: [song]
		}
		console.log(queue);
		
		queue.dispatcher = await queue.connection.play(await ytdl(song.url), {
			type: "opus"
		});
		queue.dispatcher.on("finish", () =>{
			queue.songs.shift();
			playSong(client, message, queue.songs[0]);
		});
		
		client.queues.set(message.member.guild.id, queue);
		
	}else{
		queue.songs.push(song);
		client.queues.set(message.member.guild.id);
	}
	
};