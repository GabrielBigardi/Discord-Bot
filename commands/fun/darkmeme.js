const { RichEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "darkmeme",
    aliases: ["darkmemes"],
    category: "fun",
    description: "Envia um meme obscuro aleatório do reddit.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        const subReddits = ["DarkHumorAndMemes"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`Meme de ${random}`)
            .setURL(`https://reddit.com/r/${random}`)

        message.channel.send(embed);
    }
}