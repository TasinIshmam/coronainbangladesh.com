import moment from "moment";

const cache = require('../cache/cache_interface');
const live_news_interface = require('../database/interface/live_news_interface');
const daily_news_interface = require('../database/interface/daily_news_interface');
const  featured_news_interface = require('../database/interface/featured_news_interface');

const THRESHOLD = 900;


/**
 * Takes count, startDate and endDate - returns 'count' number of featured news between 'startDate' and 'endDate'
 * @param count - the number of featured news items to be returned
 * @param startDate - the start date for which featured news must be returned
 * @param endDate - the end date for which featured news must be returned
 * @returns {Promise<null|JSON|{FeaturedNews}[]>} - the array of featured news that is returned
 */
async function get_news_between_dates_with_count(
    count = 20,
    startDate = moment().startOf('day').subtract(5, 'day'),
    endDate = moment().endOf('day')
) {

    let key = 'featured_news'+count.toString() + startDate.startOf('day').format("YYYY-MM-DD")
                + endDate.endOf('day').format("YYYY-MM-DD");

    let response = cache.get_cached_data(key);

    if (response.status === true) {
        return response.data;
    } else {
        let data = await featured_news_interface.get_news_between_dates_with_count(count, startDate, endDate);
        cache.set_cache_with_exp(key, data, THRESHOLD);
        return data;
    }

}


/**
 * Takes count - returns 'count' number of live news
 * @param count - the number of live news items to be returned
 * @returns {Promise<null|JSON|{LiveNews}[]>} - the array of live news that is returned
 */
async function get_all_live_news(count = 50) {

    let key = 'live_news' + count.toString();

    let response = cache.get_cached_data(key);

    if (response.status === true) {
        return response.data;
    } else {
        let data = await live_news_interface.get_all_live_news(count);
        cache.set_cache_with_exp(key, data, THRESHOLD);
        return data;
    }

}


/**
 * Takes data and locale - returns all news for that date and for that locale
 * @param date - the date for which daily news must be fetched
 * @param locale - ENUMERATION - {"BD", "GLOBAL"}
 * @returns {Promise<null|JSON|*>} - the array of daily news that is returned
 */
async function get_daily_news(date, locale) {

    let key = 'daily_news' + date.format("YYYY-MM-DD") + locale;

    let response = cache.get_cached_data(key);

    if (response.status === true) {
        return response.data;
    } else {

        let data = await daily_news_interface.get_daily_news(date, locale);

        cache.set_cache_with_exp(key, data, THRESHOLD);

        return data;
    }

}


/**
 * Returns the date of last update for daily news
 * @returns {Promise<null|JSON|Date>} - the date when the daily news collection was last updated
 */
async function get_last_updated_date() {

    let key = 'daily_news_last_updated_date';

    let response = cache.get_cached_data(key);

    if (response.status === true) {
        return response.data;
    } else {

        let data = await daily_news_interface.get_last_updated_date();

        cache.set_cache_with_exp(key, data, THRESHOLD);

        return data;
    }

}


module.exports = {get_news_between_dates_with_count, get_all_live_news, get_daily_news, get_last_updated_date};
