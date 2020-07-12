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
				var dataEvento = dataJson.objeto[0].evento[0];
				var dataCidade = dataJson.cidade;
				var dataUF = dataJson.uf;
				var dataDesc dataJson.descricao;
				var dataData = dataJson.data;
				
				
				
				const embed = new RichEmbed()
                            .setThumbnail(imageURL)
                            .setColor('#0000ff')
                            .addField('Informação da Skin', stripIndents`
                                **Local:** ${dataCidade} - ${dataUF}
                                **Descrição:** ${dataDesc}
                                **Data:** ${dataData}`, true)
        
                message.channel.send(embed);
			});
			
			
			
		}).on("error", (err) => {
			console.log("Error: " + err.message);
        });
		
	}
}