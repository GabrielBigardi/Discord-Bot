const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "limpar",
    aliases: ["clear","apagar"],
    category: "moderation",
    description: "Limpa X mensagens no chat.",
    usage: "[comando | alias] <quantidade>",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        if(!args[0]) return;

        var integer = parseInt(args[0]);
        if(!Number.isInteger(integer)) return;
        
        if(integer > 100){
            const embed = new MessageEmbed();
            let info = `Desculpe, só consigo apagar até **100 linhas**`;
            
            embed.setColor("RED")
            .setDescription(info)
            .setTitle("**ERRO**");
            message.channel.send(embed);
            return;
        }

        message.channel.bulkDelete(integer).then(() => {
            const embed = new MessageEmbed();
            let info = `Foram apagadas **${integer}** mensagens.`;
            
            embed
            .setColor("GREEN")
            .setDescription(info)
            .setTitle('**Sucesso**');

            message.channel.send(embed).then(msg => msg.delete({ timeout: 2000, reason: 'Auto-delete.' }));
        });
    }
}