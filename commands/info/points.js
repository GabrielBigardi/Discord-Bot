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
			
			GetPoints(channelData, args[0]).then(farmData => {
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

function GetChannelData(channelName)
{
	//Example URL: https://api.streamelements.com/kappa/v2/channels/c9judite
	//Response: {"channel":"5989df9d5fbe120a16fd3ae0","username":"naoconhecido","points":18418,"pointsAlltime":113518,"watchtime":696220,"rank":555}
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

function GetPoints(channelData, username)
{
	//Example URL: https://api.streamelements.com/kappa/v2/points/5989df9d5fbe120a16fd3ae0/naoconhecido
	//Response: {"channel":"5989df9d5fbe120a16fd3ae0","username":"naoconhecido","points":18418,"pointsAlltime":113518,"watchtime":696220,"rank":555}
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

function GetLoyaltyData(channelId)
{
	//Example URL: https://api.streamelements.com/kappa/v2/loyalty/5989df9d5fbe120a16fd3ae0
	//Response: {"loyalty":{"bonuses":{"follow":0,"tip":5,"subscriber":110,"cheer":15,"host":0},"name":"lupicoins","enabled":true,"amount":1,"subscriberMultiplier":2,"ignored":["streamelements","jschritte","lurxx","advogg","lolrankbot","blindaobot","bielsm7","itsvodoo","aten","treadmillthewhale","winsock","3jask","commanderroot"]},"_id":"5989df9d5fbe120a16fd3af7","updatedAt":"2021-10-08T17:32:03.781Z","createdAt":"2017-08-08T15:58:21.096Z","channel":"5989df9d5fbe120a16fd3ae0"}
	return new Promise((resolve, reject) => {
		https.get(`https://api.streamelements.com/kappa/v2/loyalty/${channelData._id}`, (resp) => {
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