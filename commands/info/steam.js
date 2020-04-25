//http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=65D44EDA5357210475FBE865A02D2844&steamid=76561197960434622&format=json

const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const https = require('https');

module.exports = {
    name: "steam",
    aliases: ["infosteam", "steaminfo"],
    category: "info",
    description: "Checa determinado usuário steam.",
    usage: "[comando | alias] <SteamID64>",
    run: async (client, message, args) => {
        if(!args[0]) return;

        https.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.steamapikey}&steamids=${args[0]}`, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            var parsedJson = JSON.parse(data).response.players[0];
            var fullAvatarURL = parsedJson.avatarfull;
            var nickName = parsedJson.personaname;
            var lastSeem = new Date(parsedJson.lastlogoff * 1000).toDateString();;
            var timeCreated = new Date(parsedJson.timecreated * 1000).toDateString();;
            console.log(fullAvatarURL);
            const embed = new RichEmbed()
                            .setThumbnail(fullAvatarURL)
                            .setColor('#00FF00')
                            .addField('Informação Steam', stripIndents`
                                **Nome:** ${nickName}
                                **Visto por último:** ${lastSeem}
                                **Criado em:** ${timeCreated}`, true);
        
            message.channel.send(embed);
        });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
}