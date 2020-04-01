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
        cache.set_cache_with_exp("statistics_bangladesh_override", db_result, CACHE_EXPIRATION_TIME  );
        return db_result;
    }

}


/**
 * Compares API fetched data and override data. Returns max values of the two.
 * @param api_values
 * @param override_values
 * @returns {{recovered: *, confirmed: *, deaths: *}}
 */
function override_statistics_values (api_values, override_values) {
    return {
        confirmed: Math.max(api_values.confirmed, override_values.confirmed),
        recovered: Math.max(api_values.recovered,  override_values.recovered),
        deaths:  Math.max(api_values.deaths,  override_values.deaths)
    }
}

/**
 * Get COVID-19 statistics values for Bangladesh from db or cache
 * @returns {Promise<null|JSON|{}|{recovered: *, lastUpdate, confirmed: *, deaths: *}>}
 */

async function get_statistics_bangladesh() {
    let api_data = cache.get_cached_data("statistics_bangladesh");
    let override_data = await get_statistics_bangladesh_override();
    if(api_data.status) {  //cache hit
        return override_statistics_values(api_data.data, override_data)
    } else {  //cache miss
        let api_result = await statistics_interface.get_statistics_bangladesh();  //API call
        let cache_result =  cache.set_cache_with_exp("statistics_bangladesh", api_result, CACHE_EXPIRATION_TIME );   //cache Update
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

    if(result.status) {  //cache hit
        return result.data;
    } else {  //cache miss
        let api_result = await statistics_interface.get_statistics_world();  //API call
        let cache_result =  cache.set_cache_with_exp("statistics_world", api_result, CACHE_EXPIRATION_TIME);   //cache Update
        console.log("LOG: World Statistics Cache Updated");
        return api_result;
    }

}


async function validate_timeseries_BD(timeseries_BD) {

    let todays_stat = await get_statistics_bangladesh();

    let todays_date = moment(todays_stats.lastUpdate).startOf('day');

    let last_stat = timeseries_BD[timeseries_BD.length-1];

    let last_date = moment(last_stat.date).startOf('day');


    if (todays_date.valueOf() !== last_date.valueOf()) {  //today's stats aren't in cache

        let update_entry = {
            confirmed: todays_stat.confirmed,
            recovered: todays_stat.recovered,
            deaths: todays_stat.deaths,
            date: last_date,
            locale: 'BD',
            stat_type: 'timeseries'
        };

        timeseries_BD.push(update_entry);

        cache.set_cache_with_exp("timeseries_BD", timeseries_BD, TIMESERIES_EXPIRATION_TIME);

        return timeseries_BD;
    } else {  //today's stats are in cache

        if (last_stat.confirmed === todays_stat.confirmed && last_stat.deaths === todays_stat.deaths &&
                last_stat.recovered === todays_stat.recovered) {  //today's stats in cache are the latest stats

            return timeseries_BD;

        } else {  //today's stats in the cache aren't the latest stats

            timeseries_BD[timeseries_BD.length - 1] = {
                confirmed: todays_stat.confirmed,
                recovered: todays_stat.recovered,
                deaths: todays_stat.deaths,
                date: last_date,
                locale: 'BD',
                stat_type: 'timeseries'
            };

            cache.set_cache_with_exp("timeseries_BD", timeseries_BD, TIMESERIES_EXPIRATION_TIME);

            return timeseries_BD;

        }
    }


}


async function get_all_timeseries_BD() {

    let result = cache.get_cached_data("timeseries_BD");

    if (result.status) {  //cache hit

        return await validate_timeseries_BD(result.data);

    } else {  //cache miss

        let api_result = await statistics_interface.get_all_timeseries_BD();
        let cache_result = cache.set_cache_with_exp("timeseries_BD", api_result, TIMESERIES_EXPIRATION_TIME);
        console.log("LOG: Bangladesh Timeseries Cache Updated");

        return api_result;
    }

}


module.exports = {get_statistics_world, get_statistics_bangladesh, get_all_timeseries_BD};