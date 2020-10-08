const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const https = require('https');

module.exports = {
    name: "teste",
    category: "info",
    description: "Comando de teste.",
    usage: "[comando]",
    run: async (client, message, args) => {
		let steamid = args[0];
		
		console.log(args[0]);
		
		let URL = "https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=B9852673CB475E681D80B9F72C39DE64&steamid="+steamid+"&appid=730"
		https.get(URL, (resp) => {
                        let data = '';

                        resp.on('data', (chunk) => {
                            data += chunk;
                        });

                        resp.on('end', () => {
							var jsonTest = JSON.parse(data);
							var totalkills = jsonTest.playerstats.stats.totalkills;
							
							//console.log(jsonTest.playerstats.stats);
							
							var description = "";
							var description2 = "";
							var description3 = "";
							
							for (i = 0; i < jsonTest.playerstats.stats.length; i++) {
								
								var curJson1 = jsonTest.playerstats.stats[i].name;
								var curJson2 = jsonTest.playerstats.stats[i].value;
								var replacedCurJson1 = curJson1.toString().replace(/_/g, " "); 
								replacedCurJson1 = replacedCurJson1.charAt(0).toUpperCase() + replacedCurJson1.slice(1);
								
								
								
								var curJsonText = `${replacedCurJson1}: ${curJson2}\n`;
								
								if(description.length <= 2000){
									description += curJsonText;
								}else{
									if(description2.length <= 2000){
										description2 += curJsonText;
									}else{
										description3 += curJsonText;
									}
								}
							}
							
							const exampleEmbed = new MessageEmbed()
								.setColor('#00ff00')
								.setTitle('Status do CS para: ' + args[0])
								.setDescription(description);
							
							message.channel.send(exampleEmbed);
							
							if(description2.length > 0){
								const exampleEmbed2 = new MessageEmbed()
								.setColor('#00ff00')
								.setTitle('Continuação do Status: ' + args[0])
								.setDescription(description2);
							
								message.channel.send(exampleEmbed2);
							}
							
							if(description3.length > 0){
								const exampleEmbed3 = new MessageEmbed()
								.setColor('#00ff00')
								.setTitle('Continuação do Status: ' + args[0])
								.setDescription(description3);
							
								message.channel.send(exampleEmbed3);
							}
							
							
                        });
                
		}).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
}