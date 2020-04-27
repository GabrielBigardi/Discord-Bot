const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "ajuda",
    aliases: ["help"],
    category: "info",
    description: "Retorna todos comandos, ou algum especifico",
    usage: "[comando | alias] [comando | alias]",
    run: async (client, message, args) => {
        if(args[0]){
            return getCMD(client,message,args[0]);
        }else{
            return getAll(client, message);
        }
    }
}

function getAll(client,message){
    const embed = new RichEmbed()
        .setColor("RANDOM")

    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n");
    }

    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)} + \n`)
        .reduce((string, category) => string + "\n" + category + "\n");

    return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input){
    const embed = new RichEmbed()
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    let info = `Nenhuma informação encontrada para o comando **${input.toLowerCase()}**`;
    if(!cmd){
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    if(cmd.name) info = `**Nome do comando**: ${cmd.name}`;
    if(cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if(cmd.description) info += `\n**Descrição**: ${cmd.description}`;
    if(cmd.usage){
        info += `\n**Uso**: ${cmd.usage}`;
        embed.setFooter(`Sintaxes: <> = é obrigatorio, [] = opcional`);
    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}