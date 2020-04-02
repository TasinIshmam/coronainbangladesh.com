'use strict';
const axios = require('axios');
const moment = require('moment');
const {Statistics} = require('../models/statistics');


//Data Sources

//https://covid19.mathdro.id/api/countries/BD/
//https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#00030720-fae3-4c72-8aea-ad01ba17adf8
//https://covid19api.com/
//https://covid19.mathdro.id/api/daily/


/**
 *
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
        console.error(e);
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
        console.error(e);
        return {};
    }

}


/**
 * Takes a batch of timeseries statistics data and inserts into the database
 * @param [{Statistics}] timeseries_arr - an array of statistics data, usually in the form of a timeseries
 * @returns {Promise<*[]|*>}
 */
async function insert_many_statistics(timeseries_arr) {
    try {
        let res = await Statistics.insertMany(timeseries_arr);
        if (res === null || res === undefined) return [];
        return res;

    } catch (e) {
        console.log("ERROR: Failed to insert_many statistics data");
        console.log(e);
        return [];
    }
}

/**
 * Get all timeseries statistics data for Bangladesh
 * @returns {Promise<*[]|*>}
 */
async function get_all_timeseries_BD() {
    try {
        return await Statistics.find({
            stat_type: 'timeseries',
            locale: 'BD'
        }).sort({"date": 1});
    } catch (e) {
        console.error("ERROR: Failed to return timeseries for BD");
        console.error(e);
        return [];
    }
}

/**
 * Updates statistics timeseries with today's data.
 * @returns {Promise<boolean>} - Success status of operation
 */
async function update_timeseries_today_BD() {

    try {
        let stat_object_today = await get_statistics_bangladesh();
        let res = await Statistics.findOneAndUpdate({
                "stat_type": "timeseries",
                "locale": "BD",
                "date": moment().endOf('day').toString()
            },
            stat_object_today,
            {upsert: true, new: true, runValidators: true, useFindAndModify: false});

        return res.confirmed === stat_object_today.confirmed && res.deaths === stat_object_today.deaths &&
            res.recovered === stat_object_today.recovered;

    } catch (e) {
        console.error("ERROR: in update_timeseries_today_BD");
        console.error(e);
        return false;
    }

}

module.exports = {
    get_statistics_bangladesh,
    get_statistics_world,
    update_override_statistics_bangladesh,
    get_override_statistics_bangladesh,
    insert_many_statistics,
    get_all_timeseries_BD,
    update_timeseries_today_BD
};