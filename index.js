require('dotenv').config();
const { Client, RichEmbed, Collection } = require('discord.js');
const { stripIndents } = require("common-tags");
const colors = require('colors');
const today = new Date().toLocaleDateString();
const fs = require("fs");
const jimp = require('jimp');

const client = new Client({
	disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
client.queues = new Map();

["command"].forEach(handler => {
	require(`./handler/${handler}`)(client);
});

client.on('ready', () => {
    console.log(colors.green.bold(`Bot iniciado, com ${colors.cyan(client.users.cache.size)} usuários, em ${colors.cyan(client.channels.cache.size)} canais, em ${colors.cyan(client.guilds.cache.size)} servidores, hoje é ${colors.cyan(today)}.`));
	client.user.setActivity(`${client.users.cache.size} pessoas em ${client.guilds.cache.size} servidores`, { type: "LISTENING" });
});

client.on('guildCreate', guild => {
    console.log(colors.green.bold(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}. População: ${guild.memberCount} membros !)`));
    client.user.setActivity(`${client.users.cache.size} pessoas em ${client.guilds.cache.size} servidores`, { type: "LISTENING" });
});

client.on('guildDelete', guild => {
    console.log(colors.green.bold(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`));
    client.user.setActivity(`${client.users.cache.size} pessoas em ${client.guilds.cache.size} servidores`, { type: "LISTENING" });
});

client.on('guildMemberAdd', async member => {
	console.log(colors.green.bold(`Um membro foi adicionado: ${member.user.username}`));
});

client.on('message', async message => {
	const prefix = "!";
	
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	if(!message.guild) return;
	
	
	let checkArgs = message.content.slice(' ').trim().split(/ +/g);
	
	if (checkArgs.length == 1 && checkArgs[0] == `<@!${client.user.id}>`) {
		message.channel.send("Olá <@" + message.author.id + "> meu prefixo é ``!``, para ver o que tenho para oferecer digite ``!ajuda``!");
		return;
	}
	
	
	if(!message.content.startsWith(prefix)) return;
	if(!message.member) message.member = await message.guild.members.fetch(message);
	
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	
	if(cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if(!command) command = client.commands.get(client.aliases.get(cmd));
	if(command){
		//if(message.author.id != "325102217386393604")
			command.run(client, message, args);
		//else
		//	message.channel.send("Vc não tem permissão, perdão :(");
	}
});

client.login(process.env.token);