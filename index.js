const { Client, RichEmbed, Collection } = require('discord.js');
const connectDB = require('./handler/db/connection.js');
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

["command"].forEach(handler => {
	require(`./handler/${handler}`)(client);
});

client.on('ready', () => {
    console.log(colors.green.bold(`Bot iniciado, com ${colors.cyan(client.users.size)} usuários, em ${colors.cyan(client.channels.size)} canais, em ${colors.cyan(client.guilds.size)} servidores, hoje é ${colors.cyan(today)}.`));
	client.user.setActivity(`${client.users.size} pessoas em ${client.guilds.size} servidores`, { type: "LISTENING" });
	connectDB(); // conecta no mongodb
});

client.on('guildCreate', guild => {
    console.log(colors.green.bold(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}. População: ${guild.memberCount} membros !)`));
    client.user.setActivity(`${client.guilds.size} servidores`, { type: "LISTENING" });
});

client.on('guildDelete', guild => {
    console.log(colors.green.bold(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`));
    client.user.setActivity(`${client.guilds.size} servidores`, { type: "LISTENING" });
});

client.on('guildMemberAdd', async member => {
	console.log(colors.green.bold(`Um membro foi adicionado: ${member.user.username}`));
	let canal = client.channels.get('691183263204507679');
	let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    let mask = await jimp.read('projetojimp/mascara.png');
	let fundo = await jimp.read('projetojimp/fundo.png');

	member.addRole(member.guild.roles.find(role => role.name === "🎮│Membros")).catch(() => {
		console.log("Erro ao tentar adicionar regra não existente a usuário.");
	});

	jimp.read(member.user.displayAvatarURL)
        .then(avatar => {
            avatar.resize(130, 130);
            mask.resize(130, 130);
            avatar.mask(mask);
            fundo.print(fonte, 170, 175, member.user.username);
            fundo.composite(avatar, 22, 90).write('bemvindo.png');
            canal.send(``, { files: ["bemvindo.png"] });
            //console.log('Imagem enviada para o Discord: ' + member.user.displayAvatarURL);
        })
        .catch(err => {
            console.log('Erro ao carregar imagem: ' + err);
        });
});

client.on('message', async message => {
	const prefix = "!";
	
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	if(!message.guild) return;
	if(!message.content.startsWith(prefix)) return;
	if(!message.member) message.member = await message.guild.fetchMember(message);
	
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if(cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if(!command) command = client.commands.get(client.aliases.get(cmd));

	if(command){
		if(message.author.id != "325102217386393604")
			command.run(client, message, args);
		else
			message.channel.send("Vc não tem permissão, perdão :(");
	}
});

client.login(process.env.token);