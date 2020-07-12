const { getMember, formatDate } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const TrackingCorreios = require('tracking-correios');


module.exports = {
    name: "rastreio",
    aliases: ["correios"],
    category: "utils",
    description: "Retorna informações de um pacote pelos correios",
    usage: "[comando | alias] <código de rastreio>",
    run: async (client, message, args) => {
		if(!args[0]) return;

		TrackingCorreios.track('OK204454682BR').then(console.log)
	}
}