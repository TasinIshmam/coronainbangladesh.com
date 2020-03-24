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

async function get_statistics_bangladesh() {

    return client.get('lastUpdateBD').then((lastUpdate) => {

        if ((moment().unix() - lastUpdate) <= THRESHOLD) {
            return client.get('BD').then((result) => {

                if (result) {

                    const response = JSON.parse(result);

                    //console.log('REDIS CACHE DATA ', response);
                    console.log('REDIS CACHE DATA BD');

                    let obj =  {
                        confirmed: response.confirmed.value,
                        recovered: response.recovered.value,
                        deaths: response.deaths.value,
                        lastUpdate: response.lastUpdate

                    };

                    //console.log(obj);

                    return obj;

                } else {

                    return axios.get("https://covid19.mathdro.id/api/countries/BD")
                        .then(response => {

                            const responseJSON = response.data;

                            //console.log('API CALL DATA ', responseJSON);
                            console.log('API CALL DATA BD');

                            client.set('BD', JSON.stringify(responseJSON));

                            client.set('lastUpdateBD', moment().unix());

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
            }).catch( (err) => {
                return axios.get("https://covid19.mathdro.id/api/countries/BD/")
                    .then(response => {

                        let obj = {
                            confirmed: response.data.confirmed.value,
                            recovered: response.data.recovered.value,
                            deaths: response.data.deaths.value,
                            lastUpdate: response.data.lastUpdate

                        };


                        return obj;

                    });
            });
        } else {

            return axios.get("https://covid19.mathdro.id/api/countries/BD/")
                .then(response => {

                    const responseJSON = response.data;

                    //console.log('API CALL DATA TIMED - ', responseJSON);
                    console.log('API CALL DATA BD - TIMED');

                    client.set('BD', JSON.stringify(responseJSON));

                    client.set('lastUpdateBD', moment().unix());

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
    }).catch((err) => {
        console.log(err.message);
        return 0;
    });




}

async function get_statistics_world() {


    return client.get('lastUpdateWorld').then((lastUpdate) => {

        if ((moment().unix() - lastUpdate) <= THRESHOLD) {
            return client.get('World').then( (result) => {

                if (result) {

                    const response = JSON.parse(result);

                    console.log('REDIS CACHE DATA WORLD');

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

                            //console.log(response.data);

                            const responseJSON = response.data;

                            client.set('World', JSON.stringify(responseJSON));

                            client.set('lastUpdateWorld', moment().unix());

                            console.log('API CALL DATA WORLD');


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

                        //console.log(response.data);

                        let obj = {
                            confirmed: response.data.confirmed.value,
                            recovered: response.data.recovered.value,
                            deaths: response.data.deaths.value,
                            lastUpdate: response.data.lastUpdate

                        };

                        return obj;

                    });
            });
        } else {
            return axios.get("https://covid19.mathdro.id/api/")
                .then(response => {

                    //console.log(response.data);

                    const responseJSON = response.data;

                    client.set('World', JSON.stringify(responseJSON));

                    client.set('lastUpdateWorld', moment().unix());

                    console.log('API CALL DATA WORLD - TIMED');

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

    }).catch((err) => {
        console.log(err.message);
        return 0;
    });

}

module.exports = {get_statistics_bangladesh, get_statistics_world};