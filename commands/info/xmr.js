
//https://api.streamelements.com/kappa/v2/points/5b64234fe8fd184d761eadcf/naoconhecido


const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const https = require('https');

module.exports = {
    name: "xmr",
    category: "info",
    description: "Checa determinada carteira XMR.",
    usage: "[comando] <carteira>",
    run: async (client, message, args) => {
        if(!args[0]) return;

        https.get(`https://minexmr.com/api/pool/get_wid_stats?address=${args[0]}`, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            var parsedJson = JSON.parse(data);
			if(parsedJson.error != null){
				message.channel.send("ERRO: " + parsedJson.error)
				return;
			}
			
			var totalHashrate = 0
			var totalMachines = 0
			for(var attribute in parsedJson){
				//console.log(attribute+": "+parsedJson[attribute].hashrate);
				if(parsedJson[attribute].hashrate > 0) totalHashrate += parsedJson[attribute].hashrate;
				if(parsedJson[attribute].hashrate > 0) totalMachines += 1;
				
			}
			
			//console.log("Total hashrate: " + totalHashrate);
			message.channel.send(`Máquinas ativas: ${totalMachines}\nHashrate: ${AbbreviateNumber(ParseHashrate(totalHashrate))}h/s`)
			

            //const embed = new MessageEmbed()
            //            .setColor('#00FF00')
            //            .addField('Informação StreamElements', stripIndents`
            //                **IP:** ${args[0]}
            //                **País:** ${country == "" ? "Desconhecido" : country.toString()}
            //                **Cidade:** ${city == "" ? "Desconhecido" : city.toString()}
            //                **Estado:** ${regionName == "" ? "Desconhecido" : regionName.toString()}
			//				**CEP:** ${zip == "" ? "Desconhecido" : zip.toString()}
			//				**Latitude:** ${lat == "" ? "Desconhecido" : lat.toString()}
			//				**Longitude:** ${lon == "" ? "Desconhecido" : lon.toString()}
			//				**Fuso Horário:** ${timezone == "" ? "Desconhecido" : timezone.toString()}
			//				**ISP:** ${isp == "" ? "Desconhecido" : isp.toString()}
			//				**ORG:** ${org == "" ? "Desconhecido" : org.toString()}
			//				**AS:** ${as == "" ? "Desconhecido" : as.toString()}`, true);
            //message.channel.send(embed);

        });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
}

function ParseHashrate(hashrate)
{
	return Math.floor(hashrate)
}

function AbbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "k", "m", "b","t"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}