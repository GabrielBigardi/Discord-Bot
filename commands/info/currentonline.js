const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const https = require('https');

module.exports = {
    name: "onlineagora",
    aliases: ["currentlyonline"],
    category: "info",
    description: "Verifica quantos usuários e servidores está escutando.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        message.channel.send(`Atualmente escutando ${client.users.cache.size} pessoas em ${client.guilds.cache.size} servidores.`);
    }
}