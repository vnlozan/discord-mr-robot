const Config = require('./config.json');
const Discord = require('discord.js');
const Client = new Discord.Client();
const fs = require('fs');


Client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	Client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

Client.once('ready', () => {
    Client.channels.get('666716841716088843').send('Hello, friend!', {
		files: [
			"./assets/hello_friend.jpg"
		]
	})
});

Client.on('message', message => {
	if (!message.content.startsWith(Config.prefix) || message.author.bot) return;
	const args = message.content.toLowerCase().slice(Config.prefix.length).split(/ +/);
	const commandName = args.shift();
	const command = Client.commands.get(commandName) || Client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	// if (command.guildOnly && message.channel.type !== 'text') {
	// 	return message.reply('I can\'t execute that command inside DMs!');
	// }
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
	}
	try { command.execute(message, args); } 
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

var isReady = true;
Client.on('voiceStateUpdate', (oldMember, newMember) => {
	let newUserChannel = newMember.voiceChannel;
	let oldUserChannel = oldMember.voiceChannel;
	if(oldUserChannel === undefined && newUserChannel !== undefined && isReady) {
		isReady = false;
		newUserChannel.join().then(connection =>{
			const dispatcher = connection.playFile(require("path").join(__dirname, './audio/you_re_asking_the_impossible.wav'));
			// const dispatcher = connection.playFile('./audio/figurine-isp.mp3');
			dispatcher.on("end", end => { newUserChannel.leave(); });
		}).catch(err => console.log(err));
		isReady = true;
	}
});

Client.login(Config.token);