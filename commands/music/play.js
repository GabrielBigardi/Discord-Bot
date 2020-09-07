const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const search = require("yt-search");

module.exports = {
    name: "play",
    aliases: ["tocar"],
    category: "music",
    description: "Toca uma música.",
    usage: "[comando | alias] <Link/Nome>",
    run: async (client, message, args) => {
        const s = args.join(" ");
		try{
			search(s, (err,result) => {
			if(err){
				throw err;
			}else{
				if(result && result.videos.length > 0){
					const song = result.videos[0];
					console.log(song);
				}
			}
			});
		} catch(e) {
			console.error(e);
		}
		
    }
}