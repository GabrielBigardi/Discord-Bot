const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const https = require('https');

module.exports = {
    name: "pontos",
    aliases: ["points"],
    category: "info",
    description: "Checa pontos de determinado usuário.",
    usage: "[comando | alias] <usuário>",
    run: async (client, message, args) => {
        if(!args[0]) return;

        https.get(`https://api.streamelements.com/kappa/v2/points/5b64234fe8fd184d761eadcf/${args[0]}`, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            var parsedJson = JSON.parse(data);
            var pontos = parsedJson.points;
            var pontosTotais = parsedJson.pointsAlltime;
            var assistido = parsedJson.watchtime;
            var rank = parsedJson.rank;

            
        
            if(pontos){
                const embed = new MessageEmbed()
                            .setColor('#00FF00')
                            .addField('Informação StreamElements', stripIndents`
                                **Nome:** ${args[0]}
                                **Pontos:** ${pontos}
                                **Pontos totais farmados:** ${pontosTotais}
                                **Tempo assistido:** ${assistido}
                                **Rank:** ${rank}`, true);
                message.channel.send(embed);
            }else{
                const embed = new MessageEmbed()
                            .setColor('#FF0000')
                            .addField('Erro ao executar comando', stripIndents`
                                **USUÁRIO NÃO ENCONTRADO !**`, true);
                message.channel.send(embed);
            }

        });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
}