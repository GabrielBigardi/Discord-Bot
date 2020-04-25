const { RichEmbed } = require("discord.js");
const { promptMessage, removeBalance, addBalance, getMember } = require("../../functions.js");

const chooseArr = ["🗻","📰","✂"];

module.exports = {
    name: "ppt",
    aliases: ["rps"],
    category: "fun",
    description: "Pedra papel e tesoura. Reaja à um dos emote para jogar.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        const embed = new RichEmbed()
            .setColor("#ffffff")
            .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
            .setDescription("Adicione uma reação à um desses emojis para jogar !")
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
        const result = await getResult(reacted, botChoice);
        await m.clearReactions();

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);

        function getResult(me,clientChosen){
            let person = getMember(message, me);
             if((me === "🗻" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "📰")){
                    addBalance(person, 50);
                    return "Você ganhou ! +50 pontos.";
                }else if (me === clientChosen){
                    return "Empatou !";
                }else{
                    removeBalance(person, 50);
                    return "Você perdeu ! -50 pontos.";
                }
        }
    }
}
