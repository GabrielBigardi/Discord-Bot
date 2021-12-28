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
			let tokensLaunchedAt = GetString(x,'Deploy At ','"');
			let { name, platform, contract}  = ParseTokenString(tokens);
			CheckHoneypot(contract).then(x => {
				const embed = new MessageEmbed()
				.setColor('#00FF00')
				.addField('Informação - Token', stripIndents`
					**Nome:** ${name}
					**Plataforma:** ${platform}
					**Contrato:** ${contract}
					**Lançamento:** ${tokensLaunchedAt}`, true)
				.addField('Informações - Honeypot', stripIndents`
					**Honeypot:** ${x.IsHoneypot}
					**Erro:** ${x.Error}
					**MaxTxAmount:** ${x.MaxTxAmount}
					**MaxTxAmount BNB:** ${x.MaxTxAmountBNB}
					**Buy Tax:** ${x.BuyTax}
					**Sell Tax:** ${x.SellTax}
					**Buy Gas:** ${x.BuyGas}
					**Sell Gas:** ${x.SellGas}`);
				message.channel.send(embed);
			})
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

function CheckHoneypot(contract){
		return new Promise((resolve, reject) => {
		https.get(`https://aywt3wreda.execute-api.eu-west-1.amazonaws.com/default/IsHoneypot?chain=bsc2&token=${contract}`, (resp) => {
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