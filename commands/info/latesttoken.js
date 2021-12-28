const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const https = require('https')

module.exports = {
    name: "ultimotoken",
    category: "info",
    description: "Checa ultimo token lançado",
    usage: "[comando]",
    run: async (client, message, args) => {
		GetLatestTokens().then(x => {
			let tokens = GetString(x,'https://thebittimes.com/token-','.html">');
			let { name, platform, contract}  = ParseTokenString(tokens);
							
			const embed = new MessageEmbed()
				.setColor('#00FF00')
				.addField('Informação', stripIndents`
					**Nome:** ${name}
					**Plataforma:** ${platform}
					**Contrato:** ${contract}`, true);
			message.channel.send(embed);
		})
    }
}

function GetString(string, start, end) {
	return string.split(start)[1].split(end)[0];
}

function GetLatestTokens(){
	return new Promise((resolve, reject) => {
		https.get(`https://thebittimes.com/coins-new.html`, (resp) => {
			let data = '';
			resp.on('data', (chunk) => {
				data += chunk;
			});
		
			resp.on('end', () => {
				resolve(data)
				//try{
				//	const parsedData = JSON.parse(data);
				//	resolve(parsedData);
				//}catch(e){
				//	reject(e.message);
				//}
				
			});
		
		}).on("error", (e) => {
			reject(e.message);
		});
	});
}

function ParseTokenString(string){
	//token-platform-contract
	let name = string.split('-')[0];
	let platform = string.split('-')[1];
	let contract = string.split('-')[2];
	
	return{
		name,
		platform,
		contract
	}
}