const { RichEmbed } = require("discord.js");
const { getMember  } = require("../../functions.js");

const ytdl = require("ytdl-core");
var serversModule = require('../../handler/servers');

module.exports = {
    name: "tocar",
    aliases: ["tocarmusica"],
    category: "music",
    description: "Toca uma música do YT.",
    usage: "[comando | alias] [link]",
    run: async (client, message, args) => {

    function play(connection,message){
        var server = serversModule.servers[message.guild.id];
        server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
        server.queue.shift();
        server.dispatcher.on("end", function(){
            if(server.queue[0]){
				
				
				ytdl.getInfo(videoID, (err, info) => {
				if (err) throw err;
					message.channel.send("a teste");
				});
				
				
                play(connection,message);
            }else{
                connection.disconnect();
            }
        });
    }

        if(!args[0]){
            message.channel.send("Irmão tu nem postou um link");
            return;
        }

        if(!message.member.voiceChannel){
            message.channel.send("Irmão tu nem ta em uma call...");
            return;
        }

        if(!serversModule.servers[message.guild.id]) serversModule.servers[message.guild.id] = {
            queue: []
        }

        var server = serversModule.servers[message.guild.id];
        server.queue.push(args[0]);

        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
            play(connection,message);
        });
    }
}