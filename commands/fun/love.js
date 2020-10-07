const { MessageEmbed } = require("discord.js");
const { getMember  } = require("../../functions.js");

module.exports = {
    name: "love",
    aliases: ["amor"],
    category: "fun",
    description: "Calcula o amor que você tem por outra pessoa.",
    usage: "[comando | alias] [username | id | menção]",
    run: async (client, message, args) => {
        let person = getMember(message, args[0]);

        if(!person || message.author.id === person.id){
            person = message.guild.members.cache
                .filter(m => m.id !== message.author.id)
                .random();
        }

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new MessageEmbed()
            .setColor("#ffb6c1")
            .addField(`☁ **${person.displayName}** ama **${message.member.displayName}** este tanto:`,
            `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

        message.channel.send(embed);
    }
}