
//https://api.streamelements.com/kappa/v2/points/5b64234fe8fd184d761eadcf/naoconhecido


const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const http = require('https');

module.exports = {
    name: "lojateste",
    category: "info",
    description: "aaaaaaa.",
    usage: "[comando]",
    run: async (client, message, args) => {
		
		var points = "0";
		
		var pointsUrl = "https://api.streamelements.com/kappa/v2/points/5cfec5c43181a034b0873e0d/naoconhecido";
		var itemsUrl = "https://api.streamelements.com/kappa/v2/store/5cfec5c43181a034b0873e0d/items";
		
		//Pega os pontos atual
		console.log("Verificando pontos do usuário...");
        http.get(pointsUrl, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        
        resp.on('end', () => {
			var parsedJson = JSON.parse(data);
			points = parsedJson.points;
			console.log("Usuário tem " + points + " pontos.");
			
			//Detecta os items da loja
			console.log("Detectando itens da loja...");
			http.get(itemsUrl, (resp) => {
			let data = '';
			resp.on('data', (chunk) => {
				data += chunk;
			});
			
			resp.on('end', () => {
				var parsedJson = JSON.parse(data);
				var keys = Object.keys(parsedJson);
				
				console.log("\nItems:");
				for (var i = 0; i < keys.length; i++) {
					console.log(`${parsedJson[keys[i]].name} - Disponíveis: ${parsedJson[keys[i]].quantity.current}/${parsedJson[keys[i]].quantity.current} - Custa: ${parsedJson[keys[i]].cost}`);
				}
				
				//Escolhe o item de maior valor que o dinheiro consegue comprar e compra
				console.log("\nComprando item de maior valor disponível...");
				console.log("SUCESSO !");
			});
			
			}).on("error", (err) => {
				console.log("Error: " + err.message);
			});
        });
        
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
		
		
		
		
    }
}

function changeTimezone(date, ianatz) {

  // suppose the date is 12:00 UTC
  var invdate = new Date(date.toLocaleString('en-US', {
    timeZone: ianatz
  }));

  // then invdate will be 07:00 in Toronto
  // and the diff is 5 hours
  var diff = date.getTime() - invdate.getTime();

  // so 12:00 in Toronto is 17:00 UTC
  return new Date(date.getTime() - diff); // needs to substract

}