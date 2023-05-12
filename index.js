const axios  = require('axios');
const cheerio = require('cheerio');

const url = 'https://pt.wikipedia.org/wiki/Oscar_de_melhor_filme';

async function getMovies(){
    let lista= []
    const {data} = await axios.get(url);
    const $ =  cheerio.load(data);

    $(".wikitable tbody tr").each((i,elem) => {
        const name = $(elem).find('td[style*="background:#FAEB86"]').last().text().replace("\n","");
        if(name !== ""){
            const year = $(elem).find('td[style*="background:#FAEB86"]').first().prev("td").text().slice(-5).replace("\n","");
            lista.push({year:year,name:name})
        }
    });

    console.log(lista)
}

getMovies();