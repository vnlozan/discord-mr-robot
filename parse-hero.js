var HTMLParser = require('node-html-parser');
const axios = require('axios');
const config = require('./config.json');

const hero = 'natures-prophet';
const url = config["dota2"]["counter-pick-url"].replace('{HERO}', hero);


axios.get(url)
    .then(function (response) {
        const root = HTMLParser.parse(response.data);
        const data = root.querySelector('.counter-outline').childNodes;
        const heroes = data[1].childNodes[0].childNodes[1].childNodes;
        console.log(hero+":");
        heroes.forEach(element => {
            const hero = element.childNodes;
            console.log(
                hero[1].rawAttrs.match(new RegExp('(?:data-value="(.+)")'))[1] + 
                ". " + "Disadvantage " + hero[2].rawAttrs.match(new RegExp('(?:data-value="(.+)")'))[1] + 
                ". " + "Winrate " + hero[3].rawAttrs.match(new RegExp('(?:data-value="(.+)")'))[1]
            );
        });
    })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {
        // always executed
    });