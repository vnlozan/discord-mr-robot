const config = require('../config.json');
var HTMLParser = require('node-html-parser');
const axios = require('axios');
const Discord = require('discord.js');
module.exports = {
	name: 'dota2',
    description: 'Dota2 module',
    aliases: ['d2', 'dota'],
    args: true,
	execute(message, args) {
        if(args.length === 1){
            switch(args[0]){
                case 'heroes' : { 
                    const heroes = config.dota2.heroes;
                    var response = ''; 
                    const exampleEmbed = new Discord.RichEmbed().setColor('#0099ff').setTitle('Dota2 heroes');
                    heroes.forEach(element => {
                        response += `${element} `;
                    });
                    exampleEmbed.setDescription(response);
                    message.channel.send(exampleEmbed);
                    return; 
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
            var hero = args[0];
            if(!config["dota2"]["heroes"].includes(hero)){
                message.channel.send(`There is no such hero, ${message.author}!`);
                return;
            }
            const url = config["dota2"]["counter-pick-url"].replace('{HERO}', hero);
            
            axios
            .get(url)
            .then(function (response) {
                const root = HTMLParser.parse(response.data);
                const data = root.querySelector('.counter-outline').childNodes;
                const heroes = data[1].childNodes[0].childNodes[1].childNodes;
                hero = hero.charAt(0).toUpperCase() + hero.slice(1);
                const exampleEmbed = new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setAuthor('This month data')
                    .setTitle(`${hero} is countered by:`)
                    .setURL(url);
                heroes.forEach(element => {
                    const hero = element.childNodes;
                    const counterpickHero = hero[1].rawAttrs.match(new RegExp('(?:data-value="(.+)")'))[1];
                    const disadvantage = hero[2].rawAttrs.match(new RegExp('(?:data-value="(.+)")'))[1];
                    const winrate = hero[3].rawAttrs.match(new RegExp('(?:data-value="(.+)")'))[1];
                    exampleEmbed.addField( counterpickHero, `Disadvantage : ${disadvantage}. Winrate : ${winrate}` );
                });
                // exampleEmbed.setDescription(response);
                exampleEmbed.setFooter(`Dotabuff info`);
                message.channel.send(exampleEmbed);
            })
            .catch(function (error) { message.channel.send(`Error happened : ${error}`); });
        }
	},
};