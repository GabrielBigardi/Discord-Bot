const { getMember } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const https = require('https');

function getStr(string, start, end){
    var str = string.split(start);
    str = str[1].split(end);
    return str[0];
}

module.exports = {
    name: "gamersclub",
    aliases: ["gc"],
    category: "info",
    description: "Retorna informações sobre lobbies da GC.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));

        let URL = "https://gamersclub.com.br/lobbyBeta/listRooms";

        https.get(URL, (resp) => {
            let data = '';
        
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });
        
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
				console.log(data);
                var teste = JSON.parse(data);
            });
        
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });


        

        
    } // run async
} // modules