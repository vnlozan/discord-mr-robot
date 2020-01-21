var HTMLParser = require('node-html-parser');
const axios = require('axios');
// const regex = /(href="/heroes/void-spirit\")/g;

// Make a request for a user with a given ID
axios.get('https://ru.dotabuff.com/heroes')
    .then(function (response) {
        // handle success
        const root = HTMLParser.parse(response.data);
        const heroes = root.querySelector('.hero-grid').childNodes;
        // console.log(heroes);
        heroes.forEach(element => {
            console.log(element.rawAttrs);
            console.log(element.rawAttrs.match(new RegExp('(?:href="\/heroes\/(.+)")'))[1]);
            // console.log(regex.match(element.rawAttrs));
            // console.log(element.childNodes);
        });
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });