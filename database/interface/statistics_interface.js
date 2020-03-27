'use strict';

const axios = require('axios');
const moment = require('moment');


/**
 * API call for getting Covid-19 stats for Bangladesh.
 * @returns {Promise<{}|{recovered: *, lastUpdate, confirmed: *, deaths: *}>}
 */
async function get_statistics_bangladesh( ) {
try {
    let response = await axios.get("https://covid19.mathdro.id/api/countries/bd");
    let stats_object =  {
        confirmed: response.data.confirmed.value ,
        recovered:  response.data.recovered.value ,
        deaths:  response.data.deaths.value ,
        lastUpdate: response.data.lastUpdate
    };
    return stats_object;
} catch (e) {
    console.error("ERROR: Error in get_statistics_bangladesh API call");
    return {};
}

}

/**
 * API call for getting Covid-19 stats for World.
 * @returns {Promise<{}|{recovered: *, lastUpdate, confirmed: *, deaths: *}>}
 */
async function get_statistics_world() {

try {
    let response = await axios.get("https://covid19.mathdro.id/api/");
    let stats_object =  {
        confirmed: response.data.confirmed.value ,
        recovered:  response.data.recovered.value ,
        deaths:  response.data.deaths.value ,
        lastUpdate: response.data.lastUpdate
    };
    return stats_object;
} catch (e) {
    console.error("ERROR: Error in get_statistics_world API call");
    return {};
}

}


async function override_statistics_bangladesh( ) {

}


//Unusued functions. Pore korle korbo ne :'3

async  function get_statistics_bangladesh_old_date(date) {
    let formatted_date_string = date.format('YYYY-MM-DD');
    console.log(formatted_date_string);
    //https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#00030720-fae3-4c72-8aea-ad01ba17adf8
    //https://covid19api.com/
    //Eitate paba. Apatoto eto pera nite parbo na :'3
}

async function get_statistics_world_old_date(date) {
    let formatted_date_string = date.format('YYYY-MM-DD');
    console.log(formatted_date_string);
    let response = await axios.get("https://covid19.mathdro.id/api/daily/");

    let res_for_date = response.data.filter((element) => {
        return element.reportDate === formatted_date_string
    });
    //PROBLEM. Recovered data is missing in this api. So Can't use it.
    //Also can't find this data in any other API. So fuck this pera nite parbo na.
}





module.exports = {get_statistics_bangladesh, get_statistics_world, override_statistics_bangladesh};