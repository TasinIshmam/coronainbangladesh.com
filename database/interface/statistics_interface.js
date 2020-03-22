'use strict';

const axios = require('axios');
const redis = require('async-redis');

const REDISHOST = process.env.REDISHOST || 'localhost';
const REDISPORT = process.env.REDISPORT || 6379;

const client = redis.createClient(REDISPORT, REDISHOST, {
    retry_strategy: function (options) {
        if (options.error && options.error.code === "ECONNREFUSED") {
            console.log('SERVER REFUSED CONNECTION!!!');
            return new Error("The server refused the connection.");
        }
        return Math.min(options.attempt*100, 3000);
    }
});

client.on('error', (err) => {
    console.log("Errorrrrr " + err);
});

async function get_statistics_bangladesh() {

    return client.get('BD').then((result) => {
        //console.log("WTF");
        if (result) {

            const response = JSON.parse(result);

            //console.log('REDIS CACHE DATA ', response);

            let obj = {
                confirmed: response.confirmed,
                recovered: response.recovered,
                deaths: response.deaths,
                active: response.active,
                lastUpdate: response.lastUpdate
            };

            //console.log(obj);

            return obj;

        } else {

            return axios.get("https://covid19.mathdro.id/api/countries/BD/deaths")
                .then(response => {

                    const responseJSON = response.data[0];

                    //console.log('API CALL DATA ', responseJSON);

                    client.set('BD', JSON.stringify(responseJSON));

                    let obj = {
                        confirmed: response.data[0].confirmed,
                        recovered: response.data[0].recovered,
                        deaths: response.data[0].deaths,
                        active: response.data[0].active,
                        lastUpdate: response.data[0].lastUpdate
                    };

                    //console.log(obj);

                    return obj;

                });

        }
    }).catch( (err) => {
        return axios.get("https://covid19.mathdro.id/api/countries/BD/deaths")
            .then(response => {

                let obj = {
                    confirmed: response.data[0].confirmed,
                    recovered: response.data[0].recovered,
                    deaths: response.data[0].deaths,
                    active: response.data[0].active,
                    lastUpdate: response.data[0].lastUpdate
                };

                return obj;

            });
    });


}


async function get_statistics_world() {

    return client.get('World').then( (result) => {

        if (result) {
            const response = JSON.parse(result);

            let obj =  {
                confirmed: response.confirmed.value,
                recovered: response.recovered.value,
                deaths: response.deaths.value,
                lastUpdate: response.lastUpdate

            };

            //console.log(obj);

            return obj;

        } else {

            return axios.get("https://covid19.mathdro.id/api/")
                .then(response => {

                    console.log(response.data);

                    const responseJSON = response.data;

                    client.set('BD', JSON.stringify(responseJSON));

                    let obj = {
                        confirmed: response.data.confirmed.value,
                        recovered: response.data.recovered.value,
                        deaths: response.data.deaths.value,
                        lastUpdate: response.data.lastUpdate

                    };

                    //console.log(obj);

                    return obj;

                });

        }
    }).catch( (error) => {
        return axios.get("https://covid19.mathdro.id/api/")
            .then(response => {

                console.log(response.data);

                let obj = {
                    confirmed: response.data.confirmed.value,
                    recovered: response.data.recovered.value,
                    deaths: response.data.deaths.value,
                    lastUpdate: response.data.lastUpdate

                };

                return obj;

            });
    });

}

module.exports = {get_statistics_bangladesh, get_statistics_world};