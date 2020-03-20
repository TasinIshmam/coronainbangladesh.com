const axios = require('axios');


async function get_statistics_bangladesh() {

    let response = await axios.get("https://covid19.mathdro.id/api/countries/BD/deaths");

    let obj = {
        confirmed: response.data[0].confirmed,
        recovered: response.data[0].recovered,
        deaths: response.data[0].deaths,
        active: response.data[0].active,
        lastUpdate: response.data[0].lastUpdate

    };

    return obj;
}


async function get_statistics_world() {

    let response = await axios.get("https://covid19.mathdro.id/api/");


    let obj = {
        confirmed: response.data.confirmed.value,
        recovered: response.data.recovered.value,
        deaths: response.data.deaths.value,
        lastUpdate: response.data.lastUpdate

    };

    return obj;

}


module.exports = {get_statistics_bangladesh, get_statistics_world};