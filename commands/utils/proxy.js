const { getMember, formatDate } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const https = require('https');
var PastebinAPI = require('pastebin-js');

module.exports = {
    name: "proxy",
    aliases: ["proxies"],
    category: "utils",
    description: "Pega uma lista de proxys HTTP/SOCKS4/SOCKS5",
    usage: "[comando | alias] <HTTP|SOCKS4|SOCKS5>",
    run: async (client, message, args) => {
        if(!args[0]) return;

        let httpURL = "https://api.proxyscrape.com/?request=getproxies&proxytype=http&timeout=10000&country=all&ssl=all&anonymity=all&uptime=0";
        let socks4URL = "https://api.proxyscrape.com/?request=getproxies&proxytype=socks4&timeout=10000&country=all&uptime=0";
        let socks5URL = "https://api.proxyscrape.com/?request=getproxies&proxytype=socks5&timeout=10000&country=all&uptime=0";

        if(args[0].toLowerCase() == "http"){

            https.get(httpURL, (resp) => {
                let data = '';
        
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });
        
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    var pastebin = new PastebinAPI({
                        'api_dev_key' : process.env.pastebin_api_dev_key,
                        'api_user_name' : process.env.pastebin_user_name,
                        'api_user_password' : process.env.pastebin_password
                      });
                      
                    pastebin.createPaste({
                        text: data,
                        title: "Private Proxies",
                        format: null,
                        privacy: 2,
                        expiration: '10M'
                    }).then(function (pasteData) {
                        const embed = new RichEmbed()
                            .setColor('#0000ff')
                            .addField('Proxy Criado !', stripIndents`
                                **Link:** ${pasteData}
                                **Expiração:** 10 minutos`, true)
        
                                message.channel.send(embed);
                      })
                      .fail(function (pasteErr) {
                        console.log(pasteErr);
                      })
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });


        }else if(args[0].toLowerCase() == "socks4"){

            https.get(socks4URL, (resp) => {
                let data = '';
        
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });
        
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    message.channel.send(`${data}`);
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });

        }else if(args[0].toLowerCase() == "socks5"){

            https.get(socks5URL, (resp) => {
                let data = '';
        
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });
        
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    message.channel.send(`${data}`);
                });

            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });

        }

    }
}