
//https://api.streamelements.com/kappa/v2/points/5b64234fe8fd184d761eadcf/naoconhecido


const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const http = require('https');

module.exports = {
    name: "followage",
    category: "info",
    description: "Checa o followage.",
    usage: "[comando] <usuario> <canal>",
    run: async (client, message, args) => {
        if(!args[0]) return;
		if(!args[1]) return;
		
		var username = args[0];
		var channel = args[1];

        http.get(`https://twitch.center/follow?username=${username}&channel=${channel}&callback=api`, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            var result = data.split('api(').pop().split(');')[0];
			var parsedJson = JSON.parse(result);
			if(parsedJson.error){
				const embed = new MessageEmbed()
                        .setColor('#FF0000')
                        .addField('ERRO !', stripIndents`**Mensagem:** ${parsedJson.error}`, true);
				message.channel.send(embed);
				return;
			}
			
			if(parsedJson.total == 0){
				const embed = new MessageEmbed()
                        .setColor('#FF0000')
                        .addField('ERRO !', stripIndents`**Mensagem:** Usuário não está seguindo o canal.`, true);
				message.channel.send(embed);
				return;
			}
			
			var followed_at = parsedJson.data[0].followed_at;
			var date = followed_at.split("T")[0];
			var year = date.split("-")[0];
			var month = date.split("-")[1];
			var day = date.split("-")[2];
			
			var finalDate = day + "/" + month + "/" + year;
			var finalTime = followed_at.split("T")[1].split("Z")[0];

            const embed = new MessageEmbed()
                        .setColor('#00FF00')
                        .addField('Twitch Followage', stripIndents`**Seguindo desde:** ${finalDate} as ${finalTime}`, true);
            message.channel.send(embed);

        });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
}