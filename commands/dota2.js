
const parse5 = require('parse5');

module.exports = {
	name: 'dota2',
    description: 'Dota2 module',
    aliases: ['d2', 'dota'],
    args: true,
	execute(message, args) {
        if(args.length === 1){
            switch(args[0]){
                case 'heroes' : { 
                    message.channel.send('The list of hero ids...'); return; 
                }
                default: { message.channel.send('Type the proper command, please!'); return; }
            }
        }
        const commandName = args.shift();
        if(commandName === 'cp' || commandName === 'counterpick'){
            if(args.length > 1){
                message.channel.send(`You must provide only 1 argument and it's hero id, ${message.author}!`);
                return;
            }
            message.channel.send('Hero id = ' + args[0]);
        }
	},
};