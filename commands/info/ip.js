
//https://api.streamelements.com/kappa/v2/points/5b64234fe8fd184d761eadcf/naoconhecido


const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const http = require('http');

module.exports = {
    name: "ip",
    category: "info",
    description: "Checa determinado IP e retorna informações.",
    usage: "[comando] <IP>",
    run: async (client, message, args) => {
        if(!args[0]) return;

        http.get(`http://ip-api.com/json/${args[0]}`, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            var parsedJson = JSON.parse(data);
            var country = parsedJson.country;
            var countryCode = parsedJson.countryCode;
            var region = parsedJson.region;
            var regionName = parsedJson.regionName;
			var city = parsedJson.city;
			var zip = parsedJson.zip;
			var lat = parsedJson.lat;
			var lon = parsedJson.lon;
			var timezone = parsedJson.timezone;
			var isp = parsedJson.isp;
			var org = parsedJson.org;
			var as = parsedJson.as;


            const embed = new RichEmbed()
                        .setColor('#00FF00')
                        .addField('Informação StreamElements', stripIndents`
                            **IP:** ${args[0]}
                            **País:** ${country}
                            **Cidade:** ${city}
                            **Estado:** ${regionName}
							**CEP:** ${zip}
							**Latitude:** ${lat}
							**Longitude:** ${lon}
							**Fuso Horário:** ${timezone}
							**ISP:** ${isp}
							**ORG:** ${org}
							**AS:** ${as}`, true);
            message.channel.send(embed);

        });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
}