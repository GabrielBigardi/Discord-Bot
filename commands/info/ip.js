
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
                            **País:** ${country == null ? "Desconhecido" : country.toString()}
                            **Cidade:** ${city == null ? "Desconhecido" : city.toString()}
                            **Estado:** ${regionName == null ? "Desconhecido" : regionName.toString()}
							**CEP:** ${zip == null ? "Desconhecido" : zip.toString()}
							**Latitude:** ${lat == null ? "Desconhecido" : lat.toString()}
							**Longitude:** ${lon == null ? "Desconhecido" : lon.toString()}
							**Fuso Horário:** ${timezone == null ? "Desconhecido" : timezone.toString()}
							**ISP:** ${isp == null ? "Desconhecido" : isp.toString()}
							**ORG:** ${org == null ? "Desconhecido" : org.toString()}
							**AS:** ${as == null ? "Desconhecido" : as.toString()}`, true);
            message.channel.send(embed);

        });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
}