const { RichEmbed } = require("discord.js");
const { getMember } = require("../../functions.js");


module.exports = {
    name: "resetarsaldo",
    aliases: ["resetbalance","reset","resetar"],
    category: "moderation",
    description: "Limpa X mensagens no chat.",
    usage: "[comando | alias] <quantidade>",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
        if(!args[0]) return;

        let person = getMember(message, args[0]);
        let personID = person.user.id;

        const result = await User.findOne({ id: personID}).select("id saldo").lean();
        
        if (result) {
            User.updateOne({id: personID}, {
                saldo: "0"
            }, function(err, numberAffected, rawResponse) {
               if(!err){
                    message.channel.send(`Sucesso ! Saldo de ${person.displayName} foi resetado.`);
               }else{
                    message.channel.send('Erro ao tentar resetar saldo: ' + err);
               }
            })
        }
        
    }
}