const { RichEmbed } = require("discord.js");
let uu = require('url-unshort')();

module.exports = {
    name: "unshort",
    aliases: ["desencurtar"],
    category: "utils",
    description: "Desencurta o link de vários provedores.",
    usage: "[comando | alias] <URL>",
    run: async (client, message, args) => {
        if(!args[0]) return;

        uu.expand(args[0])
        .then(url => {
            if (url){
                const embed = new RichEmbed();
                let info = `Link desencurtado: **${url}**`;

                embed
                .setColor("GREEN")
                .setDescription(info)
                .setTitle('**Sucesso**');

                message.channel.send(embed);
            } else {
                const embed = new RichEmbed();
                let info = `**Falha ao desencurtar URL.**`;

                embed
                .setColor("RED")
                .setDescription(info)
                .setTitle('**ERRO**');

                message.channel.send(embed);
            }
        }).catch(err => console.log(err));
        
    }
}