const { getMember, getBalance } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const User = require('../../handler/db/user');

module.exports = {
    name: "saldo",
    aliases: ["balance"],
    category: "info",
    description: "Puxa o seu saldo.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));
        await getBalance(member).then(saldoQuery => {
            message.channel.send(saldoQuery);
        });
    }
}