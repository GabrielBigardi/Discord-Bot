const { RichEmbed } = require("discord.js");


module.exports = {
    name: "sorteio",
    aliases: ["giveaway"],
    category: "moderation",
    description: "Sorteia alguma coisa.",
    usage: "[comando | alias] <usuário> <quantidade>",
    run: async (client, message, args) => {
        const ms = require("ms"); // npm install ms

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        if(!args[0] || !args[1] || !args[2]) return;

        

        // g!start-giveaway 2d 1 Awesome prize!
        // will create a giveaway with a duration of two days, with one winner and the prize will be "Awesome prize!"
 
        client.giveawaysManager.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(" "),
            winnerCount: parseInt(args[1])
        }).then((gData) => {
            console.log(gData); // {...} (messageid, end date and more)
        });
        // And the giveaway has started!
    }
}