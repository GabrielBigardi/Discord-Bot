const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const Gamedig = require('gamedig');

module.exports = {
    name: "serverinfo",
    aliases: ["infoserver"],
    category: "info",
    description: "Verifica o servidor.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
		
		console.log(args.length);
		if(args.length < 2) return;
		
		const type = args[0];
		const ipsplit = args[1].split(':');
		const ip = ipsplit[0];
		const port = ipsplit[1];
		
		//console.log(test);
		
		Gamedig.query({
			type: type,
			host: ip,
			port: port
		}).then((state) => {
			console.log(state);
			const embed = new MessageEmbed()
            .setColor('#00FF00')
            .addField('Informação do servidor', stripIndents`
                **Nome:** ${state.name}
                **Jogadores:** ${type == "minecraft" ? state.raw.vanilla.players.length : type == "mtasa" ? state.raw.numplayers : type == "cs16" ? state.raw.numplayers : state.raw.numplayers} / ${state.maxplayers}
				`, true);
            message.channel.send(embed);
		}).catch((error) => {
			message.channel.send(`Server offline.`);
		});
    }
}