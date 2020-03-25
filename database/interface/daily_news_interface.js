const moment = require('moment');
const { DailyNews } = require('../models/daily_news');

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
	    console.error("ERROR: Failed to insert daily news");
		console.error(e);
		return [];
	}
}

/**
 * Get the LATEST data of the day for which we have daily news data.
 * Eg - If it's 25-03-2020 but we have data upto 23-03-2020, then functio will return 23-03-2020 as a Date Object.
 * @returns {Promise<Date>} - Mongoose Date Object
 */
async function get_last_updated_date() {
	try {
		let res = await DailyNews.find().select('date').sort({ date: -1 }).limit(1);

		if (res === null || res === undefined || res.length <= 0) return moment();

		return moment(res[0].date);
	} catch (e) {
		console.error('ERROR: Failed to fetch latest updated date!');
		console.error(e);
		//in case of error, return null;
		return moment();
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
		let res = await DailyNews.find({ date: { $gte: startDate, $lte: endDate }, locale: locale }).sort({
			importance_rating: -1
		});
		return res;
	} catch (e) {
		console.error(e);
		return [];
	}
}

module.exports = { insert_many_daily_news, get_daily_news, get_last_updated_date };
