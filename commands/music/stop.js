const { RichEmbed } = require("discord.js");
const { getMember  } = require("../../functions.js");

const ytdl = require("ytdl-core");
var serversModule = require('../../handler/servers');

module.exports = {
    name: "stop",
    aliases: ["parar"],
    category: "music",
    description: "Para a playlist e sai do canal.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        var server = serversModule.servers[message.guild.id];
        if(message.guild.voiceConnection){
            for(var i = server.queue.length - 1; i >= 0; i--){
                server.queue.splice(i, 1);
            }

            server.dispatcher.end();
            message.channel.send("Finalizando playlist e saindo do canal.");
        }

        if(message.guild.connection) message.guild.voiceConnection.disconnect();
    }
}