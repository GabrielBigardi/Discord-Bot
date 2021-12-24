
//https://api.streamelements.com/kappa/v2/points/5b64234fe8fd184d761eadcf/naoconhecido


const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const http = require('https');

module.exports = {
    name: "token",
    category: "info",
    description: "Checa um tokens",
    usage: "[comando] <token>",
    run: async (client, message, args) => {
		if (!args[0]) return;
		
		var token = args[0];
		var tokenData = GetTokenData(message, token);
    }
}

function changeTimezone(date, ianatz) {

  // suppose the date is 12:00 UTC
  var invdate = new Date(date.toLocaleString('en-US', {
    timeZone: ianatz
  }));

  // then invdate will be 07:00 in Toronto
  // and the diff is 5 hours
  var diff = date.getTime() - invdate.getTime();

  // so 12:00 in Toronto is 17:00 UTC
  return new Date(date.getTime() - diff); // needs to substract
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function GetTokenData(message, token){
	http.get(`https://api.pancakeswap.info/api/v2/tokens/${token}`, (resp) => {
		let data = '';
		resp.on('data', (chunk) => {
			data += chunk;
		});

		resp.on('end', () => {
			var parsedJson = JSON.parse(data);
			var updated_at = parsedJson.updated_at;
			var name = parsedJson.data.name;
			var symbol = parsedJson.data.symbol;
			var price = parsedJson.data.price;
			var price_BNB = parsedJson.data.price_BNB;
			var date = new Date(updated_at * 1000);
		
		    const embed = new MessageEmbed()
                .setColor('#00FF00')
                 .addField('Resultado do token', stripIndents
								`**Nome:** ${name}
								**Simbolo:** ${symbol}
                                **Preço (USD):** ${price}
                                **Preço (BNB):** ${price_BNB}`, true)
            message.channel.send(embed);
		});

	}).on("error", (err) => {
		console.log("Error: " + err.message);
	});
}