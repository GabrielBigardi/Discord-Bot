const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const https = require('https');

module.exports = {
    name: "pontos",
    aliases: ["points"],
    category: "info",
    description: "Checa pontos de determinado usuário.",
    usage: "[comando | alias] <usuário> <canal>",
    run: async (client, message, args) => {
        if(!args[0]) return;
		if(!args[1]) return;
		
		GetChannelData(args[1]).then(channelData => {
			//console.log(channelData);
			
			if(IsUndefined(channelData.displayName)){
				const embed = new MessageEmbed()
						.setColor('#FF0000')
						.addField('Erro ao executar comando', stripIndents`
							**STREAMER NÃO ENCONTRADO !**`, true);
							
				message.channel.send(embed);
				return;
			}
			
			GetFarmStatus(channelData, args[0]).then(farmData => {
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
//var parsedJson = JSON.parse(data);
//var pontos = parsedJson.points;
//var pontosTotais = parsedJson.pointsAlltime;
//var assistido = parsedJson.watchtime;
//var rank = parsedJson.rank;
//if(pontos){
//
//}else{
//	const embed = new MessageEmbed()
//				.setColor('#FF0000')
//				.addField('Erro ao executar comando', stripIndents`
//					**USUÁRIO NÃO ENCONTRADO !**`, true);
//	message.channel.send(embed);
//}
    }
}

function GetChannelData(channelName)
{
	return new Promise((resolve, reject) => {
		https.get(`https://api.streamelements.com/kappa/v2/channels/${channelName}`, (resp) => {
			let data = '';
			resp.on('data', (chunk) => {
				data += chunk;
			});
		
			resp.on('end', () => {
				try{
					const parsedData = JSON.parse(data);
					resolve(parsedData);
				}catch(e){
					reject(e.message);
				}
				
			});
		
		}).on("error", (e) => {
			reject(e.message);
		});
	});
}

function GetFarmStatus(channelData, username)
{
	return new Promise((resolve, reject) => {
		https.get(`https://api.streamelements.com/kappa/v2/points/${channelData._id}/${username}`, (resp) => {
			let data = '';
			resp.on('data', (chunk) => {
				data += chunk;
			});
		
			resp.on('end', () => {
				try{
					const parsedData = JSON.parse(data);
					resolve(parsedData);
				}catch(e){
					reject(e.message);
				}
			});
	
		}).on("error", (err) => {
			reject(e.message);
		});
	});
}

function IsUndefined(data)
{
	return typeof data === 'undefined';
}