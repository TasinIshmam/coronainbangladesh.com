let moment = require('moment');
let cache = require('../cache/cache_interface');
let statistics_interface = require('../database/interface/statistics_interface');


const CACHE_EXPIRATION_TIME = 300;
const TIMESERIES_EXPIRATION_TIME = 1800;

/**
 * Get COVID_19 manual override values from db or cache
 * @returns {Promise<{recovered: *, lastUpdate, confirmed: *, deaths: *}>}
 */
async function get_statistics_bangladesh_override() {

    let result = cache.get_cached_data('statistics_bangladesh_override');

    if (result.status) {
        console.log("get_statistics_bangladesh_override CACHED");
        return result.data;
    } else {
        console.log("get_statistics_bangladesh_override DB");
        let db_result = await statistics_interface.get_override_statistics_bangladesh();
        cache.set_cache_with_exp("statistics_bangladesh_override", db_result, CACHE_EXPIRATION_TIME);
        return db_result;
    }

}


/**
 * Compares API fetched data and override data. Returns max values of the two.
 * @param api_values
 * @param override_values
 * @returns {{recovered: *, confirmed: *, deaths: *}}
 */
function override_statistics_values(api_values, override_values) {
    return {
        confirmed: Math.max(api_values.confirmed, override_values.confirmed),
        recovered: Math.max(api_values.recovered, override_values.recovered),
        deaths: Math.max(api_values.deaths, override_values.deaths)
    }
}

/**
 * Get COVID-19 statistics values for Bangladesh from db or cache
 * @returns {Promise<null|JSON|{}|{recovered: *, lastUpdate, confirmed: *, deaths: *}>}
 */

async function get_statistics_bangladesh() {
    let api_data = cache.get_cached_data("statistics_bangladesh");
    let override_data = await get_statistics_bangladesh_override();
    if (api_data.status) {  //cache hit
        return override_statistics_values(api_data.data, override_data)
    } else {  //cache miss
        let api_result = await statistics_interface.get_statistics_bangladesh();  //API call
        let cache_result = cache.set_cache_with_exp("statistics_bangladesh", api_result, CACHE_EXPIRATION_TIME);   //cache Update
        console.log("LOG: Bangladesh Statistics Cache Updated");
        return override_statistics_values(api_result, override_data)
    }
}


/**
 * Get COVID-19 statistics values for World from db or cache
 * @returns {Promise<null|JSON|{}|{recovered: *, lastUpdate, confirmed: *, deaths: *}>}
 */

async function get_statistics_world() {

    let result = cache.get_cached_data("statistics_world");

    if (result.status) {  //cache hit
        return result.data;
    } else {  //cache miss
        let api_result = await statistics_interface.get_statistics_world();  //API call
        let cache_result = cache.set_cache_with_exp("statistics_world", api_result, CACHE_EXPIRATION_TIME);   //cache Update
        console.log("LOG: World Statistics Cache Updated");
        return api_result;
    }

}


/**
 * Checks if time series is updated with the latest data of the day.
 * @param [{Statistics}] timeseries_BD
 * @returns {Promise<[{Statistics}]>}
 */
async function update_timeseries_BD(timeseries_BD) {

    let todays_stat = await get_statistics_bangladesh();
    let todays_date = moment(todays_stat.lastUpdate).endOf('day');

    let last_stat = timeseries_BD[timeseries_BD.length - 1];
    let last_date = moment(last_stat.date).endOf('day');

    let update_entry = {
        confirmed: todays_stat.confirmed,
        recovered: todays_stat.recovered,
        deaths: todays_stat.deaths,
        date: todays_date,
        locale: 'BD',
        stat_type: 'timeseries'
    };

    if (todays_date.valueOf() !== last_date.valueOf()) {  //timeseries array is behind by a day. Entering entry for today.
         timeseries_BD.push(update_entry)
    } else {  //timeseries array has entry for current day. Simply updating to latest values.
         timeseries_BD[timeseries_BD.length - 1] = update_entry;
    }

    return timeseries_BD;
}


/**
 * Gets timeseries from cache or DB. Makes sure it's updated with latest data before returninng.
 * @returns {Promise<null|[{Statistics}]>}
 */
async function get_all_timeseries_BD() {

    let result = cache.get_cached_data("timeseries_BD");
    if (result.status) {  //cache hit
        return result.data;
    } else {  //cache miss
        let api_result = await statistics_interface.get_all_timeseries_BD();
        let updated_result = await update_timeseries_BD(api_result);
        cache.set_cache_with_exp('timeseries_BD', updated_result, TIMESERIES_EXPIRATION_TIME );
        console.log("Timeseries bd cache update");
        return updated_result;
    }

}


module.exports = {get_statistics_world, get_statistics_bangladesh, get_all_timeseries_BD};