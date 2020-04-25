const { getMember, formatDate } = require("../../functions.js");
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "whois",
    aliases: ["userinfo", "user", "who"],
    category: "info",
    description: "Retorna informações de um usuário",
    usage: "[usuário | id | menção]",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));

        //member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || "nada";

        //user variables
        const created = formatDate(member.user.createdAt);
        const embed = new RichEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL)
            .setThumbnail(member.user.displayAvatarURL)
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)

            .addField('Informação do membro', stripIndents`
            **> Nome:** ${member.displayName}
            **> Entrou em:** ${joined}
            **> Permissões:** ${roles}`, true)

            .addField('Informação do usuário', stripIndents`
            **> ID:** ${member.user.id}
            **> Usuário:** ${member.user.username}
            **> Discord Tag:** ${member.user.tag}
            **> Criado em:** ${created}`, true)

            .setTimestamp()

        if(member.user.presence.game)
            embed.addField('Atualmente jogando:', `
            **> Nome:** ${member.user.presence.game.name}`)

        message.channel.send(embed);
    }
}