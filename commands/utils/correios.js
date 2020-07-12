const { getMember, formatDate } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

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
                
                        // A chunk of data has been recieved.
                        resp.on('data', (chunk) => {
                            data += chunk;
                        });
                
                        // The whole response has been received. Print out the result.
                        resp.on('end', () => {
							
                            //var itemName = decodeURI(element);
                            //var volume = JSON.parse(data).volume;
                            //var precoMenor = JSON.parse(data).lowest_price;
                            //var precoMedio = JSON.parse(data).median_price;
        
                            const embed = new RichEmbed()
                            .setColor('#0000ff')
                            .addField('Informação da encomenda', stripIndents`
                                **Data:** ${data}`, true)
        
                                message.channel.send(embed);
                        });
                
                        }).on("error", (err) => {
                            console.log("Error: " + err.message);
                        });


                });
    }
}