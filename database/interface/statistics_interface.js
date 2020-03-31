'use strict';
const axios = require('axios');
const moment = require('moment');
const {Statistics} = require('../models/statistics');
//Data Sources
//https://covid19.mathdro.id/api/countries/BD/deaths  Source: Worldometers
//https://covid2019-api.herokuapp.com/country/bangladesh
//https://covid19.mathdro.id/api/countries/BD/


/**
 * Override values are those used to quickly update the website statistics for bangladesh (Infected/recovered/death) when the API is lagging behind real time information.
 *
 * This only needs to be updated and there should only be one instance of this value in the database.
 * @param {Statistics} stat_object - override values
 * @returns {Promise<{Statistics}>} - Returns the object stored.;
 */

async function update_override_statistics_bangladesh(stat_object) {

    try {
        stat_object.stat_type = 'override'; //ensuring only override values are updated.
        let res = await Statistics.findOneAndUpdate({
                "stat_type": "override",
                "locale": "BD"
            },
            stat_object,
            {upsert: true, new: true, runValidators: true, useFindAndModify: false});
        return res;
    } catch (e) {
        console.error("ERROR: in update_override_bangladesh_statistics");
        console.error(e);
        return {};
    }
}


/**
 * Returns the override statistics values for Bangladesh.
 * Sorting and limiting makes sure even if there are multiple, only the latest is returned.
 *
 * @returns {Promise<{Statistics}|*>}
 */
async function get_override_statistics_bangladesh() {
    try {
        let res = await Statistics.findOne({
            "stat_type": "override",
            "locale": "BD"
        }).sort({'date': -1}).limit(1);

        //incase the value dosen't exist, we just enter 0 values.
        if (res === null || res === undefined || res === []) return {
            confirmed: 0,
            recovered: 0,
            deaths: 0
        };

        return res;
    } catch (e) {
        console.error("ERROR: in get_override_statistics_bangladesh");
        console.error(e);
        return {
            confirmed: 0,
            recovered: 0,
            deaths: 0
        };
    }
}


/**
 * API call for getting Covid-19 stats for Bangladesh.
 * @returns {Promise<{}|{recovered: *, lastUpdate, confirmed: *, deaths: *}>}
 */

async function get_statistics_bangladesh() {
    try {
        let response = await axios.get("https://covid19.mathdro.id/api/countries/bd");
        let stats_object = {
            confirmed: response.data.confirmed.value,
            recovered: response.data.recovered.value,
            deaths: response.data.deaths.value,
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
        let stats_object = {
            confirmed: response.data.confirmed.value,
            recovered: response.data.recovered.value,
            deaths: response.data.deaths.value,
            lastUpdate: response.data.lastUpdate
        };
        return stats_object;
    } catch (e) {
        console.error("ERROR: Error in get_statistics_world API call");
        return {};
    }

}


//Unusued functions. Pore korle korbo ne :'3

async function get_statistics_bangladesh_old_date(date) {
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


module.exports = {
    get_statistics_bangladesh,
    get_statistics_world,
    update_override_statistics_bangladesh,
    get_override_statistics_bangladesh
};