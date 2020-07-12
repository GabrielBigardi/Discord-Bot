const { getMember, formatDate } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const https = require('https');


module.exports = {
    name: "rastreio",
    aliases: ["correios"],
    category: "utils",
    description: "Retorna informações de um pacote pelos correios",
    usage: "[comando | alias] <código de rastreio>",
    run: async (client, message, args) => {
		
		if(!args[0]) return;
		
        let URL = `https://correios.postmon.com.br/webservice/buscaEventos/?objetos=${args[0]}`;
		
		https.get(URL, (resp) => {
			let data = '';
			
			resp.on('data', (chunk) => {
				data += chunk;
			});
			
			resp.on('end', () => {
				var dataJson = JSON.parse(data);
				
				
				
				message.channel.send(dataJson);
			});
			
			
			
		}).on("error", (err) => {
			console.log("Error: " + err.message);
        });
		
	}
}