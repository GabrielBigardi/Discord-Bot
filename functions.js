module.exports = {
    getMember: function(message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.get(toFind);
        
        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }
            
        if (!target) 
            target = message.member;
            
        return target;
    },

    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date)
    },

    promptMessage: async function (message, author, time, validReactions) {
        // We put in the time as seconds, with this it's being transfered to MS
        time *= 1000;

        // For every emoji in the function parameters, react in the good order.
        for (const reaction of validReactions) await message.react(reaction);

        // Only allow reactions from the author, 
        // and the emoji must be in the array we provided.
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        // And ofcourse, await the reactions
        return message
            .awaitReactions(filter, { max: 1, time: time})
            .then(collected => collected.first() && collected.first().emoji.name);
    },

    getBalance: async function(member){
        const result = await User.findOne({ id: member.user.id }).select("id saldo").lean();
        if (result) {
            return result.saldo;
        }else{
            let user = {};
            user.id = member.user.id;
            user.saldo = "0";
            let userModel = new User(user);
            await userModel.save();
        }
    },

    addBalance: async function(person, amount){
        let personID = person.user.id;
        const result = await User.findOne({ id: personID}).select("id saldo").lean();
        
        if (result) {
            let saldoAntigo = parseInt(result.saldo);
            let saldoNovo = saldoAntigo + parseInt(amount);
            if(saldoNovo < 0) saldoNovo = 0;
            if(saldoNovo > 99999999) saldoNovo = 99999999;

            if(!Number.isInteger(saldoNovo)) return;

            User.updateOne({id: personID}, {saldo: saldoNovo}, {new: true}, function(err, numberAffected, rawResponse) {
                if(err) return;

                return numberAffected;
            })
        }else{
            let user = {};
            user.id = member.user.id;
            user.saldo = "0";
            let userModel = new User(user);
            await userModel.save();
        }
    },

    removeBalance: async function(person,amount){
        let personID = person.user.id;

        const result = await User.findOne({ id: personID}).select("id saldo").lean();
        
        if (result) {
            let saldoAntigo = parseInt(result.saldo);
            let saldoNovo = saldoAntigo - parseInt(amount);
            if(saldoNovo < 0) saldoNovo = 0;
            
            if(!Number.isInteger(saldoNovo)) return;

            User.updateOne({id: personID}, {saldo: saldoNovo}, {new: true}, function(err, numberAffected, rawResponse) {
                if(err) return;

                return numberAffected;
            })
        }else{
            let user = {};
            user.id = member.user.id;
            user.saldo = "0";
            let userModel = new User(user);
            await userModel.save();
        }
    }
};