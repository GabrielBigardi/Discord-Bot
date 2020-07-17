const { RichEmbed } = require("discord.js");
const game = require("pacman-djs");

module.exports = {
    name: "pacman",
    category: "fun",
    description: "Joguin do pacman.",
    usage: "[comando | alias]",
    run: async (client, message, args) => {
        let mapa = [
        "▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣",
        "▣▩◇◇◇▩▩▩ᗣ▩▩▩◇◇◇▩▣",
        "▣▩▣▣◇▣▩▩▣▩▩▣◇▣▣▩▣",
        "▣▩▣▩▩▩▩▣▣▣▩▩▩▩▣▩▣",
        "▣▩▩▩▣▣▩▩▣▩▩▣▣▩▩▩▣",
        "▣◇▩▩▩▩▩▩ᗣ▩▩▩▩▩▩◇▣",
        "▣◇▩▩▩▩▩▩▩▩▩▩▩▩▩◇▣",
        "▣▩▩▩▣▣▩▩▣▩▩▣▣▩▩▩▣",
        "▣▩▣▩▩▩▩▣▣▣▩▩▩▩▣▩▣",
        "▣▩▣▣◇▣▩▩▣▩▩▣◇▣▣▩▣",
        "▣▩◇◇◇▩▩▩ᗧ▩▩▩◇◇◇▩▣",
        "▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣"
        ]

        let start = new game.PacGame(mapa, 3, {
            win_text: message.author.username + " ganhou!",
            to_lose_text: message.author.username + " perdeu!",
            time_out_text: "O tempo acabou!",
            coin_points: 20,
            coin_text: "💰",
            time_text: "⏲"
        })

        start.start_game("Teste iniciado")

    }
}