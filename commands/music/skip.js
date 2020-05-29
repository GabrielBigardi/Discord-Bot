const { RichEmbed } = require("discord.js");
const { getMember  } = require("../../functions.js");

const ytdl = require("ytdl-core");
var serversModule = require('../../handler/servers');

module.exports = {
    name: "pular",
    aliases: ["pularmusica"],
    category: "music",
    description: "Pula a música atual.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        var server = serversModule.servers[message.guild.id];
        if(server.dispatcher) server.dispatcher.end();
        message.channel.send("Pulando a música atual !");
    }
}