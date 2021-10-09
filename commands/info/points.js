const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const https = require('https');
const streamElementsInfo = require('streamelements-info');

module.exports = {
    name: "pontos",
    aliases: ["points"],
    category: "info",
    description: "Checa pontos de determinado usuário.",
    usage: "[comando | alias] <usuário> <canal>",
    run: async (client, message, args) => {
        if(!args[0]) return;
		if(!args[1]) return;
		
		streamElementsInfo.GetChannelData(args[1]).then(channelData => {
			//console.log(channelData);
			
			if(IsUndefined(channelData.displayName)){
				const embed = new MessageEmbed()
						.setColor('#FF0000')
						.addField('Erro ao executar comando', stripIndents`
							**STREAMER NÃO ENCONTRADO !**`, true);
							
				message.channel.send(embed);
				return;
			}
			
			streamElementsInfo.GetLoyaltyPoints(channelData._id, args[0]).then(farmData => {
				//console.log(farmData)
				
				if(IsUndefined(farmData.points)){
					const embed = new MessageEmbed()
							.setColor('#FF0000')
							.addField('Erro ao executar comando', stripIndents`
								**USUÁRIO NÃO ENCONTRADO !**`, true);
								
					message.channel.send(embed);
					return;
				}
				
				const embed = new MessageEmbed()
					.setColor('#00FF00')
					.addField('Informação StreamElements', stripIndents`
						**Usuário:** ${args[0]}
						**Canal:** ${channelData.displayName}
						**Pontos:** ${farmData.points}
						**Pontos totais farmados:** ${farmData.pointsAlltime}
						**Tempo assistido:** ${farmData.watchtime}
						**Rank:** ${farmData.rank}`, true);
				message.channel.send(embed);
			}).catch(error => {
				console.log(error);
			});
		}).catch(error => {
			console.log(error);
		})
    }
}

function IsUndefined(data)
{
	return typeof data === 'undefined';
}