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
    name: "skin",
    aliases: ["infoskin"],
    category: "info",
    description: "Pesquisa determinada skin e retorna informações.",
    usage: "[comando | alias] <nome da skin>",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));

        if(!args[0]) return;

        var itemName = message.toString().replace("!skin ", "");

        var itemStates = [
            " (Factory New)",
            " (Minimal Wear)",
            " (Field-Tested)",
            " (Well-Worn)",
            " (Battle-Scarred)"
        ];

        var listaUsps = [
            "USP-S | Neo-Noir",
            "USP-S | Kill Confirmed",
            "USP-S | Cortex",
            "USP-S | Caiman",
            "USP-S | Orion",
            "USP-S | Serum",
            "USP-S | Flashback",
            "USP-S | Cyrex",
            "USP-S | Guardian",
            "USP-S | Overgrowth",
            "USP-S | Dark Water",
            "USP-S | Road Rash",
            "USP-S | Blueprint",
            "USP-S | Lead Conduit",
            "USP-S | Torque",
            "USP-S | Blood Tiger",
            "USP-S | Stainless",
            "USP-S | Check Engine",
            "USP-S | Business Class",
            "USP-S | Night Ops",
            "USP-S | Pathfinder",
            "USP-S | Para Green",
            "USP-S | Royal Blue",
            "USP-S | Forest Leaves"
        ];

        var listaGlocks = [
            "Glock-18 | Wasteland Rebel",
            "Glock-18 | Water Elemental",
            "Glock-18 | Twilight Galaxy",
            "Glock-18 | Moonrise",
            "Glock-18 | Weasel",
            "Glock-18 | Royal Legion",
            "Glock-18 | Grinder",
            "Glock-18 | Steel Disruption",
            "Glock-18 | Dragon Tattoo",
            "Glock-18 | Synth Leaf",
            "Glock-18 | Nuclear Garden",
            "Glock-18 | Fade",
            "Glock-18 | Brass",
            "Glock-18 | Sacrifice",
            "Glock-18 | Oxide Blaze",
            "Glock-18 | Warhawk",
            "Glock-18 | Off World",
            "Glock-18 | Ironwork",
            "Glock-18 | Wraiths",
            "Glock-18 | Bunsen Burner",
            "Glock-18 | Catacombs",
            "Glock-18 | Blue Fissure",
            "Glock-18 | Reactor",
            "Glock-18 | Candy Apple",
            "Glock-18 | High Beam",
            "Glock-18 | Night",
            "Glock-18 | Death Rattle",
            "Glock-18 | Groundwater",
            "Glock-18 | Sand Dune"

        ];

        var itemNameLowercase = itemName.toLowerCase();
        var splittedArray = itemNameLowercase.split(" ");
        var argumento = splittedArray[0];
        var armaid = splittedArray[1];

        if(argumento === "usp"){
            if(!armaid){
                const embed = new MessageEmbed()
                .setTitle("Informações sobre USPS")
                .setColor('#0000ff')

                var arrayText = "";

                listaUsps.forEach (function(arrayName, arrayIndex) {
                    arrayText += `ID: ${arrayIndex} - ${arrayName}\n`;
                });

                embed.addField(`ID - NOME`, `${arrayText}`);


                message.channel.send(embed);
            }else{
                if(armaid < listaUsps.length)
                {
                    itemStates.forEach(element => {
                        var encodedItemName = encodeURI(listaUsps[armaid]);
                        var encodedItemState = encodeURI(element);
                        var encodedFullItemNameState = encodedItemName + encodedItemState
                        let URL = "https://steamcommunity.com/market/priceoverview/?appid=730&currency=7&market_hash_name=" + encodedFullItemNameState;
                        let URLIMAGE = "https://steamcommunity.com/market/listings/730/"+ encodedFullItemNameState +"/render?start=0&count=1&currency=3&language=english&format=json";
            
                        https.get(URLIMAGE, (respIMAGE) => {
                            let dataIMAGE = '';
                
                            // A chunk of data has been recieved.
                            respIMAGE.on('data', (chunkIMAGE) => {
                                dataIMAGE += chunkIMAGE;
                            });
                
                            // The whole response has been received. Print out the result.
                            respIMAGE.on('end', () => {
                                var teste = JSON.parse(dataIMAGE);
                                var hover = teste.hovers;
                                try {
                                    var idfield = getStr(hover,"730, '2', '","',");
                                } catch (error) {
                                    return;
                                }
                                
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
                                        var itemName = decodeURI(encodedFullItemNameState);
                                        var volume = JSON.parse(data).volume;
                                        var precoMenor = JSON.parse(data).lowest_price;
                                        var precoMedio = JSON.parse(data).median_price;
                
                                        const embed = new MessageEmbed()
                                        .setThumbnail(imageURL)
                                        .setColor('#0000ff')
                                        .addField('Informação da Skin', stripIndents`
                                            **Nome:** ${itemName}
                                            **Menor Preço:** ${precoMenor ? precoMenor : "N/A"}
                                            **Preço Médio:** ${precoMedio ? precoMenor : "N/A"}
                                            **Volume:** ${volume ? volume : 0} unidades`, true)
                
                                            message.channel.send(embed);
                                    });
                        
                                }).on("error", (err) => {
                                    console.log("Error: " + err.message);
                                });
            
            
                            });
            
            
                        }).on("error", (err2) => {
                            console.log("Error: " + err2.message);
                        });
                
                    });
                }
                else
                {
                    message.channel.send("Skin não encontrada, utilize o id, exemplo: !skin usp 0");
                }
            }
            
        }

        return;
        
    } // run async
} // modules