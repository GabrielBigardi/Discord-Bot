const { getMember } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const https = require('https');

function getStr(string, start, end){
    var str = string.split(start);
    str = str[1].split(end);
    return str[0];
}

module.exports = {
    name: "listaskin",
    aliases: ["skinlist"],
    category: "info",
    description: "Pesquisa determinada lista skin pré-estabelecida e retorna informações.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));

        var itemNames = [
        "USP-S | Guardian (Factory New)",
        "Special Agent Ava | FBI",
        "'The Doctor' Romanov | Sabre"
        ];

        

        itemNames.forEach(element => {
            var encodedElement = encodeURI(element);
            let URL = "https://steamcommunity.com/market/priceoverview/?appid=730&currency=7&market_hash_name=" + encodedElement;
            let URL2 = "https://steamcommunity.com/market/listings/730/"+ encodedElement +"/render?start=0&count=1&currency=3&language=english&format=json";

            


            https.get(URL2, (resp2) => {
                let data2 = '';
        
                // A chunk of data has been recieved.
                resp2.on('data', (chunk2) => {
                    data2 += chunk2;
                });
        
                // The whole response has been received. Print out the result.
                resp2.on('end', () => {
                    var teste = JSON.parse(data2);
                    var hover = teste.hovers;
                    var idfield = getStr(hover,"730, '2', '","',");
                    var iconURL = teste.assets[730][2][idfield].icon_url;
                    var imageURL = `https://steamcommunity-a.akamaihd.net/economy/image/${iconURL}`;


                    https.get(URL, (resp) => {
                        let data = '';
                
                        // A chunk of data has been recieved.
                        resp.on('data', (chunk) => {
                            data += chunk;
                        });
                
                        // The whole response has been received. Print out the result.
                        resp.on('end', () => {
                            var itemName = decodeURI(element);
                            var volume = JSON.parse(data).volume;
                            var precoMenor = JSON.parse(data).lowest_price;
                            var precoMedio = JSON.parse(data).median_price;
        
                            const embed = new MessageEmbed()
                            .setThumbnail(imageURL)
                            .setColor('#0000ff')
                            .addField('Informação da Skin', stripIndents`
                                **Nome:** ${itemName}
                                **Menor Preço:** ${precoMenor}
                                **Preço Médio:** ${precoMedio}
                                **Volume:** ${volume} unidades`, true)
        
                                message.channel.send(embed);
                        });
                
                        }).on("error", (err) => {
                            console.log("Error: " + err.message);
                        });


                });
        
                }).on("error", (err2) => {
                    console.log("Error: " + err2.message);
                });
        }); // items foreach


        

        
    } // run async
} // modules