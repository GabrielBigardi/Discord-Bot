module.exports = {
    name: "ping",
    category: "info",
    description: "Retorna a latência e o ping da API",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Pingando...`);
        msg.edit(`🏓 Pong!\nLatência: ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nLatência da API: ${Math.round(client.ping)}ms`);
    }
}

