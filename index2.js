const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


const url = 'https://www.imdb.com/chart/top/';

const moviesData = {};

async function getHtml(){
    const {data:html} = await axios.get(url);
    return html
}

getHtml().then((res) => {
    const $ = cheerio.load(res);
    $('.lister-list > tr').each((i,movie) => {
        const title = $(movie).find('.titleColumn a').text();
        const rating = $(movie).find('.ratingColumn strong').text();
        moviesData[title] = rating;
    });
    fs.writeFile('moviesData.json', JSON.stringify(moviesData),(err) => {
        if(err) throw err;
         console.log('Arquivo criado com sucesso');
    });
})