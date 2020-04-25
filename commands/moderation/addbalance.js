const { RichEmbed } = require("discord.js");
const { getMember, addBalance, getBalance } = require("../../functions.js");


module.exports = {
    name: "adicionarsaldo",
    aliases: ["addbalance","add","adicionar"],
    category: "moderation",
    description: "Adiciona saldo a determinado usuário.",
    usage: "[comando | alias] <usuário> <quantidade>",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        if(!args[0] || !args[1]) return;

        let person = getMember(message, args[0]);

        await addBalance(person, args[1]).then(message.channel.send(`Saldo adicionado com sucesso !`));
    }
}