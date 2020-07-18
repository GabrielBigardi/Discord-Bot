const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");
const download = require('download-file');


module.exports = {
    name: "emoji",
    aliases: ["addemoji","adicionaremoji"],
    category: "moderation",
    description: "Adiciona emoji no servidor.",
    usage: "[comando | alias] <nome> <link>",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_EMOJIS")) return;

        let [nome, emojilink] = args;
        let info = { filename: "emoji.png" };
        
        if (!args[0]) return;
        if (!args[1]) return;

        download(emojilink, info, function (err) {
            if (!err) {
                try {
                    message.guild.createEmoji('emoji.png', nome);
                    message.channel.send("O emoji foi adicionado ao seu servidor");
                } catch{
                    console.log("Erro ao tentar adicionar emoji");
                }
            } else {
                message.channel.send("Link inválido");
            }
        });
        
    }
}