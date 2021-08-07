const { getMember } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
//const https = require('https');
var request = require('request');

module.exports = {
    name: "skinscreenshot",
    aliases: ["sc"],
    category: "info",
    description: "Mostra a foto real da skin.",
    usage: "[comando | alias] <url>",
    run: async (client, message, args) => {
		if(!args[0]) return;
		
		var inspectUrl = args[0];
		
		var firstReqHeaders = {
			'authority': 'cs.deals',
			'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
			'accept': 'application/json, text/javascript, */*; q=0.01',
			'x-requested-with': 'XMLHttpRequest',
			'sec-ch-ua-mobile': '?0',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'origin': 'https://cs.deals',
			'sec-fetch-site': 'same-origin',
			'sec-fetch-mode': 'cors',
			'sec-fetch-dest': 'empty',
			'referer': 'https://cs.deals/pt/screenshot',
			'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,pl;q=0.6'
		};

		var firstReqOptions = {
			url: 'https://cs.deals/ajax/makeScreenshotRequest',
			method: 'POST',
			headers: firstReqHeaders,
			body: 'link='+encodeURI(inspectUrl)+'&type=screenshot'
		};

		request(firstReqOptions, function(error, response, body){
			if (!error && response.statusCode == 200) {
				//console.log(body);
				var json = JSON.parse(body);
	
				if(json.success == true){
					var requestId = json.response.requestId;
					var paintWear = json.response.paintwear;
					var paintSeed = json.response.paintseed;
					var paintIndex = json.response.paintindex;
					
					message.channel.send(`Sucesso!\n\nFloat: ${paintWear}\nPaint Seed: ${paintSeed}\nPaint Index: ${paintIndex}\n\nTentando tirar foto...`);
					
					var secondReqHeaders = {
						'authority': 'cs.deals',
						'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
						'accept': 'application/json, text/javascript, */*; q=0.01',
						'x-requested-with': 'XMLHttpRequest',
						'sec-ch-ua-mobile': '?0',
						'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
						'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
						'origin': 'https://cs.deals',
						'sec-fetch-site': 'same-origin',
						'sec-fetch-mode': 'cors',
						'sec-fetch-dest': 'empty',
						'referer': 'https://cs.deals/pt/screenshot',
						'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,pl;q=0.6'
					};
					
					var secondReqOptions = {
						url: 'https://cs.deals/ajax/screenshotLongpoll',
						method: 'POST',
						headers: secondReqHeaders,
						body: 'id='+requestId+''
					};
					
					request(secondReqOptions, function(error2, response2, body2){
						if (!error2 && response2.statusCode == 200) {
							//console.log(body2);
							var json2 = JSON.parse(body2);
							if(json2.success == true){
								var imageId = json2.response.imageId;
								var buff = new Buffer(imageId);
								var base64data = buff.toString('base64');
								message.channel.send(`https://cs.deals/csgoScreenshot/${base64data}.jpg`);
								message.channel.send(`Abra a imagem para uma melhor visualização.`);
							}else{
								message.channel.send(`Erro: ${json2.error}`);
							}
						}
					});
					
				}else{
					message.channel.send(`Erro: ${json.error}`);
				}
			}
		});
    }
}

function callback(error, response, body, message) {
	
}