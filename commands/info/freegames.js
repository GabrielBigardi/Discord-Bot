const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const https = require('https');

module.exports = {
    name: "jogosgratis",
    aliases: ["freegames", "freetokeep"],
    category: "info",
    description: "Pega quais jogos da steam estão gratis para pegar.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        https.get(`https://steamdb.info/sales/`, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            var extractedTdArray = get_row_as_array(data);
            console.log("extracted 0 : " + extractedTdArray[0]);
            console.log("extracted 1 : " + extractedTdArray[1]);
        });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });

        function get_row_as_array(row) {
            var dados = row.split("<td>");
            return dados;
        }
    }
}