const moment = require('moment');
const {DailyNews} = require('../models/daily_news');


/**
 * Bulk Insert Daily News from Json Array.
 * @param [{DailyNews}] dailys_news_arr
 * @returns  [{DailyNews}] inserted elements
 */
async function insert_many_daily_news(dailys_news_arr) {
    try {
        let res = await DailyNews.insertMany(dailys_news_arr);
        return res;
    } catch (e) {
        console.error(e);
        return {};
    }
}

/**
 * Get's daily news
 * @param {moment} date - All news from that given date.
 * @param @enum {"BD", "GLOBAL"} locale  - Bangladesh news or global news
 * @returns [{DailyNews}] Query Result
 */

async function get_daily_news(date, locale) {

    let startDate = date.clone().startOf('day');
    let endDate = date.clone().endOf('day');

    try {
        let res = await DailyNews.find( { date: { $gte: startDate, $lte: endDate }, "locale": locale}).sort({ importance_rating: -1});
        return res;
    } catch (e) {
        console.error(e);
        return {};
    }
}

module.exports = {    insert_many_daily_news, get_daily_news};