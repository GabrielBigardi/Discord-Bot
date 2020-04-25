const { RichEmbed } = require("discord.js");
const { getMember, removeBalance } = require("../../functions.js");


module.exports = {
    name: "removersaldo",
    aliases: ["removebalance","remove","remover"],
    category: "moderation",
    description: "Remove saldo de determinado usuário.",
    usage: "[comando | alias] <usuário> <quantidade>",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        if(!args[0] || !args[1]) return;

        let person = getMember(message, args[0]);
        
        await removeBalance(person, args[1]).then(message.channel.send(`Saldo removido com sucesso !`));
    }
}