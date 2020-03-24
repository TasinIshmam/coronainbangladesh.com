'use strict';

const axios = require('axios');
const redis = require('async-redis');
const moment = require('moment');

const REDISHOST = process.env.REDISHOST || 'localhost';
const REDISPORT = process.env.REDISPORT || 6379;
const THRESHOLD = 1800;

const client = redis.createClient(REDISPORT, REDISHOST, {
    retry_strategy: function (options) {
        if (options.error && options.error.code === "ECONNREFUSED") {
            console.log('SERVER REFUSED CONNECTION!');
            return new Error("The server refused the connection.");
        }
        return Math.min(options.attempt*100, 3000);
    }
});

client.on('error', (err) => {
    console.log("Errorrrrr " + err);
});


function extracted(targetURL, statScope, toRedis) {
    return axios.get(targetURL)
        .then(response => {
            //stats.confirmed < 33 ? 33 : stats.confirmed

            let responseJSON = response.data;

            if (toRedis === true) {
                client.set(statScope, JSON.stringify(responseJSON));
                client.set('lastUpdate'+statScope, moment().unix());

                client.get(statScope+'isOverridden').then((res) => {
                    if (res === true) {
                        return client.get(statScope+'Override').then((result) => {
                            if (result) {
                                responseJSON = result;
                            }
                        });
                    }
                });
            }


            if (statScope === "BD") {
                return {
                    confirmed: responseJSON.confirmed.value,
                    recovered:  responseJSON.recovered.value,
                    deaths:  responseJSON.deaths.value,
                    lastUpdate: responseJSON.lastUpdate

                };
            } else {
                return {
                    confirmed: responseJSON.confirmed.value ,
                    recovered:  responseJSON.recovered.value ,
                    deaths:  responseJSON.deaths.value ,
                    lastUpdate: responseJSON.lastUpdate

                };
            }

        });
}


async function get_statistics_bangladesh() {

    return client.get('lastUpdateBD').then((lastUpdate) => {

        if ((moment().unix() - lastUpdate) <= THRESHOLD) {

            return client.get('BD').then((result) => {

                if (result) {

                    console.log('REDIS CACHE DATA BD');

                    const responseJSON = JSON.parse(result);

                    return {
                        confirmed: responseJSON.confirmed.value < 39? 39 :  responseJSON.confirmed.value,
                        recovered:  responseJSON.recovered.value < 5? 5 :  responseJSON.recovered.value,
                        deaths:  responseJSON.deaths.value < 4? 4 :  responseJSON.deaths.value,
                        lastUpdate: responseJSON.lastUpdate

                    };

                } else {

                    console.log('API CALL DATA BD');

                    return extracted("https://covid19.mathdro.id/api/countries/BD", "BD", true);

                }
            });
        } else {

            console.log('API CALL DATA BD - TIMED');

            return extracted("https://covid19.mathdro.id/api/countries/BD", "BD", true);

        }
    }).catch( (err) => {

        console.log(err.message);

        console.log('API CALL DATA BD - REDIS FAILURE');

        return extracted("https://covid19.mathdro.id/api/countries/BD", "BD", false);

    });


}

async function get_statistics_world() {


    return client.get('lastUpdateWorld').then((lastUpdate) => {

        if ((moment().unix() - lastUpdate) <= THRESHOLD) {
            return client.get('World').then( (result) => {

                if (result) {

                    console.log('REDIS CACHE DATA WORLD');

                    const response = JSON.parse(result);

                    return {
                        confirmed: response.confirmed.value,
                        recovered: response.recovered.value,
                        deaths: response.deaths.value,
                        lastUpdate: response.lastUpdate

                    };

                } else {

                    console.log('API CALL DATA WORLD');

                    return extracted("https://covid19.mathdro.id/api/", "World", true);

                }
            });
        } else {

            console.log('API CALL DATA WORLD - TIMED');

            return extracted("https://covid19.mathdro.id/api/", "World", true);

        }

    }).catch( (error) => {

        console.log(error.message);

        return extracted("https://covid19.mathdro.id/api/", "World", false);

    });

}


async function override_statistics_bangladesh(data, statScope, isOverridden) {

    try {
        client.set(statScope + 'Override', JSON.stringify(data));
        client.set(statScope + 'isOverridden', JSON.stringify(isOverridden));
    } catch (e) {
        console.log(e.message);
    }
    return 0;

}


module.exports = {get_statistics_bangladesh, get_statistics_world, override_statistics_bangladesh};