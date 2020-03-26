'use strict';

const axios = require('axios');

const {get_cached_data, set_cache, set_cache_with_exp} = require('./redis_cache_interface');

const THRESHOLD = 1800;

function extracted(targetURL, statScope, toRedis) {

    return axios.get(targetURL)
        .then(response => {

            let responseJSON = response.data;

            if (toRedis === true) {
                set_cache_with_exp(statScope, JSON.stringify(responseJSON), THRESHOLD).then((res) => {
                    if (res.status === true) {
                        console.log('Data cached successfully.');
                    } else {
                        console.log('Could not cache data.')
                    }
                });
            }

            return {
                    confirmed: responseJSON.confirmed.value ,
                    recovered:  responseJSON.recovered.value ,
                    deaths:  responseJSON.deaths.value ,
                    lastUpdate: responseJSON.lastUpdate

            };

        });
}

async function get_statistics_bangladesh() {

    let result = await get_cached_data('BD');

    if (result.status === true && result.data === null) {
        //If there is redis cache miss, fetches data from api, stores in redis and returns the data

        console.log(result.data);

        console.log('BD API CALL DATA');

        return extracted("https://covid19.mathdro.id/api/countries/BD", "BD", true);

    } else if (result.status === true && result.data !== null) {
        //If there is redis cache hit, returns data from redis

        console.log('BD REDIS CACHED DATA');

        let responseJSON = JSON.parse(result.data);

        return {
            confirmed: responseJSON.confirmed.value ,
            recovered:  responseJSON.recovered.value ,
            deaths:  responseJSON.deaths.value ,
            lastUpdate: responseJSON.lastUpdate
        }

    } else {
        //If redis is down, makes an api call and returns the data

        console.log('BD REDIS DOWN');

        return extracted("https://covid19.mathdro.id/api/countries/BD", "BD", false);

    }

}

async function get_statistics_world() {

    let result = await get_cached_data('World');

    if (result.status === true && result.data === null) {

        //If there is redis cache miss, fetches data from api, stores in redis and returns the data

        console.log('World API CALL DATA');

        return extracted("https://covid19.mathdro.id/api/", "World", true);

    } else if (result.status === true && result.data !== null) {

        //If there is redis cache hit, returns data from redis

        console.log('World REDIS CACHED DATA');

        let responseJSON = JSON.parse(result.data);

        return {
            confirmed: responseJSON.confirmed.value ,
            recovered:  responseJSON.recovered.value ,
            deaths:  responseJSON.deaths.value ,
            lastUpdate: responseJSON.lastUpdate
        }

    } else {
        //If redis is down, makes an api call and returns the data

        console.log('World REDIS DOWN');

        return extracted("https://covid19.mathdro.id/api/", "World", false);
    }

}


async function override_statistics_bangladesh(data, statScope) {

    await set_cache(statScope, data);

}


module.exports = {get_statistics_bangladesh, get_statistics_world, override_statistics_bangladesh};